import { Step, Option, UserData } from './types';

// --- DATA: CONFERENCIAS (PARA TODOS LOS SUBSISTEMAS) ---
const COMMON_CONFERENCES: Option[] = [
    { 
        value: 'conf_gestion_educativa_2025', 
        label: 'Gestión Educativa 2025 en el SEP según lineamientos de la R.M. 0001/2025', 
        //description: 'Gestión Educativa 2025 en el SEP según lineamientos de la R.M. 0001/2025.', 
        icon: '📋' 
    },
    { 
        value: 'conf_lectura_comprensiva', 
        label: 'Fortaleciendo la lectura comprensiva: Estrategias eficaces para desarrollar habilidades lectoras en todos los niveles educativos.', 
        //description: 'Estrategias eficaces para desarrollar habilidades lectoras en todos los niveles educativos.', 
        icon: '📚' 
    },
    { 
        value: 'conf_ia_educativa', 
        label: 'Aplicación de la Inteligencia Artificial en el ámbito educativo', 
        //description: 'Aplicación de la Inteligencia Artificial en el ámbito educativo.', 
        icon: '🤖' 
    },
    { 
        value: 'conf_habilidades_blandas', 
        label: 'Desarrollo de habilidades blandas para fortalecer el razonamiento lógico y comprensión lectora en niños y niñas', 
        //description: 'Desarrollo de habilidades blandas para fortalecer el razonamiento lógico y comprensión lectora en niños y niñas.', 
        icon: '💡' 
    },
    { 
        value: 'conf_paradigmas_bicentenario', 
        label: 'Paradigmas y desafíos de la Educación en el Bicentenario', 
        //description: 'Paradigmas y desafíos de la Educación en el Bicentenario.', 
        icon: '🎯' 
    },
    { 
        value: 'conf_orientacion_vocacional', 
        label: 'Importancia de la Orientación Vocacional y Profesional en el SEP', 
        //description: 'Importancia de la Orientación Vocacional y Profesional en el SEP.', 
        icon: '🎓' 
    },
    { 
        value: 'conf_internacional', 
        label: 'Conferencia Internacional', 
        //description: 'Conferencia Internacional.', 
        icon: '🌍' 
    },
    { 
        value: 'conf_andragogia', 
        label: 'Andragogía: Estrategias para la educación de jóvenes y adultos en Educación Alternativa y Superior.', 
        //description: 'Estrategias para la educación de jóvenes y adultos en Educación Alternativa y Superior.', 
        icon: '👥' 
    },
    { 
        value: 'conf_educacion_inclusiva', 
        label: 'Estrategias para la educación inclusiva: Diseño y aplicación de metodologías diversas en el aula.', 
        //description: 'Diseño y aplicación de metodologías diversas en el aula.', 
        icon: '🤝' 
    }
];

// --- DATA: TALLERES (POR SUBSISTEMA) ---
const SPECIFIC_WORKSHOPS: Record<string, Option[]> = {
    'inicial': [
        { value: 'taller_planificacion_curricular', label: 'Taller: Planificación curricular para el nivel inicial, bajo lineamientos de la actualización curricular', icon: '📋' },
        { value: 'taller_evaluacion_curricular', label: 'Taller: Lineamientos de evaluación curricular en los procesos educativos', icon: '📊' },
        { value: 'taller_herramientas_tecnologicas', label: 'Taller: Herramientas tecnológicas e inteligencia artificial en los procesos educativos', icon: '🤖' },
        { value: 'taller_herramientas_digitales_admin', label: 'Taller: Herramientas digitales enfocadas al ámbito de administración educativa', icon: '💼' },
        { value: 'taller_registro_pedagogico', label: 'Taller: Manejo de registro pedagógico automatizado', icon: '🔄' },
        { value: 'taller_gestion_academica', label: 'Taller: Manejo de instrumentos y herramientas en la gestión académica y administrativa', icon: '🛠️' },
        { value: 'taller_habilidades_socioemocionales', label: 'Taller: Habilidades socioemocionales en los procesos educativos', icon: '❤️' },
        { value: 'taller_prevencion_trata', label: 'Taller: Prevención de la trata de personas en instituciones educativas', icon: '🛡️' }
    ],
    'primaria': [
        { value: 'taller_planificacion_curricular_primario', label: 'Taller: Planificación curricular para el nivel primario, bajo lineamientos de la actualización curricular', icon: '📋' },
        { value: 'taller_evaluacion_curricular_primario', label: 'Taller: Evaluación curricular en los procesos educativos', icon: '📊' },
        { value: 'taller_herramientas_tecnologicas_primario', label: 'Taller: Herramientas tecnológicas e inteligencia artificial en los procesos educativos', icon: '🤖' },
        { value: 'taller_herramientas_digitales_admin_primario', label: 'Taller: Herramientas digitales enfocadas al ámbito de administración educativa', icon: '💼' },
        { value: 'taller_registro_pedagogico_primario', label: 'Taller: Manejo de registro pedagógico automatizado', icon: '🔄' },
        { value: 'taller_gestion_academica_primario', label: 'Taller: Manejo de instrumentos y herramientas en la gestión académica y administrativa', icon: '🛠️' },
        { value: 'taller_habilidades_socioemocionales_primario', label: 'Taller: Habilidades socioemocionales en los procesos educativos', icon: '❤️' },
        { value: 'taller_prevencion_trata_primario', label: 'Taller: Prevención de la trata de personas en instituciones educativas', icon: '🛡️' }
    ],
    'secundaria': [
        { value: 'taller_planificacion_curricular_secundario', label: 'Taller: Planificación curricular para el nivel secundario, bajo lineamientos de la actualización curricular', icon: '📋' },
        { value: 'taller_evaluacion_curricular_secundario', label: 'Taller: Evaluación curricular en los procesos educativos', icon: '📊' },
        { value: 'taller_herramientas_tecnologicas_secundario', label: 'Taller: Herramientas tecnológicas e inteligencia artificial en los procesos educativos', icon: '🤖' },
        { value: 'taller_herramientas_digitales_admin_secundario', label: 'Taller: Herramientas digitales enfocadas al ámbito de administración educativa', icon: '💼' },
        { value: 'taller_registro_pedagogico_secundario', label: 'Taller: Manejo de registro pedagógico automatizado', icon: '🔄' },
        { value: 'taller_gestion_academica_secundario', label: 'Taller: Manejo de instrumentos y herramientas en la gestión académica y administrativa', icon: '🛠️' },
        { value: 'taller_habilidades_socioemocionales_secundario', label: 'Taller: Habilidades socioemocionales en los procesos educativos', icon: '❤️' },
        { value: 'taller_participacion_activa_secundario', label: 'Taller: Estrategias para promover la participación activa en el aula', icon: '👥' },
        { value: 'taller_prevencion_trata_secundario', label: 'Taller: Prevención de la trata de personas en instituciones educativas', icon: '🛡️' }
    ],
    'alternativa': [
        { value: 'taller_planificacion_alternativa', label: 'Taller: Planificación curricular para educación alternativa, bajo lineamientos de la actualización curricular', icon: '📋' },
        { value: 'taller_evaluacion_curricular_alternativa', label: 'Taller: Evaluación curricular en los procesos educativos', icon: '📊' },
        { value: 'taller_planificacion_especial', label: 'Taller: Planificación curricular para educación especial, bajo lineamientos de la actualización curricular', icon: '📋' },
        { value: 'taller_herramientas_tecnologicas_alternativa', label: 'Taller: Herramientas tecnológicas e inteligencia artificial en los procesos educativos', icon: '🤖' },
        { value: 'taller_herramientas_digitales_admin_alternativa', label: 'Taller: Herramientas digitales enfocadas al ámbito de administración educativa', icon: '💼' },
        { value: 'taller_registro_pedagogico_alternativa', label: 'Taller: Manejo de registro pedagógico automatizado', icon: '🔄' },
        { value: 'taller_gestion_academica_alternativa', label: 'Taller: Manejo de instrumentos y herramientas en la gestión académica y administrativa', icon: '🛠️' },
        { value: 'taller_habilidades_socioemocionales_alternativa', label: 'Taller: Habilidades socioemocionales en los procesos educativos', icon: '❤️' },
        { value: 'taller_prevencion_trata_alternativa', label: 'Taller: Prevención de la trata de personas en instituciones educativas', icon: '🛡️' }
    ],
    'especial': [
        { value: 'taller_planificacion_alternativa', label: 'Taller: Planificación curricular para educación alternativa, bajo lineamientos de la actualización curricular', icon: '📋' },
        { value: 'taller_evaluacion_curricular_alternativa', label: 'Taller: Evaluación curricular en los procesos educativos', icon: '📊' },
        { value: 'taller_planificacion_especial', label: 'Taller: Planificación curricular para educación especial, bajo lineamientos de la actualización curricular', icon: '📋' },
        { value: 'taller_herramientas_tecnologicas_alternativa', label: 'Taller: Herramientas tecnológicas e inteligencia artificial en los procesos educativos', icon: '🤖' },
        { value: 'taller_herramientas_digitales_admin_alternativa', label: 'Taller: Herramientas digitales enfocadas al ámbito de administración educativa', icon: '💼' },
        { value: 'taller_registro_pedagogico_alternativa', label: 'Taller: Manejo de registro pedagógico automatizado', icon: '🔄' },
        { value: 'taller_gestion_academica_alternativa', label: 'Taller: Manejo de instrumentos y herramientas en la gestión académica y administrativa', icon: '🛠️' },
        { value: 'taller_habilidades_socioemocionales_alternativa', label: 'Taller: Habilidades socioemocionales en los procesos educativos', icon: '❤️' },
        { value: 'taller_prevencion_trata_alternativa', label: 'Taller: Prevención de la trata de personas en instituciones educativas', icon: '🛡️' }
    ],
    'superior': [
        { value: 'taller_planificacion_superior_esfm', label: 'Taller: Planificación curricular para educación superior - ESFMs/UAS', icon: '📋' },
        { value: 'taller_planificacion_superior_itt', label: 'Taller: Planificación curricular para Educación Superior - Institutos Técnicos Tecnológicos', icon: '📋' },
        { value: 'taller_herramientas_tecnologicas_superior', label: 'Taller: Herramientas tecnológicas e inteligencia artificial en los procesos educativos', icon: '🤖' },
        { value: 'taller_herramientas_digitales_admin_superior', label: 'Taller: Herramientas digitales enfocadas al ámbito de administración educativa', icon: '💼' },
        { value: 'taller_registro_pedagogico_superior', label: 'Taller: Manejo de registro pedagógico automatizado', icon: '🔄' },
        { value: 'taller_gestion_academica_superior', label: 'Taller: Manejo de instrumentos y herramientas en la gestión académica y administrativa', icon: '🛠️' },
        { value: 'taller_evaluacion_curricular_superior', label: 'Taller: Evaluación curricular en los procesos educativos', icon: '📊' },
        { value: 'taller_habilidades_socioemocionales_superior', label: 'Taller: Habilidades socioemocionales en los procesos educativos', icon: '❤️' },
        { value: 'taller_prevencion_trata_superior', label: 'Taller: Prevención de la trata de personas en instituciones educativas', icon: '🛡️' }
    ]
};


// --- DATA: OFERTA FORMATIVA COMPLETA (CICLOS/CURSOS) ---
const COMMON_CYCLES: Option[] = [
    { 
        value: 'alfabetizacion_digital', 
        label: 'Ciclo: Alfabetización Digital para la Transformación Educativa', 
        description: '• Competencias digitales para un aula dinámica e inclusiva.\n• Prácticas de alfabetización digital en educación.\n• Ética y seguridad en el entorno digital.',
        icon: '💻' 
    },
    { 
        value: 'habilidades_digitales', 
        label: 'Ciclo: Habilidades Digitales para las Prácticas Pedagógicas', 
        description: '• Tecnologías aplicadas al ámbito educativo.\n• Creación de contenidos multimedia para la educación.\n• Gestión de plataformas y entornos virtuales de aprendizaje.',
        icon: '🖱️' 
    },
    { 
        value: 'ciudadania_digital', 
        label: 'Ciclo: Educación en Ciudadanía Digital', 
        description: '• Construcción de una ciudadanía digital responsable.\n• Herramientas digitales para la educación.\n• Economía digital.',
        icon: '🌐' 
    },
    { 
        value: 'ia_recursos', 
        label: 'Ciclo: Recursos Educativos con IA para el Trabajo Docente', 
        description: '• Aplicaciones prácticas de la IA para el trabajo docente.\n• Producción recursos educativos: audio, imágenes y video mediante IA.\n• Automatización y optimización de tareas docentes con IA.',
        icon: '🤖' 
    },
    { 
        value: 'gamificacion', 
        label: 'Ciclo: Gamificación e Innovación Educativa', 
        description: '• Uso y aplicación de herramientas y recursos digitales para la gamificación.\n• Diseño de experiencias gamificadas en el aula.\n• Evaluación y seguimiento en el aula gamificada.',
        icon: '🎮' 
    },
    { 
        value: 'lectura_escritura_era_tec', 
        label: 'Ciclo: Estrategias de Lectura y Escritura en la Era Tecnológica', 
        description: '• Tecnologías para mejorar las habilidades de lectura y escritura.\n• Recursos para la lectura y la escritura de géneros discursivos digitales.\n• Técnicas y recursos para el desarrollo de habilidades lectoras en el ámbito profesional.',
        icon: '📖' 
    },
    { 
        value: 'plegado_papel', 
        label: 'Ciclo: Plegado de Papel como Recurso Didáctico', 
        description: '• Origami para el desarrollo de la motricidad fina.\n• Kirigami para el desarrollo de la psicomotricidad/motricidad.\n• Papercraft para la composición creativa y artística.',
        icon: '📄' 
    },
    { 
        value: 'planificacion_educativa', 
        label: 'Ciclo: Herramientas de Planificación Educativa', 
        description: '• Diseño curricular dentro del PSP, PAT y PDC.\n• Instrumentos de evaluación para la concreción curricular.\n• Adaptaciones curriculares y apoyo a la diversidad educativa.',
        icon: '📅' 
    },
    { 
        value: 'habilidades_socioemocionales', 
        label: 'Ciclo: Habilidades Socioemocionales en Procesos Educativos', 
        description: '• El desarrollo socioemocional en el mapa curricular y el logro educativo.\n• Estrategias para desarrollar y fortalecer habilidades en las dimensiones cognitiva e instrumental.\n• Estrategias para desarrollar y fortalecer habilidades en las dimensiones individual y la social.',
        icon: '❤️' 
    },
    { 
        value: 'adaptaciones_curriculares', 
        label: 'Ciclo: Adaptaciones Curriculares en Procesos Educativos', 
        description: '• Lineamientos de la escuela inclusiva.\n• Detección para la intervención educativa.\n• Adaptaciones curriculares.',
        icon: '🧩' 
    },
    { 
        value: 'dificultades_aprendizaje', 
        label: 'Ciclo: Estrategias para Detección y Atención a Dificultades en el Aprendizaje', 
        description: '• Caracterización y detección de dificultades en el aprendizaje.\n• Estrategias de atención a estudiantes con dificultades en el aprendizaje.\n• Herramientas y recursos para el seguimiento y evaluación.',
        icon: '⚠️' 
    },
    { 
        value: 'tea', 
        label: 'Ciclo: Estrategias para la Detección y Atención a Estudiantes con Condición o Trastorno del Espectro Autista (TEA)', 
        description: '• Caracterización y detección del trastorno del espectro autista.\n• Estrategias metodológicas y adaptaciones curriculares para la atención de estudiantes con TEA.\n• Apoyo familia - escuela y trabajo en red para la atención de estudiantes con TEA.',
        icon: '🧩' 
    },
    { 
        value: 'discapacidad_visual', 
        label: 'Ciclo: Estrategias para Inclusión de Estudiantes con Discapacidad Visual', 
        description: '• Comprensión de la discapacidad visual.\n• Estrategias metodológicas para la inclusión de estudiantes con discapacidad visual.\n• Herramientas y recursos para el seguimiento y evaluación.',
        icon: '👁️' 
    },
    { 
        value: 'discapacidad_auditiva', 
        label: 'Ciclo: Estrategias para Inclusión de Estudiantes con Discapacidad Auditiva', 
        description: '• Comprensión a la discapacidad auditiva.\n• Estrategias metodológicas para la inclusión de estudiantes con discapacidad auditiva.\n• Herramientas y recursos para el seguimiento y evaluación.',
        icon: '👂' 
    },
    { 
        value: 'lsb', 
        label: 'Ciclo: Lengua de Señas Boliviana para Maestros, Maestras y otros Actores del SEP', 
        description: '• Comunidad sorda y la lengua de señas boliviana.\n• Desarrollo de habilidades comunicativas en lengua de señas boliviana.\n• Habilidades psicosociales, expresión corporal y facial como componentes de la LSB.',
        icon: '🤟' 
    },
    { 
        value: 'talento_extraordinario', 
        label: 'Ciclo: Atención Integral a Estudiantes con Talento Extraordinario', 
        description: '• Caracterización y detección de estudiantes con talento extraordinario.\n• Adaptaciones curriculares y métodos de enseñanza.\n• Estrategias de integración escolar y familiar.',
        icon: '🌟' 
    },
    { 
        value: 'despatriarcalizadora', 
        label: 'Ciclo: Educación Despatriarcalizadora para una Vida Libre de Violencia', 
        description: '• Herramientas de diagnóstico desde la perspectiva de despatriarcalización.\n• Uso de estrategias metodológicas para la despatriarcalización.\n• Elaboración de materiales con perspectiva no sexista.',
        icon: '⚖️' 
    },
    { 
        value: 'sexualidad_integral', 
        label: 'Ciclo: Educación Integral en Sexualidad', 
        description: '• Sexualidad integral, derechos sexuales y derechos reproductivos.\n• Prevención del embarazo en adolescentes y jóvenes.\n• Prevención de ITS y VIH/SIDA.',
        icon: '🚻' 
    },
    { 
        value: 'herramientas_sexualidad', 
        label: 'Ciclo: Herramientas para la Educación Integral en Sexualidad', 
        description: '• Transformando prácticas desde la perspectiva de la EIS.\n• Técnicas grupales para el trabajo comunitario en la EIS.\n• Técnicas vivenciales para las prácticas pedagógicas.',
        icon: '🛠️' 
    },
    { 
        value: 'convivencia_pacifica', 
        label: 'Ciclo: Promoviendo la Convivencia Pacífica y Armónica en el Ámbito Educativo', 
        description: '• Fundamentos para la convivencia armónica y pacífica.\n• Estrategias pedagógicas para la convivencia armónica y pacífica.\n• Procedimientos para la detección, actuación y derivación de situaciones de violencia.',
        icon: '🕊️' 
    },
    { 
        value: 'practicas_restaurativas', 
        label: 'Ciclo: Prácticas Restaurativas para Resolución de Conflictos y una Vida Libre de Violencia', 
        description: '• Enfoque restaurativo dentro del sistema educativo.\n• De la justicia restaurativa a las prácticas educativas restaurativas.\n• Caja de herramientas de las prácticas restaurativas.',
        icon: '🤝' 
    },
    { 
        value: 'violencia_ambito_educativo', 
        label: 'Ciclo: Prevención, Detección y Actuación y Derivación de la Violencia en el Ámbito Educativo', 
        description: '• Protección integral de niñas, niños y adolescentes en situaciones de violencia.\n• Marco normativo e instrumentos para la detección, actuación y derivación.\n• Procedimientos para la referencia y contra referencia.',
        icon: '🛡️' 
    },
    { 
        value: 'madre_tierra', 
        label: 'Ciclo: Educación en Convivencia con la Madre Tierra y Salud Comunitaria', 
        description: '• Madre tierra y medio ambiente.\n• Cambio climático y su relación con la madre tierra.\n• Convivencia con la madre tierra y salud comunitaria.',
        icon: '🌍' 
    },
    { 
        value: 'alimentacion_nutritiva', 
        label: 'Ciclo: Construyendo Hábitos de Alimentación Nutritiva en la Comunidad Educativa', 
        description: '• La alimentación nutritiva y su relación con el proceso de aprendizaje.\n• La alimentación para la prevención de enfermedades y una vida saludable.\n• Estrategias para fomentar hábitos alimenticios saludables.',
        icon: '🍎' 
    },
    { 
        value: 'ciclo_liderazgo_planificacion_gestion_mescp', 
        label: 'Ciclo: LIDERAZGO, PLANIFICACIÓN Y GESTIÓN ESTRATÉGICA BAJO EL MESCP', 
        description: '• Liderazgo estratégico distrital para la implementación del MESCP.\n• Planificación estratégica y evaluación participativa en el MESCP.\n• Gestión pedagógica inclusiva, plurilingüe y despatriarcalizadora para la aplicación del MESCP.',
        icon: '📊' 
    },
    { 
        value: 'facilitadores', 
        label: 'Ciclo: Estrategias para Fortalecer Habilidades de Facilitadores', 
        description: '• La formación continua de maestras y maestros en el SEP.\n• Estrategias y herramientas de formación continua.\n• Seguimiento, acompañamiento y evaluación de acciones formativas.',
        icon: '🎤' 
    },
    { 
        value: 'ingles', 
        label: 'Ciclo: Comunicación Oral y Escrita en Lengua Extranjera (Inglés)', 
        description: '• Comunicación oral y escrita nivel básico - Inglés 1.\n• Comunicación oral y escrita nivel básico - Inglés 2.\n• Comunicación oral y escrita nivel básico - Inglés 3.\n• Comunicación oral y escrita nivel básico - Inglés 4.',
        icon: '🇬🇧' 
    }
];

const SPECIFIC_CYCLES: Record<string, Option[]> = {
    'inicial': [
        { 
            value: 'instrumentos_inicial', 
            label: 'Ciclo: Instrumentos Pedagógicos para Dificultades en Inicial', 
            description: '• Herramientas y estrategias para la evaluación diagnóstica.\n• Recursos pedagógicos para la atención de dificultades en el aprendizaje.\n• Adaptaciones curriculares y apoyo a la diversidad en educación inicial.',
            icon: '🧸' 
        },
        { 
            value: 'dinamizando_no_escolarizada', 
            label: 'Ciclo: Dinamizando la Educación Inicial No Escolarizada', 
            description: '• Contexto social y cultural de la primera infancia.\n• Factores que inciden en el desarrollo del niño menor a 4 años.\n• Desarrollo integral y aprendizaje temprano.\n• Estrategias para la atención en la diversidad.',
            icon: '🏠' 
        },
        { 
            value: 'gestores_inicial', 
            label: 'Ciclo: Gestores Educativos para Educación Inicial No Escolarizada', 
            description: '• Características de los contextos educativos no escolarizados.\n• Estrategias de dinamización para gestores.\n• Trabajo con familias y comunidades.',
            icon: '📋' 
        },
        { 
            value: 'desarrollo_integral', 
            label: 'Ciclo: Fortaleciendo el Desarrollo Integral en Inicial', 
            description: '• Desarrollo integral del lenguaje.\n• Estimulando el desarrollo cognitivo y psicomotor.\n• Educando en y para el desarrollo socioafectivo y autonomía.',
            icon: '👶' 
        },
        { 
            value: 'lectura_no_convencional', 
            label: 'Ciclo: Acercamiento a la Lectura y Escritura No Convencional', 
            description: '• Desarrollo de la conciencia fonológica.\n• Desarrollo de procesos en la comprensión lectora.\n• Grafomotricidad para la lectura y escritura.',
            icon: '🖍️' 
        },
        { 
            value: 'cognitivo_inicial', 
            label: 'Ciclo: Estrategias para Estimular Desarrollo Cognitivo en Educación Inicial', 
            description: '• Juegos y estrategias lúdicas para potenciar el aprendizaje.\n• Estrategias prácticas para estimular la atención, memoria y razonamiento lógico.\n• Neurociencia aplicada al aprendizaje inicial escolarizada.',
            icon: '🧠' 
        }
    ],
    'primaria': [        
        { 
            value: 'ciclo_robotica_primaria', 
            label: 'Ciclo: Electrónica y programación en robótica para educación primaria', 
            description: '• Mecánica y electrónica básica.\n• Lógica de programación con Arduino.\n• Proyectos robóticos para la innovación en el aula.',
            icon: '🤖' 
        },
        { 
            value: 'ciclo_ajedrez_educativo_primaria', 
            label: 'Ciclo: Ajedrez educativo competitivo para educación primaria', 
            description: '• Ajedrez educativo y su didáctica.\n• Técnicas y tácticas de entrenamiento en ajedrez.\n• Nociones de organización de torneos y arbitraje.',
            icon: '♟️' 
        },
        { 
            value: 'ciclo_ia_primaria', 
            label: 'Ciclo: Uso de herramientas tecnológicas e inteligencia artificial para educación primaria', 
            description: '• Manejo de aplicaciones y plataformas educativas con inteligencia artificial.\n• Herramientas multimedia con IA para el trabajo de contenidos curriculares.\n• Uso de herramientas tecnológicas con IA para la evaluación curricular.',
            icon: '🤖' 
        },
        { 
            value: 'ciclo_razonamiento_matematico_primaria', 
            label: 'Ciclo: Estrategias para fortalecer el razonamiento lógico matemático en educación primaria', 
            description: '• Desarrollo del pensamiento concreto – abstracto.\n• Estrategias lúdicas y gamificación.\n• Operaciones de cálculo.',
            icon: '🔢' 
        },
        { 
            value: 'ciclo_lectura_escritura_comunicativa', 
            label: 'Ciclo: Lectura y escritura con enfoque comunicativo dialógico y textual', 
            description: '• Desarrollo de la oralidad para la interacción comunicativa en la comunidad.\n• Didáctica de la lectura textual, inferencial o deductiva y crítica.\n• Escritura creativa para la producción de textos.',
            icon: '📝' 
        },
        { 
            value: 'ciclo_comprension_lector_inclusiva', 
            label: 'Ciclo: Fortalecimiento de la comprensión lectora con enfoque intracultural, intercultural, plurilingüe y despatriarcalizador', 
            description: '• Redescubriendo la lectura como base del conocimiento.\n• Diagnóstico y estrategias para la mejora de la comprensión lectora.\n• La lectura como herramienta para la despatriarcalización y profundización de la educación intra, intercultural y plurilingüe.',
            icon: '📖' 
        },
        { 
            value: 'ciclo_neurodiversidad_aula', 
            label: 'Ciclo: Neurodiversidad en el aula: estrategias para el aprendizaje', 
            description: '• Comprendiendo la neurodiversidad: fundamentos y enfoques en el aula.\n• Metodologías activas para la atención a estudiantes neurodiversos.\n• Estrategias de evaluación y seguimiento en estudiantes neurodiversos.',
            icon: '🧠' 
        },
        { 
            value: 'ciclo_produccion_material_educativo', 
            label: 'Ciclo: Fortalecimiento a la producción intelectual de material educativo en primaria', 
            description: '• La comunicación y la producción escrita en educación.\n• Estrategias para la producción de materiales educativos.\n• Procedimiento para la publicación de libros.',
            icon: '📚' 
        },
        { 
            value: 'ciclo_estrategias_aula_multigrado', 
            label: 'Ciclo: Estrategias para trabajo en aula multigrado', 
            description: '• Planificación curricular diferenciada.\n• Estrategias para la atención y trabajo colaborativo.\n• Evaluación formativa y continua.',
            icon: '👥' 
        },
        { 
            value: 'ciclo_capacidades_educacion_fisica', 
            label: 'Ciclo: Desarrollo de capacidades en el área de educación física y deportes en aulas multigrado', 
            description: '• Medidas antropométricas y gimnasia educativa.\n• Deportes individuales, grupales y de mesa.\n• Equilibrio estático, dinámico y gimnasia rítmica.',
            icon: '⚽' 
        },
        { 
            value: 'ciclo_capacidades_educacion_musical', 
            label: 'Ciclo: Desarrollo de capacidades en el área de educación musical en aulas multigrado', 
            description: '• Expresión vocal y canto.\n• Taller de instrumentos originarios y folclóricos.\n• Música de conjunto y ensamble.',
            icon: '🎵' 
        },
        { 
            value: 'ciclo_capacidades_artes_plasticas', 
            label: 'Ciclo: Desarrollo de capacidades en las áreas de artes plásticas y técnica tecnológica en aulas multigrado', 
            description: '• Estrategias en dibujo artístico técnico en el área de artes plásticas y visuales.\n• Técnicas de pintura, escultura y manualidades en el área de artes plásticas y visuales.\n• Herramientas TIC para el área técnica tecnológica.',
            icon: '🎨' 
        }
    ],
    'secundaria': [        
        { 
            value: 'ciclo_aprendizaje_proyectos_secundaria', 
            label: 'Ciclo: Aprendizaje Basado en Proyectos para Educación Secundaria', 
            description: '• Diseño y elaboración de proyectos educativos en educación secundaria.\n• Estrategias para la implementación del aprendizaje basado en proyectos.\n• Implementación y evaluación del aprendizaje basado en proyectos.',
            icon: '📐' 
        },
        { 
            value: 'ciclo_ia_matematica_secundaria', 
            label: 'Ciclo: Uso de Herramientas Tecnológicas e Inteligencia Artificial Aplicadas al Área de Matemática', 
            description: '• Uso de herramientas tecnológicas para la presentación de contenidos interactivos para el área de matemática.\n• Manejo de la tecnología e inteligencia artificial para el empoderamiento y la participación TEP, enfocada al área de matemática.\n• Uso de herramientas tecnológicas para la evaluación interactiva en el área de matemática.',
            icon: '🤖' 
        },
        { 
            value: 'ciclo_ia_fisica_secundaria', 
            label: 'Ciclo: Uso de Herramientas Tecnológicas e Inteligencia Artificial Aplicadas en el Área de Física', 
            description: '• Uso de herramientas tecnológicas para la presentación de contenidos interactivos para el área de física.\n• Manejo de la tecnología e inteligencia artificial para el empoderamiento y la participación TEP, enfocada al área de física.\n• Uso de herramientas tecnológicas para la evaluación interactiva en el área de física.',
            icon: '🤖' 
        },
        { 
            value: 'ciclo_ia_quimica_secundaria', 
            label: 'Ciclo: Uso de Herramientas Tecnológicas e Inteligencia Artificial Aplicadas en el Área de Química', 
            description: '• Uso de herramientas tecnológicas para la presentación de contenidos interactivos para el área de química.\n• Manejo de la tecnología e inteligencia artificial para el empoderamiento y la participación TEP, enfocada al área de química.\n• Uso de herramientas tecnológicas para la evaluación interactiva en el área de química.',
            icon: '🤖' 
        },
        { 
            value: 'ciclo_ia_biologia_secundaria', 
            label: 'Ciclo: Uso de Herramientas Tecnológicas e Inteligencia Artificial Aplicadas en el Área de Biología', 
            description: '• Uso de herramientas tecnológicas para la presentación de contenidos interactivos para el área de biología.\n• Manejo de la tecnología e inteligencia artificial para el empoderamiento y la participación TEP, enfocada al área de biología.\n• Uso de herramientas tecnológicas para la evaluación interactiva en el área de biología.',
            icon: '🤖' 
        },
        { 
            value: 'ciclo_ia_artes_plasticas_secundaria', 
            label: 'Ciclo: Uso de Herramientas Tecnológicas e Inteligencia Artificial Aplicadas en el Área de Artes Plásticas y Visuales', 
            description: '• Uso de herramientas tecnológicas para la presentación de contenidos interactivos para el área de artes plásticas y visuales.\n• Manejo de la tecnología e inteligencia artificial para el empoderamiento y la participación TEP, enfocada al área de artes plásticas y visuales.\n• Uso de herramientas tecnológicas para la evaluación interactiva en el área de artes plásticas y visuales.',
            icon: '🤖' 
        },
        { 
            value: 'ciclo_ia_educacion_fisica_secundaria', 
            label: 'Ciclo: Uso de Herramientas Tecnológicas e Inteligencia Artificial Aplicadas en el Área de Educación Física y Deportes', 
            description: '• Uso de herramientas tecnológicas para la presentación de contenidos interactivos para el área de educación física y deportes.\n• Manejo de la tecnología e inteligencia artificial para el empoderamiento y la participación TEP, enfocada al área de educación física y deportes.\n• Uso de herramientas tecnológicas para la evaluación interactiva en el área de educación física y deportes.',
            icon: '🤖' 
        },
        { 
            value: 'ciclo_ia_valores_espiritualidad_secundaria', 
            label: 'Ciclo: Uso de Herramientas Tecnológicas e Inteligencia Artificial Aplicadas en el Área de Valores, Espiritualidad y Religiones', 
            description: '• Uso de herramientas tecnológicas para la presentación de contenidos interactivos para el área de valores, espiritualidad y religiones.\n• Manejo de la tecnología e inteligencia artificial para el empoderamiento y la participación TEP, enfocada al área de valores, espiritualidad y religiones.\n• Uso de herramientas tecnológicas para la evaluación interactiva en el área de valores, espiritualidad y religiones.',
            icon: '🤖' 
        },
        { 
            value: 'ciclo_ia_ingles_secundaria', 
            label: 'Ciclo: Herramientas Tecnológicas e Inteligencia Artificial Aplicadas en el Área de Lengua Extranjera – Inglés', 
            description: '• Uso y manejo de plataformas interactivas para la enseñanza del idioma inglés.\n• Implementación de podcasts y blogs para el aprendizaje del idioma inglés.\n• Uso de la realidad virtual como herramienta para la evaluación del idioma inglés.',
            icon: '🤖' 
        },
        { 
            value: 'ciclo_laboratorio_quimica_secundaria', 
            label: 'Ciclo: Uso de Laboratorios en el Área de Química', 
            description: '• Práctica de laboratorios de química para 1ro y 2do año secundaria.\n• Práctica de laboratorios de química para 3ro y 4to año de secundaria.\n• Práctica de laboratorios de química para 5to y 6to año secundaria.\n• Recursos tecnológicos y simuladores virtuales para el laboratorio de química.',
            icon: '🧪' 
        },
        { 
            value: 'ciclo_laboratorio_fisica_secundaria', 
            label: 'Ciclo: Uso de Laboratorios en el Área de Física', 
            description: '• Práctica de laboratorios de física para 1ro y 2do año de secundaria.\n• Práctica de laboratorios de física para 3ro y 4to año de secundaria.\n• Práctica de laboratorios de física para 5to y 6to año de secundaria.\n• Recursos tecnológicos y simuladores virtuales para el laboratorio de física.',
            icon: '⚗️' 
        },
        { 
            value: 'ciclo_laboratorio_biologia_geografia_secundaria', 
            label: 'Ciclo: Uso de Laboratorios en el Área de Biología - Geografía', 
            description: '• Práctica de laboratorios de biología - geografía para 1ro y 2do año de secundaria.\n• Práctica de laboratorios de biología - geografía para 3ro y 4to año de secundaria.\n• Práctica de laboratorios de biología - geografía para 5to y 6to año de secundaria.\n• Recursos tecnológicos y simuladores virtuales para el laboratorio de biología y geografía.',
            icon: '🔬' 
        },
        { 
            value: 'ciclo_programacion_robotica_secundaria', 
            label: 'Ciclo: Programación y Robótica Aplicada para Secundaria', 
            description: '• Electrónica y ensamblaje de robots.\n• Programación avanzada integrada a la robótica.\n• Proyectos robóticos integrados con enfoque productivo.',
            icon: '🤖' 
        },
        { 
            value: 'ciclo_laboratorio_matematico_secundaria', 
            label: 'Ciclo: Laboratorio Matemático en Educación Secundaria', 
            description: '• Materiales y recursos de laboratorios: manipulativos y tecnológicos.\n• Álgebra y cálculo en el laboratorio.\n• Estadística y probabilidad para proyectos de investigación.',
            icon: '🔬' 
        },
        { 
            value: 'ciclo_pensamiento_logico_matematico_secundaria', 
            label: 'Ciclo: Potenciando el Pensamiento Lógico-Matemático en Educación Secundaria', 
            description: '• Estrategias para fomentar el pensamiento lógico en el aula.\n• Estrategias para potenciar el razonamiento algebraico.\n• Resolución de problemas complejos para estimular el pensamiento crítico.',
            icon: '🧮' 
        },
        { 
            value: 'ciclo_educacion_financiera_secundaria', 
            label: 'Ciclo: Educación Financiera para Nivel Secundario', 
            description: '• Introducción a la economía y finanzas personales.\n• El crédito, la deuda y el consumo responsable.\n• Emprendimiento y gestión del dinero en el futuro.',
            icon: '💰' 
        },
        { 
            value: 'ciclo_olimpiadas_cientificas_secundaria', 
            label: 'Ciclo: Estrategias para la Competición en Olimpiadas Científicas y Otras Competencias', 
            description: '• Fundamentos y estrategias generales para competencias científicas.\n• Abordaje específico de áreas científicas y técnicas.\n• Preparación intensiva y evaluación competitiva.',
            icon: '🏆' 
        },
        { 
            value: 'ciclo_pensamiento_critico_secundaria', 
            label: 'Ciclo: Fortaleciendo el Pensamiento Crítico en Educación Secundaria', 
            description: '• Lógica y argumentación para el pensamiento crítico.\n• Metodologías activas de aprendizaje.\n• Herramientas y técnicas para evaluar el pensamiento crítico.',
            icon: '🧠' 
        },
        { 
            value: 'ciclo_comprension_lectora_escritura_secundaria', 
            label: 'Ciclo: Fortaleciendo la Comprensión Lectora y la Producción Escrita en Educación Secundaria', 
            description: '• Estrategias para desarrollar la comprensión lectora en el aula.\n• Técnicas para la redacción y argumentación escrita.\n• Promoviendo la lectura crítica y escritura creativa.',
            icon: '📖' 
        },
        { 
            value: 'ciclo_bachillerato_tecnico_humanistico', 
            label: 'Ciclo: Bachillerato Técnico Humanístico - Contenidos Comunes', 
            description: '• Marco normativo para el abordaje del BTH.\n• Educación tecnológica para una sociedad innovadora y sostenible.\n• Enfoque integral para la seguridad y sostenibilidad.',
            icon: '📚' 
        },
        { 
            value: 'ciclo_emprendimiento_productivo_secundaria', 
            label: 'Ciclo: Emprendimientos Productivos Individuales', 
            description: '• Ideas y plan de negocios para emprendimientos productivos.\n• Marketing digital para emprendimientos productivos.\n• Plan de acción y evaluación de proyectos de emprendimientos productivos.',
            icon: '💼' 
        }
    ],
    'alternativa': [
        { 
            value: 'ciclo_estrategias_enseñanza_alternativa', 
            label: 'Ciclo: Estrategias de enseñanza para aprendizajes elementales y avanzados en educación alternativa', 
            description: '• Estrategias didácticas para el abordaje de módulos integrados fundamentales y emergentes.\n• Uso de TIC e inteligencia artificial para gestionar la diversidad.\n• Evaluación de aprendizajes en la educación de personas jóvenes y adultas.', 
            icon: '👥' 
        },
        { 
            value: 'ciclo_didacticas_secundaria_adultos', 
            label: 'Ciclo: Didácticas para educación secundaria de personas jóvenes y adultas', 
            description: '• Didácticas para el desarrollo de aprendizajes en personas jóvenes y adultas.\n• Las TIC e inteligencia artificial como estrategia didáctica para el abordaje de aprendizajes significativos.\n• Estrategias y herramientas para la evaluación integral de aprendizajes.', 
            icon: '👨‍🎓' 
        },
        { 
            value: 'ciclo_aprendizaje_proyectos_productiva', 
            label: 'Ciclo: Aprendizaje basado en proyectos con enfoque en educación productiva', 
            description: '• Metodologías de aprendizaje basado en proyectos.\n• Estrategias de aplicación de la metodología del aprendizaje basado en proyectos.\n• Estrategias de evaluación para el aprendizaje basado en proyectos.', 
            icon: '📐' 
        },
        { 
            value: 'ciclo_gestion_emprendimientos_tecnica', 
            label: 'Ciclo: Gestión de emprendimientos y empleabilidad en educación técnica tecnológica y productiva', 
            description: '• Ideas y plan de negocios para emprendimientos productivos.\n• Marketing digital para emprendimientos productivos.\n• Plan de acción y evaluación de proyectos de emprendimientos productivos.', 
            icon: '💼' 
        }
    ],
    'especial': [
        { 
            value: 'ciclo_estrategias_discapacidad_intelectual', 
            label: 'Ciclo: Estrategias metodológicas para la atención de estudiantes con discapacidad intelectual', 
            description: '• Estrategias metodológicas inclusivas para la enseñanza a estudiantes con discapacidad intelectual.\n• Uso de tecnologías educativas en la enseñanza de estudiantes con discapacidad intelectual.\n• Trabajo colaborativo con familias y comunidad para la atención integral de estudiantes con discapacidad intelectual.', 
            icon: '🧩' 
        },
        { 
            value: 'ciclo_enseñanza_adaptativa_materiales_intervencion', 
            label: 'Ciclo: Estrategias de enseñanza adaptativa y uso de materiales de intervención específica', 
            description: '• Diseño y adaptación de materiales educativos para estudiantes con necesidades especiales.\n• Estrategias de enseñanza diferenciada para estudiantes con diversas discapacidades.\n• Uso de tecnologías asistidas en el aula de educación especial.', 
            icon: '🛠️' 
        },
        { 
            value: 'ciclo_estrategias_dificultades_aprendizaje', 
            label: 'Ciclo: Estrategias innovadoras para la atención a estudiantes con dificultad de aprendizaje en educación especial', 
            description: '• Diseño de estrategias didácticas inclusivas y comunitarias para estudiantes con dificultades de aprendizaje.\n• Tecnologías educativas para apoyar el aprendizaje de estudiantes con dificultades de aprendizaje.\n• Desarrollo socioemocional de estudiantes con dificultades de aprendizaje.', 
            icon: '💡' 
        }
    ],
    'superior': [
        { 
            value: 'ciclo_didacticas_formacion_tecnica', 
            label: 'Ciclo: Didácticas para la formación técnica tecnológica', 
            description: '• Desarrollo de habilidades y competencias didácticas en el aula.\n• Las TIC e inteligencia artificial como estrategia didáctica en el aula.\n• Estrategias y herramientas para la evaluación de procesos formativos.', 
            icon: '🎯' 
        },
        { 
            value: 'ciclo_emprendedurismo_tecnico', 
            label: 'Ciclo: Emprendedurismo en la formación técnica tecnológica', 
            description: '• Generando la idea negocio.\n• Metodologías para la generación de emprendimientos.\n• Marketing y fortalecimiento de los emprendimientos.', 
            icon: '💡' 
        },
        { 
            value: 'ciclo_articulacion_productiva', 
            label: 'Ciclo: Articulación de la formación técnica tecnológica con el contexto productivo', 
            description: '• Mapa económico de mi zona, cadena de valor y valor agregado.\n• Estrategias y modalidades de articulación con el contexto productivo.\n• Planificación, implementación y evaluación de proyectos de articulación productiva con el contexto.', 
            icon: '🔗' 
        },
        { 
            value: 'ciclo_investigacion_innovacion_tecnica', 
            label: 'Ciclo: Investigación para la innovación y emprendimiento en educación técnica y tecnológica', 
            description: '• Fundamentos de la investigación educativa.\n• Métodos y técnicas de investigación cualitativa, cuantitativa y mixta.\n• Análisis e interpretación de resultados de la investigación.', 
            icon: '🔍' 
        },
        { 
            value: 'ciclo_asesoria_tutoria_graduacion', 
            label: 'Ciclo: Asesoría y tutoría en modalidades de graduación en formación técnica-tecnológica', 
            description: '• Planificación y organización para el acompañamiento en las diferentes modalidades de graduación.\n• Estrategias de seguimiento para la tutoría en las diferentes modalidades de graduación.\n• Evaluación de las modalidades de graduación en formación técnica tecnológica.', 
            icon: '👨‍🏫' 
        },
        { 
            value: 'ciclo_investigacion_analisis_datos', 
            label: 'Ciclo: Investigación y análisis de datos', 
            description: '• Investigación aplicada a educación superior.\n• Herramientas para la recolección, sistematización y análisis de datos.\n• Aplicación de la investigación y análisis de datos en proyectos educativos.', 
            icon: '📊' 
        }
    ]
};

// Helpers para generar opciones
const getConferenceOptions = (): Option[] => COMMON_CONFERENCES;

const getWorkshopOptions = (data: UserData): Option[] => {
    const rawSub = data.subsistema;
    const sub = (Array.isArray(rawSub) ? rawSub[0] : rawSub) || 'regular';
    return SPECIFIC_WORKSHOPS[sub] || [];
};

const getCourseOptions = (data: UserData): Option[] => {
    const rawSub = data.subsistema;
    const sub = (Array.isArray(rawSub) ? rawSub[0] : rawSub) || 'regular';
    const specifics = SPECIFIC_CYCLES[sub] || [];
    // Combinamos los generales + los específicos
    return [...COMMON_CYCLES, ...specifics];
};

export const FLOW: Step[] = [
    // --- BIENVENIDA E INTRODUCCIÓN ---
    { 
        type: 'bot', 
        message: '👋🏛️ *PROPUESTA FORMATIVA GESTIÓN 2026*\n\nSean bienvenidos y bienvenidas, gracias por brindarnos unos minutos de su tiempo.\n\nLa Unidad Especializada De Formación Continua “UNEFCO”, ha desarrollado este cuestionario con la finalidad de evaluar la ejecución de la oferta formativa 2025 y a su vez atender sus necesidades, requerimientos y expectativas, logrando de esta manera concretarlas en la oferta académica 2026.', 
        delay: 1000 
    },
    {
        type: 'bot',
        message: 'Agradecemos y valoramos el tiempo que le dedicas a responder este cuestionario.\nCabe señalar que las respuestas serán manejadas de manera profesional con fines estrictamente educativos.\nPor favor, señale, marque la opción que mejor se adecue a su criterio.',
        delay: 1500
    },

    // --- LUGAR DE TRABAJO Y DATOS ---
    { 
        type: 'bot', 
        message: 'Ingrese su Carnet de Identidad para el registro:', 
        delay: 1000, 
        input: 'ci', 
        validation: 'ci' 
    },
    { 
        type: 'bot', 
        message: '¿Departamento?', 
        delay: 1000,
        options: [
            { value: 'La Paz', label: 'La Paz', icon: '🏔️' },
            { value: 'Cochabamba', label: 'Cochabamba', icon: '🌽' },
            { value: 'Santa Cruz', label: 'Santa Cruz', icon: '🌴' },
            { value: 'Chuquisaca', label: 'Chuquisaca', icon: '🏛️' },
            { value: 'Tarija', label: 'Tarija', icon: '🍇' },
            { value: 'Potosí', label: 'Potosí', icon: '⛏️' },
            { value: 'Oruro', label: 'Oruro', icon: '👺' },
            { value: 'Beni', label: 'Beni', icon: '🐆' },
            { value: 'Pando', label: 'Pando', icon: '🌳' }
        ],
        input: 'departamento',
        questionLabel: 'Departamento'
    },
    { 
        type: 'bot', 
        message: '¿Distrito educativo?', 
        delay: 1000, 
        input: 'distrito', 
        validation: 'text', 
        questionLabel: 'Distrito educativo' 
    },
    { 
        type: 'bot', 
        message: '¿Área?', 
        delay: 1000, 
        options: [
            { value: 'urbano', label: 'Urbano', icon: '🏙️' }, 
            { value: 'rural', label: 'Rural', icon: '⛰️' }
        ], 
        input: 'area', 
        questionLabel: 'Área' 
    },
    { 
        type: 'bot', 
        message: '¿Tipo de unidad educativa?', 
        delay: 1000, 
        options: [
            { value: 'fiscal', label: 'Fiscal', icon: '🏫' }, 
            { value: 'convenio', label: 'Convenio', icon: '🤝' },
            { value: 'particular', label: 'Particular', icon: '🏢' }
        ], 
        input: 'tipo_ue', 
        questionLabel: 'Tipo de unidad educativa' 
    },
    { 
        type: 'bot', 
        message: '¿A qué subsistema de educación pertenece?', 
        delay: 1000, 
        options: [
            { value: 'inicial', label: 'Educación inicial', icon: '👶' }, 
            { value: 'primaria', label: 'Educación primaria', icon: '🎒' }, 
            { value: 'secundaria', label: 'Educación secundaria', icon: '👱' },
            { value: 'especial', label: 'Educación especial', icon: '♿' },
            { value: 'alternativa', label: 'Educación Alternativa', icon: '📚' },
            { value: 'superior', label: 'Institutos Técnicos -Tecnológicos', icon: '🎓' }
        ], 
        input: 'subsistema', 
        questionLabel: 'Subsistema' 
    },
    { 
        type: 'bot', 
        message: '¿Cuál es la función que desempeña actualmente?', 
        delay: 1000, 
        options: [
            { value: 'director', label: 'Director(a)', icon: '👔' }, 
            { value: 'maestro', label: 'Maestro(a)', icon: '👨‍🏫' }, 
            { value: 'administrativo', label: 'Administrativo(a)', icon: '💼' }, 
            { value: 'otro', label: 'Otro', icon: '👤' }
        ], 
        input: 'funcion', 
        questionLabel: 'Función' 
    },    

    // --- PREGUNTAS DE EVALUACIÓN ---
    { 
        type: 'bot', 
        message: '¿Conoce la oferta formativa de UNEFCO 2025?', 
        delay: 1000, 
        options: [
            { value: 'si', label: 'SÍ', icon: '✅' }, 
            { value: 'no', label: 'NO', icon: '❌' }
        ], 
        input: 'conoce_oferta', 
        questionLabel: 'Conoce oferta' 
    },

    // --- CAMINO: SÍ CONOCE ---
    { 
        type: 'conditional', 
        condition: (data) => data.conoce_oferta === 'si', 
        ifTrue: { 
            type: 'bot', 
            message: '¿Participó en algún curso formativo?', 
            delay: 1000, 
            options: [
                { value: 'si', label: 'SÍ', icon: '👍' }, 
                { value: 'no', label: 'NO', icon: '👎' }
            ], 
            input: 'participo', 
            questionLabel: 'Participó' 
        } 
    },

    // --- SUB-RAMA: SÍ PARTICIPÓ (MULTISELECCIÓN DE CONFERENCIAS, TALLERES Y CURSOS) ---
    
    // 1. CONFERENCIAS (Para todos)
    { 
        type: 'conditional', 
        condition: (data) => data.conoce_oferta === 'si' && data.participo === 'si', 
        ifTrue: { 
            type: 'bot', 
            message: 'Marque qué CONFERENCIAS fueron de su mayor agrado (fue partícipe). Puede seleccionar varias.', 
            delay: 1000, 
            options: getConferenceOptions, 
            multiselect: true,
            input: 'conferencias_participadas', 
            questionLabel: 'Conferencias Participadas' 
        } 
    },

    // 2. TALLERES (Por Subsistema)
    { 
        type: 'conditional', 
        condition: (data) => data.conoce_oferta === 'si' && data.participo === 'si', 
        ifTrue: { 
            type: 'bot', 
            message: 'Marque qué TALLERES fueron de su mayor agrado (fue partícipe). Puede seleccionar varios.', 
            delay: 1000, 
            options: getWorkshopOptions, 
            multiselect: true,
            input: 'talleres_participados', 
            questionLabel: 'Talleres Participados' 
        } 
    },

    // 3. CICLOS/CURSOS (SEP General + Subsistema)
    { 
        type: 'conditional', 
        condition: (data) => data.conoce_oferta === 'si' && data.participo === 'si', 
        ifTrue: { 
            type: 'bot', 
            message: 'Marque qué CICLOS/CURSOS fueron de su mayor agrado (fue partícipe). Puede seleccionar varios.', 
            delay: 1000, 
            options: getCourseOptions, // Full List
            multiselect: true, // Enable selecting multiple
            input: 'cursos_participados', 
            questionLabel: 'Cursos Participados' 
        } 
    },
    
    { 
        type: 'conditional', 
        condition: (data) => data.conoce_oferta === 'si' && data.participo === 'si', 
        ifTrue: { 
            type: 'bot', 
            message: '¿Los cursos de los cuales fue participe, considera que fueron aplicados en la práctica educativa que desarrollo en la gestión 2025?', 
            delay: 1000, 
            options: [
                { value: 'muy_aplicables', label: 'Muy aplicables', icon: '⭐' }, 
                { value: 'poco_aplicables', label: 'Poco aplicables', icon: '📉' }, 
                { value: 'nada_aplicables', label: 'Nada aplicables', icon: '🚫' }
            ], 
            input: 'aplicabilidad', 
            questionLabel: 'Aplicabilidad' 
        } 
    },
    { 
        type: 'conditional', 
        condition: (data) => data.conoce_oferta === 'si' && data.participo === 'si', 
        ifTrue: { 
            type: 'bot', 
            message: '¿Considera que la metodología aplicada durante la gestión 2025 fue oportuna, clara y concreta?', 
            delay: 1000, 
            options: [
                { value: 'buena', label: 'BUENA', icon: '✅' }, 
                { value: 'regular', label: 'REGULAR', icon: '⚠️' },
                { value: 'insuficiente', label: 'INSUFICIENTE', icon: '❌' }
            ], 
            input: 'metodologia', 
            questionLabel: 'Metodología' 
        } 
    },
    // Si metodología es BUENA -> Calidad Contenidos
    { 
        type: 'conditional', 
        condition: (data) => data.conoce_oferta === 'si' && data.participo === 'si' && data.metodologia === 'buena', 
        ifTrue: { 
            type: 'bot', 
            message: '¿Cómo evalúa la calidad de contenidos?', 
            delay: 1000, 
            options: [
                { value: 'excelente', label: 'EXCELENTE', icon: '🥇' }, 
                { value: 'aceptable', label: 'ACEPTABLE', icon: '🆗' },
                { value: 'regular', label: 'REGULAR', icon: '😐' }
            ], 
            input: 'calidad_contenidos', 
            questionLabel: 'Calidad Contenidos' 
        } 
    },
    // Si metodología es REGULAR o INSUFICIENTE -> Opciones de problema específicas
    { 
        type: 'conditional', 
        condition: (data) => data.conoce_oferta === 'si' && data.participo === 'si' && (data.metodologia === 'regular' || data.metodologia === 'insuficiente'), 
        ifTrue: { 
            type: 'bot', 
            message: 'Por favor indique el motivo principal:', 
            delay: 1000, 
            options: [
                { value: 'contenidos_actualizados', label: 'Contenidos que necesitan ser actualizados', icon: '📄' }, 
                { value: 'mejores_herramientas', label: 'Uso de mejores herramientas didácticas', icon: '🛠️' },
                { value: 'plataforma_sencilla', label: 'Usar una plataforma más sencilla de manejar', icon: '💻' },
                { value: 'horarios_incomodos', label: 'Los horarios no son cómodos', icon: '⏰' },
                { value: 'experiencia_facilitador', label: 'El facilitador no tiene la experiencia necesaria', icon: '👨‍🏫' }
            ], 
            input: 'motivo_insuficiencia', 
            questionLabel: 'Motivo Problema' 
        } 
    },
    // Continúa para quienes participaron
    { 
        type: 'conditional', 
        condition: (data) => data.conoce_oferta === 'si' && data.participo === 'si', 
        ifTrue: { 
            type: 'bot', 
            message: '4 ¿Qué aspectos deberían mejorar en la calidad de los cursos?', 
            delay: 1000, 
            options: [
                { value: 'contenidos', label: 'CONTENIDOS ACTUALIZADOS', icon: '🔄' }, 
                { value: 'horarios', label: 'HORARIOS MAS FLEXIBLES', icon: '📅' },
                { value: 'tutoriales', label: 'TUTORIALES DE MANEJO DE LA PLATAFORMA', icon: '📹' },
                { value: 'otros', label: 'OTROS', icon: '➕' }
            ], 
            input: 'aspectos_mejora', 
            questionLabel: 'Aspectos Mejora' 
        } 
    },

    // --- SUB-RAMA: NO PARTICIPÓ (Conoce=Si, Participo=No) ---
    { 
        type: 'conditional', 
        condition: (data) => data.conoce_oferta === 'si' && data.participo === 'no', 
        ifTrue: { 
            type: 'bot', 
            message: '¿Qué factores influyeron para que no pueda ser partícipe de los cursos formativos de UNEFCO la gestión 2025?', 
            delay: 1000, 
            options: [
                { value: 'falta_tiempo', label: 'Falta de tiempo', icon: '⏳' }, 
                { value: 'no_interes', label: 'Los cursos/ciclos y/o talleres no son de mi interés', icon: '🤔' },
                { value: 'otros', label: 'Otros', icon: '➕' }
            ], 
            input: 'factor_no_participacion', 
            questionLabel: 'Factor No Participación' 
        } 
    },

    // --- SUB-RAMA: NO CONOCE (Conoce=No) ---
    // Paso 1: Mostrar solo el PDF
    { 
        type: 'conditional', 
        condition: (data) => data.conoce_oferta === 'no', 
        ifTrue: { 
            type: 'bot', 
            message: 'A continuación le presentamos la oferta formativa con la cual se trabajó este año. Revise el enlace PDF 👇 si desea ver el detalle de ciclos disponibles.', 
            delay: 2000, 
            externalLink: 'https://drive.google.com/file/d/1nu3t_VeXoT5HCUZ8YHGB34nBi1ewAuLT/view?usp=sharing'
            // Sin opciones aquí, solo muestra el enlace
        } 
    },
    
    // Paso 2: Hacer la pregunta con opciones (separado)
    { 
        type: 'conditional', 
        condition: (data) => data.conoce_oferta === 'no', 
        ifTrue: { 
            type: 'bot', 
            message: '¿Qué factores influyeron para que no pueda ser partícipe de los cursos formativos de UNEFCO la gestión 2025?', 
            delay: 3000, // Ajusta el delay para que aparezca después del PDF
            options: [
                { value: 'falta_tiempo', label: 'Falta de tiempo', icon: '⏳' }, 
                { value: 'no_interes', label: 'Los cursos/ciclos y/o talleres no son de mi interés', icon: '🤔' },
                { value: 'otros', label: 'Otros', icon: '➕' }
            ], 
            input: 'factor_no_participacion', 
            questionLabel: 'Factor No Participación' 
        } 
    },

    // --- SECCIÓN DE SUGERENCIAS (COMÚN PARA TODOS) ---
    {
        type: 'bot',
        message: 'Para la Gestión 2026: Sugiera temas para CICLOS y CURSOS (Indicar que no hayan sido contemplado en la oferta formativa 2025)',
        delay: 1000,
        input: 'sugerencia_ciclos_2026',
        validation: 'optional',
        questionLabel: 'Sugerencia Ciclos'
    },
    {
        type: 'bot',
        message: 'Sugiera temas específicos para TALLERES (Cortos y prácticos) (Indicar que no hayan sido contemplado en la oferta formativa 2025)',
        delay: 1000,
        input: 'sugerencia_talleres_2026',
        validation: 'optional',
        questionLabel: 'Sugerencia Talleres'
    },
    {
        type: 'bot',
        message: 'Sugiera temáticas para CONFERENCIAS magistrales (Indicar que no hayan sido contemplado en la oferta formativa 2025)',
        delay: 1000,
        input: 'sugerencia_conferencias_2026',
        validation: 'optional',
        questionLabel: 'Sugerencia Conferencias'
    },
    { 
        type: 'bot', 
        message: '¿Qué modalidad se le hace más efectiva para la ejecución de los cursos?', 
        delay: 1000, 
        options: [
            { value: 'presencial', label: 'Presencial (Talleres)', icon: '🏢' }, 
            { value: 'semipresencial', label: 'Semipresencial (Ciclos/Cursos)', icon: '🏫' },
            { value: 'distancia', label: 'A distancia (Ciclos/Cursos)', icon: '💻' }
        ], 
        input: 'modalidad_efectiva', 
        questionLabel: 'Modalidad Efectiva' 
    },
    { 
        type: 'bot', 
        message: 'COMENTARIOS FINALES: Algún aspecto que no se haya contemplado u omitido en el presente cuestionario.', 
        delay: 1000, 
        input: 'comentarios_finales', 
        validation: 'optional', 
        questionLabel: 'Comentarios Finales' 
    },

    // --- CIERRE ---
    { 
        type: 'bot', 
        message: '¡MUCHAS GRACIAS! Sus respuestas han sido guardadas.', 
        delay: 1500, 
        action: 'saveData' 
    }
];
