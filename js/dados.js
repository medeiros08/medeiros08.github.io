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
  // Nome completo, mostrado no rodapé: ajuda quem procura pelo nome do Lattes
  nomeCompleto: "Arthur De Freitas Medeiros",

  // Foto do topo (na pasta img/), mostrada num quadro estilo polaroide.
  foto: "img/foto.jpg",
  fotoPosicao: "50% 22%", // enquadramento da foto: "horizontal vertical"
  // true quando existem img/foto.avif e img/foto.webp (versões mais leves da mesma foto).
  // Se trocar a foto e não tiver essas versões, mude para false.
  fotoLeve: true,

  // Cor de destaque inicial (o visitante pode trocar no botão de paleta).
  // "claro" é usada no tema claro e "escuro" no tema escuro.
  cores: { claro: "#4338ff", escuro: "#9d9bff" },

  // Visual com que o site abre. Pode ser um tema do menu "Cores e temas" (oceano, sunset,
  // floresta, minimal, dourada, artico, deserto, tech, jardim, galaxia) ou "cor-0" para o original.
  // O visitante pode trocar no botão de paleta, e a escolha dele fica guardada no navegador.
  estilo: "areais",

  topo: {
    chamada: { pt: "Pesquisa em cibersegurança e P4", en: "Cybersecurity and P4 research" },
    frase: {
      pt: "Pesquiso como redes programáveis com P4 podem tornar a comunicação mais segura.",
      en: "I research how programmable networks with P4 can make communication more secure.",
    },
    detalhes: [{ pt: "Ciência da Computação", en: "Computer Science" }, "UNIPAMPA", "AI Horizon Labs"],
    // Telas de verdade do meu trabalho, em leque atrás da foto (até 4). Cada uma leva ao projeto.
    telas: [
      { titulo: "Oficina de Prompts", imagem: "img/gamificapampa/oficina.webp", url: { pt: "projetos/gamificapampa/", en: "en/projects/gamificapampa/" } },
      { titulo: "Conecta o Sistema", imagem: "img/gamificapampa/conecta.webp", url: { pt: "projetos/gamificapampa/", en: "en/projects/gamificapampa/" } },
      { titulo: { pt: "Sites para negócios", en: "Small business sites" }, imagem: "img/sites/portfolio.webp", url: "https://medeiros08.github.io/portfolio/" },
    ],
    // Etiquetas que flutuam em volta da foto (até 4)
    etiquetas: ["P4", "IoT", "CTF", "SYN → ACK"],
  },

  // Botões do topo. Tipos com ícone: lattes, orcid, scholar, github, linkedin,
  // email, instagram, cv, site. Use "rotulo" para trocar o texto do botão.
  // Para destacar um botão (com a cor do site), adicione principal: true.
  links: [
    { tipo: "github", url: "https://github.com/medeiros08" },
    { tipo: "linkedin", url: "https://www.linkedin.com/in/arthur-medeiros-34a344356/" },
    { tipo: "instagram", url: "https://www.instagram.com/medeiros__08/" },
    { tipo: "email" }, // usa o primeiro e-mail de "contato"
    { tipo: "orcid", url: "https://orcid.org/0009-0000-8991-4068" },
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
          titulo: "GamificaPampa",
          selo: { pt: "Extensão", en: "Outreach" },
          texto: {
            pt: "Jogos que apresentam a programação para crianças de 6 a 14 anos e uma Oficina de Prompts para professores, no hub de gamificação e IA da UNIPAMPA.",
            en: "Games that introduce programming to kids aged 6 to 14 and a Prompt Workshop for teachers, in UNIPAMPA's gamification and AI hub.",
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
      pt: "Fora do laboratório, crio os jogos e a Oficina de Prompts do GamificaPampa, um hub da UNIPAMPA que leva gamificação e IA para professores e apresenta a programação para crianças. Também curto música, esporte e viajar.",
      en: "Outside the lab, I build the games and the Prompt Workshop for GamificaPampa, a UNIPAMPA hub that brings gamification and AI to teachers and introduces programming to kids. I also enjoy music, sports and travelling.",
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
      categoria: { pt: "Pesquisa em redes", en: "Networks research" },
      titulo: { pt: "Cibersegurança com P4", en: "Cybersecurity with P4" },
      descricao: {
        pt: "Pesquisa no AI Horizon Labs sobre redes programáveis: o comportamento dos equipamentos de rede é escrito em P4 e pode ser usado para deixar a comunicação mais segura.",
        en: "Research at AI Horizon Labs on programmable networks, where the behavior of network devices is written in P4 and can be used to make communication more secure.",
      },
      tecnologias: ["P4", { pt: "Redes programáveis", en: "Programmable networks" }],
      cor: "violeta",
      // Capa feita de código: as linhas se digitam quando o cartão aparece
      codigo: [
        "table ipv4_lpm {",
        "  key = { hdr.ipv4.dstAddr: lpm; }",
        "  actions = { ipv4_forward; drop; }",
        "  default_action = drop();",
        "}",
        "apply { if (hdr.ipv4.isValid()) ipv4_lpm.apply(); }",
      ],
    },
    {
      categoria: { pt: "Pesquisa em IoT", en: "IoT research" },
      titulo: "TRAP-IoT",
      descricao: {
        pt: "Projeto de pesquisa sobre segurança em protocolos IoT: dispositivos conectados e sistemas de automação mais resilientes a ataques.",
        en: "Research project on IoT protocol security: making connected devices and automation systems more resilient to attacks.",
      },
      tecnologias: ["IoT", { pt: "Cibersegurança", en: "Cybersecurity" }],
      cor: "indigo",
      // Ilustração: uma captura de mensagens MQTT, com a conexão suspeita barrada
      codigo: [
        "sensor-07  CONNECT  ok",
        "sensor-07  PUBLISH  casa/temp 23.4",
        "10.0.0.66  CONNECT  sem senha ✗",
        "broker     PUBLISH  casa/porta",
      ],
    },
    {
      categoria: { pt: "Extensão e educação", en: "Outreach and education" },
      status: { pt: "Em desenvolvimento", en: "In progress" },
      titulo: "GamificaPampa",
      descricao: {
        pt: "Hub de extensão da UNIPAMPA que leva gamificação e IA a professores da Educação Básica de Alegrete. Criei os recursos pedagógicos: sete jogos que apresentam a programação para crianças de 6 a 14 anos (guiar um robô até a estrela, caçar bugs, programar em dupla, ligar celular, servidor e banco de dados), uma aula de 50 minutos com slides e atividades, e uma Oficina de Prompts que ensina professores a criar materiais com o Gemini.",
        en: "A UNIPAMPA outreach hub that brings gamification and AI to K-12 teachers in Alegrete. I built its teaching resources: seven games that introduce programming to kids aged 6 to 14 (guiding a robot to a star, hunting bugs, pair programming, wiring a phone to a server and a database), a 50-minute lesson with slides and activities, and a Prompt Workshop that teaches teachers to create materials with Gemini.",
      },
      papel: {
        pt: "crio os jogos e a oficina, e estou levando tudo para a organização do projeto no GitHub sem quebrar nenhum link ou QR code.",
        en: "I build the games and the workshop, and I'm moving everything to the project's GitHub organization without breaking any link or QR code.",
      },
      tecnologias: ["HTML", "CSS", "JavaScript"],
      cor: "verde",
      imagem: "img/gamificapampa/home.webp",
      url: "https://gamificapampa.github.io/",
      // Página com o estudo de caso (o título do cartão leva para ela)
      estudo: { pt: "projetos/gamificapampa/", en: "en/projects/gamificapampa/" },
    },
    {
      categoria: { pt: "Web e design", en: "Web and design" },
      titulo: { pt: "Sites para pequenos negócios", en: "Websites for small businesses" },
      descricao: {
        pt: "Trabalho anterior com design e desenvolvimento de sites, do rascunho ao site no ar. O portfólio reúne estudos de caso de consultório, salão e restaurante.",
        en: "Earlier work designing and building websites, from sketch to launch. The portfolio brings together case studies for a dental office, a salon and a restaurant.",
      },
      papel: { pt: "design e código.", en: "design and code." },
      tecnologias: ["HTML", "CSS", "JavaScript"],
      cor: "laranja",
      // Capa: uma janela de navegador com o endereço do portfólio de sites
      navegador: { endereco: "medeiros08.github.io/portfolio", paginas: [{ pt: "Consultório", en: "Dental office" }, { pt: "Salão", en: "Salon" }, { pt: "Restaurante", en: "Restaurant" }] },
      url: "https://medeiros08.github.io/portfolio/",
    },
  ],
  maisProjetos: "https://github.com/medeiros08", // apague a linha para esconder

  // Habilidades, em grupos. "onde" diz onde você usou; aprendendo: true marca o que está aprendendo.
  habilidades: [
    {
      grupo: { pt: "Linguagens", en: "Programming languages" },
      itens: [
        { nome: "Python", onde: { pt: "compilador da pesquisa com P4", en: "compiler in my P4 research" } },
        { nome: "P4", onde: { pt: "pesquisa no AI Horizon Labs", en: "research at AI Horizon Labs" } },
        { nome: "JavaScript", onde: { pt: "GamificaPampa e este site", en: "GamificaPampa and this site" } },
        { nome: { pt: "HTML e CSS", en: "HTML & CSS" }, onde: { pt: "sites e materiais de aula", en: "websites and class materials" } },
        { nome: "Shell (Bash)", onde: { pt: "scripts dos experimentos", en: "experiment scripts" } },
        { nome: "C", onde: { pt: "fundamentos da computação", en: "computing fundamentals" }, aprendendo: true },
      ],
    },
    {
      grupo: { pt: "Redes e segurança", en: "Networks and security" },
      itens: [
        { nome: "Snort 3", onde: { pt: "detecção de intrusos", en: "intrusion detection" } },
        { nome: "BMv2 e P4Runtime", onde: { pt: "switch P4 para testes", en: "P4 test switch" } },
        { nome: "Scapy", onde: { pt: "leitura e envio de pacotes", en: "reading and crafting packets" } },
        { nome: "Linux", onde: { pt: "ambiente dos experimentos", en: "experiment environment" } },
      ],
    },
    {
      grupo: { pt: "Ferramentas", en: "Tools" },
      itens: [
        { nome: { pt: "Git e GitHub", en: "Git & GitHub" }, onde: { pt: "todos os projetos", en: "every project" } },
        { nome: "LaTeX", onde: { pt: "escrita de artigos", en: "writing papers" } },
        { nome: { pt: "IA generativa (Claude e Gemini)", en: "Generative AI (Claude & Gemini)" }, onde: { pt: "desenvolvimento e Oficina de Prompts", en: "development and Prompt Workshop" } },
        { nome: "GitHub Pages", onde: { pt: "publicação dos sites", en: "publishing websites" } },
      ],
    },
    {
      grupo: { pt: "Idiomas", en: "Spoken languages" },
      itens: [
        { nome: { pt: "Português", en: "Portuguese" }, onde: { pt: "nativo", en: "native" } },
        { nome: { pt: "Espanhol", en: "Spanish" } },
        { nome: { pt: "Inglês", en: "English" } },
      ],
    },
  ],

  // Notas (mini-blog). Cada nota tem uma página em notas/<slug>/ e, em inglês, em en/notes/<slug>/.
  // A mais recente fica em primeiro.
  notas: [
    {
      slug: { pt: "p4-explicado", en: "p4-explained" },
      data: "2026-10-12",
      minutos: 4,
      titulo: { pt: "P4 explicado com uma agência dos correios", en: "P4 explained with a post office" },
      resumo: {
        pt: "O que é a linguagem que eu pesquiso, sem jargão: pacotes, carteiros e regras novas para os equipamentos da rede.",
        en: "The language I research, without the jargon: packets, mail carriers and new rules for network devices.",
      },
    },
    {
      slug: { pt: "o-que-e-ctf", en: "what-is-a-ctf" },
      data: "2026-10-12",
      minutos: 4,
      titulo: { pt: "O que é um CTF (e como começar)", en: "What is a CTF (and how to start)" },
      resumo: {
        pt: "As competições de segurança em que você procura bandeiras escondidas, e por onde começar sem se perder.",
        en: "The security competitions where you hunt for hidden flags, and where to start without getting lost.",
      },
    },
  ],

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
  trilhaSonora: "https://open.spotify.com/playlist/0Gmc8e5YDNIrZNovs6iUEq",

  // Formulário de contato (Formspree, gratuito): crie um formulário em https://formspree.io
  // e cole aqui o código dele (a parte depois de /f/ no endereço). Vazio = escondido.
  formulario: "https://formspree.io/f/xaeqbdok",

  // Livro de visitas (giscus): os recados ficam nas Discussions do repositório do site.
  // Precisa do app giscus instalado no repositório: https://github.com/apps/giscus
  // Para esconder, troque ligado: true por ligado: false.
  livroDeVisitas: {
    ligado: true,
    repo: "medeiros08/medeiros08.github.io",
    repoId: "R_kgDOVEVnlQ",
    categoria: "Announcements",
    categoriaId: "DIC_kwDOVEVnlc4DH9wG",
    discussao: 1, // github.com/medeiros08/medeiros08.github.io/discussions/1
  },
};
