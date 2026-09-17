/**
 * Banco de preguntas — Sombrero Seleccionador UTN FRRE
 * 28 preguntas con pesos acumulativos por carrera.
 *
 * Carreras: sistemas | quimica | electromecanica | mecatronica | administracion_rural
 */

const QUESTION_POOL = [
  {
    id: "q001",
    text: "Se rompió el ventilador de tu casa. ¿Qué hacés?",
    options: [
      { text: "Lo abro para ver qué tiene por dentro y trato de repararlo", weights: { electromecanica: 3, mecatronica: 1 } },
      { text: "Busco un tutorial en YouTube y sigo los pasos con cuidado", weights: { sistemas: 2, mecatronica: 1 } },
      { text: "Investigo si el problema podría ser de los materiales o del lubricante", weights: { quimica: 2, electromecanica: 1 } },
      { text: "Llamo a alguien que sepa y anoto todo para no olvidarme", weights: { administracion_rural: 2 } },
    ],
  },
  {
    id: "q002",
    text: "Te dieron una tarde libre en el colegio. ¿En qué la gastás?",
    options: [
      { text: "Jugando un videojuego o buscando cómo crear uno", weights: { sistemas: 3 } },
      { text: "Haciendo algún experimento casero (mezclas, fuego, reacciones)", weights: { quimica: 3 } },
      { text: "Armando o desarmando algo con herramientas", weights: { electromecanica: 3 } },
      { text: "Programando un robot o jugando con electrónica", weights: { mecatronica: 3 } },
      { text: "Saliendo al campo o jardín, cuidando plantas o animales", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q003",
    text: "¿Cuál de estas frases te representa mejor?",
    options: [
      { text: "\"Si lo puedo automatizar, mejor\"", weights: { sistemas: 3, mecatronica: 1 } },
      { text: "\"Me pregunto por qué las cosas cambian de color o forma\"", weights: { quimica: 3 } },
      { text: "\"Me gusta saber cómo funciona cada pieza de una máquina\"", weights: { electromecanica: 3 } },
      { text: "\"Quiero que las máquinas hagan lo que yo les digo\"", weights: { mecatronica: 3, sistemas: 1 } },
      { text: "\"El campo bien organizado puede alimentar a un país\"", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q004",
    text: "En un trabajo en grupo, ¿qué rol tomás naturalmente?",
    options: [
      { text: "El que organiza el Google Drive y los deadlines", weights: { sistemas: 2, administracion_rural: 1 } },
      { text: "El que investiga los detalles técnicos y los verifica", weights: { quimica: 2, electromecanica: 1 } },
      { text: "El que hace el prototipo o la maqueta", weights: { electromecanica: 2, mecatronica: 2 } },
      { text: "El que administra el presupuesto y los recursos", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q005",
    text: "Si tuvieras que elegir una película o serie para ver este fin de semana, ¿cuál elegiría?",
    options: [
      { text: "Una de hackers o inteligencia artificial", weights: { sistemas: 3 } },
      { text: "Un documental de ciencia o química forense", weights: { quimica: 3 } },
      { text: "Una de ingeniería o de construcción de grandes obras", weights: { electromecanica: 3 } },
      { text: "Una de robots o drones de combate", weights: { mecatronica: 3 } },
      { text: "Una de vida rural, campo abierto o aventura en la naturaleza", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q006",
    text: "¿Qué materia del colegio te resulta más interesante (o la odiarías menos)?",
    options: [
      { text: "Informática / Tecnología digital", weights: { sistemas: 3 } },
      { text: "Química", weights: { quimica: 3 } },
      { text: "Física / Tecnología mecánica", weights: { electromecanica: 2, mecatronica: 1 } },
      { text: "Biología / Ciencias naturales", weights: { quimica: 1, administracion_rural: 2 } },
      { text: "Economía / Administración", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q007",
    text: "Llegás a casa y la heladera no enfría. ¿Qué hacés primero?",
    options: [
      { text: "Busco en internet el modelo y leo el diagrama de error", weights: { sistemas: 2, electromecanica: 1 } },
      { text: "Me pongo a revisar el gas refrigerante y los tubos", weights: { quimica: 2, electromecanica: 2 } },
      { text: "Saco el panel trasero y reviso motor y compresor", weights: { electromecanica: 3 } },
      { text: "Pienso si hay una forma de automatizar el diagnóstico", weights: { mecatronica: 2, sistemas: 1 } },
    ],
  },
  {
    id: "q008",
    text: "Te ofrecen hacer una pasantía de un mes. ¿Cuál elegís?",
    options: [
      { text: "En una empresa de software desarrollando apps", weights: { sistemas: 3 } },
      { text: "En un laboratorio farmacéutico o de análisis", weights: { quimica: 3 } },
      { text: "En una planta industrial revisando maquinaria", weights: { electromecanica: 3 } },
      { text: "En un taller de robótica armando prototipos", weights: { mecatronica: 3 } },
      { text: "En un establecimiento agropecuario gestionando la producción", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q009",
    text: "¿Cuál de estas actividades harías el sábado a la mañana?",
    options: [
      { text: "Aprender a programar algo nuevo en YouTube", weights: { sistemas: 3 } },
      { text: "Hacer una receta de química casera (cristales, jabón, tinte)", weights: { quimica: 3 } },
      { text: "Reparar la bici, el skate o arreglar algo del auto", weights: { electromecanica: 3 } },
      { text: "Montar un robot con Arduino o Lego Technic", weights: { mecatronica: 3 } },
      { text: "Salir a cabalgar, pescar o andar por el campo", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q010",
    text: "¿Qué te genera más curiosidad de la naturaleza?",
    options: [
      { text: "Cómo los organismos procesan la información (cerebro, genes)", weights: { sistemas: 1, quimica: 2 } },
      { text: "Por qué los materiales reaccionan de distinta manera", weights: { quimica: 3 } },
      { text: "Cómo las fuerzas físicas mueven enormes estructuras", weights: { electromecanica: 3 } },
      { text: "Cómo los animales y plantas se adaptan al campo", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q011",
    text: "Si tuvieras que resolver un problema difícil, preferirías...",
    options: [
      { text: "Escribir un algoritmo paso a paso hasta que funcione", weights: { sistemas: 3 } },
      { text: "Hacer pruebas en el laboratorio hasta encontrar la causa", weights: { quimica: 3 } },
      { text: "Desensamblar el sistema y revisar cada pieza", weights: { electromecanica: 2, mecatronica: 1 } },
      { text: "Diseñar un sistema automático que detecte el problema solo", weights: { mecatronica: 3 } },
      { text: "Hablar con los afectados y organizar una solución grupal", weights: { administracion_rural: 2 } },
    ],
  },
  {
    id: "q012",
    text: "¿Cuál de estas palabras te genera más entusiasmo?",
    options: [
      { text: "Código", weights: { sistemas: 3 } },
      { text: "Reacción", weights: { quimica: 3 } },
      { text: "Motor", weights: { electromecanica: 3 } },
      { text: "Sensor", weights: { mecatronica: 3 } },
      { text: "Cosecha", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q013",
    text: "Un amigo te dice que encontró agua extraña en su pozo. ¿Qué pensás?",
    options: [
      { text: "Le digo que analice el pH y los minerales en un laboratorio", weights: { quimica: 3 } },
      { text: "Busco si hay maquinaria o caños que puedan estar filtrando", weights: { electromecanica: 2 } },
      { text: "Le armo una app que rastree la calidad del agua automáticamente", weights: { sistemas: 2, mecatronica: 1 } },
      { text: "Pienso en el impacto en los cultivos y el campo", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q014",
    text: "¿Cómo preferís aprender algo nuevo?",
    options: [
      { text: "Leyendo documentación y haciendo ejercicios en la computadora", weights: { sistemas: 3 } },
      { text: "En el laboratorio tocando y mezclando materiales reales", weights: { quimica: 3 } },
      { text: "Con herramientas en la mano, construyendo algo físico", weights: { electromecanica: 3, mecatronica: 1 } },
      { text: "Viendo el campo y hablando con quienes trabajan en él", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q015",
    text: "¿Cuál de estas tecnologías te parece más fascinante?",
    options: [
      { text: "Inteligencia artificial / machine learning", weights: { sistemas: 3 } },
      { text: "Nuevos materiales / nanotecnología", weights: { quimica: 3 } },
      { text: "Motores eléctricos / energías renovables", weights: { electromecanica: 3 } },
      { text: "Drones / vehículos autónomos", weights: { mecatronica: 3, sistemas: 1 } },
      { text: "Agricultura de precisión / GPS en el campo", weights: { administracion_rural: 3, mecatronica: 1 } },
    ],
  },
  {
    id: "q016",
    text: "Si te preguntaran qué querés ser de grande, ¿cuál suena más a vos?",
    options: [
      { text: "Alguien que crea el próximo software que usa todo el mundo", weights: { sistemas: 3 } },
      { text: "Alguien que descubre nuevas fórmulas o materiales", weights: { quimica: 3 } },
      { text: "Alguien que diseña y mantiene las máquinas del futuro", weights: { electromecanica: 3 } },
      { text: "Alguien que construye robots y sistemas automatizados", weights: { mecatronica: 3 } },
      { text: "Alguien que gestiona campos y produce alimentos para el país", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q017",
    text: "¿Cuál de estos problemas del mundo te interesa más resolver?",
    options: [
      { text: "La privacidad y la seguridad en internet", weights: { sistemas: 3 } },
      { text: "La contaminación del agua y el suelo por químicos", weights: { quimica: 3 } },
      { text: "El derroche de energía en fábricas e industrias", weights: { electromecanica: 3 } },
      { text: "La falta de automatización en la industria argentina", weights: { mecatronica: 3, sistemas: 1 } },
      { text: "La producción de alimentos para una población que crece", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q018",
    text: "Un drone de reparto llega a tu barrio. ¿Qué pensás primero?",
    options: [
      { text: "¿Qué sistema de navegación usa? ¿Tiene IA?", weights: { sistemas: 2, mecatronica: 1 } },
      { text: "¿De qué material están las hélices? ¿Cuánto pesan?", weights: { quimica: 2 } },
      { text: "¿Cómo funciona el motor y cuánta batería gasta?", weights: { electromecanica: 2, mecatronica: 1 } },
      { text: "¡Yo quiero construir uno y programarlo!", weights: { mecatronica: 3, sistemas: 1 } },
      { text: "¿Se podría usar para monitorear cultivos en el campo?", weights: { administracion_rural: 3, mecatronica: 1 } },
    ],
  },
  {
    id: "q019",
    text: "En una exposición de ciencias, ¿qué proyecto harías?",
    options: [
      { text: "Una app o sitio web sobre algún tema que me apasione", weights: { sistemas: 3 } },
      { text: "Un experimento con reacciones químicas llamativas", weights: { quimica: 3 } },
      { text: "Un modelo de máquina o puente que soporte peso real", weights: { electromecanica: 3 } },
      { text: "Un robot o brazo mecánico controlado por la compu", weights: { mecatronica: 3 } },
      { text: "Un proyecto sobre producción sustentable en el campo", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q020",
    text: "¿Cuál de estas frases dijo un estudiante de tu futura carrera?",
    options: [
      { text: "\"Pasé la noche resolviendo un bug y cuando apareció, fue la mejor sensación\"", weights: { sistemas: 3 } },
      { text: "\"Ver cómo una reacción transforma completamente un material nunca deja de asombrarme\"", weights: { quimica: 3 } },
      { text: "\"Entender cómo funciona cada pieza de una turbina es algo único\"", weights: { electromecanica: 3 } },
      { text: "\"Programé el brazo robótico para que mueva piezas solo, fue una locura\"", weights: { mecatronica: 3 } },
      { text: "\"Cada cosecha bien gestionada es como ganarle al clima y al mercado\"", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q021",
    text: "¿Qué herramienta te gustaría dominar?",
    options: [
      { text: "Un lenguaje de programación (Python, JavaScript, etc.)", weights: { sistemas: 3 } },
      { text: "Un espectrómetro o cromatógrafo de laboratorio", weights: { quimica: 3 } },
      { text: "Una fresadora o torno industrial", weights: { electromecanica: 3 } },
      { text: "Una placa Arduino o Raspberry Pi", weights: { mecatronica: 3, sistemas: 1 } },
      { text: "Un sistema de gestión de stock para el campo", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q022",
    text: "Si pudieras viajar en el tiempo y estar en algún momento histórico, ¿cuál elegirías?",
    options: [
      { text: "La creación del primer internet", weights: { sistemas: 3 } },
      { text: "El descubrimiento de la tabla periódica", weights: { quimica: 3 } },
      { text: "La Revolución Industrial (primeras máquinas a vapor)", weights: { electromecanica: 3 } },
      { text: "El lanzamiento del primer robot industrial en una fábrica", weights: { mecatronica: 3 } },
      { text: "La invención del arado a tracción mecánica", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q023",
    text: "Cuando ves una planta de producción en TV, ¿qué te llama más la atención?",
    options: [
      { text: "El sistema de control y monitoreo en pantallas", weights: { sistemas: 3, mecatronica: 1 } },
      { text: "Los procesos de mezcla y transformación de materiales", weights: { quimica: 3 } },
      { text: "Las grandes máquinas y cómo se mantienen", weights: { electromecanica: 3 } },
      { text: "Los brazos robóticos que se mueven solos", weights: { mecatronica: 3 } },
      { text: "Cómo organizan a la gente y los recursos", weights: { administracion_rural: 2 } },
    ],
  },
  {
    id: "q024",
    text: "¿Qué tipo de libro elegirías en una biblioteca?",
    options: [
      { text: "Uno sobre cómo funciona internet o los algoritmos", weights: { sistemas: 3 } },
      { text: "Uno de experimentos químicos o descubrimientos científicos", weights: { quimica: 3 } },
      { text: "Uno de inventos e ingeniería mecánica", weights: { electromecanica: 3 } },
      { text: "Uno de robótica o impresión 3D", weights: { mecatronica: 3 } },
      { text: "Uno de ganadería, agricultura o ecosistemas rurales", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q025",
    text: "¿Qué harías si te dieran $100 mil para invertir en algo que te apasione?",
    options: [
      { text: "Montar un servidor o comprar equipos para programar", weights: { sistemas: 3 } },
      { text: "Equipar un pequeño laboratorio químico", weights: { quimica: 3 } },
      { text: "Comprar herramientas y piezas para un taller mecánico", weights: { electromecanica: 3 } },
      { text: "Armar un laboratorio de robótica con impresora 3D", weights: { mecatronica: 3 } },
      { text: "Invertir en animales o semillas para un pequeño campo", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q026",
    text: "¿Cuál de estas aplicaciones te parece más valiosa?",
    options: [
      { text: "Una que predice fallas en computadoras antes de que sucedan", weights: { sistemas: 3 } },
      { text: "Una que analiza la composición química del suelo con el celular", weights: { quimica: 2, administracion_rural: 1 } },
      { text: "Una que diagrama el mantenimiento de motores industriales", weights: { electromecanica: 3 } },
      { text: "Una que controla drones de fumigación de forma autónoma", weights: { mecatronica: 2, administracion_rural: 2 } },
      { text: "Una que gestiona la producción y ventas de un campo", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q027",
    text: "Describite con una palabra:",
    options: [
      { text: "Lógico/a", weights: { sistemas: 3 } },
      { text: "Curioso/a", weights: { quimica: 2, sistemas: 1 } },
      { text: "Mecánico/a", weights: { electromecanica: 3 } },
      { text: "Creativo/a con tecnología", weights: { mecatronica: 2, sistemas: 1 } },
      { text: "Organizador/a", weights: { administracion_rural: 3 } },
    ],
  },
  {
    id: "q028",
    text: "¿Cuál de estos desafíos te parece más emocionante?",
    options: [
      { text: "Crear un sistema que aprenda solo de los errores", weights: { sistemas: 3 } },
      { text: "Sintetizar un nuevo compuesto que no existe en la naturaleza", weights: { quimica: 3 } },
      { text: "Diseñar un motor más eficiente que los actuales", weights: { electromecanica: 3 } },
      { text: "Construir un exoesqueleto robótico funcional", weights: { mecatronica: 3 } },
      { text: "Crear un modelo de campo que no desperdicie agua ni suelo", weights: { administracion_rural: 3 } },
    ],
  },
];
