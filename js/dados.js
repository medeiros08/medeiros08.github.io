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
  estilo: "marinho",

  topo: {
    chamada: { pt: "IA que se explica, na pesquisa e na escola", en: "AI that explains itself, in research and in school" },
    frase: {
      pt: "Pesquiso detecção de intrusões com IA explicável no XAIID e faço jogos e ferramentas de IA para as escolas públicas de Alegrete no GamificaPampa.",
      en: "I research intrusion detection with explainable AI in XAIID, and I make games and AI tools for the public schools of Alegrete, Brazil, at GamificaPampa.",
    },
    detalhes: [{ pt: "Ciência da Computação", en: "Computer Science" }, "UNIPAMPA", "AI Horizon Labs"],
    // Telas de verdade do meu trabalho, em leque atrás da foto (até 4). Cada uma leva ao projeto.
    telas: [
      { titulo: "GamificaPampa", imagem: "img/gp/hub.webp", url: { pt: "projetos/gamificapampa/", en: "en/projects/gamificapampa/" } },
      { titulo: "Expresso Gaúcho", imagem: "img/expresso/mapa.webp", url: "https://medeiros08.github.io/expresso-gaucho/" },
    ],
    // Etiquetas que flutuam em volta da foto (até 4)
    etiquetas: ["XAIID", "GamificaPampa", { pt: "IA explicável", en: "Explainable AI" }, { pt: "IA na educação", en: "AI in education" }],
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
      rotulo: { pt: "Desenvolvendo", en: "Building" },
      itens: [
        {
          titulo: "GamificaPampa",
          selo: { pt: "Extensão", en: "Outreach" },
          texto: {
            pt: "19 jogos para turmas do 1º ano ao ensino médio, e a Oficina de Prompts e a Máquina de prompts para professores, no hub de IA e gamificação da UNIPAMPA.",
            en: "19 games for classes from first grade to high school, plus the Prompt Workshop and the Prompt Machine for teachers, in UNIPAMPA's AI and gamification hub.",
          },
        },
        {
          titulo: "Expresso Gaúcho",
          texto: {
            pt: "Linhas, horários e ônibus em tempo real para Alegrete.",
            en: "Bus lines, timetables and live buses for Alegrete.",
          },
        },
      ],
    },
    {
      rotulo: { pt: "Pesquisa", en: "Research" },
      itens: [
        {
          titulo: "XAIID",
          selo: { pt: "Bolsa", en: "Scholarship" },
          texto: {
            pt: "Bolsista desde novembro de 2026: detecção de intrusões em sistemas ciber-físicos com aprendizado de máquina e IA explicável.",
            en: "Scholarship holder since November 2026: intrusion detection in cyber-physical systems with machine learning and explainable AI.",
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
  ],

  // "Sobre": um parágrafo por item. O primeiro aparece com mais destaque.
  sobre: [
    {
      pt: "Estudo Ciência da Computação na UNIPAMPA, em Alegrete, e a maior parte do meu tempo vai para o GamificaPampa: faço os jogos que as crianças abrem pelo celular na sala de aula e as ferramentas que ajudam professores de escolas públicas a criar materiais com IA.",
      en: "I study Computer Science at UNIPAMPA, in Alegrete, Brazil, and most of my time goes to GamificaPampa: I make the games kids open on their phones in class and the tools that help public-school teachers create materials with AI.",
    },
    {
      pt: "Também sou bolsista de pesquisa no XAIID, projeto da UNIPAMPA coordenado pelo professor Silvio E. Quincozes: uso aprendizado de máquina para detectar ataques em sistemas ciber-físicos e IA explicável para entender por que o modelo decidiu cada coisa. Faço parte do AI Horizon Labs, o laboratório de inteligência artificial e engenharia de software da universidade. Aprendo melhor testando e colocando a mão na massa.",
      en: "I also hold a research scholarship in XAIID, a UNIPAMPA project led by professor Silvio E. Quincozes: I use machine learning to detect attacks on cyber-physical systems and explainable AI to understand why the model decided what it did. I'm part of AI Horizon Labs, the university's artificial intelligence and software engineering lab. I learn best by experimenting and getting my hands dirty.",
    },
    {
      pt: "Fora do teclado, curto música, esporte e viajar.",
      en: "Away from the keyboard, I enjoy music, sports and travelling.",
    },
  ],

  pesquisa: {
    rotulo: { pt: "Interesses", en: "Interests" },
    linhas: [
      { pt: "Jogos na educação", en: "Games in education" },
      { pt: "IA na sala de aula", en: "AI in the classroom" },
      { pt: "Detecção de intrusões", en: "Intrusion detection" },
      { pt: "IA explicável", en: "Explainable AI" },
    ],
    interesses: [
      { pt: "Cibersegurança", en: "Cybersecurity" },
      { pt: "Desenvolvimento web", en: "Web development" },
      { pt: "Redes de computadores", en: "Computer networks" },
      { pt: "Linguagem C", en: "C programming" },
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
      categoria: { pt: "Extensão e educação", en: "Outreach and education" },
      status: { pt: "Em desenvolvimento", en: "In progress" },
      titulo: "GamificaPampa",
      descricao: {
        pt: "Hub de extensão da UNIPAMPA que leva IA e gamificação a professores de escolas públicas de Alegrete. Fiz 19 dos 20 jogos (6 de programação e 13 por matéria, do 1º ano ao ensino médio), a aula de 50 minutos, a Oficina de Prompts e a Máquina de prompts.",
        en: "A UNIPAMPA outreach hub that brings AI and gamification to public-school teachers in Alegrete. I made 19 of its 20 games (6 on programming and 13 across subjects, from first grade to high school), the 50-minute lesson, the Prompt Workshop and the Prompt Machine.",
      },
      papel: {
        pt: "jogos, aula, Oficina e Máquina de prompts. A identidade visual e o Robô pega a estrela são de Paulo Severo.",
        en: "games, lesson, Workshop and Prompt Machine. The visual identity and Robot Gets the Star are by Paulo Severo.",
      },
      tecnologias: ["HTML", "CSS", "JavaScript"],
      cor: "verde",
      imagem: "img/gp/hub.webp",
      url: "https://gamificapampa.github.io/",
      // Página com o estudo de caso (o título do cartão leva para ela)
      estudo: { pt: "projetos/gamificapampa/", en: "en/projects/gamificapampa/" },
    },
    {
      categoria: { pt: "Transporte público", en: "Public transport" },
      titulo: "Expresso Gaúcho",
      descricao: {
        pt: "Linhas, horários e ônibus em tempo real para Alegrete, com os horários reais de 9 linhas, mapa da cidade e alertas. Instala no celular e mostra os horários mesmo sem internet. Disciplina de Inovação e Criatividade.",
        en: "Bus lines, timetables and live buses for Alegrete, with the real timetables of 9 lines, a city map and alerts. It installs on a phone and shows timetables even offline. Innovation and Creativity course.",
      },
      papel: { pt: "design e código.", en: "design and code." },
      tecnologias: ["JavaScript", "PWA", "Leaflet"],
      cor: "azul",
      imagem: "img/expresso/mapa.webp",
      url: "https://medeiros08.github.io/expresso-gaucho/",
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
      // Capa: a página do portfólio de sites, capturada do site publicado
      imagem: "img/sites/portfolio.webp",
      url: "https://medeiros08.github.io/portfolio/",
    },
    {
      categoria: { pt: "Pesquisa", en: "Research" },
      titulo: "XAIID",
      descricao: {
        pt: "Detecção de intrusões em sistemas ciber-físicos com aprendizado de máquina e IA explicável, coordenado por Silvio E. Quincozes. Minha parte agora: descobrir quais características do tráfego mais ajudam a reconhecer cada tipo de ataque e ver se esses rankings se mantêm de um cenário para outro.",
        en: "Intrusion detection in cyber-physical systems with machine learning and explainable AI, led by Silvio E. Quincozes. My part right now: finding which traffic features best recognize each kind of attack and checking whether those rankings hold from one scenario to another.",
      },
      papel: { pt: "bolsista de pesquisa, desde novembro de 2026.", en: "research scholarship holder, since November 2026." },
      tecnologias: ["Python", "scikit-learn", { pt: "IA explicável", en: "Explainable AI" }],
      cor: "indigo",
      // Ilustração: os passos da análise de importância das features por classe
      codigo: [
        "mi   = mutual_info_classif(X, y == ataque)",
        "perm = permutation_importance(rf, X_val, y_val)",
        "jaccard(top10[A], top10[B])",
        "spearman(ranking[A], ranking[B])",
      ],
    },
  ],
  // "Na bancada": cada aba é um trabalho com o material de verdade (código, telas, números medidos).
  // Só entra o que é trabalho meu e o que está publicado. Lista vazia esconde a seção.
  casos: [
    {
      aba: "GamificaPampa",
      resumo: { pt: "Extensão · jogos e ferramentas", en: "Outreach · games and tools" },
      titulo: { pt: "Da sala de aula ao celular das crianças", en: "From the classroom to the kids' phones" },
      texto: {
        pt: "O professor projeta o menu da turma e as crianças abrem os jogos pelo QR code, sem cadastro. Para os professores, a Oficina de Prompts e a Máquina de prompts ensinam a pedir ao Gemini planos de aula, atividades e até jogos.",
        en: "The teacher projects the class menu and kids open the games through a QR code, with no sign-up. For teachers, the Prompt Workshop and the Prompt Machine show how to ask Gemini for lesson plans, activities and even games.",
      },
      telas: [
        { imagem: "img/gp/maquina.webp", legenda: { pt: "Máquina de prompts: escolhe a turma e ela monta o pedido", en: "Prompt Machine: pick the class and it writes the prompt" } },
        { imagem: "img/gp/aula.webp", legenda: { pt: "Aula com os jogos: roteiro, slides e folha", en: "Lesson with the games: script, slides and worksheet" } },
        { imagem: "img/gp/oficina.webp", legenda: { pt: "Oficina de Prompts para professores", en: "Prompt Workshop for teachers" } },
      ],
      numeros: [
        { valor: "19", rotulo: { pt: "jogos, do 1º ano ao ensino médio", en: "games, from first grade to high school" } },
        { valor: "11", rotulo: { pt: "matérias, de Programação a Biologia", en: "subjects, from Programming to Biology" } },
        { valor: "50 min", rotulo: { pt: "de aula, com roteiro e certificado", en: "lesson, with script and certificate" } },
      ],
      link: { url: { pt: "projetos/gamificapampa/", en: "en/projects/gamificapampa/" }, rotulo: { pt: "Ler o estudo de caso", en: "Read the case study" } },
    },
    {
      aba: "Expresso Gaúcho",
      resumo: { pt: "Transporte · app instalável", en: "Transport · installable app" },
      titulo: { pt: "Quando passa o próximo ônibus?", en: "When does the next bus come?" },
      texto: {
        pt: "Os horários de Alegrete existiam, mas espalhados em tabelas difíceis de ler no celular. O app junta linhas, paradas e mapa, e mostra de onde vem cada previsão: tabela, ajuste pelo horário do dia ou aviso ao vivo.",
        en: "Alegrete's timetables existed, but scattered across tables that are hard to read on a phone. The app brings lines, stops and a map together, and shows where each prediction comes from: timetable, time-of-day adjustment or a live report.",
      },
      telas: [
        { imagem: "img/expresso/mapa.webp", legenda: { pt: "Mapa com o trajeto e a posição estimada", en: "Map with the route and estimated position" } },
        { imagem: "img/expresso/saidas.webp", legenda: { pt: "Próximos ônibus na parada", en: "Next buses at the stop" } },
      ],
      numeros: [
        { valor: "9", rotulo: { pt: "linhas com os horários reais", en: "lines with the real timetables" } },
        { valor: "3", rotulo: { pt: "fontes na previsão, sem GPS nos ônibus", en: "sources in each prediction, no GPS on the buses" } },
      ],
      link: { url: "https://medeiros08.github.io/expresso-gaucho/", rotulo: { pt: "Abrir o Expresso Gaúcho", en: "Open Expresso Gaúcho" } },
    },
    {
      aba: { pt: "Sites para negócios", en: "Small business sites" },
      resumo: { pt: "Web · design e código", en: "Web · design and code" },
      titulo: { pt: "Do rascunho ao site no ar", en: "From sketch to live site" },
      texto: {
        pt: "Trabalho anterior: desenho e programo cada página, sem template comprado nem construtor de arrastar. O portfólio reúne os estudos de caso de um consultório, um salão e um restaurante.",
        en: "Earlier work: I design and code every page, with no bought template or drag-and-drop builder. The portfolio collects case studies for a dental office, a salon and a restaurant.",
      },
      telas: [
        { imagem: "img/sites/portfolio.webp", legenda: { pt: "Página inicial do portfólio de sites", en: "Home page of the sites portfolio" } },
      ],
      numeros: [
        { valor: "3", rotulo: { pt: "estudos de caso: consultório, salão e restaurante", en: "case studies: dental office, salon and restaurant" } },
      ],
      link: { url: "https://medeiros08.github.io/portfolio/", rotulo: { pt: "Abrir o portfólio de sites", en: "Open the sites portfolio" } },
    },
  ],

  maisProjetos: "https://github.com/medeiros08", // apague a linha para esconder

  // Habilidades, em grupos. "onde" diz onde você usou; aprendendo: true marca o que está aprendendo.
  habilidades: [
    {
      grupo: { pt: "Linguagens", en: "Programming languages" },
      itens: [
        { nome: "JavaScript", onde: { pt: "jogos do GamificaPampa e Expresso Gaúcho", en: "GamificaPampa games and Expresso Gaúcho" } },
        { nome: { pt: "HTML e CSS", en: "HTML & CSS" }, onde: { pt: "sites e materiais de aula", en: "websites and class materials" } },
        { nome: "Python", onde: { pt: "pesquisa no XAIID", en: "research in XAIID" } },
        { nome: "Shell (Bash)", onde: { pt: "scripts dos experimentos", en: "experiment scripts" } },
        { nome: "C", onde: { pt: "fundamentos da computação", en: "computing fundamentals" }, aprendendo: true },
      ],
    },
    {
      grupo: { pt: "Dados e segurança", en: "Data and security" },
      itens: [
        { nome: "scikit-learn", onde: { pt: "modelos e importância de features no XAIID", en: "models and feature importance in XAIID" }, aprendendo: true },
        { nome: { pt: "Notebooks no Kaggle", en: "Kaggle notebooks" }, onde: { pt: "experimentos do XAIID", en: "XAIID experiments" } },
        { nome: "Snort 3", onde: { pt: "detecção de intrusos", en: "intrusion detection" } },
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
      slug: { pt: "ia-explicavel", en: "explainable-ai" },
      data: "2026-11-21",
      minutos: 4,
      titulo: { pt: "IA explicável e o cavalo que sabia contar", en: "Explainable AI and the horse who could count" },
      resumo: {
        pt: "O que é IA explicável, sem jargão: um cavalo que acertava contas pelo motivo errado e o que isso tem a ver com detectar ataques.",
        en: "Explainable AI without the jargon: a horse who did arithmetic for the wrong reason, and what that has to do with detecting attacks.",
      },
    },
    {
      slug: { pt: "p4-explicado", en: "p4-explained" },
      data: "2026-10-12",
      minutos: 4,
      titulo: { pt: "P4 explicado com uma agência dos correios", en: "P4 explained with a post office" },
      resumo: {
        pt: "O que é a linguagem que eu pesquisei, sem jargão: pacotes, carteiros e regras novas para os equipamentos da rede.",
        en: "The language I researched, without the jargon: packets, mail carriers and new rules for network devices.",
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
      titulo: { pt: "Extensão: jogos e ferramentas de IA", en: "Outreach: games and AI tools" },
      instituicao: "GamificaPampa · UNIPAMPA",
      detalhe: {
        pt: "19 jogos, a aula de 50 minutos, a Oficina de Prompts e a Máquina de prompts.",
        en: "19 games, the 50-minute lesson, the Prompt Workshop and the Prompt Machine.",
      },
    },
    {
      de: 2026,
      ate: "hoje",
      titulo: { pt: "Bolsista de pesquisa no XAIID", en: "Research scholarship holder, XAIID" },
      instituicao: "UNIPAMPA",
      detalhe: {
        pt: "Desde novembro de 2026. Detecção de intrusões em sistemas ciber-físicos com aprendizado de máquina e IA explicável, com o professor Silvio E. Quincozes.",
        en: "Since November 2026. Intrusion detection in cyber-physical systems with machine learning and explainable AI, with professor Silvio E. Quincozes.",
      },
    },
    {
      de: 2026,
      ate: 2026,
      titulo: { pt: "Bolsista de pesquisa", en: "Research scholarship holder" },
      instituicao: "UNIPAMPA · AI Horizon Labs",
      detalhe: {
        pt: "Projeto TRAP-IoT, sobre segurança em protocolos IoT, e um compilador de regras do Snort 3 para P4.",
        en: "The TRAP-IoT project, on IoT protocol security, and a compiler from Snort 3 rules to P4.",
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
