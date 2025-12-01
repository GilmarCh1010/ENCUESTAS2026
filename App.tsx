import React, { useState, useEffect, useRef } from 'react';
import { database } from './firebaseConfig';
import { FLOW } from './constants';
import { Message, Step, UserData } from './types';

// Icons component helpers
const BotAvatar = () => (
  <div className="w-12 h-12 bg-[#25d366] rounded-full mr-4 flex items-center justify-center shrink-0 overflow-hidden">
    <img src="https://i.pinimg.com/736x/a7/59/70/a75970bb57b493ba703167005d01c4ec.jpg" alt="Bot Avatar" className="w-full h-full object-cover" />
  </div>
);

const SmallBotAvatar = () => (
  <div className="w-[30px] h-[30px] bg-[#25d366] rounded-full mr-[10px] flex items-center justify-center shrink-0 overflow-hidden">
    <img src="https://i.pinimg.com/736x/a7/59/70/a75970bb57b493ba703167005d01c4ec.jpg" alt="Bot" className="w-full h-full object-cover" />
  </div>
);

export default function App() {
  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [displayedStepIndex, setDisplayedStepIndex] = useState(-1);
  const [userData, setUserData] = useState<UserData>({});
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Navigation History Stack (stores step indices)
  const [history, setHistory] = useState<number[]>([]);
  
  // Multiselect State
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Refs
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // --- Helper to get current active step (resolving conditionals) ---
  const getCurrentStep = (index: number, currentData: UserData): Step | null => {
    if (index >= FLOW.length) return null;
    let step = FLOW[index];

    if (step.type === 'conditional') {
      if (step.condition && step.condition(currentData)) {
        if (step.ifTrue) return step.ifTrue;
      }
      // Condition false, skip this step
      return null;
    }
    return step;
  };

  // --- Logic ---
  const addMessage = (type: 'incoming' | 'outgoing', text: string, stepIndex?: number) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      type,
      text,
      isBot: type === 'incoming',
      stepIndex: stepIndex
    }]);
  };

  // --- Effect: Process Flow ---
  useEffect(() => {
    if (isProcessing || isTyping) return;
    
    // Prevent re-running for the same step if already displayed
    if (currentStepIndex === displayedStepIndex) return;

    // Recursively find the next valid step if active one is conditional/null
    let activeStep = getCurrentStep(currentStepIndex, userData);
    
    // If strictly null (conditional failed), advance index immediately
    if (!activeStep && currentStepIndex < FLOW.length) {
      setCurrentStepIndex(prev => prev + 1);
      return;
    }

    if (!activeStep) {
        // End of flow
        return;
    }

    // Mark this step as displayed/processed
    setDisplayedStepIndex(currentStepIndex);
    
    // Reset multiselect state for new steps
    setSelectedOptions([]);

    // It's a valid bot message/question
    const hasOptions = activeStep.options !== undefined;
    if (activeStep.message && !activeStep.input && !hasOptions && activeStep.action !== 'saveData') {
       // Simple text message, move to next after display
       setIsProcessing(true);
       setIsTyping(true);
       
       const msgText = typeof activeStep.message === 'function' ? activeStep.message(userData) : activeStep.message;
       
       setTimeout(() => {
         setIsTyping(false);
         addMessage('incoming', msgText || '', currentStepIndex);
         setIsProcessing(false);
         // Push current to history before auto-advancing
         setHistory(prev => [...prev, currentStepIndex]); 
         setCurrentStepIndex(prev => prev + 1);
       }, activeStep.delay || 1000);

    } else if (activeStep.message && (activeStep.input || hasOptions)) {
       // Question requiring input
       setIsProcessing(true);
       setIsTyping(true);

       const msgText = typeof activeStep.message === 'function' ? activeStep.message(userData) : activeStep.message;

       setTimeout(() => {
         setIsTyping(false);
         addMessage('incoming', msgText || '', currentStepIndex);
         setIsProcessing(false);
         // Wait for user input (don't advance step)
         setTimeout(() => {
             if (inputRef.current) inputRef.current.focus();
         }, 100);
       }, activeStep.delay || 1000);
    } else if (activeStep.action === 'saveData') {
        setIsProcessing(true);
        setIsTyping(true);
        setTimeout(() => {
             setIsTyping(false);
             addMessage('incoming', activeStep.message as string, currentStepIndex);
             saveDataToFirebase();
             setIsProcessing(false);
        }, activeStep.delay || 1000);
    }

  }, [currentStepIndex, userData, isProcessing, isTyping, displayedStepIndex]);

  // --- Scroll Handler ---
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const activeStep = getCurrentStep(currentStepIndex, userData);
  // Resolve dynamic options
  const currentOptions = activeStep && activeStep.options 
      ? (typeof activeStep.options === 'function' ? activeStep.options(userData) : activeStep.options)
      : [];
  const showOptionsInput = currentOptions.length > 0;

  // --- Updated Scroll Logic ---
  useEffect(() => {
    if (isTyping) {
        scrollToBottom();
        return;
    }

    if (messages.length > 0 && showOptionsInput) {
        const lastMsg = messages[messages.length - 1];
        if (lastMsg.isBot) {
             setTimeout(() => {
                lastMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
             }, 100);
             return;
        }
    }
    
    scrollToBottom();
  }, [messages, isTyping, showOptionsInput]);

  const handleSendMessage = () => {
    const step = getCurrentStep(currentStepIndex, userData);
    if (!step) return;
    if (!inputValue.trim() && step.validation !== 'optional') return;
    
    // Processing
    setIsProcessing(true);

    // Specific Validation for CI
    if (step.validation === 'ci') {
        const val = inputValue.replace(/[^0-9]/g, '');
        if (val.length < 4) {
             addMessage('incoming', '⚠️ El carnet de identidad debe tener al menos 4 números.', currentStepIndex);
             setIsProcessing(false);
             return;
        }
    }

    addMessage('outgoing', inputValue.trim() || '(Sin comentarios)', currentStepIndex);
    
    const newData = { ...userData, [step.input as string]: inputValue.trim() };
    setUserData(newData);
    setInputValue('');
    
    handleNextStep(newData);
  };

  const handleOptionClick = (value: string, label: string) => {
    if (isProcessing) return;
    const step = getCurrentStep(currentStepIndex, userData);
    if (!step) return;

    if (step.multiselect) {
        setSelectedOptions(prev => {
            if (prev.includes(value)) return prev.filter(v => v !== value);
            return [...prev, value];
        });
        return;
    }

    setIsProcessing(true);
    addMessage('outgoing', label, currentStepIndex);
    
    const newData = { ...userData, [step.input as string]: value };
    setUserData(newData);
    
    handleNextStep(newData);
  };

  const handleConfirmMultiselect = () => {
      const step = getCurrentStep(currentStepIndex, userData);
      if (!step || !step.input) return;

      setIsProcessing(true);
      const labelText = selectedOptions.length > 0 
          ? `${selectedOptions.length} opciones seleccionadas` 
          : 'Ninguna opción seleccionada';
          
      addMessage('outgoing', labelText, currentStepIndex);
      
      const newData = { ...userData, [step.input]: selectedOptions };
      setUserData(newData);
      
      handleNextStep(newData);
  };

  const handleNextStep = (updatedData: UserData) => {
    const step = getCurrentStep(currentStepIndex, updatedData);
    if (step?.input === 'ci') {
       checkDuplicateCI(updatedData['ci'] as string, updatedData);
       return;
    }
    proceedToNext(updatedData);
  };

  const proceedToNext = (updatedData?: UserData) => {
     // Push current step to history before moving
     setHistory(prev => [...prev, currentStepIndex]);
     
     setIsProcessing(false);
     setTimeout(() => {
         setCurrentStepIndex(prev => prev + 1);
     }, 800);
  };

  const handleBack = () => {
    if (history.length === 0 || isProcessing) return;

    // Clone history
    let newHistory = [...history];
    let targetIndex = -1;

    // Unwind until we find a step with input/options
    while (newHistory.length > 0) {
        const idx = newHistory.pop()!;
        const step = getCurrentStep(idx, userData);
        
        // Check if this step was an interaction point
        if (step && (step.input || step.options)) {
            targetIndex = idx;
            break;
        }
    }
    
    // If we unwound everything and didn't find an input (e.g. only info steps), go to start
    if (targetIndex === -1 && history.length > 0) {
         // Reset to very beginning (Welcome)
         targetIndex = 0;
         newHistory = []; 
    } else if (targetIndex === -1 && history.length === 0) {
         // Already at start
         return; 
    }

    // Apply changes
    setHistory(newHistory);
    setCurrentStepIndex(targetIndex);
    setDisplayedStepIndex(-1); // Critical to trigger useEffect re-render for the "new" old step

    // Cleanup Data
    const targetStep = getCurrentStep(targetIndex, userData);
    if (targetStep?.input) {
        setUserData(prev => {
            const copy = { ...prev };
            delete copy[targetStep.input!];
            return copy;
        });
        setInputValue('');
        setSelectedOptions([]);
    }

    // Cleanup Messages
    // Remove all messages that were generated by steps AFTER or equal to the target step
    // We want to keep everything strictly BEFORE the target step
    setMessages(prev => prev.filter(m => m.stepIndex !== undefined && m.stepIndex < targetIndex));
    
    setIsProcessing(false);
    setIsTyping(false);
  };

  const checkDuplicateCI = (ci: string, data: UserData) => {
    database.ref(`encuestas_2026/${ci}`).get().then((snapshot) => {
      if (snapshot.exists()) {
        addMessage('incoming', `⚠️ El CI ${ci} ya ha completado la encuesta.`, currentStepIndex);
        setIsProcessing(false);
      } else {
        proceedToNext(data);
      }
    }).catch((error) => {
      console.error(error);
      addMessage('incoming', 'Error verificando CI. Intente nuevamente.', currentStepIndex);
      setIsProcessing(false);
    });
  };

  const saveDataToFirebase = () => {
    if (!userData.ci) return;
    const finalData = {
        ...userData,
        timestamp: new Date().toISOString(),
        completado: true
    };

    database.ref(`encuestas_2026/${userData.ci}`).set(finalData)
        .then(() => {
            console.log("Datos guardados. Cerrando conexión.");
            database.goOffline();
        })
        .catch((err) => {
            console.error("Error guardando datos:", err);
        });
  };

  // --- Render Helpers ---
  
  const showInputArea = !isProcessing && activeStep && activeStep.action !== 'saveData';
  const showTextInput = activeStep?.input && currentOptions.length === 0;
  const isBtnDisabled = activeStep?.validation !== 'optional' && !inputValue.trim();

  // Input type logic
  const inputType = activeStep?.validation === 'ci' ? 'tel' : 'text';
  const prompts = activeStep?.prompts || [];

  const formatText = (text: string) => {
      const parts = text.split(/(\*.*?\*)/g);
      return parts.map((part, i) => {
          if (part.startsWith('*') && part.endsWith('*')) {
              return <strong key={i}>{part.slice(1, -1)}</strong>;
          }
          return part;
      });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col shrink-0 z-50 shadow-md">
        <div className="bg-[#ffffff] text-black p-4 flex items-center justify-between">
            <div className="flex items-center">
                <BotAvatar />
                <div>
                  <h3 className="font-bold text-lg">UNEFCO 2026</h3>
                  <p className="text-sm opacity-90">Encuesta</p>
                </div>
            </div>
            {/* Secondary Logo */}
            <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 overflow-hidden shadow-sm bg-white border border-gray-100">
                <img src="https://i.pinimg.com/736x/5b/77/e0/5b77e0c2759b0f22ae2ddb269b8580c6.jpg" alt="Logo Ministerio" className="w-full h-full object-cover" />
            </div>
        </div>
        {/* Bolivian Flag Strip */}
        <div className="h-[6px] w-full flex">
            <div className="flex-1 bg-[#D52B1E]"></div>
            <div className="flex-1 bg-[#F9E300]"></div>
            <div className="flex-1 bg-[#007934]"></div>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-5 pb-5 bg-[#ededec]"
        style={{
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23ededec"/><path d="M0 50 Q25 40 50 50 T100 50" fill="none" stroke="%23d1d1d1" stroke-width="0.5"/></svg>')`,
            backgroundSize: '100px'
        }}
      >
        {messages.map((msg, index) => (
          <div 
            key={msg.id} 
            ref={index === messages.length - 1 ? lastMessageRef : null}
            className={`mb-4 flex items-end ${msg.type === 'incoming' ? 'justify-start' : 'justify-end'} animate-[slideIn_0.2s_ease-out]`}
          >
            {msg.type === 'incoming' && <SmallBotAvatar />}
            <div className={`max-w-[85%] px-4 py-3 rounded-lg text-[15px] leading-relaxed shadow-[0_1px_3px_rgba(0,0,0,0.1)] whitespace-pre-wrap break-words ${
                msg.type === 'incoming' 
                  ? 'bg-white text-[#B59F65] font-bold rounded-bl-[3px]' 
                  : 'bg-[#dcf8c6] text-[#333] rounded-br-[3px]'
            }`}>
                {formatText(msg.text)}
            </div>
          </div>
        ))}

        {/* External Link Display */}
        {activeStep?.externalLink && !isProcessing && (
            <div className="mb-4 flex justify-start animate-[slideIn_0.2s_ease-out]">
                <SmallBotAvatar />
                <a 
                    href={activeStep.externalLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block bg-white rounded-lg overflow-hidden shadow-md max-w-[85%] text-decoration-none hover:bg-gray-50 transition-colors border border-gray-200"
                >
                    <div className="bg-red-600 text-white p-3 flex items-center">
                         <span className="text-2xl mr-2">📄</span>
                         <span className="font-bold text-sm">PDF: Oferta Formativa</span>
                    </div>
                    <div className="p-4">
                        <p className="text-[#333] text-sm font-semibold mb-1">Ver documento completo</p>
                        <p className="text-gray-500 text-xs truncate">{activeStep.externalLink}</p>
                    </div>
                </a>
            </div>
        )}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center p-4 bg-white rounded-[18px] w-fit mb-4 ml-[10px] shadow-sm">
             <div className="w-2 h-2 bg-[#999] rounded-full mr-[2px] animate-typing"></div>
             <div className="w-2 h-2 bg-[#999] rounded-full mr-[2px] animate-typing [animation-delay:0.2s]"></div>
             <div className="w-2 h-2 bg-[#999] rounded-full animate-typing [animation-delay:0.4s]"></div>
          </div>
        )}
        
        {/* Options Display */}
        {showOptionsInput && !isProcessing && (
            <div className="message incoming mb-4 flex flex-col justify-start animate-[slideIn_0.2s_ease-out] max-w-full">
                <div className="flex flex-col gap-2 mt-1 w-full pl-10 pr-2">
                    {currentOptions.map((opt, index) => {
                        const isSelected = selectedOptions.includes(opt.value);
                        const prevOpt = index > 0 ? currentOptions[index - 1] : null;
                        const showHeader = opt.category && (!prevOpt || prevOpt.category !== opt.category);

                        return (
                            <React.Fragment key={opt.value}>
                                {showHeader && (
                                    <div className="w-full py-2 px-1 mt-2 mb-1 sticky top-[-18px] z-10 bg-[#ededec]/95 backdrop-blur-sm">
                                        <h4 className="text-[#122a5e] font-extrabold text-sm uppercase tracking-wider border-b-2 border-[#122a5e] pb-1 shadow-sm">
                                            {opt.category}
                                        </h4>
                                    </div>
                                )}
                                <div 
                                    onClick={() => handleOptionClick(opt.value, opt.label)}
                                    style={{ backgroundColor: !isSelected ? (opt.bgColor || '#ffffff') : undefined }}
                                    className={`w-full p-3 border rounded-xl cursor-pointer text-left transition-all shadow-sm flex flex-row items-start
                                        ${isSelected 
                                            ? 'bg-[#dcf8c6] border-[#25d366] ring-2 ring-[#25d366]/50' 
                                            : 'border-[#e0e0e0] hover:brightness-95'}
                                    `}
                                >
                                    <span className="text-2xl mr-3 mt-1 shrink-0">{opt.icon}</span>
                                    <div className="flex-1">
                                        <span className="text-sm text-black font-bold block mb-1">{opt.label}</span>
                                        {opt.description && (
                                            <span className="text-xs text-black block leading-relaxed whitespace-pre-line border-t border-gray-300 mt-1 pt-1 font-medium">
                                                {opt.description}
                                            </span>
                                        )}
                                    </div>
                                    {activeStep?.multiselect && (
                                        <div className={`w-6 h-6 rounded-full border-2 ml-2 mt-1 shrink-0 flex items-center justify-center
                                            ${isSelected ? 'bg-[#25d366] border-[#25d366]' : 'border-gray-300'}
                                        `}>
                                            {isSelected && <span className="text-white text-xs">✓</span>}
                                        </div>
                                    )}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
                
                {/* Confirm Button for Multiselect */}
                {activeStep?.multiselect && (
                    <div className="pl-10 pr-2 mt-3 w-full">
                        <button 
                            onClick={handleConfirmMultiselect}
                            className="w-full bg-[#122a5e] text-white py-3 rounded-xl font-bold shadow-md active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                        >
                            <span>✅ Confirmar Selección</span>
                            {selectedOptions.length > 0 && (
                                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                                    {selectedOptions.length}
                                </span>
                            )}
                        </button>
                    </div>
                )}
            </div>
        )}

        <div className="h-[130px] w-full shrink-0"></div>
      </div>

      {/* FIXED BOTTOM BAR WITH BACK BUTTON AND INPUT */}
      {showInputArea && (
        <div className="sticky bottom-0 left-0 right-0 z-[101] flex flex-col">
          {/* Prompter (Examples) */}
          {prompts.length > 0 && showTextInput && (
             <div className="bg-white/95 border-t border-[#ddd] p-2 flex overflow-x-auto whitespace-nowrap no-scrollbar">
                <span className="text-[11px] text-[#666] mr-1.5 font-bold uppercase self-center">EJEMPLOS:</span>
                {prompts.map(text => (
                    <span 
                        key={text}
                        onClick={() => {
                            setInputValue(prev => prev ? `${prev}, ${text}` : text);
                            if(inputRef.current) inputRef.current.focus();
                        }}
                        className="inline-block bg-[#e8f5e9] text-[#075e54] px-3.5 py-1.5 rounded-[20px] text-[13px] mr-2 border border-[#c8e6c9] cursor-pointer hover:bg-[#c8e6c9] transition-colors select-none"
                    >
                        {text}
                    </span>
                ))}
             </div>
          )}

          {/* Main Control Bar */}
          <div className="bg-[#f0f0f0] p-2.5 flex items-center gap-2.5 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
             
             {/* BACK BUTTON */}
             {history.length > 0 && (
                 <button 
                    onClick={handleBack}
                    className="h-12 px-5 bg-[#7F7F7F] text-white rounded-full font-bold shadow-sm hover:bg-[#666] active:bg-[#555] active:scale-95 transition-all flex items-center gap-2 shrink-0 group"
                    title="Volver a la pregunta anterior"
                 >
                    <span className="text-xl leading-none mb-0.5 group-hover:-translate-x-0.5 transition-transform">←</span>
                    <span className="text-sm">Atrás</span>
                 </button>
             )}

             {/* TEXT INPUT FIELD - HIDDEN IF OPTIONS ARE SHOWN */}
             {showTextInput ? (
                 <>
                    <input 
                        ref={inputRef}
                        type={inputType}
                        value={inputValue}
                        onChange={(e) => {
                            if (activeStep?.validation === 'ci') {
                                const val = e.target.value.replace(/[^0-9]/g, '');
                                setInputValue(val);
                            } else {
                                setInputValue(e.target.value);
                            }
                        }}
                        onKeyDown={(e) => {
                            if(e.key === 'Enter' && !isBtnDisabled) handleSendMessage();
                        }}
                        placeholder={activeStep?.validation === 'ci' ? 'Ej: 1234567' : 'Escribe aquí...'}
                        autoComplete="off"
                        className="flex-1 p-3 px-4 border-none rounded-[25px] text-base outline-none bg-white shadow-inner"
                        autoFocus
                    />
                    <button 
                        onClick={handleSendMessage}
                        disabled={isBtnDisabled}
                        className="p-3 w-12 h-12 bg-[#B59F65] text-white border-none rounded-full text-lg cursor-pointer shrink-0 disabled:bg-[#ccc] disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow-md active:scale-95"
                    >
                        ➤
                    </button>
                 </>
             ) : (
                /* Placeholder when options are shown to keep the bar layout */
                <div className="flex-1 text-center text-gray-400 text-sm italic py-2">
                    Seleccione una opción arriba...
                </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
}
