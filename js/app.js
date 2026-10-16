/* Monta o portfólio a partir de js/dados.js. Não é preciso editar este arquivo. */
(function () {
  "use strict";

  const D = window.DADOS;
  const raiz = document.documentElement;
  const $ = (seletor) => document.querySelector(seletor);
  // Rolagem por script não obedece ao prefers-reduced-motion do CSS, então pergunta antes
  const rolagem = () => (matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");

  if (!D) {
    $("#conteudo").innerHTML = '<p style="padding:120px 24px">Não encontrei os dados em js/dados.js.</p>';
    return;
  }

  /* ---------- Textos fixos da interface ---------- */

  const UI = {
    pt: {
      agora: "Agora", sobre: "Sobre", terminal: "Terminal", pesquisa: "Pesquisa", publicacoes: "Publicações",
      projetos: "Projetos", github: "GitHub", trajetoria: "Trajetória", reconhecimentos: "Reconhecimentos", contato: "Contato",
      tituloSobre: "Sobre mim", tituloTerminal: "Prefere o terminal?", tituloContato: "Vamos conversar?",
      tituloGithub: "No GitHub agora",
      githubSub: (link) => `Meus repositórios públicos, atualizados sozinhos a partir do ${link}.`,
      githubCarregando: "Buscando os repositórios…", githubErro: "Não consegui carregar a atividade agora.",
      verGithub: "Ver no GitHub", ultimoCommit: "último commit",
      emResumo: "Em resumo", linhas: "Linhas de pesquisa", interesses: "Outras áreas de interesse",
      pubsDestaque: "Publicações em destaque",
      verTodas: (n) => `Ver todas as ${n} publicações`, verMenos: "Mostrar menos",
      meuPapel: "Meu papel:", maisProjetos: "Mais projetos no GitHub",
      formacao: "Formação", experiencia: "Experiência", tituloReconhecimentos: "Reconhecimentos e atuação",
      emAndamento: "em andamento", hoje: "hoje",
      curriculo: "Currículo (PDF)",
      cv: { contato: "Contato", sobre: "Sobre", experiencia: "Experiência", formacao: "Formação", projetos: "Projetos", habilidades: "Habilidades", publicacoes: "Publicações", gerado: "Gerado a partir de" },
      trajComando: "rota até hoje, um salto por etapa (o 1 é o mais antigo)",
      status: { local: "Alegrete", acordado: "acordado", dormindo: "dormindo", github: "GitHub", aqui: "você está aqui há" },
      chat: ["Oi! 👋", "Respondo por e-mail ou pelas redes aqui embaixo."],
      tema: "Alternar tema claro/escuro", idioma: "Read in English", menu: "Menu",
      paleta: "Trocar a cor do site", voltarTopo: "Voltar ao topo", pausar: "Pausar animações", retomar: "Retomar animações",
      temasTitulo: "Cores e temas", temasCores: "Cores do site", temasTemas: "Temas (cores e fontes)", fechar: "Fechar",
      dica: "Experimente:", placeholder: "digite help",
      atalhos: ["help", "whoami", "agora", "projetos", "p4", "contato", "ctf"],
      hackerLigado: "MODO HACKER ATIVADO", hackerDesligado: "modo hacker desligado",
      etapas: ["enviado", "verificado", "entregue"],
      trilha: "Trilha sonora", trilhaSub: "O que toca enquanto eu programo.",
      formIntro: "Ou me manda uma mensagem por aqui:", formNome: "Seu nome", formEmail: "Seu e-mail",
      formMensagem: "Escreva sua mensagem…", formEnviar: "Enviar", formEnviando: "Enviando…",
      formOk: "Mensagem recebida. Respondo em breve 🙂",
      formErro: (email) => `Não consegui enviar agora. Tenta pelo e-mail ${email}?`,
      laboratorio: "Lab P4", tituloLab: "Por dentro de um switch P4",
      labSub: "O que a minha pesquisa programa: o caminho de um pacote dentro de um equipamento de rede.",
      firewall: "Firewall", tituloFirewall: "Seja o firewall",
      firewallSub: "Um jogo de um minuto para entender o que eu pesquiso.",
      habilidades: "Habilidades", tituloHabilidades: "O que eu uso",
      habilidadesSub: "Linguagens e ferramentas que uso de verdade, e onde usei cada uma.", aprendendo: "aprendendo",
      notas: "Notas", tituloNotas: "Notas", notasSub: "Textos curtos sobre o que estou estudando.",
      minutos: (n) => `${n} min de leitura`, ler: "Ler a nota", outrasNotas: "Outras notas",
      livro: "Livro de visitas", tituloLivro: "Livro de visitas",
      livroSub: 'Passou por aqui? Deixe um recado! Para escrever, entre com sua conta do GitHub. Sem GitHub? Me manda uma mensagem pelo <a href="#contato">contato</a>.',
      livroCarregando: "Abrindo o livro de visitas…",
      estudo: "Ler o estudo de caso", abrirSite: "Abrir o site",
      pular: "Pular para o conteúdo", inicio: "Início",
      busca: "Busca rápida", buscaAtalho: "Busca rápida (Ctrl K)",
      buscaPlaceholder: "Para onde vamos? Busque seções, notas, ações…", buscaVazia: "Nada encontrado. Tente outra palavra.",
      buscaDica: "<kbd>↑</kbd> <kbd>↓</kbd> navegar · <kbd>Enter</kbd> abrir · <kbd>Esc</kbd> fechar",
      grupos: { secoes: "Seções", paginas: "Páginas e notas", acoes: "Ações", links: "Links" },
      acoes: {
        tema: "Alternar tema claro/escuro", paleta: "Cores e temas do site", idioma: "Ler em inglês",
        hacker: "Modo hacker", terminal: "Abrir o terminal", firewall: "Jogar “Seja o firewall”",
        ctf: "Desafio CTF", copiarEmail: "Copiar meu e-mail", codigoMirim: "Estudo de caso: Código Mirim",
      },
      emailCopiado: "E-mail copiado",
      somLigar: "Som: desligado", somDesligar: "Som: ligado", copiar: "copiar",
      abaFora: "📡 Conexão perdida… volta?", abaVolta: "✅ Conexão restabelecida",
      t: {
        boasVindas: 'Olá! 👋 Este é o terminal do portfólio. Digite <span class="t-cmd">help</span> para ver o que dá pra fazer.',
        ajuda: [
          ["help", "mostra esta lista"], ["whoami", "quem sou eu"], ["agora", "no que estou trabalhando"],
          ["pesquisa", "meus interesses de pesquisa"], ["projetos", "lista os projetos"], ["habilidades", "linguagens e ferramentas"],
          ["p4", "afinal, o que é P4?"], ["firewall", "joga o “Seja o firewall”"], ["notas", "meus textos mais recentes"],
          ["contato", "como falar comigo"], ["git log", "meus últimos commits no GitHub"], ["ls", "lista as seções do site"],
          ["cd <seção>", "vai até uma seção (ex.: cd projetos)"], ["ctf", "🚩 desafio: ache a flag escondida no site"],
          ["musica", "o que toca enquanto eu programo"], ["cv", "abre o currículo para salvar em PDF"],
          ["nmap arthur", "as minhas portas abertas"], ["ping <host>", "mede o tempo até github ou unipampa"], ["clear", "limpa a tela"],
        ],
        musica: "🎵 tocando agora:",
        ctf: [
          '<span class="t-destaque">🚩 Desafio CTF</span>: a flag está dividida em 3 pedaços escondidos neste site.',
          "",
          "Pista 1: todo site tem um código-fonte. Já deu uma olhada no deste? (Ctrl+U)",
          "Pista 2: os robôs de busca recebem instruções que você não vê, num arquivo .txt bem conhecido.",
          "Pista 3: nem todo caminho existe… mas até o que não existe tem algo a dizer.",
          "",
          'Cada pedaço está codificado de um jeito. Ferramentas: <span class="t-cmd">base64 -d &lt;texto&gt;</span> · <span class="t-cmd">hex &lt;texto&gt;</span> · <span class="t-cmd">rot13 &lt;texto&gt;</span>',
          'Juntou os 3? <span class="t-cmd">submit flag{...}</span>',
        ].join("\n"),
        ctfJaResolvido: "(você já resolveu este desafio 🏁)",
        ctfCerto: "🏁 Flag correta! Mandou bem. Me manda um print no LinkedIn que eu vou adorar 😄",
        ctfErrado: "❌ Flag incorreta. Confira os 3 pedaços e tente de novo.",
        ctfUso: "uso: submit flag{...}",
        decodUso: (c) => `uso: ${c} <texto>`,
        decodErro: "não consegui decodificar esse texto.",
        semCripto: "este navegador não consegue conferir a flag aqui. Tente pelo site publicado.",
        gitUso: "uso: git log",
        gitAguarde: "ainda buscando os commits no GitHub, tente de novo em instantes.",
        naoEncontrado: (c) => `comando não encontrado: ${c}. Digite help.`,
        sudo: (u) => `${u} não está no arquivo sudoers. Este incidente será reportado. 😄`,
        nmapUso: "uso: nmap arthur",
        pingUso: "uso: ping github (ou ping unipampa)",
        pingDesconhecido: (h) => `ping: ${h}: host desconhecido. Experimente github ou unipampa.`,
        pingTimeout: (n) => `icmp_seq=${n} sem resposta (timeout)`,
        pingResumo: (ok, total, media) => `${total} enviados, ${ok} recebidos${ok ? `, média ${media} ms` : ""}`,
        pingNota: "(medido com uma requisição HTTPS: o navegador não manda ICMP de verdade)",
        p4: "Tudo o que circula na internet viaja em pequenos pedaços chamados pacotes, passando por equipamentos como roteadores. Normalmente, esses equipamentos já vêm de fábrica sabendo o que fazer. P4 é uma linguagem de programação que permite ensinar a eles regras novas: deixar o pacote seguir, mudar o caminho ou bloquear.\n\nÉ como um carteiro que pode ser treinado para conferir cada carta antes de entregar. Eu pesquiso como usar isso para deixar a comunicação mais segura.",
        semSecao: (s) => `seção não encontrada: ${s}. Use ls para ver as seções.`,
        indo: (s) => `indo para ${s}/…`,
        nada: "nada por aqui ainda.",
      },
    },
    en: {
      agora: "Now", sobre: "About", terminal: "Terminal", pesquisa: "Research", publicacoes: "Publications",
      projetos: "Projects", github: "GitHub", trajetoria: "Background", reconhecimentos: "Awards", contato: "Contact",
      tituloSobre: "About me", tituloTerminal: "Prefer the terminal?", tituloContato: "Let's talk",
      tituloGithub: "Lately on GitHub",
      githubSub: (link) => `My public repositories, updated automatically from ${link}.`,
      githubCarregando: "Fetching repositories…", githubErro: "Couldn't load the activity right now.",
      verGithub: "View on GitHub", ultimoCommit: "last commit",
      emResumo: "At a glance", linhas: "Research lines", interesses: "Other interests",
      pubsDestaque: "Selected publications",
      verTodas: (n) => `See all ${n} publications`, verMenos: "Show less",
      meuPapel: "My role:", maisProjetos: "More projects on GitHub",
      formacao: "Education", experiencia: "Experience", tituloReconhecimentos: "Awards and service",
      emAndamento: "in progress", hoje: "present",
      curriculo: "Résumé (PDF)",
      cv: { contato: "Contact", sobre: "About", experiencia: "Experience", formacao: "Education", projetos: "Projects", habilidades: "Skills", publicacoes: "Publications", gerado: "Generated from" },
      trajComando: "route to today, one hop per stage (1 is the oldest)",
      status: { local: "Alegrete", acordado: "awake", dormindo: "asleep", github: "GitHub", aqui: "you've been here for" },
      chat: ["Hi! 👋", "I reply by e-mail or on the networks below."],
      tema: "Toggle light/dark theme", idioma: "Ler em português", menu: "Menu",
      paleta: "Change the site color", voltarTopo: "Back to top", pausar: "Pause animations", retomar: "Resume animations",
      temasTitulo: "Colors and themes", temasCores: "Site colors", temasTemas: "Themes (colors and fonts)", fechar: "Close",
      dica: "Try:", placeholder: "type help",
      atalhos: ["help", "whoami", "now", "projects", "p4", "contact", "ctf"],
      hackerLigado: "HACKER MODE ON", hackerDesligado: "hacker mode off",
      etapas: ["sent", "checked", "delivered"],
      trilha: "Soundtrack", trilhaSub: "What plays while I code.",
      formIntro: "Or send me a message right here:", formNome: "Your name", formEmail: "Your e-mail",
      formMensagem: "Write your message…", formEnviar: "Send", formEnviando: "Sending…",
      formOk: "Message received. I'll reply soon 🙂",
      formErro: (email) => `Couldn't send it right now. Try e-mail: ${email}?`,
      laboratorio: "P4 lab", tituloLab: "Inside a P4 switch",
      labSub: "What my research programs: the path a packet takes inside a network device.",
      firewall: "Firewall", tituloFirewall: "Be the firewall",
      firewallSub: "A one-minute game to understand what I research.",
      habilidades: "Skills", tituloHabilidades: "What I use",
      habilidadesSub: "Languages and tools I actually use, and where I used each one.", aprendendo: "learning",
      notas: "Notes", tituloNotas: "Notes", notasSub: "Short pieces about what I'm studying.",
      minutos: (n) => `${n} min read`, ler: "Read the note", outrasNotas: "More notes",
      livro: "Guestbook", tituloLivro: "Guestbook",
      livroSub: 'Stopped by? Leave a message! To write, sign in with your GitHub account. No GitHub? Send me a message through the <a href="#contato">contact</a> form.',
      livroCarregando: "Opening the guestbook…",
      estudo: "Read the case study", abrirSite: "Open the site",
      pular: "Skip to content", inicio: "Home",
      busca: "Quick search", buscaAtalho: "Quick search (Ctrl K)",
      buscaPlaceholder: "Where to? Search sections, notes, actions…", buscaVazia: "Nothing found. Try another word.",
      buscaDica: "<kbd>↑</kbd> <kbd>↓</kbd> move · <kbd>Enter</kbd> open · <kbd>Esc</kbd> close",
      grupos: { secoes: "Sections", paginas: "Pages and notes", acoes: "Actions", links: "Links" },
      acoes: {
        tema: "Toggle light/dark theme", paleta: "Site colors and themes", idioma: "Ler em português",
        hacker: "Hacker mode", terminal: "Open the terminal", firewall: "Play “Be the firewall”",
        ctf: "CTF challenge", copiarEmail: "Copy my e-mail", codigoMirim: "Case study: Código Mirim",
      },
      emailCopiado: "E-mail copied",
      somLigar: "Sound: off", somDesligar: "Sound: on", copiar: "copy",
      abaFora: "📡 Connection lost… come back?", abaVolta: "✅ Connection restored",
      t: {
        boasVindas: 'Hi! 👋 This is the portfolio terminal. Type <span class="t-cmd">help</span> to see what you can do.',
        ajuda: [
          ["help", "shows this list"], ["whoami", "who I am"], ["now", "what I'm working on"],
          ["research", "my research interests"], ["projects", "lists my projects"], ["skills", "languages and tools"],
          ["p4", "so, what is P4?"], ["firewall", "plays “Be the firewall”"], ["notes", "my latest writing"],
          ["contact", "how to reach me"], ["git log", "my latest commits on GitHub"], ["ls", "lists the site sections"],
          ["cd <section>", "jumps to a section (e.g. cd projects)"], ["ctf", "🚩 challenge: find the flag hidden on the site"],
          ["music", "what plays while I code"], ["cv", "opens the résumé to save as PDF"],
          ["nmap arthur", "my open ports"], ["ping <host>", "times the trip to github or unipampa"], ["clear", "clears the screen"],
        ],
        musica: "🎵 now playing:",
        ctf: [
          '<span class="t-destaque">🚩 CTF challenge</span>: the flag is split into 3 pieces hidden on this site.',
          "",
          "Clue 1: every website has source code. Have you looked at this one's? (Ctrl+U)",
          "Clue 2: search robots get instructions you don't see, in a well-known .txt file.",
          "Clue 3: not every path exists… but even what doesn't exist has something to say.",
          "",
          'Each piece is encoded differently. Tools: <span class="t-cmd">base64 -d &lt;text&gt;</span> · <span class="t-cmd">hex &lt;text&gt;</span> · <span class="t-cmd">rot13 &lt;text&gt;</span>',
          'Got all 3? <span class="t-cmd">submit flag{...}</span>',
        ].join("\n"),
        ctfJaResolvido: "(you've already solved this challenge 🏁)",
        ctfCerto: "🏁 Correct flag! Nicely done. Send me a screenshot on LinkedIn, I'd love that 😄",
        ctfErrado: "❌ Wrong flag. Check the 3 pieces and try again.",
        ctfUso: "usage: submit flag{...}",
        decodUso: (c) => `usage: ${c} <text>`,
        decodErro: "couldn't decode that text.",
        semCripto: "this browser can't check the flag here. Try it on the published site.",
        gitUso: "usage: git log",
        gitAguarde: "still fetching commits from GitHub, try again in a moment.",
        naoEncontrado: (c) => `command not found: ${c}. Type help.`,
        sudo: (u) => `${u} is not in the sudoers file. This incident will be reported. 😄`,
        nmapUso: "usage: nmap arthur",
        pingUso: "usage: ping github (or ping unipampa)",
        pingDesconhecido: (h) => `ping: ${h}: unknown host. Try github or unipampa.`,
        pingTimeout: (n) => `icmp_seq=${n} no reply (timeout)`,
        pingResumo: (ok, total, media) => `${total} sent, ${ok} received${ok ? `, average ${media} ms` : ""}`,
        pingNota: "(measured with an HTTPS request: browsers can't send real ICMP)",
        p4: "Everything on the internet travels in small pieces called packets, passing through devices such as routers. Normally these devices come from the factory already knowing what to do. P4 is a programming language that lets you teach them new rules: let a packet through, change its route or block it.\n\nIt's like a mail carrier who can be trained to check every letter before delivering it. I research how to use this to make communication more secure.",
        semSecao: (s) => `section not found: ${s}. Use ls to see the sections.`,
        indo: (s) => `going to ${s}/…`,
        nada: "nothing here yet.",
      },
    },
  };

  const ICONES = {
    lattes: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm-1 1.6L18.4 9H13zM8 12.5h8V14H8zm0 3.5h8v1.5H8zm0-7h3v1.5H8z"/></svg>',
    orcid: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.2" fill="none" stroke="currentColor" stroke-width="1.6"/><text x="12" y="15.7" text-anchor="middle" font-size="10" font-weight="700" font-family="Arial, sans-serif" fill="currentColor">iD</text></svg>',
    scholar: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.9V17h2V9zM5 13.2v4L12 21l7-3.8v-4L12 17z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>',
    site: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.4 2.6 3.7 5.6 3.7 9s-1.3 6.4-3.7 9c-2.4-2.6-3.7-5.6-3.7-9S9.6 5.6 12 3z"/></svg>',
    tema: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 3.6a8.4 8.4 0 0 1 0 16.8z" fill="currentColor"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    busca: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>',
  };
  ICONES.cv = ICONES.lattes;

  const ROTULOS_LINK = {
    lattes: { pt: "Currículo Lattes", en: "Lattes CV" },
    orcid: "ORCID",
    scholar: "Google Scholar",
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "E-mail",
    instagram: "Instagram",
    cv: { pt: "Currículo (PDF)", en: "Résumé (PDF)" },
    site: "Site",
  };

  const CORES_CAPA = {
    indigo: "#4338ff",
    violeta: "#8b5cf6",
    azul: "#2f80ff",
    ciano: "#06b6d4",
    verde: "#22a35a",
    laranja: "#ff7a1a",
    vermelho: "#ef4444",
    rosa: "#ec4899",
  };

  // Cores e temas ficam em js/temas.js (a página 404 também usa)
  const { PALETAS, TEMAS, ESTILOS } = window.TEMAS_DO_SITE;

  /* ---------- Utilitários ---------- */

  const memoria = {
    ler(chave) { try { return localStorage.getItem(chave); } catch (e) { return null; } },
    gravar(chave, valor) { try { localStorage.setItem(chave, valor); } catch (e) { /* sem armazenamento */ } },
  };

  // Cada idioma tem o seu endereço: "/" é o primeiro da lista e "/en/" o inglês.
  // A página diz o idioma em <html data-idioma> e o caminho até a raiz em data-raiz.
  const idiomas = Array.isArray(D.idiomas) && D.idiomas.length ? D.idiomas : ["pt"];
  const raizSite = raiz.dataset.raiz || "";
  const idioma = idiomas.includes(raiz.dataset.idioma) ? raiz.dataset.idioma : idiomas[0];
  memoria.gravar("idioma", idioma); // a página 404 usa para escolher o idioma
  // Página inicial de cada idioma
  const enderecoDoIdioma = (codigo) => (codigo === idiomas[0] ? raizSite || "./" : `${raizSite}${codigo}/`);
  // A mesma página no outro idioma: vem do <link rel="alternate" hreflang> do <head>
  function traducaoDaPagina(codigo) {
    const alternativa = [...document.querySelectorAll('link[rel="alternate"][hreflang]')]
      .find((l) => l.hreflang.toLowerCase().startsWith(codigo));
    return alternativa ? new URL(alternativa.href).pathname : enderecoDoIdioma(codigo);
  }
  // Caminhos relativos de dados.js (foto, imagens) partem da raiz do site
  const caminhoLocal = (url) => (url && !/^(https?:|\/|data:|#)/.test(url) ? raizSite + url : url);
  // Página atual: "inicio" (o portfólio) ou uma página interna (estudo de caso, nota...)
  const pagina = raiz.dataset.pagina || "inicio";
  const naInicial = pagina === "inicio";
  // Link para uma seção da página inicial, de qualquer página
  const linkSecao = (id) => (naInicial ? `#${id}` : `${enderecoDoIdioma(idioma)}#${id}`);

  // Escolha do visitante no menu de cores e temas. A chave antiga "paleta" é ignorada de propósito:
  // guardava a cor do botão antigo e fazia o site abrir no lilás em vez do visual padrão.
  const estiloGuardado = String(memoria.ler("estilo") ?? "");
  let paleta = window.TEMAS_DO_SITE.indiceInicial(estiloGuardado);
  let pubsAbertas = false;
  let jaRenderizou = false;
  let secoesAtuais = [];
  const historico = [];
  let posHistorico = 0;
  let terminalUsado = false;

  // Eventos para o GoatCounter (cliques, terminal, CTF...). Não faz nada se o contador estiver desligado.
  function registrarEvento(caminho, titulo) {
    try { window.goatcounter?.count?.({ path: caminho, title: titulo || caminho, event: true }); } catch (e) { /* ignora */ }
  }

  // Escolhe o texto no idioma atual; aceita string simples ou { pt, en }
  function t(valor) {
    if (valor == null) return "";
    if (typeof valor === "object") return valor[idioma] ?? valor.pt ?? valor.en ?? "";
    return String(valor);
  }

  function esc(texto) {
    return String(texto).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }

  // Escapa e aplica **negrito** e [texto](url)
  function rico(texto) {
    return esc(texto)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[([^\]]+)\]\(((?:https?:|mailto:|#|\/|\.)[^)\s]*)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }

  // Tira a marcação de negrito/links, para o terminal
  const simples = (texto) => t(texto).replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
  const normalizar = (s) => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/^#|\/$/g, "").trim().replace(/\s+/g, "-");

  const temItens = (lista) => Array.isArray(lista) && lista.length > 0;
  const linkExterno = (url) => /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : "";
  const nomeCompleto = () => `${D.nome?.primeiro || ""} ${D.nome?.sobrenome || ""}`.trim();
  const usuario = () => normalizar(D.nome?.primeiro || "eu") || "eu";
  const prompt = () => `${usuario()}@portfolio:~`;

  // Cada letra vira um <span> para reagir ao mouse
  function letras(texto) {
    return [...String(texto || "")].map((ch) => (ch === " " ? " " : `<span class="letra">${esc(ch)}</span>`)).join("");
  }

  // Links que viram botão no topo; os outros aparecem ao lado como links de texto
  const LINKS_BOTAO = ["email", "github", "linkedin"];

  function botoesLinks({ destacar = true, semEmail = false, soTexto = null } = {}) {
    const primeiroEmail = D.contato?.emails?.[0];
    return (D.links || [])
      .filter((link) => !(semEmail && link.tipo === "email"))
      .filter((link) => soTexto === null || LINKS_BOTAO.includes(link.tipo) !== soTexto)
      .map((link) => {
        const url = link.url || (link.tipo === "email" && primeiroEmail ? `mailto:${primeiroEmail}` : "#");
        const rotulo = t(link.rotulo) || t(ROTULOS_LINK[link.tipo]) || link.tipo;
        const principal = destacar && link.principal ? " principal" : "";
        const classe = soTexto ? "link-texto" : `botao${principal}`;
        return `<a class="${classe}" href="${esc(url)}"${linkExterno(url)} data-evento="link-${esc(link.tipo)}" data-evento-titulo="Clique: ${esc(rotulo)}">${ICONES[link.tipo] || ICONES.site}<span>${esc(rotulo)}</span></a>`;
      })
      .join("");
  }

  /* ---------- Seções ---------- */

  function topo() {
    const nome = D.nome || {};
    const detalhes = (D.topo?.detalhes || []).map(t).filter(Boolean);
    const selo = detalhes[detalhes.length - 1];
    // Versões mais leves da foto (mesmo nome, .avif e .webp), quando fotoLeve: true em dados.js
    const base = String(D.foto || "").replace(/\.(jpe?g|png)$/i, "");
    const leves = base !== D.foto && D.fotoLeve === true
      ? `<source srcset="${esc(caminhoLocal(base))}.avif" type="image/avif"><source srcset="${esc(caminhoLocal(base))}.webp" type="image/webp">`
      : "";
    const foto = D.foto
      ? `<figure class="hero-foto" style="--foto-posicao:${esc(D.fotoPosicao || "50% 22%")}">
          <picture>${leves}<img src="${esc(caminhoLocal(D.foto))}" alt="${esc(nomeCompleto())}" width="900" height="1400" fetchpriority="high" decoding="async" onerror="this.closest('figure').remove()"></picture>
          <figcaption>${esc(t(D.contato?.cidade) || "")}</figcaption>
          ${selo ? `<span class="hero-selo">${esc(selo)}</span>` : ""}
          ${(D.topo?.etiquetas || []).slice(0, 4).map(t).filter(Boolean).map((e, i) => `<span class="hero-etiqueta e${i + 1}" aria-hidden="true">${esc(e)}</span>`).join("")}
        </figure>`
      : "";

    return `
      <section class="hero" id="inicio">
        <div class="container hero-grade">
          <div class="hero-texto">
            ${D.topo?.chamada ? `<p class="hero-pill"><i></i>${esc(t(D.topo.chamada))}</p>` : ""}
            <h1 class="hero-nome" translate="no" aria-label="${esc(nomeCompleto())}">
              <span aria-hidden="true">${letras(nome.primeiro)}</span><span aria-hidden="true">${letras(nome.sobrenome)}</span>
            </h1>
            ${D.topo?.frase ? `<p class="hero-frase texto-rico">${rico(t(D.topo.frase))}</p>` : ""}
            ${detalhes.length ? `<ul class="hero-chips">${detalhes.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}
            <div class="hero-links">${botoesLinks({ soTexto: false })}</div>
            <p class="hero-outros">${botoesLinks({ soTexto: true })}<button class="link-texto" type="button" data-acao="curriculo" data-evento="curriculo-pdf" data-evento-titulo="Clique: currículo em PDF">${ICONES.cv || ICONES.site}<span>${UI[idioma].curriculo}</span></button></p>
          </div>
          ${foto}
        </div>
        <div class="container">
          <div class="pacotes" aria-hidden="true">
            ${UI[idioma].etapas.map((etapa) => `<span>${etapa}</span>`).join("")}
            <i class="pacote-trilho"><b class="pacote"></b></i><i class="pacote-trilho"><b class="pacote"></b></i><i class="pacote-trilho"><b class="pacote"></b></i>
          </div>
        </div>
        ${faixa()}
      </section>`;
  }

  function faixa() {
    const itens = [...(D.pesquisa?.linhas || []), ...(D.pesquisa?.interesses || [])].map(t).filter(Boolean);
    if (!itens.length) return "";
    // Dois grupos iguais lado a lado fazem a rolagem parecer infinita
    const grupo = itens.map((x) => `<span class="faixa-item">${esc(x)}</span><b>✦</b>`).join("");
    return `<div class="faixa" aria-hidden="true"><div class="faixa-trilho"><div class="faixa-grupo">${grupo}</div><div class="faixa-grupo">${grupo}</div></div></div>`;
  }

  function secaoAgora() {
    if (!temItens(D.agora)) return "";
    return `
      <section class="secao" id="agora">
        <div class="container">
          <h2 class="titulo-secao revelar">${UI[idioma].agora}</h2>
          <div class="agora-grade">
            ${D.agora.slice(0, 3).map((col, i) => `
              <article class="agora-cartao revelar cor-${i % 3}">
                <h3 class="aba">${esc(t(col.rotulo))}</h3>
                ${(col.itens || []).map((item) => `
                  <div class="agora-item">
                    <h4>${esc(t(item.titulo))}${item.selo ? `<span class="selo">${esc(t(item.selo))}</span>` : ""}</h4>
                    ${item.texto ? `<p class="texto-rico">${rico(t(item.texto))}</p>` : ""}
                  </div>`).join("")}
              </article>`).join("")}
          </div>
        </div>
      </section>`;
  }

  // Converte um link do Spotify (playlist, álbum, música...) no endereço do player embutido
  function embedSpotify(url) {
    const m = String(url || "").match(/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(playlist|album|track|artist|show|episode)\/([A-Za-z0-9]+)/);
    return m ? `https://open.spotify.com/embed/${m[1]}/${m[2]}?utm_source=generator&theme=0` : "";
  }

  function secaoSobre() {
    if (!temItens(D.sobre)) return "";
    const u = UI[idioma];
    const resumo = [...(D.topo?.detalhes || []), D.contato?.cidade].map(t).filter(Boolean);
    const player = embedSpotify(D.trilhaSonora);
    return `
      <section class="secao" id="sobre">
        <div class="container sobre-grade">
          <div class="revelar">
            <h2 class="titulo-secao">${u.tituloSobre}</h2>
            <div class="sobre-texto texto-rico">${D.sobre.map((p) => `<p>${rico(t(p))}</p>`).join("")}</div>
          </div>
          <div class="sobre-lateral">
            ${resumo.length ? `
              <aside class="ficha revelar">
                <h3>${u.emResumo}</h3>
                <ul>${resumo.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
              </aside>` : ""}
            ${player ? `
              <aside class="trilha revelar">
                <h3>🎵 ${u.trilha}</h3>
                <p>${u.trilhaSub}</p>
                <iframe src="${esc(player)}" title="${u.trilha} (Spotify)" height="152" loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
              </aside>` : ""}
          </div>
        </div>
      </section>`;
  }

  function secaoTerminal() {
    const u = UI[idioma];
    return `
      <section class="secao" id="terminal">
        <div class="container">
          <h2 class="titulo-secao revelar">${u.tituloTerminal}</h2>
          <div class="terminal revelar" translate="no">
            <div class="terminal-barra" aria-hidden="true"><i></i><i></i><i></i><span>${esc(prompt())}</span></div>
            <div class="terminal-corpo" id="terminalCorpo">
              <div id="terminalSaida" aria-live="polite"></div>
              <form class="terminal-linha" id="terminalForm" autocomplete="off">
                <label class="terminal-prompt" for="terminalEntrada">${esc(prompt())}$</label>
                <input id="terminalEntrada" type="text" aria-label="${idioma === "pt" ? "Comando do terminal" : "Terminal command"}" spellcheck="false" autocapitalize="off" autocomplete="off" placeholder="${u.placeholder}">
              </form>
            </div>
          </div>
          <div class="terminal-atalhos">
            <span>${u.dica}</span>
            ${u.atalhos.map((c) => `<button type="button" class="atalho" data-comando="${c}">${c}</button>`).join("")}
          </div>
        </div>
      </section>`;
  }

  function secaoPesquisa() {
    const linhas = D.pesquisa?.linhas || [];
    const interesses = D.pesquisa?.interesses || [];
    if (!linhas.length && !interesses.length) return "";
    const u = UI[idioma];
    return `
      <section class="secao" id="pesquisa">
        <div class="container">
          <h2 class="titulo-secao revelar">${esc(t(D.pesquisa.rotulo)) || u.linhas}</h2>
          <ol class="linhas revelar">
            ${linhas.map((l) => `<li>${esc(t(l))}</li>`).join("")}
          </ol>
          ${interesses.length ? `
            <div class="revelar">
              <h3 class="subrotulo">${u.interesses}</h3>
              <ul class="chips">${interesses.map((x) => `<li>${esc(t(x))}</li>`).join("")}</ul>
            </div>` : ""}
        </div>
      </section>`;
  }

  function autoresComDestaque(autores) {
    let html = esc(t(autores));
    for (const nome of D.meuNomeNasPublicacoes || []) {
      if (nome) html = html.split(esc(nome)).join(`<strong>${esc(nome)}</strong>`);
    }
    return html;
  }

  function itemPublicacao(p) {
    const titulo = esc(t(p.titulo));
    const url = p.url || "";
    return `
      <li class="pub">
        <span class="pub-ano">${esc(p.ano ?? "")}</span>
        <div>
          <h3>${url ? `<a href="${esc(url)}"${linkExterno(url)}>${titulo}</a>` : titulo}</h3>
          ${p.autores ? `<p class="pub-autores">${autoresComDestaque(p.autores)}</p>` : ""}
          ${p.local ? `<p class="pub-local">${esc(t(p.local))}</p>` : ""}
        </div>
        <span class="pub-seta" aria-hidden="true">${url ? "↗" : ""}</span>
      </li>`;
  }

  function rotuloAlternarPubs(total) {
    const u = UI[idioma];
    return pubsAbertas ? `${u.verMenos} <span aria-hidden="true">−</span>` : `${u.verTodas(total)} <span aria-hidden="true">+</span>`;
  }

  function secaoPublicacoes() {
    if (!temItens(D.publicacoes)) return "";
    const u = UI[idioma];
    const todas = [...D.publicacoes].sort((a, b) => (b.ano || 0) - (a.ano || 0));
    let visiveis = todas.filter((p) => p.destaque);
    if (!visiveis.length) visiveis = todas.slice(0, 3);
    const extras = todas.filter((p) => !visiveis.includes(p));

    return `
      <section class="secao" id="publicacoes">
        <div class="container revelar">
          <h2 class="titulo-secao">${extras.length ? u.pubsDestaque : u.publicacoes}</h2>
          <ol class="pubs-lista">${visiveis.map(itemPublicacao).join("")}</ol>
          ${extras.length ? `
            <ol class="pubs-lista pubs-extra" id="pubsExtra"${pubsAbertas ? "" : " hidden"}>${extras.map(itemPublicacao).join("")}</ol>
            <button class="botao pubs-alternar" type="button" aria-expanded="${pubsAbertas}" aria-controls="pubsExtra" data-total="${todas.length}">
              ${rotuloAlternarPubs(todas.length)}
            </button>` : ""}
        </div>
      </section>`;
  }

  function estiloCapa(p) {
    if (p.imagem) return `background-image: url('${esc(caminhoLocal(p.imagem)).replace(/'/g, "%27")}')`;
    const cor = CORES_CAPA[p.cor] || (/^(#|rgb|hsl)/.test(p.cor || "") ? p.cor : CORES_CAPA.indigo);
    return `--capa: ${esc(cor)}`;
  }

  // Capa do projeto feita do próprio trabalho: código que se digita ou uma janela de navegador
  const PALAVRAS_CODIGO = /\b(table|key|actions|default_action|apply|if|lpm|CONNECT|PUBLISH)\b/g;
  function miolosCapa(p) {
    if (temItens(p.codigo)) {
      const linhas = p.codigo.map((l, i) => {
        const html = esc(t(l)).replace(PALAVRAS_CODIGO, "<b>$1</b>");
        return `<span class="capa-linha${/✗/.test(l) ? " barrada" : ""}" style="--l:${i}">${html}</span>`;
      }).join("");
      return `<pre class="capa-codigo" data-ui aria-hidden="true" translate="no"><code>${linhas}</code></pre>`;
    }
    if (p.navegador) {
      const n = p.navegador;
      return `
        <div class="capa-navegador" data-ui aria-hidden="true">
          <span class="capa-barra"><i></i><i></i><i></i><span translate="no">${esc(n.endereco)}</span></span>
          <span class="capa-paginas">${(n.paginas || []).map((x, i) => `<span style="--l:${i}">${esc(t(x))}</span>`).join("")}</span>
        </div>`;
    }
    return "";
  }

  function secaoProjetos() {
    if (!temItens(D.projetos)) return "";
    const u = UI[idioma];
    return `
      <section class="secao" id="projetos">
        <div class="container">
          <h2 class="titulo-secao revelar">${u.projetos}</h2>
          <div class="projetos-grade">
            ${D.projetos.map((p, i) => {
              const titulo = esc(t(p.titulo));
              // Com estudo de caso, o título leva para a página do estudo e o site vira um link à parte
              const estudo = caminhoLocal(t(p.estudo));
              const destino = estudo || p.url;
              const evento = `projeto-${esc(normalizar(p.titulo?.pt || p.titulo))}`;
              return `
                <article class="projeto revelar">
                  <div class="projeto-capa${p.imagem ? " com-imagem" : ""}${temItens(p.codigo) || p.navegador ? " com-miolo" : ""}" style="${estiloCapa(p)}">
                    ${miolosCapa(p)}
                    ${p.status ? `<span class="projeto-status">${esc(t(p.status))}</span>` : ""}
                    ${p.categoria ? `<span class="projeto-tag">${esc(t(p.categoria))}</span>` : ""}
                  </div>
                  <div class="projeto-corpo">
                    <h3${estudo ? ` style="view-transition-name: projeto-${esc(normalizar(t(p.titulo)))}"` : ""}>${destino ? `<a href="${esc(destino)}"${linkExterno(destino)} data-evento="${evento}" data-evento-titulo="Projeto: ${titulo}">${titulo}${estudo ? "" : '<span aria-hidden="true">↗</span>'}</a>` : titulo}</h3>
                    ${p.descricao ? `<p class="texto-rico">${rico(t(p.descricao))}</p>` : ""}
                    ${p.papel ? `<p class="texto-rico"><strong>${u.meuPapel}</strong> ${rico(t(p.papel))}</p>` : ""}
                    ${temItens(p.tecnologias) ? `<ul class="techs">${p.tecnologias.map((x) => `<li>${esc(t(x))}</li>`).join("")}</ul>` : ""}
                    ${estudo ? `
                      <div class="projeto-acoes">
                        <span class="projeto-estudo" aria-hidden="true">${u.estudo}</span>
                        ${p.url ? `<a href="${esc(p.url)}"${linkExterno(p.url)} data-evento="${evento}-site" data-evento-titulo="Site: ${titulo}">${u.abrirSite} ↗</a>` : ""}
                      </div>` : ""}
                  </div>
                </article>`;
            }).join("")}
          </div>
          ${D.maisProjetos ? `<a class="botao mais-projetos revelar" href="${esc(D.maisProjetos)}"${linkExterno(D.maisProjetos)} data-evento="mais-projetos" data-evento-titulo="Clique: mais projetos no GitHub">${ICONES.github}<span>${u.maisProjetos}</span> ↗</a>` : ""}
        </div>
      </section>`;
  }

  // O jogo fica em js/firewall.js; aqui só o lugar dele na página
  function secaoLaboratorio() {
    if (D.laboratorio === false) return "";
    const u = UI[idioma];
    return `
      <section class="secao secao-lab" id="laboratorio">
        <div class="container">
          <h2 class="titulo-secao revelar">${u.tituloLab}</h2>
          <p class="secao-sub revelar">${u.labSub}</p>
          <div id="labP4"></div>
        </div>
      </section>`;
  }

  function secaoFirewall() {
    if (D.firewall === false) return "";
    const u = UI[idioma];
    return `
      <section class="secao" id="firewall">
        <div class="container">
          <h2 class="titulo-secao revelar">${u.tituloFirewall}</h2>
          <p class="secao-sub revelar">${u.firewallSub}</p>
          <div class="revelar" id="jogoFirewall"></div>
        </div>
      </section>`;
  }

  function secaoHabilidades() {
    if (!temItens(D.habilidades)) return "";
    const u = UI[idioma];
    return `
      <section class="secao" id="habilidades">
        <div class="container">
          <h2 class="titulo-secao revelar">${u.tituloHabilidades}</h2>
          <p class="secao-sub revelar">${u.habilidadesSub}</p>
          <div class="habilidades-grade">
            ${D.habilidades.map((g, i) => `
              <article class="habilidades-cartao revelar cor-${i % 3}">
                <h3 class="aba">${esc(t(g.grupo))}</h3>
                <ul class="habilidades-lista">
                  ${(g.itens || []).map((h) => `
                    <li${h.aprendendo ? ' class="aprendendo"' : ""}>
                      <span class="habilidade-nome">${esc(t(h.nome))}${h.aprendendo ? `<span class="selo-aprendendo">${u.aprendendo}</span>` : ""}</span>
                      ${h.onde ? `<span class="habilidade-onde">${esc(t(h.onde))}</span>` : ""}
                    </li>`).join("")}
                </ul>
              </article>`).join("")}
          </div>
        </div>
      </section>`;
  }

  /* ---------- Notas ---------- */

  const enderecoNota = (n, codigo = idioma) =>
    codigo === idiomas[0] ? `${raizSite}notas/${t(n.slug)}/` : `${raizSite}${codigo}/notes/${n.slug?.[codigo] || t(n.slug)}/`;

  function dataNota(iso) {
    const data = new Date(`${iso}T12:00:00`);
    if (Number.isNaN(data.getTime())) return "";
    return new Intl.DateTimeFormat(idioma === "pt" ? "pt-BR" : "en", { day: "numeric", month: "short", year: "numeric" }).format(data);
  }

  function cartoesNotas(notas) {
    const u = UI[idioma];
    return notas.map((n) => `
      <a class="nota-cartao revelar" href="${esc(enderecoNota(n))}" data-evento="nota-${esc(t(n.slug))}" data-evento-titulo="Nota: ${esc(t(n.titulo))}">
        <span class="nota-meta"><time datetime="${esc(n.data)}">${esc(dataNota(n.data))}</time>${n.minutos ? ` · ${u.minutos(n.minutos)}` : ""}</span>
        <h3 style="view-transition-name: nota-${esc(normalizar(t(n.slug)))}">${esc(t(n.titulo))}</h3>
        ${n.resumo ? `<p>${esc(t(n.resumo))}</p>` : ""}
        <span class="nota-ler">${u.ler}</span>
      </a>`).join("");
  }

  function secaoNotas() {
    if (!temItens(D.notas)) return "";
    const u = UI[idioma];
    return `
      <section class="secao" id="notas">
        <div class="container">
          <h2 class="titulo-secao revelar">${u.tituloNotas}</h2>
          <p class="secao-sub revelar">${u.notasSub}</p>
          <div class="notas-lista">${cartoesNotas(D.notas)}</div>
        </div>
      </section>`;
  }

  // Na página de uma nota, mostra as outras no fim
  function preencherOutrasNotas() {
    const alvo = $("#outrasNotas");
    if (!alvo || !temItens(D.notas)) return;
    const aqui = location.pathname.replace(/index\.html$/, "");
    const outras = D.notas.filter((n) => !aqui.endsWith(`/${t(n.slug)}/`));
    if (!outras.length) return;
    alvo.innerHTML = `<h2 class="subrotulo">${UI[idioma].outrasNotas}</h2><div class="notas-lista">${cartoesNotas(outras)}</div>`;
  }

  /* ---------- Livro de visitas (giscus) ---------- */

  const livro = () => (D.livroDeVisitas?.ligado && D.livroDeVisitas.repo ? D.livroDeVisitas : null);

  function secaoLivro() {
    if (!livro()) return "";
    const u = UI[idioma];
    return `
      <section class="secao" id="livro">
        <div class="container">
          <h2 class="titulo-secao revelar">${u.tituloLivro}</h2>
          <p class="secao-sub texto-rico revelar">${u.livroSub}</p>
          <div class="livro revelar"><div class="giscus" id="giscus"><p class="repos-aviso"><span class="carregando"></span>${u.livroCarregando}</p></div></div>
        </div>
      </section>`;
  }

  const temaGiscus = () => (raiz.dataset.theme === "dark" || raiz.classList.contains("modo-hacker") ? "transparent_dark" : "light");

  // Só carrega o giscus quando o visitante chega perto da seção
  function prepararLivro() {
    const L = livro();
    const alvo = $("#giscus");
    if (!L || !alvo) return;
    const carregar = () => {
      const s = document.createElement("script");
      s.src = "https://giscus.app/client.js";
      Object.assign(s.dataset, {
        repo: L.repo, repoId: L.repoId, category: L.categoria, categoryId: L.categoriaId,
        mapping: "number", term: String(L.discussao), strict: "0", reactionsEnabled: "1", emitMetadata: "0",
        inputPosition: "top", theme: temaGiscus(), lang: idioma === "pt" ? "pt" : "en", loading: "lazy",
      });
      s.crossOrigin = "anonymous";
      s.async = true;
      alvo.innerHTML = "";
      alvo.appendChild(s);
    };
    if (!("IntersectionObserver" in window)) return carregar();
    const obs = new IntersectionObserver((entradas) => {
      if (entradas.some((e) => e.isIntersecting)) { obs.disconnect(); carregar(); }
    }, { rootMargin: "600px 0px" });
    obs.observe(alvo);
  }

  function atualizarTemaLivro() {
    document.querySelector("iframe.giscus-frame")?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: temaGiscus() } } }, "https://giscus.app");
  }

  /* ---------- Atividade no GitHub (carregada ao vivo) ---------- */

  const CORES_LINGUAGEM = {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", HTML: "#e34c26", CSS: "#563d7c", Python: "#3572a5",
    C: "#555555", "C++": "#f34b7d", Java: "#b07219", Shell: "#89e051", P4: "#7055b5", Go: "#00add8",
  };

  let atividade = null;              // { em, repos: [...] }
  let estadoAtividade = "carregando"; // "carregando" | "ok" | "erro"

  const usuarioGithub = () =>
    D.github || (D.links || []).find((l) => l.tipo === "github")?.url?.match(/github\.com\/([^/?#]+)/)?.[1] || "";

  function tempoRelativo(iso) {
    const seg = Math.round((new Date(iso).getTime() - Date.now()) / 1000);
    const abs = Math.abs(seg);
    const [valor, unidade] =
      abs < 60 ? [seg, "second"] :
      abs < 3600 ? [seg / 60, "minute"] :
      abs < 86400 ? [seg / 3600, "hour"] :
      abs < 2592000 ? [seg / 86400, "day"] :
      abs < 31536000 ? [seg / 2592000, "month"] : [seg / 31536000, "year"];
    return new Intl.RelativeTimeFormat(idioma === "pt" ? "pt-BR" : "en", { numeric: "auto" }).format(Math.round(valor), unidade);
  }

  async function carregarAtividade() {
    const usuario = usuarioGithub();
    if (!usuario) return;
    const chave = `github:${usuario}`;

    // Guarda por 30 minutos para não gastar o limite de 60 consultas por hora da API
    try {
      const salvo = JSON.parse(memoria.ler(chave));
      if (salvo && Date.now() - salvo.em < 30 * 60 * 1000) {
        atividade = salvo;
        estadoAtividade = "ok";
        desenharAtividade();
        return;
      }
    } catch (e) { /* cache inválido: busca de novo */ }

    try {
      const resposta = await fetch(`https://api.github.com/users/${usuario}/repos?sort=pushed&per_page=12`);
      if (!resposta.ok) throw new Error(`GitHub respondeu ${resposta.status}`);
      // Ignora forks e o repositório do README do perfil (mesmo nome do usuário)
      const repos = (await resposta.json())
        .filter((r) => !r.fork && r.name.toLowerCase() !== usuario.toLowerCase())
        .slice(0, 4);
      const commits = await Promise.all(repos.map((r) =>
        fetch(`https://api.github.com/repos/${usuario}/${r.name}/commits?per_page=1`)
          .then((c) => (c.ok ? c.json() : []))
          .catch(() => [])));

      atividade = {
        em: Date.now(),
        repos: repos.map((r, i) => {
          const c = commits[i]?.[0];
          return {
            nome: r.name,
            url: r.html_url,
            descricao: r.description || "",
            linguagem: r.language || "",
            estrelas: r.stargazers_count || 0,
            atualizado: r.pushed_at,
            commit: c ? { mensagem: c.commit.message.split("\n")[0], url: c.html_url, data: c.commit.author?.date || r.pushed_at } : null,
          };
        }),
      };
      memoria.gravar(chave, JSON.stringify(atividade));
      estadoAtividade = "ok";
    } catch (e) {
      estadoAtividade = atividade ? "ok" : "erro";
    }
    desenharAtividade();
  }

  function conteudoAtividade() {
    const u = UI[idioma];
    const perfil = `https://github.com/${usuarioGithub()}`;
    // Enquanto carrega: cartões vazios no formato dos repositórios, em vez de um círculo girando
    if (estadoAtividade === "carregando") {
      return `<p class="so-leitor" role="status">${u.githubCarregando}</p>
        <div class="repos" aria-hidden="true">${'<div class="repo repo-esqueleto"><i></i><i></i><i></i><i></i></div>'.repeat(4)}</div>`;
    }
    if (estadoAtividade === "erro" || !atividade?.repos?.length) {
      return `<p class="repos-aviso">${u.githubErro} <a href="${esc(perfil)}" target="_blank" rel="noopener">${u.verGithub} ↗</a></p>`;
    }
    return `
      <div class="repos">
        ${atividade.repos.map((r) => `
          <a class="repo" href="${esc(r.url)}" target="_blank" rel="noopener" data-evento="github-${esc(r.nome)}" data-evento-titulo="Repositório: ${esc(r.nome)}">
            <div class="repo-topo">
              <span class="repo-nome">${ICONES.github}${esc(r.nome)}</span>
              <span class="repo-tempo">${esc(tempoRelativo(r.atualizado))}</span>
            </div>
            ${r.descricao ? `<p class="repo-desc">${esc(r.descricao)}</p>` : ""}
            ${r.commit ? `<p class="repo-commit" title="${esc(r.commit.mensagem)}"><b>${u.ultimoCommit}</b>${esc(r.commit.mensagem)}</p>` : ""}
            <div class="repo-meta">
              ${r.linguagem ? `<span><i style="--cor-linguagem:${CORES_LINGUAGEM[r.linguagem] || "#8b8b8b"}"></i>${esc(r.linguagem)}</span>` : ""}
              <span>★ ${r.estrelas}</span>
            </div>
          </a>`).join("")}
      </div>`;
  }

  function desenharAtividade() {
    const alvo = $("#githubAtividade");
    if (alvo) alvo.innerHTML = conteudoAtividade();
    prepararRevelar();
  }

  function secaoGithub() {
    const usuario = usuarioGithub();
    if (!usuario) return "";
    const u = UI[idioma];
    const link = `<a href="https://github.com/${esc(usuario)}" target="_blank" rel="noopener">github.com/${esc(usuario)}</a>`;
    return `
      <section class="secao" id="github">
        <div class="container revelar">
          <h2 class="titulo-secao">${u.tituloGithub}</h2>
          <p class="github-sub texto-rico">${u.githubSub(link)}</p>
          <div id="githubAtividade" aria-live="polite">${conteudoAtividade()}</div>
        </div>
      </section>`;
  }

  function periodo(item) {
    const u = UI[idioma];
    if (item.ate === "andamento") return `${item.de} — ${u.emAndamento}`;
    if (item.ate === "hoje") return `${item.de} — ${u.hoje}`;
    if (item.ate && item.ate !== item.de) return `${item.de} — ${item.ate}`;
    return `${item.de ?? ""}`;
  }

  function colunaTrajetoria(titulo, itens) {
    if (!temItens(itens)) return "";
    return `
      <div class="revelar">
        <h3 class="traj-titulo">${titulo}</h3>
        <ol class="traj-lista">
          ${itens.map((i, n) => `
            <li data-salto="${itens.length - n}">
              <span class="traj-periodo">${esc(periodo(i))}</span>
              <h4>${esc(t(i.titulo))}</h4>
              ${i.instituicao ? `<p class="traj-inst">${esc(t(i.instituicao))}</p>` : ""}
              ${i.detalhe ? `<p class="traj-det texto-rico">${rico(t(i.detalhe))}</p>` : ""}
            </li>`).join("")}
        </ol>
      </div>`;
  }

  function secaoTrajetoria() {
    if (!temItens(D.formacao) && !temItens(D.experiencia)) return "";
    const u = UI[idioma];
    return `
      <section class="secao" id="trajetoria">
        <div class="container">
          <h2 class="titulo-secao revelar">${u.trajetoria}</h2>
          <p class="traj-comando revelar" translate="no"><span aria-hidden="true">$</span> traceroute ${esc(normalizar(D.nome?.primeiro || "arthur"))} <small>· ${u.trajComando}</small></p>
          <div class="traj-grade">
            ${colunaTrajetoria(u.experiencia, D.experiencia)}
            ${colunaTrajetoria(u.formacao, D.formacao)}
          </div>
        </div>
      </section>`;
  }

  function secaoReconhecimentos() {
    if (!temItens(D.reconhecimentos)) return "";
    return `
      <section class="secao" id="reconhecimentos">
        <div class="container revelar">
          <h2 class="titulo-secao">${UI[idioma].tituloReconhecimentos}</h2>
          <ul class="reconhecimentos">
            ${D.reconhecimentos.map((r) => `
              <li><span class="ano">${esc(r.ano ?? "")}</span><span class="texto-rico">${rico(t(r.texto))}</span></li>`).join("")}
          </ul>
        </div>
      </section>`;
  }

  // Aceita o código do formulário do Formspree ("abcdwxyz") ou o endereço completo
  function enderecoFormulario() {
    const valor = String(D.formulario || "").trim();
    const codigo = valor.match(/^(?:https:\/\/formspree\.io\/f\/)?([A-Za-z0-9]+)$/)?.[1];
    return codigo ? `https://formspree.io/f/${codigo}` : "";
  }

  function formularioContato() {
    if (!enderecoFormulario()) return "";
    const u = UI[idioma];
    return `
      <form class="chat-form" id="formContato">
        <p class="bolha">${u.formIntro}</p>
        <!-- Campo invisível contra robôs de spam: pessoas não preenchem -->
        <input class="pote-de-mel" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">
        <div class="chat-campos">
          <label><span class="so-leitor">${u.formNome}</span><input name="nome" required maxlength="100" autocomplete="name" placeholder="${u.formNome}"></label>
          <label><span class="so-leitor">${u.formEmail}</span><input name="email" type="email" spellcheck="false" required maxlength="200" autocomplete="email" placeholder="${idioma === "pt" ? "voce@exemplo.com" : "you@example.com"}"></label>
        </div>
        <div class="chat-escrever">
          <label><span class="so-leitor">${u.formMensagem}</span><textarea name="mensagem" required rows="2" maxlength="3000" placeholder="${u.formMensagem}"></textarea></label>
          <button class="botao" type="submit">${u.formEnviar} <span aria-hidden="true">➤</span></button>
        </div>
        <div class="chat-respostas" aria-live="polite"></div>
      </form>`;
  }

  // A mensagem enviada vira um pacote que faz um arco do botão até o último nó da rota (o contato), e o nó pinga
  function enviarPacote(origem) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !origem?.animate) return;
    const destino = [...document.querySelectorAll("#rota .rota-no")].pop() || $("#nav");
    const a = origem.getBoundingClientRect(), b = destino.getBoundingClientRect();
    const [x0, y0, x1, y1] = [a.left + a.width / 2, a.top + a.height / 2, b.left + b.width / 2, b.top + b.height / 2];
    const pacote = document.createElement("b");
    pacote.className = "pacote-voo";
    pacote.setAttribute("aria-hidden", "true");
    document.body.append(pacote);
    pacote.animate([
      { transform: `translate(${x0}px, ${y0}px) scale(.4) rotate(0deg)`, opacity: 0 },
      { transform: `translate(${x0}px, ${y0 - 30}px) scale(1.2) rotate(0deg)`, opacity: 1, offset: 0.15 },
      { transform: `translate(${(x0 + x1) / 2}px, ${Math.min(y0, y1) - 140}px) scale(1) rotate(200deg)`, offset: 0.55 },
      { transform: `translate(${x1}px, ${y1}px) scale(.5) rotate(360deg)`, opacity: 1 },
    ], { duration: 1100, easing: "cubic-bezier(.45, 0, .25, 1)" }).finished.then(() => {
      pacote.remove();
      destino.classList.remove("pingou");
      void destino.offsetWidth;
      destino.classList.add("pingou");
      window.EfeitosSite?.passou();
    });
  }

  async function enviarFormulario(form) {
    if (!form.reportValidity()) return;
    const u = UI[idioma];
    const botao = form.querySelector('button[type="submit"]');
    const respostas = form.querySelector(".chat-respostas");
    const mensagem = form.elements.mensagem.value.trim();
    const dados = new FormData(form);
    dados.append("_subject", `Mensagem pelo portfólio: ${form.elements.nome.value.trim()}`);
    dados.append("idioma", idioma);

    botao.disabled = true;
    botao.textContent = u.formEnviando;
    try {
      const resposta = await fetch(enderecoFormulario(), { method: "POST", body: dados, headers: { Accept: "application/json" } });
      if (!resposta.ok) throw new Error(`Formspree respondeu ${resposta.status}`);
      respostas.insertAdjacentHTML("beforeend",
        `<p class="bolha bolha-eu">${esc(mensagem)}</p><p class="bolha">${esc(u.formOk)}</p>`);
      form.reset();
      enviarPacote(botao);
      registrarEvento("formulario-enviado", "Enviou mensagem pelo formulário");
    } catch (e) {
      respostas.insertAdjacentHTML("beforeend", `<p class="bolha bolha-erro">${esc(u.formErro(D.contato?.emails?.[0] || ""))}</p>`);
    } finally {
      botao.disabled = false;
      botao.innerHTML = `${esc(u.formEnviar)} <span aria-hidden="true">➤</span>`;
    }
  }

  function secaoContato() {
    const emails = D.contato?.emails || [];
    if (!emails.length && !temItens(D.links)) return "";
    const u = UI[idioma];
    return `
      <section class="secao" id="contato">
        <div class="container">
          <div class="contato-bloco revelar">
            <h2 class="contato-titulo">${u.tituloContato}</h2>
            <div class="chat">
              ${u.chat.map((msg) => `<p class="bolha">${esc(msg)}</p>`).join("")}
              ${emails.map((e) => `<span class="bolha-email"><a class="bolha bolha-eu" href="mailto:${esc(e)}" data-evento="email-chat" data-evento-titulo="Clique: e-mail no contato">${esc(e)}</a><button class="bolha-copiar" type="button" data-copiar="${esc(e)}" aria-label="${u.copiar} ${esc(e)}">${u.copiar}</button></span>`).join("")}
            </div>
            ${formularioContato()}
            <div class="contato-links">${botoesLinks({ destacar: false, semEmail: true })}</div>
            ${D.contato?.cidade ? `<p class="contato-local">📍 ${esc(t(D.contato.cidade))}</p>` : ""}
          </div>
        </div>
      </section>`;
  }

  /* ---------- Terminal ---------- */

  const COMANDOS = {
    help: "ajuda", ajuda: "ajuda", "?": "ajuda",
    whoami: "quem", sobre: "quem", about: "quem",
    agora: "agora", now: "agora",
    pesquisa: "pesquisa", research: "pesquisa",
    projetos: "projetos", projects: "projetos",
    p4: "p4",
    contato: "contato", contact: "contato",
    ls: "ls", cd: "cd", git: "git",
    ctf: "ctf", submit: "submit",
    base64: "base64", hex: "hex", rot13: "rot13",
    hacker: "hacker", matrix: "hacker",
    musica: "musica", "música": "musica", music: "musica", spotify: "musica",
    firewall: "firewall", jogo: "firewall", game: "firewall",
    notas: "notas", notes: "notas", blog: "notas",
    habilidades: "habilidades", skills: "habilidades",
    clear: "limpar", limpar: "limpar", cls: "limpar",
    sudo: "sudo",
    cv: "cv", curriculo: "cv", "currículo": "cv", resume: "cv",
    nmap: "nmap", ping: "ping",
    lattes: "link", github: "link", linkedin: "link", instagram: "link", orcid: "link", scholar: "link",
  };

  /* ---------- CTF e brincadeiras ---------- */

  // Só o hash da flag fica no código: ler o JavaScript não entrega a resposta
  const HASH_FLAG = "cff206e2e31d4792d7e41e3c25bd53ce209f416b128b6a8b4c5d7a0e2e57e374";

  async function flagCorreta(texto) {
    const resumo = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto.trim()));
    const hex = [...new Uint8Array(resumo)].map((b) => b.toString(16).padStart(2, "0")).join("");
    return hex === HASH_FLAG;
  }

  const decodificar = {
    base64: (s) => new TextDecoder().decode(Uint8Array.from(atob(s.replace(/\s/g, "")), (c) => c.charCodeAt(0))),
    hex: (s) => {
      const limpo = s.replace(/0x|\s/gi, "");
      if (!/^([0-9a-f]{2})+$/i.test(limpo)) throw new Error("hex inválido");
      return new TextDecoder().decode(Uint8Array.from(limpo.match(/../g), (h) => parseInt(h, 16)));
    },
    rot13: (s) => s.replace(/[a-z]/gi, (c) => {
      const base = c <= "Z" ? 65 : 97;
      return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    }),
  };

  // Chuva de "pacotes" coloridos quando alguém acerta a flag
  function comemorar() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cores = ["var(--acento)", "var(--lima)", "var(--coral)", "var(--amarelo)"];
    for (let i = 0; i < 40; i++) {
      const p = document.createElement("i");
      p.className = "confete";
      p.style.cssText = `left:${Math.random() * 100}vw; background:${cores[i % cores.length]}; animation-duration:${1.8 + Math.random() * 1.6}s; animation-delay:${Math.random() * .4}s; rotate:${Math.random() * 90}deg`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 4000);
    }
  }

  function avisar(texto) {
    document.querySelector(".aviso-flutuante")?.remove();
    const aviso = document.createElement("div");
    aviso.className = "aviso-flutuante";
    aviso.setAttribute("aria-hidden", "true");
    aviso.textContent = texto;
    document.body.appendChild(aviso);
    setTimeout(() => aviso.remove(), 2600);
    // Região viva fixa: criada vazia uma vez e só depois preenchida, para o leitor de tela anunciar
    let vivo = $("#avisoVivo");
    if (!vivo) {
      vivo = document.createElement("div");
      vivo.id = "avisoVivo";
      vivo.className = "so-leitor";
      vivo.setAttribute("role", "status");
      document.body.appendChild(vivo);
    }
    vivo.textContent = "";
    setTimeout(() => { vivo.textContent = texto; }, 50);
  }

  function alternarHacker() {
    const ligado = raiz.classList.toggle("modo-hacker");
    avisar(ligado ? UI[idioma].hackerLigado : UI[idioma].hackerDesligado);
    atualizarTemaLivro();
    if (ligado) registrarEvento("modo-hacker", "Ativou o modo hacker");
  }

  /* ---------- Currículo para imprimir ou salvar em PDF ---------- */

  // Na hora de imprimir, a página vira um currículo limpo montado de dados.js; depois volta ao normal
  function curriculoHtml() {
    const c = UI[idioma].cv;
    const bloco = (titulo, corpo) => (corpo ? `<section><h2>${titulo}</h2>${corpo}</section>` : "");
    const itensTraj = (lista) => (lista || []).map((i) => `
      <div class="cv-item"><span>${esc(periodo(i))}</span><div><b>${esc(t(i.titulo))}</b>${i.instituicao ? ` · ${esc(t(i.instituicao))}` : ""}${i.detalhe ? `<p>${rico(t(i.detalhe))}</p>` : ""}</div></div>`).join("");
    const links = (D.links || []).filter((l) => l.url).map((l) => `<li>${esc(t(l.rotulo) || t(ROTULOS_LINK[l.tipo]) || l.tipo)}: ${esc(l.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""))}</li>`);
    const emails = (D.contato?.emails || []).map((e) => `<li>${esc(e)}</li>`);
    return `
      <header>
        <h1>${esc(D.nomeCompleto || nomeCompleto())}</h1>
        <p class="cv-frase">${esc(simples(D.topo?.chamada))}. ${esc(simples(D.topo?.frase))}</p>
        <ul class="cv-contato">${[...emails, ...links, D.contato?.cidade ? `<li>${esc(t(D.contato.cidade))}</li>` : ""].join("")}</ul>
      </header>
      ${bloco(c.sobre, (D.sobre || []).slice(0, 2).map((p) => `<p>${rico(t(p))}</p>`).join(""))}
      ${bloco(c.experiencia, itensTraj(D.experiencia))}
      ${bloco(c.formacao, itensTraj(D.formacao))}
      ${bloco(c.projetos, (D.projetos || []).map((p) => `<div class="cv-item"><span>${esc(t(p.categoria) || "")}</span><div><b>${esc(t(p.titulo))}</b><p>${rico(t(p.descricao))}</p></div></div>`).join(""))}
      ${bloco(c.publicacoes, (D.publicacoes || []).map((p) => `<div class="cv-item"><span>${esc(p.ano ?? "")}</span><div><b>${esc(t(p.titulo))}</b><p>${esc(p.autores || "")}${p.local ? ` · ${esc(t(p.local))}` : ""}</p></div></div>`).join(""))}
      ${bloco(c.habilidades, (D.habilidades || []).map((g) => `<p><b>${esc(t(g.grupo))}:</b> ${(g.itens || []).map((h) => esc(t(h.nome))).join(", ")}</p>`).join(""))}
      <p class="cv-rodape">${c.gerado} ${esc(location.origin)}${esc(location.pathname.replace(/[^/]*$/, ""))}</p>`;
  }
  addEventListener("beforeprint", () => {
    let el = document.getElementById("curriculo");
    if (!el) { el = document.createElement("article"); el.id = "curriculo"; document.body.append(el); }
    el.innerHTML = curriculoHtml();
    raiz.classList.add("imprimindo");
    registrarEvento("curriculo-impresso", "Imprimiu ou salvou o currículo");
  });
  addEventListener("afterprint", () => raiz.classList.remove("imprimindo"));

  /* ---------- Efeitos: sons (desligados até a pessoa ligar), vibração e título da aba ---------- */

  const somLigado = () => memoria.ler("som") === "ligado";
  let audio = null;
  // Sons sintetizados na hora (Web Audio), nada para baixar
  function bipe(freq, duracao, tipo = "sine", volume = 0.05) {
    if (!somLigado()) return;
    try {
      audio ??= new (window.AudioContext || window.webkitAudioContext)();
      const osc = audio.createOscillator(), ganho = audio.createGain();
      osc.type = tipo;
      osc.frequency.value = freq;
      ganho.gain.setValueAtTime(volume, audio.currentTime);
      ganho.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duracao);
      osc.connect(ganho).connect(audio.destination);
      osc.start();
      osc.stop(audio.currentTime + duracao);
    } catch (e) { /* sem áudio */ }
  }
  const vibrar = (ms) => { if (!matchMedia("(prefers-reduced-motion: reduce)").matches) navigator.vibrate?.(ms); };
  // Usado pelo terminal, pelo jogo do firewall, pelo laboratório P4 e pelo formulário
  window.EfeitosSite = {
    tecla: () => bipe(1800 + Math.random() * 400, 0.025, "square", 0.012),
    barrado: () => { bipe(170, 0.16, "square", 0.04); vibrar(70); },
    passou: () => bipe(880, 0.08, "sine", 0.04),
  };
  function alternarSom() {
    const ligado = !somLigado();
    memoria.gravar("som", ligado ? "ligado" : "desligado");
    const b = $('[data-acao="som"]');
    if (b) { b.setAttribute("aria-pressed", String(ligado)); b.textContent = ligado ? UI[idioma].somDesligar : UI[idioma].somLigar; }
    if (ligado) window.EfeitosSite.passou();
  }

  // Quem troca de aba vê "conexão perdida"; ao voltar, "restabelecida" por um instante
  let tituloOriginal = "";
  let voltaTimer;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      tituloOriginal = document.title;
      clearTimeout(voltaTimer);
      document.title = UI[idioma].abaFora;
    } else if (tituloOriginal) {
      document.title = UI[idioma].abaVolta;
      voltaTimer = setTimeout(() => { document.title = tituloOriginal; tituloOriginal = ""; }, 1600);
    }
  });

  /* ---------- Barra de status do rodapé ---------- */

  // Hora em Alegrete (e se estou acordado), a latência real da conversa com a API do GitHub
  // (medida na própria requisição da seção GitHub, sem pedir nada a mais) e o tempo desta visita
  const chegada = Date.now();
  function latenciaGithub() {
    // De outro domínio o navegador só informa a duração total da requisição, que é o que aparece aqui
    const e = performance.getEntriesByType?.("resource").filter((r) => r.name.includes("api.github.com") && r.duration > 0).pop();
    return e ? Math.round(e.duration) : null;
  }
  function desenharStatus() {
    const el = document.getElementById("rodapeStatus");
    if (!el) return;
    const u = UI[idioma].status;
    const agora = new Date();
    const hora = new Intl.DateTimeFormat(idioma === "pt" ? "pt-BR" : "en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }).format(agora);
    const h = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "America/Sao_Paulo" }).format(agora));
    const acordado = h >= 7 && h < 24;
    const ms = latenciaGithub();
    const seg = Math.floor((Date.now() - chegada) / 1000);
    const tempo = seg < 60 ? `${seg} s` : `${Math.floor(seg / 60)} min ${String(seg % 60).padStart(2, "0")} s`;
    el.innerHTML = [
      `<span><i class="status-ponto${acordado ? "" : " dormindo"}"></i>${u.local} ${hora} · ${acordado ? u.acordado : u.dormindo}</span>`,
      ms !== null ? `<span>${u.github} ${ms} ms</span>` : "",
      `<span>${u.aqui} ${tempo}</span>`,
    ].filter(Boolean).join("");
  }
  setInterval(() => { if (!document.hidden) desenharStatus(); }, 1000);

  // Pausa o que se move sozinho e sem parar (globo, faixa, etiquetas); a escolha fica salva
  function alternarPausa() {
    const parado = raiz.classList.toggle("parado");
    try { localStorage.setItem("animacoes", parado ? "paradas" : "ligadas"); } catch (e) {}
    const b = $('[data-acao="pausar"]');
    if (b) { b.setAttribute("aria-pressed", String(parado)); b.textContent = parado ? UI[idioma].retomar : UI[idioma].pausar; }
  }

  // O tema novo se espalha num círculo que nasce no botão (View Transitions; sem suporte, troca na hora)
  function alternarTema(evento) {
    const trocar = () => alternarTemaAgora();
    if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return trocar();
    const botao = evento?.target?.closest?.("button");
    const r = botao?.getBoundingClientRect();
    raiz.style.setProperty("--vt-x", `${r ? r.left + r.width / 2 : innerWidth - 40}px`);
    raiz.style.setProperty("--vt-y", `${r ? r.top + r.height / 2 : 40}px`);
    raiz.classList.add("trocando-tema");
    document.startViewTransition(trocar).finished.finally(() => raiz.classList.remove("trocando-tema"));
  }
  function alternarTemaAgora() {
    const novo = raiz.dataset.theme === "dark" ? "light" : "dark";
    raiz.dataset.theme = novo;
    memoria.gravar("tema", novo);
    $('[data-acao="tema"]')?.setAttribute("aria-pressed", String(novo === "dark"));
    atualizarCorDoNavegador();
    atualizarTemaLivro();
    registrarEvento(`tema-${novo}`, `Trocou para o tema ${novo === "dark" ? "escuro" : "claro"}`);
  }

  // A barra do navegador no celular acompanha o fundo do tema atual
  function atualizarCorDoNavegador() {
    const meta = document.querySelector('meta[name="theme-color"]');
    const fundo = getComputedStyle(raiz).getPropertyValue("--fundo").trim();
    if (meta && fundo) meta.setAttribute("content", fundo);
  }

  function escolherEstilo(indice) {
    paleta = (indice + ESTILOS.length) % ESTILOS.length;
    memoria.gravar("estilo", ESTILOS[paleta].id);
    aplicarCores();
    atualizarCorDoNavegador();
    registrarEvento(`estilo-${ESTILOS[paleta].id}`, `Trocou o visual para ${t(ESTILOS[paleta].nome)}`);
  }

  // Pela busca rápida: passa para o próximo
  function trocarPaleta() { escolherEstilo(paleta + 1); }

  // Menu de cores e temas, aberto pelo botão de paleta
  let abridorTemas = null;
  function fecharTemas(devolverFoco = true) {
    const menu = $("#temas");
    if (!menu) return;
    menu.remove();
    document.querySelectorAll('[data-acao="paleta"]').forEach((b) => b.setAttribute("aria-expanded", "false"));
    if (devolverFoco) abridorTemas?.focus();
  }

  function amostra(e) {
    const cores = e.titulo ? [e.escuro.fundo, e.escuro.acento, e.destaques[0]] : [e.escuro, e.claro];
    return `<span class="temas-amostra" aria-hidden="true">${cores.map((c) => `<i style="background:${c}"></i>`).join("")}</span>`;
  }

  function abrirTemas(botao) {
    if ($("#temas")) return fecharTemas();
    const u = UI[idioma];
    abridorTemas = botao;
    fecharMenu();
    const item = (e) => {
      const i = ESTILOS.indexOf(e);
      const fonte = e.titulo ? ` style='font-family:${esc(e.titulo)}'` : "";
      return `<li><button type="button" data-estilo="${i}" aria-pressed="${i === paleta}">${amostra(e)}<span${fonte}>${esc(t(e.nome))}</span></button></li>`;
    };
    const menu = document.createElement("div");
    menu.id = "temas";
    menu.className = "temas";
    menu.setAttribute("role", "dialog");
    menu.setAttribute("aria-label", u.temasTitulo);
    menu.innerHTML = `
      <div class="temas-topo"><h2>${u.temasTitulo}</h2><button class="botao-icone" type="button" data-acao="fechar-temas" aria-label="${u.fechar}">✕</button></div>
      <h3>${u.temasCores}</h3><ul class="temas-cores">${PALETAS.map(item).join("")}</ul>
      <h3>${u.temasTemas}</h3><ul>${TEMAS.map(item).join("")}</ul>`;
    document.body.appendChild(menu);
    document.querySelectorAll('[data-acao="paleta"]').forEach((b) => b.setAttribute("aria-expanded", "true"));
    menu.querySelector('[aria-pressed="true"]')?.focus();
  }

  function trocarIdioma() {
    const destino = idiomas.find((i) => i !== idioma) || idioma;
    registrarEvento(`idioma-${destino}`, `Mudou o idioma para ${destino}`);
    location.href = traducaoDaPagina(destino) + (naInicial ? location.hash : "");
  }

  /* ---------- Busca rápida (Ctrl K) ---------- */

  let buscaItens = [];
  let buscaVisiveis = [];
  let buscaPos = 0;
  let focoAntesDaBusca = null;

  // Tudo o que dá para achar na busca: seções, páginas, ações e links
  function itensDaBusca() {
    const u = UI[idioma];
    const g = u.grupos;
    const itens = secoesAtuais.map((s) => ({
      grupo: g.secoes, titulo: u[s.id] || s.id, icone: "#", href: linkSecao(s.id),
      palavras: `${UI.pt[s.id] || ""} ${UI.en[s.id] || ""} ${s.id}`,
    }));
    (D.projetos || []).filter((p) => p.estudo).forEach((p) => itens.push({
      grupo: g.paginas, titulo: `${u.acoes.codigoMirim.split(":")[0]}: ${t(p.titulo)}`, icone: "▣",
      href: caminhoLocal(t(p.estudo)), palavras: `projeto project ${simples(p.descricao)}`,
    }));
    (D.notas || []).forEach((n) => itens.push({
      grupo: g.paginas, titulo: t(n.titulo), icone: "✎", href: enderecoNota(n),
      palavras: `nota note blog ${t(n.resumo)}`,
    }));
    const a = u.acoes;
    const irPara = (id, depois) => () => {
      if (!naInicial) { location.href = linkSecao(id); return; }
      document.getElementById(id)?.scrollIntoView({ behavior: rolagem() });
      depois?.();
    };
    const email = D.contato?.emails?.[0];
    itens.push(
      { grupo: g.acoes, titulo: a.tema, icone: "◐", acao: alternarTema, palavras: "tema theme escuro claro dark light" },
      { grupo: g.acoes, titulo: a.paleta, icone: "●", acao: trocarPaleta, palavras: "cor color paleta palette" },
      ...(idiomas.length > 1 ? [{ grupo: g.acoes, titulo: a.idioma, icone: "⇄", acao: trocarIdioma, palavras: "idioma language english ingles portugues" }] : []),
      { grupo: g.acoes, titulo: a.hacker, icone: ">_", acao: alternarHacker, palavras: "hacker matrix verde green" },
      ...(secoesAtuais.some((s) => s.id === "terminal") ? [
        { grupo: g.acoes, titulo: a.terminal, icone: "$", acao: irPara("terminal", () => setTimeout(() => $("#terminalEntrada")?.focus({ preventScroll: true }), 400)), palavras: "terminal console comando" },
        { grupo: g.acoes, titulo: a.ctf, icone: "🚩", acao: irPara("terminal", () => executar("ctf")), palavras: "ctf flag desafio challenge" },
      ] : []),
      ...(secoesAtuais.some((s) => s.id === "firewall") ? [
        { grupo: g.acoes, titulo: a.firewall, icone: "▶", acao: irPara("firewall", () => window.JogoFirewall?.comecar?.()), palavras: "jogo game firewall pacotes packets seguranca" },
      ] : []),
      ...(email ? [{ grupo: g.acoes, titulo: a.copiarEmail, icone: "@", dica: email, acao: () => copiarTexto(email), palavras: "email e-mail contato contact copiar copy" }] : []),
    );
    (D.links || []).forEach((l) => {
      const url = l.url || (l.tipo === "email" && email ? `mailto:${email}` : "");
      if (!url) return;
      itens.push({ grupo: g.links, titulo: t(l.rotulo) || t(ROTULOS_LINK[l.tipo]) || l.tipo, icone: "↗", href: url, externo: /^https?:/.test(url), palavras: `${l.tipo} ${url}` });
    });
    const codigoMirim = (D.projetos || []).find((p) => p.url && p.estudo);
    if (codigoMirim) itens.push({ grupo: g.links, titulo: t(codigoMirim.titulo), icone: "↗", href: codigoMirim.url, externo: true, palavras: "site jogos games" });
    return itens;
  }

  async function copiarTexto(texto) {
    try {
      await navigator.clipboard.writeText(texto);
      avisar(UI[idioma].emailCopiado);
    } catch (e) {
      location.href = `mailto:${texto}`;
    }
  }

  function criarBusca() {
    const u = UI[idioma];
    const caixa = document.createElement("dialog");
    caixa.className = "busca";
    caixa.id = "busca";
    caixa.setAttribute("aria-label", u.busca);
    caixa.innerHTML = `
      <div class="busca-caixa">
        <div class="busca-topo">
          ${ICONES.busca}
          <input id="buscaEntrada" type="text" role="combobox" aria-expanded="true" aria-controls="buscaLista" aria-autocomplete="list"
            autocomplete="off" spellcheck="false" placeholder="${esc(u.buscaPlaceholder)}" aria-label="${esc(u.busca)}">
          <kbd>Esc</kbd>
        </div>
        <ul class="busca-lista" id="buscaLista" role="listbox" aria-label="${esc(u.busca)}"></ul>
        <p class="busca-rodape" aria-hidden="true">${u.buscaDica}</p>
      </div>`;
    document.body.appendChild(caixa);
    const entrada = $("#buscaEntrada");
    entrada.addEventListener("input", () => { buscaPos = 0; desenharBusca(); });
    entrada.addEventListener("keydown", (e) => {
      if (e.key.length === 1 || e.key === "Enter" || e.key === "Backspace") window.EfeitosSite?.tecla();
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!buscaVisiveis.length) return;
        buscaPos = (buscaPos + (e.key === "ArrowDown" ? 1 : -1) + buscaVisiveis.length) % buscaVisiveis.length;
        desenharBusca(false);
      } else if (e.key === "Enter") {
        e.preventDefault();
        escolherDaBusca(buscaVisiveis[buscaPos]);
      }
    });
    $("#buscaLista").addEventListener("click", (e) => {
      const li = e.target.closest(".busca-item");
      if (li) escolherDaBusca(buscaVisiveis[Number(li.dataset.indice)]);
    });
    // Clicar fora da caixa fecha
    caixa.addEventListener("click", (e) => { if (e.target === caixa) fecharBusca(); });
    caixa.addEventListener("close", () => focoAntesDaBusca?.focus?.({ preventScroll: true }));
    return caixa;
  }

  function filtrarBusca(consulta) {
    const termos = normalizar(consulta).split("-").filter(Boolean);
    if (!termos.length) return buscaItens;
    return buscaItens
      .map((item) => {
        const titulo = normalizar(item.titulo);
        const tudo = `${titulo}-${normalizar(item.palavras || "")}-${normalizar(item.grupo)}`;
        if (!termos.every((p) => tudo.includes(p))) return null;
        const pontos = (titulo.startsWith(termos[0]) ? 3 : 0) + (titulo.includes(termos[0]) ? 1 : 0);
        return { item, pontos };
      })
      .filter(Boolean)
      .sort((a, b) => b.pontos - a.pontos)
      .map((r) => r.item);
  }

  function desenharBusca(refiltrar = true) {
    const entrada = $("#buscaEntrada");
    const lista = $("#buscaLista");
    if (refiltrar) buscaVisiveis = filtrarBusca(entrada.value);
    if (!buscaVisiveis.length) {
      lista.innerHTML = `<li class="busca-vazia">${UI[idioma].buscaVazia}</li>`;
      entrada.removeAttribute("aria-activedescendant");
      return;
    }
    let grupoAnterior = "";
    lista.innerHTML = buscaVisiveis.map((item, i) => {
      const cabecalho = item.grupo !== grupoAnterior ? `<li class="busca-grupo" role="presentation">${esc(item.grupo)}</li>` : "";
      grupoAnterior = item.grupo;
      return `${cabecalho}<li class="busca-item${i === buscaPos ? " ativo" : ""}" id="busca-${i}" role="option" aria-selected="${i === buscaPos}" data-indice="${i}">
        <span class="busca-icone" aria-hidden="true">${esc(item.icone || "•")}</span>
        <span class="busca-titulo">${esc(item.titulo)}</span>
        ${item.dica ? `<span class="busca-dica">${esc(item.dica)}</span>` : ""}
        ${item.externo ? '<span class="busca-dica" aria-hidden="true">↗</span>' : ""}
      </li>`;
    }).join("");
    entrada.setAttribute("aria-activedescendant", `busca-${buscaPos}`);
    $(`#busca-${buscaPos}`)?.scrollIntoView({ block: "nearest" });
  }

  function abrirBusca() {
    const caixa = $("#busca") || criarBusca();
    if (caixa.open) return;
    focoAntesDaBusca = document.activeElement;
    fecharMenu();
    buscaItens = itensDaBusca();
    buscaPos = 0;
    $("#buscaEntrada").value = "";
    desenharBusca();
    caixa.showModal();
    $("#buscaEntrada").focus();
    registrarEvento("busca-aberta", "Abriu a busca rápida");
  }

  function fecharBusca() {
    const caixa = $("#busca");
    if (caixa?.open) caixa.close();
  }

  function escolherDaBusca(item) {
    if (!item) return;
    fecharBusca();
    registrarEvento(`busca-${normalizar(item.titulo).slice(0, 40)}`, `Busca: ${item.titulo}`);
    if (item.acao) { item.acao(); return; }
    if (item.externo) { window.open(item.href, "_blank", "noopener"); return; }
    location.href = item.href;
  }

  // ↑ ↑ ↓ ↓ ← → ← → B A
  const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let posKonami = 0;

  function imprimir(html, classe = "") {
    const saida = $("#terminalSaida");
    if (!saida) return;
    saida.insertAdjacentHTML("beforeend", `<div class="t-linha ${classe}">${html}</div>`);
    const corpo = $("#terminalCorpo");
    corpo.scrollTop = corpo.scrollHeight;
  }

  // Nome curto de cada seção no idioma atual (usado por ls e cd)
  const nomeSecao = (id) => normalizar(UI[idioma][id] || id);

  function acharSecao(nome) {
    const alvo = normalizar(nome || "");
    return secoesAtuais.find((s) => [s.id, normalizar(UI.pt[s.id] || ""), normalizar(UI.en[s.id] || "")].includes(alvo));
  }

  function linkHtml(url, texto) {
    return `<a href="${esc(url)}"${linkExterno(url)}>${esc(texto)}</a>`;
  }

  function executar(entrada) {
    const texto = entrada.trim();
    imprimir(`<span class="t-prompt">${esc(prompt())}$</span> ${esc(texto)}`, "t-eco");
    if (!texto) return;
    historico.push(texto);
    posHistorico = historico.length;
    if (!terminalUsado) {
      terminalUsado = true;
      registrarEvento("terminal-usado", "Usou o terminal");
    }

    const [cmd, ...args] = texto.split(/\s+/);
    const T = UI[idioma].t;

    switch (COMANDOS[cmd.toLowerCase()]) {
      case "ajuda":
        imprimir(T.ajuda
          .filter(([c]) => !["musica", "music"].includes(c) || embedSpotify(D.trilhaSonora))
          .map(([c, d]) => `<span class="t-cmd">${esc(c.padEnd(14))}</span>${esc(d)}`).join("\n"));
        break;
      case "musica":
        imprimir(embedSpotify(D.trilhaSonora)
          ? `${esc(T.musica)} ${linkHtml(D.trilhaSonora, D.trilhaSonora.replace(/^https?:\/\/|\?.*$/g, ""))}`
          : esc(T.nada));
        break;
      case "quem":
        imprimir([
          `<span class="t-destaque">${esc(nomeCompleto())}</span>${D.nomeCompleto && D.nomeCompleto !== nomeCompleto() ? ` (${esc(D.nomeCompleto)})` : ""}`,
          esc(simples(D.topo?.chamada)),
          esc(simples(D.topo?.frase)),
        ].filter(Boolean).join("\n"));
        break;
      case "agora":
        imprimir((D.agora || []).map((col) =>
          `<span class="t-destaque">[${esc(simples(col.rotulo))}]</span>\n` +
          (col.itens || []).map((i) => `  • ${esc(simples(i.titulo))}${i.texto ? `\n    ${esc(simples(i.texto))}` : ""}`).join("\n")
        ).join("\n") || T.nada);
        break;
      case "pesquisa": {
        const linhas = (D.pesquisa?.linhas || []).map((l, i) => `  ${String(i + 1).padStart(2, "0")}  ${esc(simples(l))}`);
        const outros = (D.pesquisa?.interesses || []).map(simples);
        imprimir([...linhas, outros.length ? `\n  + ${esc(outros.join(", "))}` : ""].join("\n") || T.nada);
        break;
      }
      case "projetos":
        imprimir((D.projetos || []).map((p) => {
          const extra = [simples(p.categoria), simples(p.status)].filter(Boolean).join(" · ");
          const titulo = p.url ? linkHtml(p.url, simples(p.titulo)) : esc(simples(p.titulo));
          return `  • ${titulo}${extra ? `  <span class="t-cmd">${esc(extra)}</span>` : ""}`;
        }).join("\n") || T.nada);
        break;
      case "p4":
        imprimir(esc(T.p4));
        break;
      case "habilidades":
        imprimir((D.habilidades || []).map((g) =>
          `<span class="t-destaque">[${esc(simples(g.grupo))}]</span>\n  ` +
          (g.itens || []).map((h) => esc(simples(h.nome)) + (h.aprendendo ? ` <span class="t-cmd">(${UI[idioma].aprendendo})</span>` : "")).join(", ")
        ).join("\n") || esc(T.nada));
        break;
      case "notas":
        imprimir((D.notas || []).map((n) =>
          `  • ${linkHtml(enderecoNota(n), simples(n.titulo))}  <span class="t-cmd">${esc(dataNota(n.data))}</span>`
        ).join("\n") || esc(T.nada));
        break;
      case "firewall":
        if (!$("#jogoFirewall")) { imprimir(esc(T.nada)); break; }
        imprimir(esc(T.indo(nomeSecao("firewall"))));
        setTimeout(() => {
          $("#firewall")?.scrollIntoView({ behavior: rolagem() });
          window.JogoFirewall?.comecar?.();
        }, 350);
        break;
      case "contato": {
        const emails = (D.contato?.emails || []).map((e) => `  ${"e-mail".padEnd(10)}${linkHtml(`mailto:${e}`, e)}`);
        const redes = (D.links || []).filter((l) => l.url && l.tipo !== "email")
          .map((l) => `  ${esc(l.tipo.padEnd(10))}${linkHtml(l.url, l.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""))}`);
        imprimir([...emails, ...redes].join("\n") || T.nada);
        break;
      }
      case "ls":
        imprimir(secoesAtuais.map((s) => `<span class="t-cmd">${esc(nomeSecao(s.id))}/</span>`).join("   "));
        break;
      case "cd": {
        if (!args[0] || args[0] === "~" || args[0] === "..") {
          window.scrollTo({ top: 0, behavior: rolagem() });
          break;
        }
        const secao = acharSecao(args[0]);
        if (!secao) { imprimir(esc(T.semSecao(args[0])), "t-erro"); break; }
        imprimir(esc(T.indo(nomeSecao(secao.id))));
        setTimeout(() => document.getElementById(secao.id)?.scrollIntoView({ behavior: rolagem() }), 350);
        break;
      }
      case "git": {
        if ((args[0] || "").toLowerCase() !== "log") { imprimir(esc(T.gitUso), "t-erro"); break; }
        if (estadoAtividade === "carregando") { imprimir(esc(T.gitAguarde)); break; }
        const commits = (atividade?.repos || []).filter((r) => r.commit)
          .sort((a, b) => new Date(b.commit.data) - new Date(a.commit.data));
        imprimir(commits.map((r) =>
          `<span class="t-destaque">${esc(r.commit.url.split("/").pop().slice(0, 7))}</span> ${linkHtml(r.url, r.nome)}  <span class="t-cmd">${esc(tempoRelativo(r.commit.data))}</span>\n    ${esc(r.commit.mensagem)}`
        ).join("\n") || esc(UI[idioma].githubErro), commits.length ? "" : "t-erro");
        break;
      }
      case "ctf":
        registrarEvento("ctf-aberto", "Abriu o desafio CTF");
        imprimir(T.ctf);
        if (memoria.ler("ctf") === "ok") imprimir(esc(T.ctfJaResolvido), "t-cmd");
        break;
      case "submit": {
        const tentativa = args.join(" ");
        if (!tentativa) { imprimir(esc(T.ctfUso), "t-erro"); break; }
        if (!window.crypto?.subtle) { imprimir(esc(T.semCripto), "t-erro"); break; }
        flagCorreta(tentativa).then((certa) => {
          imprimir(esc(certa ? T.ctfCerto : T.ctfErrado), certa ? "t-destaque" : "t-erro");
          if (certa) {
            memoria.gravar("ctf", "ok");
            comemorar();
            registrarEvento("ctf-resolvido", "Resolveu o CTF 🏁");
          }
        });
        break;
      }
      case "base64": case "hex": case "rot13": {
        const nome = cmd.toLowerCase();
        const entrada = (nome === "base64" && args[0] === "-d" ? args.slice(1) : args).join(" ");
        if (!entrada) { imprimir(esc(T.decodUso(nome === "base64" ? "base64 -d" : nome)), "t-erro"); break; }
        try { imprimir(esc(decodificar[nome](entrada))); } catch (e) { imprimir(esc(T.decodErro), "t-erro"); }
        break;
      }
      case "hacker":
        alternarHacker();
        break;
      case "limpar":
        $("#terminalSaida").innerHTML = "";
        break;
      case "sudo":
        imprimir(esc(T.sudo(usuario())), "t-erro");
        break;
      case "nmap": {
        // As "portas abertas" são os jeitos de me achar; as portas são as de verdade de cada serviço
        if (!args[0]) { imprimir(esc(T.nmapUso), "t-erro"); break; }
        const link = (tipo) => (D.links || []).find((l) => l.tipo === tipo && l.url)?.url;
        const email = D.contato?.emails?.[0];
        const portas = [
          ["22/tcp", "filtered", "ssh", idioma === "pt" ? "só de dentro da rede 😉" : "inside the network only 😉"],
          email && ["25/tcp", "open", "smtp", email, `mailto:${email}`],
          link("site") && ["80/tcp", "open", "http", link("site"), link("site")],
          link("linkedin") && ["443/tcp", "open", "https", "linkedin", link("linkedin")],
          ["1883/tcp", "open", "mqtt", "TRAP-IoT"],
          link("github") && ["9418/tcp", "open", "git", "github", link("github")],
          ["9559/tcp", "open", "p4runtime", idioma === "pt" ? "pesquisa com P4" : "P4 research"],
        ].filter(Boolean);
        imprimir([
          `Nmap scan report for ${esc(args[0])} (${esc(location.host)})`,
          `<span class="t-cmd">PORT      STATE     SERVICE    INFO</span>`,
          ...portas.map(([p, e, sv, info, url]) => `${esc(p.padEnd(10))}<span class="${e === "open" ? "t-destaque" : "t-erro"}">${esc(e.padEnd(10))}</span>${esc(sv.padEnd(11))}${url ? linkHtml(url, info) : esc(info)}`),
        ].join("\n"));
        break;
      }
      case "ping": {
        // Mede de verdade: o tempo de uma requisição HTTPS até o host (o navegador não manda ICMP)
        const HOSTS = { github: "https://api.github.com/zen", unipampa: "https://unipampa.edu.br/favicon.ico" };
        const host = (args[0] || "").toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\.(com|edu\.br|br)$/, "");
        if (!args[0]) { imprimir(esc(T.pingUso), "t-erro"); break; }
        if (!HOSTS[host]) { imprimir(esc(T.pingDesconhecido(args[0])), "t-erro"); break; }
        (async () => {
          const tempos = [];
          imprimir(`PING ${esc(new URL(HOSTS[host]).host)}`);
          for (let n = 1; n <= 4; n++) {
            const inicio = performance.now();
            try {
              await fetch(`${HOSTS[host]}?ping=${Date.now()}`, { mode: "no-cors", cache: "no-store", signal: AbortSignal.timeout?.(4000) });
              const ms = Math.round(performance.now() - inicio);
              tempos.push(ms);
              imprimir(`icmp_seq=${n} time=${ms} ms`);
              window.EfeitosSite?.passou();
            } catch (e) {
              imprimir(esc(T.pingTimeout(n)), "t-erro");
            }
            await new Promise((r) => setTimeout(r, 400));
          }
          const media = tempos.length ? Math.round(tempos.reduce((a, b) => a + b, 0) / tempos.length) : 0;
          imprimir(esc(T.pingResumo(tempos.length, 4, media)) + "\n" + `<span class="t-cmd">${esc(T.pingNota)}</span>`);
        })();
        break;
      }
      case "cv":
        imprimir(esc(UI[idioma].curriculo) + " →");
        setTimeout(() => window.print(), 300);
        break;
      case "link": {
        const link = (D.links || []).find((l) => l.tipo === cmd.toLowerCase() && l.url);
        imprimir(link ? linkHtml(link.url, link.url) : esc(T.naoEncontrado(cmd)), link ? "" : "t-erro");
        break;
      }
      default:
        imprimir(esc(T.naoEncontrado(cmd)), "t-erro");
    }
  }

  /* ---------- Montagem ---------- */

  function render() {
    const u = UI[idioma];

    raiz.lang = idioma === "pt" ? "pt-BR" : "en";

    // As seções são montadas mesmo nas páginas internas: o menu delas aponta para as mesmas seções
    secoesAtuais = [
      { id: "agora", menu: true, html: secaoAgora() },
      { id: "sobre", menu: true, html: secaoSobre() },
      { id: "terminal", html: secaoTerminal() },
      { id: "pesquisa", menu: true, html: secaoPesquisa() },
      { id: "laboratorio", html: secaoLaboratorio() },
      { id: "firewall", html: secaoFirewall() },
      { id: "publicacoes", menu: true, html: secaoPublicacoes() },
      { id: "projetos", menu: true, html: secaoProjetos() },
      { id: "habilidades", html: secaoHabilidades() },
      { id: "github", html: secaoGithub() },
      { id: "trajetoria", menu: true, html: secaoTrajetoria() },
      { id: "notas", menu: true, html: secaoNotas() },
      { id: "reconhecimentos", html: secaoReconhecimentos() },
      { id: "livro", html: secaoLivro() },
      { id: "contato", menu: true, html: secaoContato() },
    ].filter((s) => s.html);

    const outroIdioma = idiomas.find((i) => i !== idioma);
    // Os mesmos botões aparecem na barra e, em telas pequenas, dentro do menu
    const acoes = `
      <button class="botao-icone" data-acao="busca" type="button" title="${u.buscaAtalho}" aria-label="${u.busca}" aria-haspopup="dialog">${ICONES.busca}</button>
      <button class="botao-icone botao-paleta" data-acao="paleta" type="button" title="${u.paleta}" aria-label="${u.paleta}" aria-haspopup="dialog" aria-expanded="false"><span></span></button>
      ${outroIdioma ? `<button class="botao-icone" data-acao="idioma" type="button" title="${u.idioma}" aria-label="${outroIdioma.toUpperCase()} · ${u.idioma}" lang="${outroIdioma === "pt" ? "pt-BR" : outroIdioma}">${outroIdioma.toUpperCase()}</button>` : ""}
      <button class="botao-icone" data-acao="tema" type="button" title="${u.tema}" aria-label="${idioma === "pt" ? "Tema escuro" : "Dark theme"}" aria-pressed="${raiz.dataset.theme === "dark"}">${ICONES.tema}</button>`;

    $("#nav").innerHTML = `
      <a class="pular" href="#conteudo">${u.pular}</a>
      <div class="container nav-dentro">
        <a class="nav-nome" translate="no" href="${naInicial ? "#inicio" : esc(enderecoDoIdioma(idioma))}">${esc(nomeCompleto())}</a>
        <nav class="nav-links" id="navLinks" aria-label="${idioma === "pt" ? "Seções" : "Sections"}">
          ${secoesAtuais.filter((s) => s.menu).map((s) =>
            `<a href="${esc(linkSecao(s.id))}" data-secao="${s.id}"${!naInicial && s.id === "notas" && pagina === "nota" ? ' class="ativo" aria-current="page"' : ""}>${u[s.id]}</a>`).join("")}
          <div class="acoes-no-menu">${acoes}</div>
        </nav>
        <div class="nav-acoes">
          <span class="acoes-na-barra">${acoes}</span>
          <button class="botao-icone nav-menu" id="btnMenu" type="button" aria-label="${u.menu}" aria-expanded="false" aria-controls="navLinks">${ICONES.menu}</button>
        </div>
      </div>`;

    if (naInicial) {
      document.title = [nomeCompleto(), t(D.topo?.chamada)].filter(Boolean).join(" · ");
      $("#metaDescricao")?.setAttribute("content", simples(D.topo?.frase));
      $("#conteudo").innerHTML = topo() + secoesAtuais.map((s) => s.html).join("");
      imprimir(u.t.boasVindas);
    } else {
      preencherOutrasNotas();
    }

    // O nome volta grande no fim, como fechamento da página
    const parado = raiz.classList.contains("parado");
    $("#rodape").innerHTML = `
      <div class="container">
        <p class="rodape-nome revelar" aria-hidden="true" translate="no"><span>${letras(D.nome?.primeiro)}</span> <span>${letras(D.nome?.sobrenome)}</span></p>
        <p class="rodape-status" id="rodapeStatus" translate="no"></p>
        <div class="rodape-linha">
          <span>© ${new Date().getFullYear()} ${esc(D.nomeCompleto || nomeCompleto())}</span>
          <span class="rodape-botoes">
            <button class="rodape-pausa" type="button" data-acao="pausar" aria-pressed="${parado}">${parado ? u.retomar : u.pausar}</button>
            <button class="rodape-pausa" type="button" data-acao="som" aria-pressed="${somLigado()}">${somLigado() ? u.somDesligar : u.somLigar}</button>
          </span>
          <a href="${naInicial ? "#inicio" : "#"}">${u.voltarTopo} ↑</a>
        </div>
      </div>`;

    desenharStatus();
    // Cada letra do nome do rodapé sobe com um pequeno atraso em relação à anterior
    document.querySelectorAll(".rodape-nome .letra").forEach((l, i) => l.style.setProperty("--i", i));
    fecharMenu();
    observarSecaoAtiva();
    montarRota();
    prepararRevelar();
    if (naInicial) prepararPalavras();
    animarRolagem();
    if (naInicial && !jaRenderizou) decodificarNome();
    if (naInicial) {
      prepararLivro();
      window.JogoFirewall?.montar($("#jogoFirewall"), { idioma, registrarEvento });
      window.LabP4?.montar($("#labP4"), { idioma, registrarEvento });
    }
    jaRenderizou = true;
  }

  /* ---------- Comportamentos ---------- */

  /* ---------- Rota do pacote: rolar a página é um pacote atravessando a rede ---------- */

  // Cada seção é um nó na linha abaixo do menu. O pacote anda junto com a rolagem, o nó acende
  // quando o pacote chega, e o título da seção ganha a marca de "recebido". Clicar num nó leva até a seção.
  // Nas páginas internas a linha mostra só quanto do texto já foi lido.
  let rota = null;
  let rotaPendente = false;

  function montarRota() {
    $("#rota")?.remove();
    const paradas = naInicial
      ? ["inicio", ...secoesAtuais.map((s) => s.id)].map((id) => document.getElementById(id)).filter(Boolean)
      : [];
    // Nome curto do menu quando existe (Agora, Projetos, Contato...); senão, o título da seção
    const nomeParada = (secao) => {
      const doMenu = UI[idioma][secao.id];
      if (typeof doMenu === "string") return doMenu;
      return secao.querySelector(".titulo-secao, .contato-titulo")?.textContent.trim() || "";
    };
    const el = document.createElement("div");
    el.id = "rota";
    el.className = "rota";
    el.setAttribute("aria-hidden", "true"); // quem usa leitor de tela ou teclado tem o menu principal
    const passo = paradas.length > 1 ? 100 / (paradas.length - 1) : 0;
    el.innerHTML = `
      <div class="container rota-caixa">
        <div class="rota-trilho">
          <i class="rota-feito"></i>
          ${paradas.map((secao, i) => `<button type="button" tabindex="-1" class="rota-no" data-parada="${i}" title="${esc(nomeParada(secao))}" style="left:${(i * passo).toFixed(3)}%"></button>`).join("")}
          <b class="rota-pacote"></b>
        </div>
        <span class="rota-rotulo"><b></b><small></small></span>
      </div>`;
    el.addEventListener("click", (e) => {
      const no = e.target.closest(".rota-no");
      if (!no) return;
      paradas[Number(no.dataset.parada)]?.scrollIntoView({ behavior: rolagem() });
      registrarEvento("rota", "Pulou de seção pela rota do pacote");
    });
    $("#nav").appendChild(el);
    rota = { el, paradas, nomeParada, nos: [...el.querySelectorAll(".rota-no")], pos: [], atual: -1 };
    medirRota();
  }

  // Onde cada seção começa (em pixels de rolagem). As últimas podem não chegar ao topo da tela,
  // então o fim da página conta como chegada nelas.
  function medirRota() {
    if (!rota) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    // A seção "chega" quando o topo dela passa de 40% da altura da tela, como no destaque do menu
    const folga = Math.max(200, innerHeight * 0.4);
    let anterior = 0;
    rota.pos = rota.paradas.map((secao, i) => {
      const topo = i === 0 ? 0 : Math.min(max, secao.getBoundingClientRect().top + scrollY - folga);
      anterior = Math.max(anterior, topo);
      return anterior;
    });
    atualizarRota();
  }

  function atualizarRota() {
    rotaPendente = false;
    if (!rota) return;
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    let progresso;
    if (!rota.paradas.length) {
      progresso = max > 0 ? Math.min(1, y / max) : 0;
      rota.el.querySelector(".rota-rotulo b").textContent = `${Math.round(progresso * 100)}% ${idioma === "pt" ? "lido" : "read"}`;
    } else {
      const { pos } = rota;
      const n = pos.length;
      let i = 0;
      while (i < n - 1 && y >= pos[i + 1] - 1) i++;
      // No fim da página o pacote chega ao último nó
      if (y >= max - 2) i = n - 1;
      const trecho = i < n - 1 ? pos[i + 1] - pos[i] : 0;
      const parte = trecho > 0 ? Math.min(1, Math.max(0, (y - pos[i]) / trecho)) : 0;
      progresso = n > 1 ? (i + parte) / (n - 1) : 0;
      if (i !== rota.atual) chegarNaParada(i);
    }
    rota.el.style.setProperty("--progresso", progresso.toFixed(4));
  }

  function chegarNaParada(i) {
    rota.atual = i;
    rota.nos.forEach((no, j) => {
      no.classList.toggle("passou", j <= i);
      no.classList.toggle("aqui", j === i);
    });
    const secao = rota.paradas[i];
    rota.el.querySelector(".rota-rotulo b").textContent = rota.nomeParada(secao);
    rota.el.querySelector(".rota-rotulo small").textContent = `${i + 1}/${rota.paradas.length}`;
    secao.querySelector(".titulo-secao")?.classList.add("recebido");
  }

  function pedirRota() {
    if (rotaPendente) return;
    rotaPendente = true;
    requestAnimationFrame(atualizarRota);
  }

  // Abertura: as letras do nome passam por símbolos de código até virarem o nome, como bits sendo decodificados
  function decodificarNome() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const simbolos = "01<>/{}[]#=+*";
    document.querySelectorAll(".hero-nome .letra").forEach((el, i) => {
      const final = el.textContent;
      // Largura travada: o nome não "pula" enquanto as letras trocam
      el.style.width = `${el.getBoundingClientRect().width}px`;
      el.style.textAlign = "center";
      const fim = performance.now() + 300 + i * 70;
      let ultimaTroca = 0;
      const passo = (agora) => {
        if (agora >= fim) {
          el.textContent = final;
          el.style.width = el.style.textAlign = "";
          return;
        }
        if (agora - ultimaTroca > 55) {
          el.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
          ultimaTroca = agora;
        }
        requestAnimationFrame(passo);
      };
      requestAnimationFrame(passo);
    });
  }

  /* ---------- Foto e cartões reagem ao mouse ---------- */

  // A foto do topo vira na direção do mouse (em qualquer ponto do topo), e os cartões de projeto,
  // nota e repositório inclinam sob o mouse com uma luz no ponto onde ele está.
  // Só com mouse: em tela de toque não há "passar por cima". E não liga para quem prefere menos movimento.
  const CARTOES = ".projeto, .nota-cartao, .repo";

  function reagirAoMouse() {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cartaoAtual = null;
    let ultimo = null;
    let agendado = false;

    const soltar = (el) => {
      if (!el) return;
      el.classList.remove("inclinando");
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
    };
    // graus: inclinação máxima. Fora do elemento (a foto reage ao topo inteiro) o valor fica no limite.
    const inclinar = (el, x, y, graus) => {
      const r = el.getBoundingClientRect();
      const px = Math.min(1, Math.max(0, (x - r.left) / r.width));
      const py = Math.min(1, Math.max(0, (y - r.top) / r.height));
      el.style.setProperty("--rx", `${((0.5 - py) * graus).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((px - 0.5) * graus).toFixed(2)}deg`);
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      el.classList.add("inclinando");
    };

    const processar = () => {
      agendado = false;
      const e = ultimo;
      const alvo = e?.target instanceof Element ? e.target : null;
      const cartao = alvo?.closest(CARTOES) || null;
      if (cartao !== cartaoAtual) { soltar(cartaoAtual); cartaoAtual = cartao; }
      if (cartao) inclinar(cartao, e.clientX, e.clientY, 9);
      const foto = $(".hero-foto");
      if (foto) {
        if (alvo?.closest(".hero")) inclinar(foto, e.clientX, e.clientY, 18);
        else if (foto.classList.contains("inclinando")) soltar(foto);
      }
    };

    document.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      ultimo = e;
      if (!agendado) { agendado = true; requestAnimationFrame(processar); }
    }, { passive: true });
    // Mouse saiu da janela: tudo volta ao lugar
    document.documentElement.addEventListener("mouseleave", () => { ultimo = null; processar(); });
  }

  /* ---------- Animações da rolagem ---------- */

  // Cada bloco entra na tela subindo quando aparece; itens de uma lista entram em cascata.
  // O topo se afasta em camadas ao rolar, e a faixa de temas entorta com a velocidade da rolagem.
  // Quem prefere menos movimento vê tudo parado, sem esconder nada.
  const anima = !matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window;
  // Listas cujos itens entram um depois do outro
  const CASCATA = ".projetos-grade > *, .notas-lista > *, .habilidades-grade > *, .agora-grade > *, .pubs-lista > li, .traj-lista > li, .repos > .repo:not(.repo-esqueleto), .reconhecimentos > li, .chips > li";
  let obsRevelar;

  function prepararRevelar() {
    if (!anima) return;
    raiz.classList.add("anima");
    obsRevelar ??= new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        // Bloco que já ficou para trás (rolagem rápida, salto pelo menu) aparece sem esperar a volta
        const passou = e.boundingClientRect.bottom < 0;
        if (!e.isIntersecting && !passou) continue;
        e.target.classList.add("visivel");
        // "passou" também desliga a coreografia das partes internas (CSS)
        if (passou) { e.target.style.animation = "none"; e.target.classList.add("passou"); }
        else {
          const titulo = e.target.matches(".titulo-secao") ? e.target : e.target.querySelector(".titulo-secao");
          if (titulo) decodificarTitulo(titulo);
        }
        obsRevelar.unobserve(e.target);
      }
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(CASCATA).forEach((el) => {
      if (el.classList.contains("revelar")) return;
      el.classList.add("revelar");
      const irmaos = [...el.parentElement.children];
      el.style.setProperty("--atraso", `${Math.min(irmaos.indexOf(el), 6) * 70}ms`);
    });
    document.querySelectorAll(".revelar:not(.visivel)").forEach((el) => obsRevelar.observe(el));
  }

  // Título aparece embaralhado e as letras se resolvem da esquerda para a direita, como o nome do topo
  const SIMBOLOS = "01<>/{}[]#=+*_";
  function decodificarTitulo(el) {
    if (el.dataset.decodificando) return;
    const final = el.textContent;
    el.dataset.decodificando = "1";
    el.setAttribute("aria-label", final);
    // Altura travada: a troca de letras não empurra o resto da página
    el.style.minHeight = `${el.offsetHeight}px`;
    const inicio = performance.now();
    const passo = (agora) => {
      const pronto = Math.floor((agora - inicio - 150) / 38);
      if (pronto >= final.length) {
        el.textContent = final;
        el.style.minHeight = "";
        el.removeAttribute("aria-label");
        delete el.dataset.decodificando;
        return;
      }
      el.textContent = [...final].map((c, i) =>
        i < pronto || c === " " ? c : SIMBOLOS[Math.floor(Math.random() * SIMBOLOS.length)]).join("");
      requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  }

  // O texto do "Sobre" acende palavra por palavra conforme a rolagem passa por ele
  let palavras = null;
  function prepararPalavras() {
    palavras = null;
    const caixa = anima && $(".sobre-texto");
    if (!caixa) return;
    const textos = [];
    const andar = document.createTreeWalker(caixa, NodeFilter.SHOW_TEXT);
    while (andar.nextNode()) if (andar.currentNode.textContent.trim()) textos.push(andar.currentNode);
    for (const no of textos) {
      const pedaco = document.createDocumentFragment();
      for (const parte of no.textContent.split(/(\s+)/)) {
        if (!parte) continue;
        if (/^\s+$/.test(parte)) { pedaco.append(parte); continue; }
        const span = document.createElement("span");
        span.className = "palavra";
        span.textContent = parte;
        pedaco.append(span);
      }
      no.replaceWith(pedaco);
    }
    palavras = { caixa, lista: [...caixa.querySelectorAll(".palavra")], acesas: 0 };
  }

  function acenderPalavras() {
    if (!palavras) return;
    const r = palavras.caixa.getBoundingClientRect();
    // Começa quando o texto entra pelo pé da tela e termina quando o fim dele passa do meio
    const comeco = innerHeight * 0.88;
    const fim = innerHeight * 0.45;
    const p = Math.min(1, Math.max(0, (comeco - r.top) / (r.height + comeco - fim)));
    const n = Math.round(p * palavras.lista.length);
    if (n === palavras.acesas) return;
    const [de, ate] = n > palavras.acesas ? [palavras.acesas, n] : [n, palavras.acesas];
    for (let i = de; i < ate; i++) palavras.lista[i].classList.toggle("acesa", i < n);
    palavras.acesas = n;
  }

  // Valores que seguem a rolagem, gravados como variáveis CSS
  let ultimaRolagem = scrollY;
  let fimDaRolagem;
  function animarRolagem() {
    if (!anima || !naInicial) return;
    const y = scrollY;
    const hero = $(".hero");
    if (hero) {
      const p = Math.min(1, Math.max(0, y / hero.offsetHeight));
      hero.style.setProperty("--saida", p.toFixed(3));
    }
    // Velocidade da rolagem entorta a faixa; parada, ela volta devagar ao lugar
    const faixa = $(".faixa");
    if (faixa) {
      const inclinacao = Math.max(-12, Math.min(12, (y - ultimaRolagem) * 0.35));
      faixa.style.setProperty("--inclinacao", `${inclinacao.toFixed(2)}deg`);
      clearTimeout(fimDaRolagem);
      fimDaRolagem = setTimeout(() => faixa.style.setProperty("--inclinacao", "0deg"), 90);
    }
    ultimaRolagem = y;
    acenderPalavras();
  }

  // Botões magnéticos: puxados um pouco na direção do mouse, e uma onda sai de onde o clique caiu
  const MAGNETICOS = ".botao, .botao-icone, .atalho, .contato-links a";
  function botoesVivos() {
    if (!anima) return;
    if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
      let atual = null;
      document.addEventListener("pointermove", (e) => {
        const alvo = e.target instanceof Element ? e.target.closest(MAGNETICOS) : null;
        if (atual && atual !== alvo) { atual.style.removeProperty("--ima-x"); atual.style.removeProperty("--ima-y"); }
        atual = alvo;
        if (!alvo) return;
        const r = alvo.getBoundingClientRect();
        alvo.style.setProperty("--ima-x", `${((e.clientX - r.left - r.width / 2) * 0.25).toFixed(1)}px`);
        alvo.style.setProperty("--ima-y", `${((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px`);
      }, { passive: true });
    }
    document.addEventListener("pointerdown", (e) => {
      const botao = e.target instanceof Element ? e.target.closest(".botao, .botao-icone, .atalho") : null;
      if (!botao) return;
      const r = botao.getBoundingClientRect();
      const onda = document.createElement("span");
      onda.className = "onda";
      onda.setAttribute("aria-hidden", "true");
      onda.style.left = `${e.clientX - r.left}px`;
      onda.style.top = `${e.clientY - r.top}px`;
      botao.append(onda);
      onda.addEventListener("animationend", () => onda.remove());
    });
  }

  let obsSecao;
  function observarSecaoAtiva() {
    if (!naInicial || !("IntersectionObserver" in window)) return;
    obsSecao?.disconnect();
    const links = new Map([...document.querySelectorAll(".nav-links a")].map((a) => [a.dataset.secao, a]));
    obsSecao = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        links.forEach((a) => { a.classList.remove("ativo"); a.removeAttribute("aria-current"); });
        const ativo = links.get(e.target.id);
        ativo?.classList.add("ativo");
        ativo?.setAttribute("aria-current", "true");
      }
    }, { rootMargin: "-45% 0px -50% 0px" });
    // Seções sem link (topo, terminal...) também são observadas para limpar o destaque
    ["inicio", ...secoesAtuais.map((s) => s.id)].forEach((id) => { const s = document.getElementById(id); if (s) obsSecao.observe(s); });
  }

  function atualizarNav() {
    $("#nav").classList.toggle("rolou", window.scrollY > 40);
  }

  function fecharMenu(devolverFoco) {
    const estavaAberto = $("#nav").classList.contains("menu-aberto");
    $("#nav").classList.remove("menu-aberto");
    $("#btnMenu")?.setAttribute("aria-expanded", "false");
    if (estavaAberto && devolverFoco) $("#btnMenu")?.focus();
  }

  function aplicarCores() {
    window.TEMAS_DO_SITE.aplicar(paleta);
    document.querySelectorAll("#temas [data-estilo]").forEach((b) => b.setAttribute("aria-pressed", String(Number(b.dataset.estilo) === paleta)));
  }

  // Contador de visitas do GoatCounter (sem cookies). Só liga se "contador" estiver preenchido em dados.js.
  function ativarContador() {
    const codigo = String(D.contador || "").trim();
    if (!/^[a-z0-9-]+$/i.test(codigo)) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://gc.zgo.at/count.js";
    script.dataset.goatcounter = `https://${codigo}.goatcounter.com/count`;
    document.head.appendChild(script);
  }

  document.addEventListener("click", (evento) => {
    // Clicar fora do menu de temas fecha o menu
    if ($("#temas") && !evento.target.closest("#temas, [data-acao='paleta']")) fecharTemas(false);
    if (!evento.target.closest("#nav")) fecharMenu();
    // Toque ou clique na faixa de interesses pausa (e retoma) a rolagem
    evento.target.closest(".faixa")?.classList.toggle("pausada");
    const alvo = evento.target.closest("button, a, #terminalCorpo");
    if (!alvo) return;
    if (alvo.dataset.evento) registrarEvento(alvo.dataset.evento, alvo.dataset.eventoTitulo || alvo.textContent.trim().slice(0, 80));

    if (alvo.id === "terminalCorpo") {
      if (!window.getSelection()?.toString()) $("#terminalEntrada")?.focus();
    } else if (alvo.dataset.copiar) {
      copiarTexto(alvo.dataset.copiar);
      alvo.classList.add("copiado");
      setTimeout(() => alvo.classList.remove("copiado"), 1200);
    } else if (alvo.dataset.acao === "som") {
      alternarSom();
    } else if (alvo.dataset.acao === "curriculo") {
      window.print();
    } else if (alvo.dataset.acao === "pausar") {
      alternarPausa();
    } else if (alvo.dataset.acao === "tema") {
      alternarTema(evento);
    } else if (alvo.dataset.acao === "paleta") {
      abrirTemas(alvo);
    } else if (alvo.dataset.acao === "fechar-temas") {
      fecharTemas();
    } else if (alvo.dataset.estilo) {
      escolherEstilo(Number(alvo.dataset.estilo));
    } else if (alvo.dataset.acao === "idioma") {
      trocarIdioma();
    } else if (alvo.dataset.acao === "busca") {
      abrirBusca();
    } else if (alvo.id === "btnMenu") {
      const aberto = $("#nav").classList.toggle("menu-aberto");
      alvo.setAttribute("aria-expanded", String(aberto));
      if (aberto) $("#navLinks a")?.focus();
    } else if (alvo.classList.contains("atalho")) {
      executar(alvo.dataset.comando);
    } else if (alvo.classList.contains("pubs-alternar")) {
      pubsAbertas = !pubsAbertas;
      $("#pubsExtra").hidden = !pubsAbertas;
      alvo.setAttribute("aria-expanded", String(pubsAbertas));
      alvo.innerHTML = rotuloAlternarPubs(Number(alvo.dataset.total));
    } else if (alvo.closest(".nav-links")) {
      fecharMenu();
    }
  });

  document.addEventListener("submit", (evento) => {
    if (evento.target.id === "formContato") {
      evento.preventDefault();
      enviarFormulario(evento.target);
      return;
    }
    if (evento.target.id !== "terminalForm") return;
    evento.preventDefault();
    const entrada = $("#terminalEntrada");
    executar(entrada.value);
    entrada.value = "";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { fecharMenu(true); fecharTemas(); }

    const digitando = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
    // Busca rápida: Ctrl+K (ou ⌘K) em qualquer lugar, ou "/" fora de campos de texto
    if ((e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey) && !e.altKey) || (e.key === "/" && !digitando)) {
      e.preventDefault();
      if ($("#busca")?.open) fecharBusca(); else abrirBusca();
      return;
    }

    // Código secreto, ignorado enquanto a pessoa digita em algum campo
    if (!digitando) {
      const tecla = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      posKonami = tecla === KONAMI[posKonami] ? posKonami + 1 : (tecla === KONAMI[0] ? 1 : 0);
      if (posKonami === KONAMI.length) {
        posKonami = 0;
        alternarHacker();
      }
    }

    if (e.target.id !== "terminalEntrada" || !historico.length) return;
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      posHistorico = Math.max(0, Math.min(historico.length, posHistorico + (e.key === "ArrowUp" ? -1 : 1)));
      e.target.value = historico[posHistorico] || "";
    }
  });

  window.addEventListener("scroll", atualizarNav, { passive: true });
  window.addEventListener("scroll", pedirRota, { passive: true });
  let rolagemPendente = false;
  window.addEventListener("scroll", () => {
    if (rolagemPendente) return;
    rolagemPendente = true;
    requestAnimationFrame(() => { rolagemPendente = false; animarRolagem(); });
  }, { passive: true });
  reagirAoMouse();
  botoesVivos();
  window.addEventListener("resize", medirRota);
  // Imagens, GitHub e livro de visitas carregam depois e mudam a altura das seções
  if ("ResizeObserver" in window) new ResizeObserver(() => medirRota()).observe(document.body);

  aplicarCores();
  atualizarCorDoNavegador();
  render();
  atualizarNav();
  if (naInicial) carregarAtividade();
  ativarContador();

  // Recado para quem abre o console do navegador
  console.log("%cOi, dev! 👋", "font: 800 22px sans-serif; color: #9d9bff");
  console.log(idioma === "en"
    ? "Curious? Type ctf in the site's terminal, or press Ctrl+K. And psst: ↑ ↑ ↓ ↓ ← → ← → B A"
    : "Curioso? Digite ctf no terminal do site, ou aperte Ctrl+K. E psiu: ↑ ↑ ↓ ↓ ← → ← → B A");
})();
