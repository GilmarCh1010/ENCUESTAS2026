import { Step } from './types';

export const FLOW: Step[] = [
    // --- BIENVENIDA ---
    { 
        type: 'bot', 
        message: '¡Bienvenida/o a UNEFCO! 🇧🇴\n\nAyúdenos a diseñar la *Propuesta Formativa 2026*. Su opinión es clave.', 
        delay: 1000 
    },

    // --- DATOS PERSONALES ---
    { 
        type: 'bot', 
        message: 'Ingrese su *Número de Carnet de Identidad* (solo números):', 
        delay: 1500, 
        input: 'ci', 
        validation: 'ci' 
    },
    
    // --- DATOS DE LA UNIDAD EDUCATIVA ---
    { 
        type: 'bot', 
        message: '¿En qué *área* ejerce funciones?', 
        delay: 1000, 
        options: [
            { value: 'urbano', label: 'Urbano', icon: '🏙️' }, 
            { value: 'rural', label: 'Rural', icon: '⛰️' }
        ], 
        input: 'area_trabajo', 
        questionLabel: 'Área de Trabajo' 
    },
    { 
        type: 'bot', 
        message: '¿En qué tipo de Unidad Educativa trabaja?', 
        delay: 1000, 
        options: [
            { value: 'fiscal', label: 'Fiscal', icon: '🏫' }, 
            { value: 'privada', label: 'Privada', icon: '🏢' }, 
            { value: 'convenio', label: 'De Convenio', icon: '🤝' }
        ], 
        input: 'tipo_ue', 
        questionLabel: 'Tipo de UE' 
    },
    { 
        type: 'bot', 
        message: 'Escriba el *Nombre de su Unidad Educativa*:', 
        delay: 1000, 
        input: 'nombre_ue', 
        validation: 'text', 
        questionLabel: 'Nombre de la UE' 
    },
    { 
        type: 'bot', 
        message: 'Escriba el *Distrito Educativo* al que pertenece:', 
        delay: 1000, 
        input: 'distrito', 
        validation: 'text', 
        questionLabel: 'Distrito Educativo' 
    },
    { 
        type: 'bot', 
        message: '¿A qué *subsistema* pertenece?', 
        delay: 1000, 
        options: [
            { value: 'Educación regular', label: 'Regular', icon: '📚' }, 
            { value: 'Educación alternativa', label: 'Alt./Esp.', icon: '♿' }, 
            { value: 'Educación superior', label: 'Superior', icon: '🎓' }
        ], 
        input: 'subsistema', 
        questionLabel: 'Subsistema' 
    },

    // --- FUNCIÓN DEL USUARIO ---
    { 
        type: 'bot', 
        message: '¿Cuál es la función que desempeña actualmente?', 
        delay: 1000, 
        options: [
            { value: 'director', label: 'Director/a', icon: '👔' }, 
            { value: 'maestro', label: 'Maestra/o', icon: '👨‍🏫' }, 
            { value: 'administrativo', label: 'Administrativo', icon: '💼' }, 
            { value: 'otro', label: 'Otro', icon: '👤' }
        ], 
        input: 'funcion', 
        questionLabel: 'Función Actual' 
    },

    // --- EVALUACIÓN 2025 ---
    { 
        type: 'bot', 
        message: '¿Conoció la oferta formativa UNEFCO 2025?', 
        delay: 1000, 
        options: [
            { value: 'si', label: 'Sí', icon: '✅' }, 
            { value: 'no', label: 'No', icon: '❌' }
        ], 
        input: 'conoce_oferta_2025', 
        questionLabel: 'Conoce Oferta 2025' 
    },
    // (Condicional: Solo si conoce oferta)
    { 
        type: 'conditional', 
        condition: (data) => data.conoce_oferta_2025 === 'si', 
        ifTrue: { 
            type: 'bot', 
            message: '¿Participó en algún curso formativo?', 
            delay: 1000, 
            options: [
                { value: 'si', label: 'Sí', icon: '🙋' }, 
                { value: 'no', label: 'No', icon: '🙅' }
            ], 
            input: 'participo_2025', 
            questionLabel: 'Participó en 2025' 
        } 
    },
    // (Condicional: Solo si participó)
    { 
        type: 'conditional', 
        condition: (data) => data.participo_2025 === 'si', 
        ifTrue: { 
            type: 'bot', 
            message: (data) => data.funcion === 'administrativo' ? '¿Los contenidos le fueron útiles?' : '¿Los cursos se aplicaron en su práctica educativa?', 
            delay: 1000, 
            options: [
                { value: 'si', label: 'Sí', icon: '👍' }, 
                { value: 'no', label: 'No', icon: '👎' }, 
                { value: 'alguna_vez', label: 'Alguna vez', icon: '🤷' }
            ], 
            input: 'aplicacion_practica', 
            questionLabel: 'Aplicación Práctica' 
        } 
    },
    { 
        type: 'conditional', 
        condition: (data) => data.participo_2025 === 'si', 
        ifTrue: { 
            type: 'bot', 
            message: '¿Estuvo de acuerdo con la metodología?', 
            delay: 1000, 
            options: [
                { value: 'si', label: 'Sí', icon: '✅' }, 
                { value: 'no', label: 'No', icon: '❌' }
            ], 
            input: 'acuerdo_metodologia', 
            questionLabel: 'Acuerdo Metodología' 
        } 
    },
    { 
        type: 'conditional', 
        condition: (data) => data.participo_2025 === 'si', 
        ifTrue: { 
            type: 'bot', 
            message: '¿Cómo evalúa la calidad de contenidos 2025?', 
            delay: 1000, 
            options: [
                { value: 'actualizados', label: 'Excelentes', icon: '⭐' }, 
                { value: 'medianamente', label: 'Regulares', icon: '⚠️' }, 
                { value: 'insuficientes', label: 'Insuficientes', icon: '📉' }
            ], 
            input: 'calidad_contenido', 
            questionLabel: 'Calidad Contenidos' 
        } 
    },

    // --- PROPUESTA 2026 Y SUGERENCIAS ---
    {
        type: 'bot',
        message: 'Para la Gestión 2026: Sugiera temas para **CICLOS y CURSOS** (Omitir si no aplica):',
        delay: 1500,
        input: 'sugerencia_ciclos',
        validation: 'optional',
        questionLabel: 'Sugerencia Ciclos/Cursos',
        prompts: ['Robótica Educativa', 'Inteligencia Artificial', 'Estrategias Lúdicas', 'Neuroeducación', 'Adaptaciones Curriculares']
    },
    {
        type: 'bot',
        message: 'Sugiera temas específicos para **TALLERES** (Cortos y prácticos):',
        delay: 1000,
        input: 'sugerencia_talleres',
        validation: 'optional',
        questionLabel: 'Sugerencia Talleres',
        prompts: ['Planificación Curricular', 'Herramientas Digitales', 'Manejo de Aula', 'PDC', 'Evaluación']
    },
    {
        type: 'bot',
        message: 'Sugiera temáticas para **CONFERENCIAS** magistrales:',
        delay: 1000,
        input: 'sugerencia_conferencias',
        validation: 'optional',
        questionLabel: 'Sugerencia Conferencias',
        prompts: ['Lectura Comprensiva', 'Habilidades Blandas', 'Liderazgo Educativo', 'Ley 070']
    },
    { 
        type: 'bot', 
        message: '¿Qué aspectos deberían mejorar en general?', 
        delay: 1000, 
        input: 'aspectos_mejora', 
        validation: 'optional', 
        questionLabel: 'Aspectos a Mejorar' 
    },
    { 
        type: 'bot', 
        message: 'Comentarios finales:', 
        delay: 1000, 
        input: 'comentarios_finales', 
        validation: 'optional', 
        questionLabel: 'Comentarios Finales' 
    },

    // --- CIERRE ---
    { 
        type: 'bot', 
        message: '¡Muchas gracias! Sus respuestas han sido guardadas.', 
        delay: 1500, 
        action: 'saveData' 
    }
];