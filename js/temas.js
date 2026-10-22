/* Cores e temas do site: usados pelo js/app.js e pela página 404.
   Precisa vir depois do js/dados.js (lê a cor original e o "estilo" com que o site abre). */
(function () {
  "use strict";

  const D = window.DADOS || {};
  const raiz = document.documentElement;

  // Cores que o visitante pode escolher no botão de paleta. A primeira vem de dados.js.
  // As do tema claro têm contraste de pelo menos 4,5:1 com o fundo, para textos pequenos.
  // As cores soltas (Lilás, Coral...) e os temas prontos de antes saíram: pareciam de site gerado.
  // Ficam dois temas pensados para o site, cada um com versão clara e escura.
  const PALETAS = [];

  const FONTES = {
    // Servida pelo próprio site (fontes/archivo-*.woff2)
    archivo: '"Archivo", "Helvetica Neue", Arial, sans-serif',
  };

  // Formas: cantos, bordas, sombra dura, inclinação e fundo.
  // "contorno" é a força da borda: 1 usa a cor do texto, menos que isso deixa a borda mais clara.
  const FORMAS = {
    // Cantos retos, borda firme, sem sombra, sem inclinação, sem fundo desenhado
    areia: { curva: "0px", raio: "0px", pilula: "0px", desloc: "0px", giro: "0deg", padrao: "none", borda: "2px", "borda-fina": "1.5px" },
  };

  // Todas as combinações de texto têm contraste de pelo menos 4,5:1.
  // "destaques" substituem o lima, o amarelo e o coral das etiquetas; "capas" são as cores das capas dos projetos;
  // "fixos" são o papel e a tinta que não mudam com o tema (moldura da foto, balões do contato).
  const TEMAS = [
    {
      // Azul-marinho, creme e branco: fundo creme com todo o texto em marinho e cartões brancos.
      // No escuro (e no campo invertido), o inverso: marinho de fundo, texto creme e destaques em branco.
      id: "marinho", nome: { pt: "Marinho e creme", en: "Navy and cream" }, titulo: FONTES.archivo, corpo: FONTES.archivo,
      claro: { fundo: "#f3ead8", cartao: "#fffdf8", texto: "#13234a", suave: "#4a5878", acento: "#13234a", sobre: "#fffdf8" },
      escuro: { fundo: "#0f1c3f", cartao: "#172a56", texto: "#f3ead8", suave: "#c3bba9", acento: "#ffffff", sobre: "#0f1c3f" },
      destaques: ["#ffffff", "#e9dec7", "#dfe4ef"],
      fixos: { papel: "#ffffff", tinta: "#13234a" },
      forma: FORMAS.areia,
      capas: ["#13234a", "#22366a", "#13234a", "#2e4580"],
    },
    {
      // Os areais de Alegrete: areia de fundo e um único azul-cobalto fazendo tudo (texto, desenhos, a rede).
      // No escuro, o inverso: areia sobre cobalto. Títulos em peso regular, nunca negrito.
      id: "areais", nome: { pt: "Areais de Alegrete", en: "Alegrete sands" }, titulo: FONTES.archivo, corpo: FONTES.archivo,
      claro: { fundo: "#e6dbc7", cartao: "#ddd0b9", texto: "#062b8a", suave: "#2f4f9e", acento: "#062b8a", sobre: "#e6dbc7" },
      escuro: { fundo: "#081d5c", cartao: "#0d2670", texto: "#e6dbc7", suave: "#bdb5a5", acento: "#e6dbc7", sobre: "#081d5c" },
      destaques: ["#cdbd9f", "#d8cab0", "#c4b393"],
      fixos: { papel: "#efe6d4", tinta: "#062b8a" },
      forma: FORMAS.areia,
      capas: ["#062b8a", "#1d3f9c", "#062b8a", "#2f4fa6"],
    },
    {
      // As cores que o Wireshark usa para cada protocolo; o escuro é o fundo do "Bad TCP".
      // Nas abas do "Agora", cada cor mostra o nome do protocolo dela (a legenda para quem reconhece)
      id: "wireshark", nome: { pt: "Wireshark", en: "Wireshark" }, titulo: FONTES.archivo, corpo: FONTES.archivo,
      claro: { fundo: "#f7f7f4", cartao: "#ffffff", texto: "#12272e", suave: "#4a5a60", acento: "#16679a" },
      escuro: { fundo: "#12272e", cartao: "#1a333c", texto: "#f2f5f7", suave: "#a9bcc2", acento: "#f78787" },
      destaques: ["#e4ffc7", "#e7e6ff", "#daeeff"],
      forma: FORMAS.areia,
      capas: ["#e7e6ff", "#daeeff", "#e4ffc7", "#fce0ff"],
    },
  ];

  const ESTILOS = [...PALETAS, ...TEMAS];

  // Índice do visual a usar: o que o visitante escolheu, senão o "estilo" de dados.js, senão o original.
  // Guardado como id ("cor-2", "oceano"); versões antigas guardavam só o número da cor.
  const acharEstilo = (id) => ESTILOS.findIndex((e) => e.id === id || e.id === `cor-${id}`);
  // Quem tinha guardado um visual que não existe mais cai no "estilo" de dados.js
  const indiceInicial = (guardado) => [guardado, D.estilo, "marinho"].map(acharEstilo).find((i) => i >= 0) ?? 0;

  function aplicar(indice) {
    const e = ESTILOS[indice] || ESTILOS[0];
    const tema = Boolean(e.titulo);
    raiz.style.setProperty("--acento-claro", tema ? e.claro.acento : e.claro);
    raiz.style.setProperty("--acento-escuro", tema ? e.escuro.acento : e.escuro);
    if (tema) raiz.dataset.estilo = e.id; else delete raiz.dataset.estilo;
    // Um tema troca todas as cores e as fontes; o modo hacker continua por cima
    let folha = document.getElementById("estiloTema");
    if (!tema) return folha?.remove();
    if (!folha) {
      folha = document.createElement("style");
      folha.id = "estiloTema";
      document.head.appendChild(folha);
    }
    const { contorno = 1, ...forma } = e.forma || {};
    const alfa = Math.round(contorno * 255).toString(16).padStart(2, "0");
    // Forma sem deslocamento de sombra: sem cor de sombra também (nada de sombra de tamanho zero nos botões)
    const semSombra = (e.forma || {}).desloc === "0px";
    const modo = (m, escuro) => `
      --fundo: ${m.fundo}; --cartao: ${m.cartao}; --texto: ${m.texto}; --suave: ${m.suave}; --acento: ${m.acento};
      --tinta: ${m.texto}; --linha: ${m.texto}2e; --grade: ${m.texto}${escuro ? "0f" : "14"};
      --contorno: ${contorno < 1 ? m.texto + alfa : m.texto};
      --sombra: ${semSombra ? "transparent" : escuro ? m.acento : m.texto}; --sobre-acento: ${m.sobre || (escuro ? m.fundo : "#ffffff")};`;
    folha.textContent = `
      html:not(.modo-hacker) {
        --fonte: ${e.corpo}; --fonte-titulo: ${e.titulo}; --fonte-mono: ${e.corpo};
        ${e.fixos ? `--papel-fixo: ${e.fixos.papel}; --tinta-fixa: ${e.fixos.tinta};` : ""}
        --lima: ${e.destaques[0]}; --amarelo: ${e.destaques[1]}; --coral: ${e.destaques[2]};
        ${Object.entries(forma).map(([k, v]) => `--${k}: ${v};`).join(" ")}
      }
      ${(e.capas || []).map((c, i) => `html:not(.modo-hacker) .projeto:nth-child(${e.capas.length}n + ${i + 1}) .projeto-capa:not(.com-imagem) { background-color: ${c}; }`).join("\n")}
      html:not(.modo-hacker)[data-theme="light"] {${modo(e.claro, false)} }
      html:not(.modo-hacker)[data-theme="dark"] {${modo(e.escuro, true)} }
      /* Seções de "campo invertido" (Sobre, Laboratório P4): a página inteira troca para o modo oposto */
      html:not(.modo-hacker)[data-theme="light"].campo-inverso {${modo(e.escuro, true)} }
      html:not(.modo-hacker)[data-theme="dark"].campo-inverso {${modo(e.claro, false)} }`;
  }

  window.TEMAS_DO_SITE = { PALETAS, TEMAS, ESTILOS, indiceInicial, aplicar };
})();
