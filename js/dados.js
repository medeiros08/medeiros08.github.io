/* =====================================================================
   SEUS DADOS: este é o único arquivo que você precisa editar.
   ---------------------------------------------------------------------
   • Um texto pode ser só em português:    "Olá"
     ou nos dois idiomas:                   { pt: "Olá", en: "Hello" }
     Se faltar o inglês, o site mostra o português no lugar.
   • Para esconder uma seção inteira, deixe a lista vazia: []
   • Nos textos dá pra usar **negrito** e [links](https://exemplo.com).
   ===================================================================== */

window.DADOS = {
  // Idiomas do site. Use ["pt"] para ter só português (o botão EN some).
  idiomas: ["pt", "en"],

  nome: { primeiro: "Arthur", sobrenome: "Medeiros" },

  // Foto do topo (na pasta img/), mostrada num quadro estilo polaroide.
  foto: "img/foto.jpg",
  fotoPosicao: "50% 22%", // enquadramento da foto: "horizontal vertical"

  // Cor de destaque inicial (o visitante pode trocar no botão de paleta).
  // "claro" é usada no tema claro e "escuro" no tema escuro.
  cores: { claro: "#4338ff", escuro: "#9d9bff" },

  topo: {
    chamada: { pt: "Pesquisa em cibersegurança e P4", en: "Cybersecurity and P4 research" },
    frase: {
      pt: "Pesquiso como redes programáveis com P4 podem tornar a comunicação mais segura.",
      en: "I research how programmable networks with P4 can make communication more secure.",
    },
    detalhes: [{ pt: "Ciência da Computação", en: "Computer Science" }, "UNIPAMPA", "AI Horizon Labs"],
  },

  // Botões do topo. Tipos com ícone: lattes, orcid, scholar, github, linkedin,
  // email, instagram, cv, site. Use "rotulo" para trocar o texto do botão.
  // Para destacar um botão (com a cor do site), adicione principal: true.
  links: [
    { tipo: "github", url: "https://github.com/medeiros08" },
    { tipo: "linkedin", url: "https://www.linkedin.com/in/arthur-medeiros-34a344356/" },
    { tipo: "instagram", url: "https://www.instagram.com/medeiros__08/" },
    { tipo: "email" }, // usa o primeiro e-mail de "contato"
    { tipo: "lattes", url: "http://lattes.cnpq.br/3699255553076395" },
  ],

  // "Agora": o que você está fazendo no momento (até 3 colunas).
  agora: [
    {
      rotulo: { pt: "Pesquisa atual", en: "Current research" },
      itens: [
        {
          titulo: { pt: "Cibersegurança com P4", en: "Cybersecurity with P4" },
          texto: {
            pt: "Redes programáveis, no AI Horizon Labs.",
            en: "Programmable networks, at AI Horizon Labs.",
          },
        },
        {
          titulo: "TRAP-IoT: Tecnologia Resiliente para Aplicações em Protocolos IoT",
          texto: {
            pt: "Bolsista de pesquisa na UNIPAMPA desde 2026.",
            en: "Research scholarship holder at UNIPAMPA since 2026.",
          },
        },
      ],
    },
    {
      rotulo: { pt: "Grupo de pesquisa", en: "Research group" },
      itens: [
        {
          titulo: "AI Horizon Labs",
          texto: {
            pt: "Laboratório de IA e Engenharia de Software da UNIPAMPA.",
            en: "UNIPAMPA's AI and Software Engineering lab.",
          },
        },
      ],
    },
    {
      rotulo: { pt: "Desenvolvendo", en: "Building" },
      itens: [
        {
          titulo: "Código Mirim",
          selo: { pt: "Extensão", en: "Outreach" },
          texto: {
            pt: "Jogos que apresentam a programação para crianças de 6 a 14 anos, com materiais de aula para professores.",
            en: "Games that introduce programming to kids aged 6 to 14, with classroom materials for teachers.",
          },
        },
      ],
    },
  ],

  // "Sobre": um parágrafo por item. O primeiro aparece com mais destaque.
  sobre: [
    {
      pt: "Estudo Ciência da Computação na UNIPAMPA, em Alegrete, e faço parte do AI Horizon Labs, o laboratório de inteligência artificial e engenharia de software da universidade. Lá pesquiso cibersegurança com P4, uma linguagem que permite programar como os equipamentos de rede tratam cada pacote, e sou bolsista no projeto TRAP-IoT, sobre segurança em protocolos IoT.",
      en: "I study Computer Science at UNIPAMPA, in Alegrete, Brazil, and I'm part of AI Horizon Labs, the university's artificial intelligence and software engineering lab. There I research cybersecurity with P4, a language for programming how network devices handle each packet, and I hold a scholarship in the TRAP-IoT project, on IoT protocol security.",
    },
    {
      pt: "Meus principais interesses são cibersegurança, redes de computadores e inteligência artificial. Hoje estou aprendendo C e os fundamentos da computação, e aprendo melhor testando e colocando a mão na massa.",
      en: "My main interests are cybersecurity, computer networks and artificial intelligence. Right now I'm learning C and the fundamentals of computing, and I learn best by experimenting and getting my hands dirty.",
    },
    {
      pt: "Fora do laboratório, desenvolvo o Código Mirim, um site de jogos que apresenta a programação para crianças. Também curto música, esporte e viajar.",
      en: "Outside the lab, I'm building Código Mirim, a website of games that introduces programming to kids. I also enjoy music, sports and travelling.",
    },
  ],

  pesquisa: {
    rotulo: { pt: "Interesses de pesquisa", en: "Research interests" },
    // Principais (aparecem grandes e numeradas)
    linhas: [
      { pt: "Cibersegurança", en: "Cybersecurity" },
      { pt: "Redes programáveis (P4)", en: "Programmable networks (P4)" },
      { pt: "Inteligência Artificial", en: "Artificial intelligence" },
    ],
    // Outros interesses (aparecem como etiquetas)
    interesses: [
      { pt: "Redes de computadores", en: "Computer networks" },
      { pt: "Segurança em IoT", en: "IoT security" },
      { pt: "Linguagem C", en: "C programming" },
      { pt: "Tecnologia e educação", en: "Technology and education" },
    ],
  },

  // Como seu nome aparece nas listas de autores (fica em negrito).
  meuNomeNasPublicacoes: ["MEDEIROS, A. F.", "Medeiros, A. F."],

  // Publicações. Com destaque: true aparecem logo de cara; as outras ficam
  // atrás do botão "Ver todas". Lista vazia esconde a seção.
  // Modelo:
  // { ano: 2027, titulo: "Título", autores: "Medeiros, A. F.; Sobrenome, N.",
  //   local: "SIGLA 2027 · Nome do evento", url: "https://...", destaque: true },
  publicacoes: [],

  // Projetos. Cores da capa: indigo, violeta, azul, ciano, verde, laranja,
  // vermelho, rosa. Também aceita "imagem": "img/projeto.jpg".
  projetos: [
    {
      categoria: { pt: "Pesquisa · Redes", en: "Research · Networks" },
      titulo: { pt: "Cibersegurança com P4", en: "Cybersecurity with P4" },
      descricao: {
        pt: "Pesquisa no AI Horizon Labs sobre redes programáveis: o comportamento dos equipamentos de rede é escrito em P4 e pode ser usado para deixar a comunicação mais segura.",
        en: "Research at AI Horizon Labs on programmable networks, where the behavior of network devices is written in P4 and can be used to make communication more secure.",
      },
      tecnologias: ["P4", { pt: "Redes programáveis", en: "Programmable networks" }],
      cor: "violeta",
    },
    {
      categoria: { pt: "Pesquisa · IoT", en: "Research · IoT" },
      titulo: "TRAP-IoT",
      descricao: {
        pt: "Projeto de pesquisa sobre segurança em protocolos IoT: dispositivos conectados e sistemas de automação mais resilientes a ataques.",
        en: "Research project on IoT protocol security: making connected devices and automation systems more resilient to attacks.",
      },
      tecnologias: ["IoT", { pt: "Cibersegurança", en: "Cybersecurity" }],
      cor: "indigo",
    },
    {
      categoria: { pt: "Extensão · Educação", en: "Outreach · Education" },
      status: { pt: "Em desenvolvimento", en: "In progress" },
      titulo: "Código Mirim",
      descricao: {
        pt: "Site de jogos que apresenta a programação para crianças de 6 a 14 anos: guiar um robô até a estrela com setas, caçar bugs, programar em dupla e ligar celular, servidor e banco de dados. Os professores recebem slides, roteiro de aula e folhas de atividades, e uma Oficina de Prompts ensina a criar materiais com IA. Projeto de extensão com o curso de Engenharia de Software da UNIPAMPA.",
        en: "A website of games that introduces programming to kids aged 6 to 14: guiding a robot to a star with arrows, hunting bugs, pair programming and wiring a phone to a server and a database. Teachers get slides, a lesson plan and activity sheets, and a Prompt Workshop shows them how to create materials with AI. An outreach project with UNIPAMPA's Software Engineering program.",
      },
      papel: {
        pt: "sigo criando novos jogos e materiais e melhorando os que já existem.",
        en: "I keep building new games and materials and improving the existing ones.",
      },
      tecnologias: ["HTML", "CSS", "JavaScript"],
      cor: "verde",
      url: "https://medeiros08.github.io/Jogo-ES/",
    },
    {
      categoria: { pt: "Web · Design", en: "Web · Design" },
      titulo: { pt: "Sites para pequenos negócios", en: "Websites for small businesses" },
      descricao: {
        pt: "Trabalho anterior com design e desenvolvimento de sites, do rascunho ao site no ar. O portfólio reúne estudos de caso de consultório, salão e restaurante.",
        en: "Earlier work designing and building websites, from sketch to launch. The portfolio brings together case studies for a dental office, a salon and a restaurant.",
      },
      papel: { pt: "design e código.", en: "design and code." },
      tecnologias: ["HTML", "CSS", "JavaScript"],
      cor: "laranja",
      url: "https://medeiros08.github.io/portfolio/",
    },
  ],
  maisProjetos: "https://github.com/medeiros08", // apague a linha para esconder

  // Trajetória. "ate" pode ser um ano, "hoje" ou "andamento".
  formacao: [
    {
      de: 2026,
      ate: "andamento",
      titulo: { pt: "Bacharelado em Ciência da Computação", en: "B.Sc. in Computer Science" },
      instituicao: "UNIPAMPA",
    },
    {
      de: 2023,
      ate: 2025,
      titulo: { pt: "Ensino Médio", en: "High school" },
      instituicao: "Escola Estadual Nossa Senhora das Graças",
      detalhe: { pt: "**Aluno destaque.**", en: "**Outstanding student.**" },
    },
  ],
  experiencia: [
    {
      de: 2026,
      ate: "hoje",
      titulo: { pt: "Bolsista de pesquisa", en: "Research scholarship holder" },
      instituicao: "UNIPAMPA · AI Horizon Labs",
      detalhe: {
        pt: "Cibersegurança com P4 e o projeto TRAP-IoT, sobre segurança em protocolos IoT.",
        en: "Cybersecurity with P4 and the TRAP-IoT project, on IoT protocol security.",
      },
    },
    {
      de: 2026,
      ate: 2026,
      titulo: { pt: "Desenvolvedor web autônomo", en: "Freelance web developer" },
      instituicao: { pt: "Sites para pequenos negócios", en: "Websites for small businesses" },
      detalhe: {
        pt: "Design e código de sites, do rascunho ao site no ar.",
        en: "Website design and code, from sketch to launch.",
      },
    },
    {
      de: 2025,
      ate: 2025,
      titulo: { pt: "Aprendiz", en: "Apprentice" },
      instituicao: { pt: "Rede de farmácias", en: "Pharmacy chain" },
      detalhe: {
        pt: "Cuidei do sistema da empresa, do controle de entradas e saídas de mercadorias e do apoio ao comercial e à publicidade.",
        en: "Handled the company system, stock in and out control, and support for sales and advertising.",
      },
    },
  ],

  // Prêmios, competições, bancas, organização de eventos, representação...
  // Modelo: { ano: 2026, texto: "1º lugar na competição X" },
  reconhecimentos: [],

  contato: {
    emails: ["arthurfreitas.aluno@unipampa.edu.br"], // pode pôr mais de um
    cidade: "Alegrete, RS",
  },

  // Contador de visitas (GoatCounter, gratuito e sem cookies).
  // Crie a conta em https://www.goatcounter.com e coloque aqui o código escolhido,
  // por exemplo "medeiros08" para https://medeiros08.goatcounter.com. Vazio = desligado.
  contador: "medeiros08",

  // Trilha sonora: cole o link de uma playlist (ou álbum/música) do Spotify.
  // Ex.: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M". Vazio = escondido.
  trilhaSonora: "",

  // Formulário de contato (Formspree, gratuito): crie um formulário em https://formspree.io
  // e cole aqui o código dele (a parte depois de /f/ no endereço). Vazio = escondido.
  formulario: "",
};
