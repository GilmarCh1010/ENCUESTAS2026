
import React, { useState, useEffect, useRef } from 'react';
import { ref, set, get, child, goOffline } from 'firebase/database';
import { database } from './firebaseConfig';
import { FLOW } from './constants';
import { Message, Step, UserData } from './types';

// Icons component helpers
const BotAvatar = () => (
  <div className="w-10 h-10 bg-[#25d366] rounded-full mr-4 flex items-center justify-center shrink-0 overflow-hidden">
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
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  
  // Multiselect State
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Correction mode state
  const [isCorrecting, setIsCorrecting] = useState(false);
  const [returnStepIndex, setReturnStepIndex] = useState(0);

  // Refs
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null); // Ref for the specific last message

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
         addMessage('incoming', msgText || '');
         setIsProcessing(false);
         setCurrentStepIndex(prev => prev + 1);
       }, activeStep.delay || 1000);

    } else if (activeStep.message && (activeStep.input || hasOptions)) {
       // Question requiring input
       setIsProcessing(true);
       setIsTyping(true);

       const msgText = typeof activeStep.message === 'function' ? activeStep.message(userData) : activeStep.message;

       setTimeout(() => {
         setIsTyping(false);
         addMessage('incoming', msgText || '');
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
             addMessage('incoming', activeStep.message as string);
             saveDataToFirebase();
             setIsProcessing(false);
        }, activeStep.delay || 1000);
    }

  }, [currentStepIndex, userData, isProcessing, isTyping, displayedStepIndex]); // Dependencies logic

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

    // Logic: If we are showing a list of options (especially long ones), 
    // we want to scroll the *Question* (last message) to the top of the view, 
    // not scroll to the very bottom of the page.
    if (messages.length > 0 && showOptionsInput) {
        const lastMsg = messages[messages.length - 1];
        if (lastMsg.isBot) {
             setTimeout(() => {
                // Scroll the message (question) to the start (top) of the container
                lastMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
             }, 100);
             return;
        }
    }
    
    // Default behavior: scroll to bottom
    scrollToBottom();
  }, [messages, isTyping, showOptionsInput]);

  // --- Logic ---
  const addMessage = (type: 'incoming' | 'outgoing', text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      type,
      text,
      isBot: type === 'incoming'
    }]);
  };

  const handleSendMessage = () => {
    const step = getCurrentStep(currentStepIndex, userData);
    if (!step) return;
    if (!inputValue.trim() && step.validation !== 'optional') return;
    
    // Processing
    setIsProcessing(true);
    addMessage('outgoing', inputValue.trim() || '(Sin comentarios)');
    
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
        // Toggle selection
        setSelectedOptions(prev => {
            if (prev.includes(value)) return prev.filter(v => v !== value);
            return [...prev, value];
        });
        return; // Don't advance yet
    }

    setIsProcessing(true);
    addMessage('outgoing', label);
    
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
          
      addMessage('outgoing', labelText);
      
      // Save array of values
      const newData = { ...userData, [step.input]: selectedOptions };
      setUserData(newData);
      
      handleNextStep(newData);
  };

  const handleNextStep = (updatedData: UserData) => {
    // Check duplicate CI if needed
    const step = getCurrentStep(currentStepIndex, updatedData);
    if (step?.input === 'ci') {
       checkDuplicateCI(updatedData['ci'] as string);
       return; // Logic continues inside checkDuplicateCI
    }

    proceedToNext(updatedData);
  };

  const proceedToNext = (updatedData?: UserData) => {
     if (isCorrecting) {
         setIsCorrecting(false);
         addMessage('incoming', '✅ Dato actualizado.');
         // Return to where we were
         setTimeout(() => {
            setIsProcessing(false);
            setCurrentStepIndex(returnStepIndex);
            setDisplayedStepIndex(-1); // Force re-display of the step we return to
         }, 1000);
     } else {
         setIsProcessing(false);
         // Short delay before processing next step to allow UI to settle
         setTimeout(() => {
             setCurrentStepIndex(prev => prev + 1);
         }, 800);
     }
  };

  const checkDuplicateCI = (ci: string) => {
    const dbRef = ref(database);
    get(child(dbRef, `encuestas_2026/${ci}`)).then((snapshot) => {
      if (snapshot.exists()) {
        addMessage('incoming', `⚠️ El CI ${ci} ya ha completado la encuesta.`);
        setIsProcessing(false);
        // Block progress (remain on current step, or reset input)
      } else {
        proceedToNext();
      }
    }).catch((error) => {
      console.error(error);
      addMessage('incoming', 'Error verificando CI. Intente nuevamente.');
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

    // Save data and then force close connection to save bandwidth
    set(ref(database, `encuestas_2026/${userData.ci}`), finalData)
        .then(() => {
            console.log("Datos guardados. Cerrando conexión.");
            goOffline(database);
        })
        .catch((err) => {
            console.error("Error guardando datos:", err);
        });
  };

  // --- Correction Logic ---
  const handleOpenCorrection = () => {
    setIsCorrectionModalOpen(true);
  };

  const handleSelectCorrection = (index: number) => {
      setIsCorrectionModalOpen(false);
      setIsCorrecting(true);
      setReturnStepIndex(currentStepIndex);
      
      let targetStep = FLOW[index];
      if(targetStep.type === 'conditional' && targetStep.ifTrue) targetStep = targetStep.ifTrue;

      setCurrentStepIndex(index);
      setDisplayedStepIndex(-1); // Force re-display of the correction step
      setSelectedOptions([]); // Clear select
      
      addMessage('incoming', `✏️ Modificando: ${targetStep.questionLabel}.`);
      setIsProcessing(false);
  };

  // --- Render Helpers ---
  
  const showInputArea = !isProcessing && activeStep && (activeStep.input || currentOptions.length > 0) && activeStep.action !== 'saveData';
  const showTextInput = activeStep?.input && currentOptions.length === 0;
  const isBtnDisabled = activeStep?.validation !== 'optional' && !inputValue.trim();

  // Input type logic
  const inputType = activeStep?.validation === 'ci' ? 'tel' : 'text';

  // Prompts logic
  const prompts = activeStep?.prompts || [];

  // Format bold text
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
      <div className="bg-[#122a5e] text-white p-4 flex items-center shadow-md shrink-0 z-50">
        <BotAvatar />
        <div>
          <h3 className="font-bold text-lg">UNEFCO 2026</h3>
          <p className="text-sm opacity-90">Propuesta Formativa</p>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-5 pb-5 bg-[#e5ddd5]"
        style={{
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23e5ddd5"/><path d="M0 50 Q25 40 50 50 T100 50" fill="none" stroke="%23d1d1d1" stroke-width="0.5"/></svg>')`,
            backgroundSize: '100px'
        }}
      >
        {messages.map((msg, index) => (
          <div 
            key={msg.id} 
            // Attach ref to the last message
            ref={index === messages.length - 1 ? lastMessageRef : null}
            className={`mb-4 flex items-end ${msg.type === 'incoming' ? 'justify-start' : 'justify-end'} animate-[slideIn_0.2s_ease-out]`}
          >
            {msg.type === 'incoming' && <SmallBotAvatar />}
            <div className={`max-w-[85%] px-4 py-3 rounded-lg text-[15px] leading-relaxed shadow-[0_1px_3px_rgba(0,0,0,0.1)] whitespace-pre-wrap break-words ${
                msg.type === 'incoming' 
                  ? 'bg-white text-[#333] rounded-bl-[3px]' 
                  : 'bg-[#dcf8c6] text-[#333] rounded-br-[3px]'
            }`}>
                {formatText(msg.text)}
            </div>
          </div>
        ))}

        {/* External Link Display (Google Drive) */}
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
                        // Header logic: show if first item OR if category changes
                        const prevOpt = index > 0 ? currentOptions[index - 1] : null;
                        const showHeader = opt.category && (!prevOpt || prevOpt.category !== opt.category);

                        return (
                            <React.Fragment key={opt.value}>
                                {showHeader && (
                                    <div className="w-full py-2 px-1 mt-2 mb-1 sticky top-[-18px] z-10 bg-[#e5ddd5]/95 backdrop-blur-sm">
                                        <h4 className="text-[#122a5e] font-extrabold text-sm uppercase tracking-wider border-b-2 border-[#122a5e] pb-1 shadow-sm">
                                            {opt.category}
                                        </h4>
                                    </div>
                                )}
                                <div 
                                    onClick={() => handleOptionClick(opt.value, opt.label)}
                                    className={`w-full p-3 border rounded-xl cursor-pointer text-left transition-all shadow-sm flex flex-row items-start
                                        ${isSelected 
                                            ? 'bg-[#dcf8c6] border-[#25d366] ring-2 ring-[#25d366]/50' 
                                            : 'bg-white border-[#e0e0e0] hover:bg-gray-50'}
                                    `}
                                >
                                    <span className="text-2xl mr-3 mt-1 shrink-0">{opt.icon}</span>
                                    <div className="flex-1">
                                        <span className="text-sm text-[#333] font-bold block mb-1">{opt.label}</span>
                                        {opt.description && (
                                            <span className="text-xs text-gray-600 block leading-relaxed whitespace-pre-line border-t border-gray-100 mt-1 pt-1">
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

      {/* Input Area */}
      {showInputArea && showTextInput && (
        <div className="sticky bottom-0 left-0 right-0 z-[101] flex flex-col">
          {/* Prompter */}
          {prompts.length > 0 && (
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

          <div className="bg-[#f0f0f0] p-2.5 flex items-center gap-2.5 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
             {currentStepIndex > 1 && (
                 <button 
                    onClick={handleOpenCorrection}
                    className="p-3 w-12 h-12 bg-[#075e54] text-white border-none rounded-full text-lg cursor-pointer shrink-0 flex items-center justify-center hover:opacity-90"
                 >
                    ✏️
                 </button>
             )}
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
                className="flex-1 p-3 px-4 border-none rounded-[25px] text-base outline-none"
                autoFocus
             />
             <button 
                onClick={handleSendMessage}
                disabled={isBtnDisabled}
                className="p-3 w-12 h-12 bg-[#111827] text-white border-none rounded-full text-lg cursor-pointer shrink-0 disabled:bg-[#ccc] disabled:cursor-not-allowed flex items-center justify-center transition-colors"
             >
                ➤
             </button>
          </div>
        </div>
      )}
      
      {/* Correction Modal */}
      {isCorrectionModalOpen && (
          <div className="fixed inset-0 z-[200] bg-black/60 flex justify-center items-center">
              <div className="bg-[#fefefe] mx-auto p-5 border border-[#888] w-[90%] max-w-[500px] rounded-lg max-h-[80vh] flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-bold">¿Qué respuesta quieres corregir?</h4>
                      <span onClick={() => setIsCorrectionModalOpen(false)} className="text-[#aaa] text-3xl font-bold cursor-pointer hover:text-black">&times;</span>
                  </div>
                  <ul className="list-none p-0 overflow-y-auto">
                      {FLOW.map((step, index) => {
                          if (index >= currentStepIndex) return null;
                          
                          let s = step;
                          if (s.type === 'conditional') {
                             if (s.condition && s.condition(userData)) {
                                if (s.ifTrue) s = s.ifTrue;
                             } else {
                                 return null;
                             }
                          }
                          
                          // Only show steps with question labels and stored data
                          if (s.questionLabel && s.input && userData[s.input]) {
                              // Handle display for arrays (multiselect)
                              const displayVal = Array.isArray(userData[s.input]) 
                                  ? (userData[s.input] as string[]).join(', ')
                                  : userData[s.input];

                              return (
                                  <li 
                                    key={index}
                                    onClick={() => handleSelectCorrection(index)}
                                    className="p-3 border-b border-[#ddd] cursor-pointer hover:bg-gray-100"
                                  >
                                      <strong>{s.questionLabel}:</strong> <span className="text-sm text-gray-600 block truncate">{displayVal}</span>
                                  </li>
                              );
                          }
                          return null;
                      })}
                  </ul>
              </div>
          </div>
      )}
    </div>
  );
}
