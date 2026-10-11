/* Monta o portfólio a partir de js/dados.js. Não é preciso editar este arquivo. */
(function () {
  "use strict";

  const D = window.DADOS;
  const raiz = document.documentElement;
  const $ = (seletor) => document.querySelector(seletor);

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
      chat: ["Oi! 👋", "Respondo por e-mail ou pelas redes aqui embaixo."],
      tema: "Alternar tema claro/escuro", idioma: "Read in English", menu: "Menu",
      paleta: "Trocar a cor do site", voltarTopo: "Voltar ao topo",
      dica: "Experimente:", placeholder: "digite help",
      atalhos: ["help", "whoami", "agora", "projetos", "p4", "contato", "ctf"],
      hackerLigado: "MODO HACKER ATIVADO", hackerDesligado: "modo hacker desligado",
      etapas: ["enviado", "verificado", "entregue"],
      t: {
        boasVindas: 'Olá! 👋 Este é o terminal do portfólio. Digite <span class="t-cmd">help</span> para ver o que dá pra fazer.',
        ajuda: [
          ["help", "mostra esta lista"], ["whoami", "quem sou eu"], ["agora", "no que estou trabalhando"],
          ["pesquisa", "meus interesses de pesquisa"], ["projetos", "lista os projetos"], ["p4", "afinal, o que é P4?"],
          ["contato", "como falar comigo"], ["git log", "meus últimos commits no GitHub"], ["ls", "lista as seções do site"],
          ["cd <seção>", "vai até uma seção (ex.: cd projetos)"], ["ctf", "🚩 desafio: ache a flag escondida no site"], ["clear", "limpa a tela"],
        ],
        ctf: [
          '<span class="t-destaque">🚩 Desafio CTF</span>: a flag está dividida em 3 pedaços escondidos neste site.',
          "",
          "Pista 1: todo site tem um código-fonte. Já deu uma olhada no deste? (Ctrl+U)",
          "Pista 2: os robôs de busca recebem instruções que você não vê, num arquivo .txt bem conhecido.",
          "Pista 3: nem todo caminho existe... mas até o que não existe tem algo a dizer.",
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
        p4: "Tudo o que circula na internet viaja em pequenos pedaços chamados pacotes, passando por equipamentos como roteadores. Normalmente, esses equipamentos já vêm de fábrica sabendo o que fazer. P4 é uma linguagem de programação que permite ensinar a eles regras novas: deixar o pacote seguir, mudar o caminho ou bloquear.\n\nÉ como um carteiro que pode ser treinado para conferir cada carta antes de entregar. Eu pesquiso como usar isso para deixar a comunicação mais segura.",
        semSecao: (s) => `seção não encontrada: ${s}. Use ls para ver as seções.`,
        indo: (s) => `indo para ${s}/ ...`,
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
      chat: ["Hi! 👋", "I reply by e-mail or on the networks below."],
      tema: "Toggle light/dark theme", idioma: "Ler em português", menu: "Menu",
      paleta: "Change the site color", voltarTopo: "Back to top",
      dica: "Try:", placeholder: "type help",
      atalhos: ["help", "whoami", "now", "projects", "p4", "contact", "ctf"],
      hackerLigado: "HACKER MODE ON", hackerDesligado: "hacker mode off",
      etapas: ["sent", "checked", "delivered"],
      t: {
        boasVindas: 'Hi! 👋 This is the portfolio terminal. Type <span class="t-cmd">help</span> to see what you can do.',
        ajuda: [
          ["help", "shows this list"], ["whoami", "who I am"], ["now", "what I'm working on"],
          ["research", "my research interests"], ["projects", "lists my projects"], ["p4", "so, what is P4?"],
          ["contact", "how to reach me"], ["git log", "my latest commits on GitHub"], ["ls", "lists the site sections"],
          ["cd <section>", "jumps to a section (e.g. cd projects)"], ["ctf", "🚩 challenge: find the flag hidden on the site"], ["clear", "clears the screen"],
        ],
        ctf: [
          '<span class="t-destaque">🚩 CTF challenge</span>: the flag is split into 3 pieces hidden on this site.',
          "",
          "Clue 1: every website has source code. Have you looked at this one's? (Ctrl+U)",
          "Clue 2: search robots get instructions you don't see, in a well-known .txt file.",
          "Clue 3: not every path exists... but even what doesn't exist has something to say.",
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
        p4: "Everything on the internet travels in small pieces called packets, passing through devices such as routers. Normally these devices come from the factory already knowing what to do. P4 is a programming language that lets you teach them new rules: let a packet through, change its route or block it.\n\nIt's like a mail carrier who can be trained to check every letter before delivering it. I research how to use this to make communication more secure.",
        semSecao: (s) => `section not found: ${s}. Use ls to see the sections.`,
        indo: (s) => `going to ${s}/ ...`,
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

  // Cores que o visitante pode escolher no botão de paleta. A primeira vem de dados.js.
  const PALETAS = [
    { claro: D.cores?.claro || "#4338ff", escuro: D.cores?.escuro || "#9d9bff" },
    { claro: "#e0452b", escuro: "#ff8a70" },
    { claro: "#0f8a5f", escuro: "#4ade9b" },
    { claro: "#9333ea", escuro: "#c99bff" },
  ];

  /* ---------- Utilitários ---------- */

  const memoria = {
    ler(chave) { try { return localStorage.getItem(chave); } catch (e) { return null; } },
    gravar(chave, valor) { try { localStorage.setItem(chave, valor); } catch (e) { /* sem armazenamento */ } },
  };

  const idiomas = Array.isArray(D.idiomas) && D.idiomas.length ? D.idiomas : ["pt"];
  let idioma = idiomas.includes(memoria.ler("idioma")) ? memoria.ler("idioma") : idiomas[0];
  let paleta = Number(memoria.ler("paleta")) % PALETAS.length || 0;
  let pubsAbertas = false;
  let jaRenderizou = false;
  let secoesAtuais = [];
  const historico = [];
  let posHistorico = 0;

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

  function botoesLinks({ destacar = true, semEmail = false } = {}) {
    const primeiroEmail = D.contato?.emails?.[0];
    return (D.links || [])
      .filter((link) => !(semEmail && link.tipo === "email"))
      .map((link) => {
        const url = link.url || (link.tipo === "email" && primeiroEmail ? `mailto:${primeiroEmail}` : "#");
        const rotulo = t(link.rotulo) || t(ROTULOS_LINK[link.tipo]) || link.tipo;
        const principal = destacar && link.principal ? " principal" : "";
        return `<a class="botao${principal}" href="${esc(url)}"${linkExterno(url)}>${ICONES[link.tipo] || ICONES.site}<span>${esc(rotulo)}</span></a>`;
      })
      .join("");
  }

  /* ---------- Seções ---------- */

  function topo() {
    const nome = D.nome || {};
    const detalhes = (D.topo?.detalhes || []).map(t).filter(Boolean);
    const selo = detalhes[detalhes.length - 1];
    const foto = D.foto
      ? `<figure class="hero-foto" style="--foto-posicao:${esc(D.fotoPosicao || "50% 22%")}">
          <img src="${esc(D.foto)}" alt="${esc(nomeCompleto())}" width="900" height="1400" fetchpriority="high" decoding="async" onerror="this.closest('figure').remove()">
          <figcaption>${esc(t(D.contato?.cidade) || "")}</figcaption>
          ${selo ? `<span class="hero-selo">${esc(selo)}</span>` : ""}
        </figure>`
      : "";

    return `
      <section class="hero" id="inicio">
        <div class="container hero-grade">
          <div class="hero-texto">
            ${D.topo?.chamada ? `<p class="hero-pill"><i></i>${esc(t(D.topo.chamada))}</p>` : ""}
            <h1 class="hero-nome" aria-label="${esc(nomeCompleto())}">
              <span aria-hidden="true">${letras(nome.primeiro)}</span><span aria-hidden="true">${letras(nome.sobrenome)}</span>
            </h1>
            ${D.topo?.frase ? `<p class="hero-frase texto-rico">${rico(t(D.topo.frase))}</p>` : ""}
            ${detalhes.length ? `<ul class="hero-chips">${detalhes.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}
            <div class="hero-links">${botoesLinks()}</div>
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
    const grupo = itens.map((x) => `${esc(x)}<b>✦</b>`).join("");
    return `<div class="faixa" aria-hidden="true"><div class="faixa-trilho"><span>${grupo}</span><span>${grupo}</span></div></div>`;
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

  function secaoSobre() {
    if (!temItens(D.sobre)) return "";
    const u = UI[idioma];
    const resumo = [...(D.topo?.detalhes || []), D.contato?.cidade].map(t).filter(Boolean);
    return `
      <section class="secao" id="sobre">
        <div class="container sobre-grade">
          <div class="revelar">
            <h2 class="titulo-secao">${u.tituloSobre}</h2>
            <div class="sobre-texto texto-rico">${D.sobre.map((p) => `<p>${rico(t(p))}</p>`).join("")}</div>
          </div>
          ${resumo.length ? `
            <aside class="ficha revelar">
              <h3>${u.emResumo}</h3>
              <ul>${resumo.map((x) => `<li><span aria-hidden="true">→</span>${esc(x)}</li>`).join("")}</ul>
            </aside>` : ""}
        </div>
      </section>`;
  }

  function secaoTerminal() {
    const u = UI[idioma];
    return `
      <section class="secao" id="terminal">
        <div class="container">
          <h2 class="titulo-secao revelar">${u.tituloTerminal}</h2>
          <div class="terminal revelar">
            <div class="terminal-barra" aria-hidden="true"><i></i><i></i><i></i><span>${esc(prompt())}</span></div>
            <div class="terminal-corpo" id="terminalCorpo">
              <div id="terminalSaida" aria-live="polite"></div>
              <form class="terminal-linha" id="terminalForm" autocomplete="off">
                <label class="terminal-prompt" for="terminalEntrada">${esc(prompt())}$</label>
                <input id="terminalEntrada" type="text" spellcheck="false" autocapitalize="off" autocomplete="off" placeholder="${u.placeholder}">
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
            ${linhas.map((l, i) => `<li><span class="num">${String(i + 1).padStart(2, "0")}</span><span>${esc(t(l))}</span></li>`).join("")}
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
    return pubsAbertas ? `${u.verMenos} −` : `${u.verTodas(total)} +`;
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
    if (p.imagem) return `background-image: url('${esc(p.imagem).replace(/'/g, "%27")}')`;
    const cor = CORES_CAPA[p.cor] || (/^(#|rgb|hsl)/.test(p.cor || "") ? p.cor : CORES_CAPA.indigo);
    return `--capa: ${esc(cor)}`;
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
              return `
                <article class="projeto revelar">
                  <div class="projeto-capa${p.imagem ? " com-imagem" : ""}" style="${estiloCapa(p)}">
                    <span class="projeto-num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
                    ${p.status ? `<span class="projeto-status">${esc(t(p.status))}</span>` : ""}
                    ${p.categoria ? `<span class="projeto-tag">${esc(t(p.categoria))}</span>` : ""}
                  </div>
                  <div class="projeto-corpo">
                    <h3>${p.url ? `<a href="${esc(p.url)}"${linkExterno(p.url)}>${titulo}<span aria-hidden="true">↗</span></a>` : titulo}</h3>
                    ${p.descricao ? `<p class="texto-rico">${rico(t(p.descricao))}</p>` : ""}
                    ${p.papel ? `<p class="texto-rico"><strong>${u.meuPapel}</strong> ${rico(t(p.papel))}</p>` : ""}
                    ${temItens(p.tecnologias) ? `<ul class="techs">${p.tecnologias.map((x) => `<li>${esc(t(x))}</li>`).join("")}</ul>` : ""}
                  </div>
                </article>`;
            }).join("")}
          </div>
          ${D.maisProjetos ? `<a class="botao mais-projetos revelar" href="${esc(D.maisProjetos)}"${linkExterno(D.maisProjetos)}>${ICONES.github}<span>${u.maisProjetos}</span> ↗</a>` : ""}
        </div>
      </section>`;
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
    if (estadoAtividade === "carregando") return `<p class="repos-aviso"><span class="carregando"></span>${u.githubCarregando}</p>`;
    if (estadoAtividade === "erro" || !atividade?.repos?.length) {
      return `<p class="repos-aviso">${u.githubErro} <a href="${esc(perfil)}" target="_blank" rel="noopener">${u.verGithub} ↗</a></p>`;
    }
    return `
      <div class="repos">
        ${atividade.repos.map((r) => `
          <a class="repo" href="${esc(r.url)}" target="_blank" rel="noopener">
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
          ${itens.map((i) => `
            <li>
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

  function secaoContato() {
    const emails = D.contato?.emails || [];
    if (!emails.length && !temItens(D.links)) return "";
    const u = UI[idioma];
    return `
      <section class="secao" id="contato">
        <div class="container">
          <div class="contato-bloco revelar">
            <p class="contato-pre">${u.contato}</p>
            <h2 class="contato-titulo">${u.tituloContato}</h2>
            <div class="chat">
              ${u.chat.map((msg) => `<p class="bolha">${esc(msg)}</p>`).join("")}
              ${emails.map((e) => `<a class="bolha bolha-eu" href="mailto:${esc(e)}">${esc(e)}</a>`).join("")}
            </div>
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
    clear: "limpar", limpar: "limpar", cls: "limpar",
    sudo: "sudo",
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
    aviso.setAttribute("role", "status");
    aviso.textContent = texto;
    document.body.appendChild(aviso);
    setTimeout(() => aviso.remove(), 2600);
  }

  function alternarHacker() {
    const ligado = raiz.classList.toggle("modo-hacker");
    avisar(ligado ? UI[idioma].hackerLigado : UI[idioma].hackerDesligado);
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

    const [cmd, ...args] = texto.split(/\s+/);
    const T = UI[idioma].t;

    switch (COMANDOS[cmd.toLowerCase()]) {
      case "ajuda":
        imprimir(T.ajuda.map(([c, d]) => `<span class="t-cmd">${esc(c.padEnd(14))}</span>${esc(d)}`).join("\n"));
        break;
      case "quem":
        imprimir([
          `<span class="t-destaque">${esc(nomeCompleto())}</span>`,
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
          window.scrollTo({ top: 0, behavior: "smooth" });
          break;
        }
        const secao = acharSecao(args[0]);
        if (!secao) { imprimir(esc(T.semSecao(args[0])), "t-erro"); break; }
        imprimir(esc(T.indo(nomeSecao(secao.id))));
        setTimeout(() => document.getElementById(secao.id)?.scrollIntoView({ behavior: "smooth" }), 350);
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
        imprimir(T.ctf);
        if (memoria.ler("ctf") === "ok") imprimir(esc(T.ctfJaResolvido), "t-cmd");
        break;
      case "submit": {
        const tentativa = args.join(" ");
        if (!tentativa) { imprimir(esc(T.ctfUso), "t-erro"); break; }
        if (!window.crypto?.subtle) { imprimir(esc(T.semCripto), "t-erro"); break; }
        flagCorreta(tentativa).then((certa) => {
          imprimir(esc(certa ? T.ctfCerto : T.ctfErrado), certa ? "t-destaque" : "t-erro");
          if (certa) { memoria.gravar("ctf", "ok"); comemorar(); }
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
    document.title = [nomeCompleto(), t(D.topo?.chamada)].filter(Boolean).join(" · ");
    $("#metaDescricao").setAttribute("content", simples(D.topo?.frase));

    secoesAtuais = [
      { id: "agora", menu: true, html: secaoAgora() },
      { id: "sobre", menu: true, html: secaoSobre() },
      { id: "terminal", html: secaoTerminal() },
      { id: "pesquisa", menu: true, html: secaoPesquisa() },
      { id: "publicacoes", menu: true, html: secaoPublicacoes() },
      { id: "projetos", menu: true, html: secaoProjetos() },
      { id: "github", html: secaoGithub() },
      { id: "trajetoria", menu: true, html: secaoTrajetoria() },
      { id: "reconhecimentos", html: secaoReconhecimentos() },
      { id: "contato", menu: true, html: secaoContato() },
    ].filter((s) => s.html);

    const outroIdioma = idiomas.find((i) => i !== idioma);
    // Os mesmos botões aparecem na barra e, em telas pequenas, dentro do menu
    const acoes = `
      <button class="botao-icone botao-paleta" data-acao="paleta" type="button" title="${u.paleta}" aria-label="${u.paleta}"><span></span></button>
      ${outroIdioma ? `<button class="botao-icone" data-acao="idioma" type="button" title="${u.idioma}" aria-label="${u.idioma}">${outroIdioma.toUpperCase()}</button>` : ""}
      <button class="botao-icone" data-acao="tema" type="button" title="${u.tema}" aria-label="${u.tema}">${ICONES.tema}</button>`;

    $("#nav").innerHTML = `
      <div class="container nav-dentro">
        <a class="nav-nome" href="#inicio">${esc(nomeCompleto())}</a>
        <nav class="nav-links" id="navLinks" aria-label="Seções">
          ${secoesAtuais.filter((s) => s.menu).map((s) => `<a href="#${s.id}" data-secao="${s.id}">${u[s.id]}</a>`).join("")}
          <div class="acoes-no-menu">${acoes}</div>
        </nav>
        <div class="nav-acoes">
          <span class="acoes-na-barra">${acoes}</span>
          <button class="botao-icone nav-menu" id="btnMenu" type="button" aria-label="${u.menu}" aria-expanded="false" aria-controls="navLinks">${ICONES.menu}</button>
        </div>
      </div>`;

    $("#conteudo").innerHTML = topo() + secoesAtuais.map((s) => s.html).join("");

    $("#rodape").innerHTML = `
      <div class="container">
        <span>© ${new Date().getFullYear()} ${esc(nomeCompleto())}</span>
        <a href="#inicio">${u.voltarTopo} ↑</a>
      </div>`;

    imprimir(u.t.boasVindas);
    fecharMenu();
    observarRevelacoes();
    observarSecaoAtiva();
    jaRenderizou = true;
  }

  /* ---------- Comportamentos ---------- */

  function observarRevelacoes() {
    const elementos = document.querySelectorAll(".revelar");
    // Na troca de idioma não anima de novo
    if (jaRenderizou || !("IntersectionObserver" in window)) {
      elementos.forEach((el) => el.classList.add("visivel"));
      return;
    }
    const obs = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (e.isIntersecting) {
          e.target.classList.add("visivel");
          obs.unobserve(e.target);
        }
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    elementos.forEach((el) => obs.observe(el));
  }

  let obsSecao;
  function observarSecaoAtiva() {
    if (!("IntersectionObserver" in window)) return;
    obsSecao?.disconnect();
    const links = new Map([...document.querySelectorAll(".nav-links a")].map((a) => [a.dataset.secao, a]));
    obsSecao = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        links.forEach((a) => a.classList.remove("ativo"));
        links.get(e.target.id)?.classList.add("ativo");
      }
    }, { rootMargin: "-45% 0px -50% 0px" });
    // Seções sem link (topo, terminal...) também são observadas para limpar o destaque
    ["inicio", ...secoesAtuais.map((s) => s.id)].forEach((id) => { const s = document.getElementById(id); if (s) obsSecao.observe(s); });
  }

  function atualizarNav() {
    $("#nav").classList.toggle("rolou", window.scrollY > 40);
  }

  function fecharMenu() {
    $("#nav").classList.remove("menu-aberto");
    $("#btnMenu")?.setAttribute("aria-expanded", "false");
  }

  function aplicarCores() {
    const cores = PALETAS[paleta];
    raiz.style.setProperty("--acento-claro", cores.claro);
    raiz.style.setProperty("--acento-escuro", cores.escuro);
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
    const alvo = evento.target.closest("button, a, #terminalCorpo");
    if (!alvo) return;

    if (alvo.id === "terminalCorpo") {
      if (!window.getSelection()?.toString()) $("#terminalEntrada")?.focus();
    } else if (alvo.dataset.acao === "tema") {
      const novo = raiz.dataset.theme === "dark" ? "light" : "dark";
      raiz.dataset.theme = novo;
      memoria.gravar("tema", novo);
    } else if (alvo.dataset.acao === "paleta") {
      paleta = (paleta + 1) % PALETAS.length;
      memoria.gravar("paleta", String(paleta));
      aplicarCores();
    } else if (alvo.dataset.acao === "idioma") {
      idioma = idiomas.find((i) => i !== idioma) || idioma;
      memoria.gravar("idioma", idioma);
      render();
    } else if (alvo.id === "btnMenu") {
      const aberto = $("#nav").classList.toggle("menu-aberto");
      alvo.setAttribute("aria-expanded", String(aberto));
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
    if (evento.target.id !== "terminalForm") return;
    evento.preventDefault();
    const entrada = $("#terminalEntrada");
    executar(entrada.value);
    entrada.value = "";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharMenu();

    // Código secreto, ignorado enquanto a pessoa digita em algum campo
    if (!/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) {
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

  aplicarCores();
  render();
  atualizarNav();
  carregarAtividade();
  ativarContador();

  // Recado para quem abre o console do navegador
  console.log("%cOi, dev! 👋", "font: 800 22px sans-serif; color: #9d9bff");
  console.log(idioma === "en"
    ? "Curious? Type ctf in the site's terminal. And psst: ↑ ↑ ↓ ↓ ← → ← → B A"
    : "Curioso? Digite ctf no terminal do site. E psiu: ↑ ↑ ↓ ↓ ← → ← → B A");
})();
