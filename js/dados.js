/* =====================================================================
   SEUS DADOS: este é o único arquivo que você precisa editar.
   ---------------------------------------------------------------------
   • Um texto pode ser só em português:    "Olá"
     ou nos dois idiomas:                   { pt: "Olá", en: "Hello" }
     Se faltar o inglês, o site mostra o português no lugar.
   • Para esconder uma seção inteira, deixe a lista vazia: []
   • Nos textos dá pra usar **negrito** e [links](https://exemplo.com).
   • Só entra o que é trabalho meu. Na dúvida, confira os commits no GitHub.
   ===================================================================== */

window.DADOS = {
  // Idiomas do site. Use ["pt"] para ter só português (o botão EN some).
  idiomas: ["pt", "en"],

  nome: { primeiro: "Arthur", sobrenome: "Medeiros" },
  // Nome completo, mostrado no rodapé: ajuda quem procura pelo nome do Lattes
  nomeCompleto: "Arthur De Freitas Medeiros",

  // Foto (na pasta img/). fotoLeve: true quando existem img/foto.avif e img/foto.webp.
  foto: "img/foto.jpg",
  fotoPosicao: "50% 22%",
  fotoLeve: true,

  // O painel do topo: uma frase e o botão principal
  topo: {
    frase: {
      pt: "Faço jogos e ferramentas de IA para as escolas públicas de Alegrete.",
      en: "I make games and AI tools for the public schools of Alegrete, Brazil.",
    },
    detalhe: { pt: "Ciência da Computação, UNIPAMPA", en: "Computer Science, UNIPAMPA" },
    acao: { rotulo: { pt: "Ver os 19 jogos", en: "See the 19 games" }, alvo: "#jogos" },
  },

  // A folha de contato do topo: telas de verdade do que eu fiz, uma série por trabalho.
  // "cel" é tela de celular (em pé); "tela" é de computador (deitada). "url" é para onde a série leva.
  folha: [
    {
      titulo: "GamificaPampa",
      url: "#gamificapampa",
      quadros: [
        { imagem: "img/gp/pizzaria-das-fracoes.webp", legenda: { pt: "Pizzaria das Frações", en: "Fractions Pizzeria" }, formato: "cel" },
        { imagem: "img/gp/maquina.webp", legenda: { pt: "Máquina de prompts", en: "Prompt machine" }, formato: "tela" },
        { imagem: "img/gp/ninja.webp", legenda: { pt: "Ninja dos Bugs", en: "Bug Ninja" }, formato: "cel" },
        { imagem: "img/gp/detetive-da-noticia.webp", legenda: { pt: "Detetive da Notícia", en: "News Detective" }, formato: "cel" },
        { imagem: "img/gp/aula.webp", legenda: { pt: "Aula com os jogos", en: "Lesson with the games" }, formato: "tela" },
        { imagem: "img/gp/ciclo-da-agua.webp", legenda: { pt: "Ciclo da Água", en: "Water Cycle" }, formato: "cel" },
        { imagem: "img/gp/conecta.webp", legenda: { pt: "Conecta o Sistema", en: "Connect the System" }, formato: "cel" },
        { imagem: "img/gp/oficina.webp", legenda: { pt: "Oficina de Prompts", en: "Prompt Workshop" }, formato: "tela" },
        { imagem: "img/gp/genetica-do-bit.webp", legenda: { pt: "Genética do Bit", en: "Bit's Genetics" }, formato: "cel" },
        { imagem: "img/gp/balanca-do-bit.webp", legenda: { pt: "Balança do Bit", en: "Bit's Scale" }, formato: "cel" },
        { imagem: "img/gp/construtor.webp", legenda: { pt: "Construtor de prompts", en: "Prompt builder" }, formato: "tela" },
        { imagem: "img/gp/fabrica-de-silabas.webp", legenda: { pt: "Fábrica de Sílabas", en: "Syllable Factory" }, formato: "cel" },
        { imagem: "img/gp/linha-do-tempo.webp", legenda: { pt: "Linha do Tempo", en: "Timeline" }, formato: "cel" },
        { imagem: "img/gp/medalhas.webp", legenda: { pt: "Medalhas para imprimir", en: "Printable medals" }, formato: "tela" },
        { imagem: "img/gp/dupla.webp", legenda: { pt: "Programação em Dupla", en: "Pair Programming" }, formato: "cel" },
        { imagem: "img/gp/reta-do-bit.webp", legenda: { pt: "Reta do Bit", en: "Bit's Line" }, formato: "cel" },
        { imagem: "img/gp/certificado.webp", legenda: { pt: "Certificado da aula", en: "Lesson certificate" }, formato: "tela" },
        { imagem: "img/gp/atelie-das-cores.webp", legenda: { pt: "Ateliê das Cores", en: "Colour Studio" }, formato: "cel" },
        { imagem: "img/gp/slides.webp", legenda: { pt: "Slides da aula", en: "Lesson slides" }, formato: "tela" },
        { imagem: "img/gp/caminho-da-escola.webp", legenda: { pt: "Caminho da Escola", en: "Way to School" }, formato: "cel" },
        { imagem: "img/gp/circuito-do-bit.webp", legenda: { pt: "Circuito do Bit", en: "Bit's Circuit" }, formato: "cel" },
        { imagem: "img/gp/curso.webp", legenda: { pt: "Curso online", en: "Online course" }, formato: "tela" },
        { imagem: "img/gp/laboratorio-de-equacoes.webp", legenda: { pt: "Laboratório de Equações", en: "Equation Lab" }, formato: "cel" },
        { imagem: "img/gp/atividades.webp", legenda: { pt: "Folha de atividades", en: "Worksheet" }, formato: "tela" },
        { imagem: "img/gp/ingles-com-o-bit.webp", legenda: { pt: "Inglês com o Bit", en: "English with Bit" }, formato: "cel" },
        { imagem: "img/gp/arcade.webp", legenda: { pt: "Arcade do Código", en: "Code Arcade" }, formato: "cel" },
        { imagem: "img/gp/hub.webp", legenda: { pt: "Página do hub", en: "Hub page" }, formato: "tela" },
        { imagem: "img/gp/caca-bugs.webp", legenda: { pt: "Caça aos Bugs", en: "Bug Hunt" }, formato: "cel" },
        { imagem: "img/gp/missao-dev.webp", legenda: { pt: "Missão Dev", en: "Dev Mission" }, formato: "cel" },
      ],
    },
    {
      titulo: "Expresso Gaúcho",
      url: "https://medeiros08.github.io/expresso-gaucho/",
      quadros: [
        { imagem: "img/expresso/mapa.webp", legenda: { pt: "Expresso Gaúcho: mapa", en: "Expresso Gaúcho: map" }, formato: "tela" },
        { imagem: "img/expresso/cel.webp", legenda: { pt: "Expresso Gaúcho no celular", en: "Expresso Gaúcho on a phone" }, formato: "cel" },
        { imagem: "img/expresso/saidas.webp", legenda: { pt: "Próximos ônibus", en: "Next buses" }, formato: "tela" },
      ],
    },
    {
      titulo: { pt: "Sites para negócios", en: "Small business sites" },
      url: "https://medeiros08.github.io/portfolio/",
      quadros: [
        { imagem: "img/sites/portfolio.webp", legenda: { pt: "Portfólio de sites", en: "Sites portfolio" }, formato: "tela" },
      ],
    },
  ],

  // Botões de contato e perfis. Tipos: github, linkedin, instagram, email, orcid, lattes.
  links: [
    { tipo: "github", url: "https://github.com/medeiros08" },
    { tipo: "linkedin", url: "https://www.linkedin.com/in/arthur-medeiros-34a344356/" },
    { tipo: "email" }, // usa o primeiro e-mail de "contato"
    { tipo: "lattes", url: "http://lattes.cnpq.br/3699255553076395" },
    { tipo: "orcid", url: "https://orcid.org/0009-0000-8991-4068" },
    { tipo: "instagram", url: "https://www.instagram.com/medeiros__08/" },
  ],

  // O trabalho principal. Autoria conferida nos commits da organização GamificaPampa no GitHub.
  gamificapampa: {
    url: "https://gamificapampa.github.io/",
    estudo: { pt: "projetos/gamificapampa/", en: "en/projects/gamificapampa/" },
    // Uma imagem cortada em quadrados (computador) e em retrato (celular)
    mosaico: { imagem: "img/gp/hub-grande.webp", imagemCel: "img/gp/hub-cel.webp" },
    titulo: { pt: "GamificaPampa", en: "GamificaPampa" },
    numeros: [
      { valor: "19", rotulo: { pt: "jogos que eu fiz, do 1º ano ao ensino médio", en: "games I made, from first grade to high school" } },
      { valor: "11", rotulo: { pt: "matérias, de Programação a Biologia", en: "subjects, from Programming to Biology" } },
      { valor: "0", rotulo: { pt: "cadastros para jogar: abre e joga", en: "sign-ups to play: open and go" } },
    ],
    texto: {
      pt: "O GamificaPampa reúne projetos de extensão da UNIPAMPA, Campus Alegrete, que levam IA e gamificação para professores de escolas públicas. Eu faço o que chega na sala de aula: os jogos que as crianças abrem pelo QR code, a aula de 50 minutos, a Oficina de Prompts e a Máquina de prompts. Tudo funciona no celular, no tablet ou no projetor.",
      en: "GamificaPampa brings together UNIPAMPA outreach projects (Alegrete campus) that take AI and gamification to public-school teachers. I make what reaches the classroom: the games kids open through a QR code, the 50-minute lesson, the Prompt Workshop and the Prompt Machine. Everything runs on a phone, a tablet or a projector.",
    },
    creditos: {
      pt: "O hub é coordenado pelos professores Paulo Silas Severo de Souza (GamificaEdu) e Silvio Ereno Quincozes (Educador 5.0). A identidade visual, o mascote Bit e o jogo Robô pega a estrela são de Paulo Severo.",
      en: "The hub is coordinated by professors Paulo Silas Severo de Souza (GamificaEdu) and Silvio Ereno Quincozes (Educador 5.0). The visual identity, the Bit mascot and the Robot Gets the Star game are by Paulo Severo.",
    },
    // Os jogos que eu fiz. "idade" é a faixa indicada no repositório; os sem idade indicada valem de 6 a 14.
    jogos: [
      { nome: { pt: "Ninja dos Bugs", en: "Bug Ninja" }, materia: "prog", idade: [6, 14], slug: "ninja" },
      { nome: { pt: "Programação em Dupla", en: "Pair Programming" }, materia: "prog", idade: [7, 14], slug: "dupla" },
      { nome: { pt: "Conecta o Sistema", en: "Connect the System" }, materia: "prog", idade: [8, 14], slug: "conecta" },
      { nome: { pt: "Arcade do Código", en: "Code Arcade" }, materia: "prog", idade: [6, 14], slug: "arcade" },
      { nome: { pt: "Caça aos Bugs", en: "Bug Hunt" }, materia: "prog", idade: [6, 14], slug: "caca-bugs" },
      { nome: { pt: "Missão Dev", en: "Dev Mission" }, materia: "prog", idade: [6, 14], slug: "missao-dev" },
      { nome: { pt: "Fábrica de Sílabas", en: "Syllable Factory" }, materia: "port", idade: [6, 7], slug: "fabrica-de-silabas" },
      { nome: { pt: "Caminho da Escola", en: "Way to School" }, materia: "geo", idade: [8, 9], slug: "caminho-da-escola" },
      { nome: { pt: "Ateliê das Cores", en: "Colour Studio" }, materia: "artes", idade: [8, 10], slug: "atelie-das-cores" },
      { nome: { pt: "Circuito do Bit", en: "Bit's Circuit" }, materia: "edfis", idade: [8, 11], slug: "circuito-do-bit" },
      { nome: { pt: "Pizzaria das Frações", en: "Fractions Pizzeria" }, materia: "mat", idade: [9, 10], slug: "pizzaria-das-fracoes" },
      { nome: { pt: "Ciclo da Água", en: "Water Cycle" }, materia: "cien", idade: [10, 11], slug: "ciclo-da-agua" },
      { nome: { pt: "Linha do Tempo", en: "Timeline" }, materia: "hist", idade: [11, 12], slug: "linha-do-tempo" },
      { nome: { pt: "Inglês com o Bit", en: "English with Bit" }, materia: "ingl", idade: [11, 12], slug: "ingles-com-o-bit" },
      { nome: { pt: "Balança do Bit", en: "Bit's Scale" }, materia: "mat", idade: [12, 13], slug: "balanca-do-bit" },
      { nome: { pt: "Detetive da Notícia", en: "News Detective" }, materia: "port", idade: [12, 15], slug: "detetive-da-noticia" },
      { nome: { pt: "Reta do Bit", en: "Bit's Line" }, materia: "mat", idade: [15, 15], slug: "reta-do-bit" },
      { nome: { pt: "Laboratório de Equações", en: "Equation Lab" }, materia: "quim", idade: [15, 15], slug: "laboratorio-de-equacoes" },
      { nome: { pt: "Genética do Bit", en: "Bit's Genetics" }, materia: "bio", idade: [17, 17], slug: "genetica-do-bit" },
    ],
    materias: {
      prog: { pt: "Programação", en: "Programming" },
      mat: { pt: "Matemática", en: "Maths" },
      port: { pt: "Português", en: "Portuguese" },
      cien: { pt: "Ciências", en: "Science" },
      geo: { pt: "Geografia", en: "Geography" },
      hist: { pt: "História", en: "History" },
      artes: { pt: "Artes", en: "Art" },
      edfis: { pt: "Educação Física", en: "PE" },
      ingl: { pt: "Inglês", en: "English" },
      quim: { pt: "Química", en: "Chemistry" },
      bio: { pt: "Biologia", en: "Biology" },
    },
    // Endereço de cada jogo: base + slug + "/"
    baseJogos: "https://gamificapampa.github.io/recursos-pedagogicos/criancas/",
    // Para professores: nome, o que é, e um valor curto na ponta direita
    professores: [
      {
        nome: { pt: "Aula com os jogos", en: "Lesson with the games" },
        texto: { pt: "Roteiro, slides, folha de atividades e certificado", en: "Script, slides, worksheet and certificate" },
        valor: "50 min",
        url: "https://gamificapampa.github.io/recursos-pedagogicos/professores/aula-engenharia-de-software/",
      },
      {
        nome: { pt: "Oficina de Prompts", en: "Prompt Workshop" },
        texto: { pt: "Professores criam aulas, atividades e jogos com o Gemini", en: "Teachers create lessons, activities and games with Gemini" },
        valor: { pt: "4 encontros", en: "4 sessions" },
        url: "https://gamificapampa.github.io/recursos-pedagogicos/professores/oficina-prompts/",
      },
      {
        nome: { pt: "Curso online", en: "Online course" },
        texto: { pt: "A Oficina no ritmo de cada um, com prática na página", en: "The Workshop at your own pace, with practice on the page" },
        valor: { pt: "4 módulos", en: "4 modules" },
        url: "https://gamificapampa.github.io/recursos-pedagogicos/professores/oficina-prompts/curso.html",
      },
      {
        nome: { pt: "Máquina de prompts", en: "Prompt Machine" },
        texto: { pt: "Escolhe turma, matéria e tema, e ela monta o pedido", en: "Pick class, subject and topic, and it writes the prompt" },
        valor: "Gemini",
        url: "https://gamificapampa.github.io/maquina/",
      },
      {
        nome: { pt: "Kit sem internet", en: "Offline kit" },
        texto: { pt: "Jogos e aula num arquivo só, para quando a rede cai", en: "Games and lesson in one file, for when the network drops" },
        valor: ".zip",
        url: "https://github.com/GamificaPampa/recursos-pedagogicos/releases/download/kit-sem-internet/kit-sem-internet.zip",
      },
      {
        nome: { pt: "Medalhas", en: "Medals" },
        texto: { pt: "Para imprimir e entregar na hora da conquista", en: "To print and hand out the moment a kid earns one" },
        valor: "A4",
        url: "https://gamificapampa.github.io/recursos-pedagogicos/professores/medalhas/",
      },
    ],
  },

  // Outros trabalhos, em linhas: título e frase à esquerda, um valor curto à direita.
  projetos: [
    {
      titulo: "Expresso Gaúcho",
      texto: {
        pt: "Linhas, horários e ônibus em tempo real para Alegrete, instalável no celular e com horários sem internet. Disciplina de Inovação e Criatividade.",
        en: "Bus lines, timetables and live buses for Alegrete, installable on a phone and with timetables offline. Innovation and Creativity course.",
      },
      valor: { pt: "9 linhas", en: "9 lines" },
      imagem: "img/expresso/mapa.webp",
      url: "https://medeiros08.github.io/expresso-gaucho/",
    },
    {
      titulo: { pt: "Sites para pequenos negócios", en: "Websites for small businesses" },
      texto: {
        pt: "Design e código, do rascunho ao site no ar: consultório, salão e restaurante.",
        en: "Design and code, from sketch to launch: a dental office, a salon and a restaurant.",
      },
      valor: { pt: "3 casos", en: "3 cases" },
      imagem: "img/sites/portfolio.webp",
      url: "https://medeiros08.github.io/portfolio/",
    },
    {
      titulo: { pt: "Compilador Snort → P4", en: "Snort → P4 compiler" },
      texto: {
        pt: "Pesquisa: regras do Snort 3 viram pré-filtros num switch de rede. Com Silvio E. Quincozes.",
        en: "Research: Snort 3 rules become pre-filters in a network switch. With Silvio E. Quincozes.",
      },
      valor: { pt: "artigo", en: "paper" },
      url: "https://github.com/medeiros08/Snort-p4",
    },
    {
      titulo: "TRAP-IoT",
      texto: {
        pt: "Bolsa de pesquisa sobre segurança em protocolos de dispositivos conectados.",
        en: "Research scholarship on the security of connected-device protocols.",
      },
      valor: { pt: "bolsa", en: "grant" },
    },
  ],

  sobre: {
    fatos: [
      { rotulo: { pt: "Curso", en: "Degree" }, valor: { pt: "Ciência da Computação", en: "Computer Science" } },
      { rotulo: { pt: "Onde", en: "Where" }, valor: "UNIPAMPA, Alegrete/RS" },
      { rotulo: { pt: "Grupo", en: "Lab" }, valor: "AI Horizon Labs" },
    ],
    texto: {
      pt: "Estudo Ciência da Computação na UNIPAMPA, em Alegrete, desde 2026. A maior parte do meu tempo vai para o GamificaPampa, fazendo jogos e ferramentas que professores de escolas públicas usam com as turmas. No AI Horizon Labs sou bolsista de pesquisa em segurança de redes e IoT. Aprendo melhor colocando a mão na massa, e fora do teclado curto música, esporte e viajar.",
      en: "I've studied Computer Science at UNIPAMPA, in Alegrete, since 2026. Most of my time goes to GamificaPampa, making games and tools that public-school teachers use with their classes. At AI Horizon Labs I hold a research scholarship in network and IoT security. I learn best by getting my hands dirty, and away from the keyboard I enjoy music, sports and travelling.",
    },
    // Duas listas: nome à esquerda, ano ou lugar à direita
    trajetoria: [
      { nome: { pt: "GamificaPampa, jogos e Oficina de Prompts", en: "GamificaPampa, games and Prompt Workshop" }, valor: "2026" },
      { nome: { pt: "Bolsista de pesquisa, AI Horizon Labs", en: "Research scholarship, AI Horizon Labs" }, valor: "2026" },
      { nome: { pt: "Ciência da Computação, UNIPAMPA", en: "Computer Science, UNIPAMPA" }, valor: { pt: "2026–", en: "2026–" } },
      { nome: { pt: "Desenvolvedor web autônomo", en: "Freelance web developer" }, valor: "2026" },
      { nome: { pt: "Aprendiz, rede de farmácias", en: "Apprentice, pharmacy chain" }, valor: "2025" },
      { nome: { pt: "Ensino Médio, aluno destaque", en: "High school, outstanding student" }, valor: "2023–25" },
    ],
    ferramentas: [
      { nome: { pt: "JavaScript, HTML e CSS", en: "JavaScript, HTML & CSS" }, valor: { pt: "jogos e sites", en: "games and sites" } },
      { nome: { pt: "IA generativa (Gemini e Claude)", en: "Generative AI (Gemini & Claude)" }, valor: { pt: "Oficina", en: "Workshop" } },
      { nome: { pt: "Git e GitHub", en: "Git & GitHub" }, valor: { pt: "tudo", en: "everything" } },
      { nome: "Python", valor: { pt: "pesquisa", en: "research" } },
      { nome: { pt: "Linux e Bash", en: "Linux & Bash" }, valor: { pt: "experimentos", en: "experiments" } },
      { nome: "C", valor: { pt: "aprendendo", en: "learning" } },
      { nome: { pt: "Português, espanhol, inglês", en: "Portuguese, Spanish, English" }, valor: { pt: "idiomas", en: "languages" } },
    ],
  },

  // Notas (mini-blog). Cada nota tem uma página em notas/<slug>/ e, em inglês, em en/notes/<slug>/.
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

  contato: {
    emails: ["arthurfreitas.aluno@unipampa.edu.br"], // pode pôr mais de um
    cidade: "Alegrete, RS",
    frase: {
      pt: "É professor e quer os jogos na sua escola, ou tem um projeto em mente? Escreva.",
      en: "Teaching and want the games at your school, or have a project in mind? Write to me.",
    },
  },

  // Contador de visitas (GoatCounter, gratuito e sem cookies). Vazio = desligado.
  contador: "medeiros08",

  // Formulário de contato (Formspree): o código depois de /f/ no endereço. Vazio = escondido.
  formulario: "https://formspree.io/f/xaeqbdok",
};
