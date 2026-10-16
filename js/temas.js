/* Cores e temas do site: usados pelo js/app.js e pela página 404.
   Precisa vir depois do js/dados.js (lê a cor original e o "estilo" com que o site abre). */
(function () {
  "use strict";

  const D = window.DADOS || {};
  const raiz = document.documentElement;

  // Cores que o visitante pode escolher no botão de paleta. A primeira vem de dados.js.
  // As do tema claro têm contraste de pelo menos 4,5:1 com o fundo, para textos pequenos.
  const PALETAS = [
    { id: "cor-0", nome: { pt: "Lilás", en: "Lilac" }, claro: D.cores?.claro || "#4338ff", escuro: D.cores?.escuro || "#9d9bff" },
    { id: "cor-1", nome: { pt: "Coral", en: "Coral" }, claro: "#c2381f", escuro: "#ff8a70" },
    { id: "cor-2", nome: { pt: "Verde", en: "Green" }, claro: "#0b7a53", escuro: "#4ade9b" },
    { id: "cor-3", nome: { pt: "Roxo", en: "Purple" }, claro: "#9333ea", escuro: "#c99bff" },
  ];

  // Fontes dos temas do theme-factory. Os nomes originais (DejaVu, FreeSans) vêm primeiro;
  // quem não tem essas fontes vê a equivalente que já vem no Windows e no Mac.
  const FONTES = {
    dejavu: '"DejaVu Sans", "Bitstream Vera Sans", Verdana, Geneva, sans-serif',
    dejavuSerif: '"DejaVu Serif", "Bitstream Vera Serif", Georgia, serif',
    freeSans: 'FreeSans, "Helvetica Neue", Helvetica, Arial, sans-serif',
    freeSerif: 'FreeSerif, "Times New Roman", Times, serif',
    // Servida pelo próprio site (fontes/geist-*.woff2)
    geist: '"Geist", "DejaVu Sans", Verdana, sans-serif',
  };

  // Formas dos temas: cantos, bordas, sombra dura, inclinação e fundo.
  // "contorno" é a força da borda: 1 usa a cor do texto, menos que isso deixa a borda mais clara.
  const GRADE = "linear-gradient(var(--grade) 1px, transparent 1px), linear-gradient(90deg, var(--grade) 1px, transparent 1px)";
  const FORMAS = {
    // A forma original do site: bordas grossas, sombra dura, cartões inclinados, fundo de pontinhos
    brutal: {},
    // Cantos bem redondos, bordas finas e claras, sem sombra e sem inclinação
    suave: { curva: "1.2px", raio: "22px", borda: "1.5px", "borda-fina": "1px", desloc: "0px", giro: "0deg", padrao: "none", contorno: 0.22 },
    // Cantos retos, sombra dura, nada inclinado, fundo quadriculado como um diagrama de rede
    reto: { curva: "0px", raio: "0px", pilula: "0px", desloc: "1px", giro: "0deg", padrao: GRADE, "padrao-tam": "36px 36px" },
    // Linhas finas, cantos pequenos, sem sombra, sem fundo: o mais discreto
    fino: { curva: ".5px", raio: "8px", pilula: "8px", borda: "1px", "borda-fina": "1px", desloc: "0px", giro: "0deg", padrao: "none", contorno: 0.35 },
  };

  // Temas completos (cores, fontes e forma), do theme-factory. Cada um tem versão clara e escura.
  // Todas as combinações de texto têm contraste de pelo menos 4,5:1.
  // "destaques" substituem o lima, o amarelo e o coral das etiquetas (sempre com texto escuro).
  // "capas" são as cores das capas dos projetos, na ordem dos cartões.
  const TEMAS = [
    {
      id: "oceano", nome: { pt: "Oceano profundo", en: "Ocean Depths" }, titulo: FONTES.dejavu, corpo: FONTES.dejavu,
      claro: { fundo: "#f1faee", cartao: "#ffffff", texto: "#1a2332", suave: "#3d4f63", acento: "#1f6f6f" },
      escuro: { fundo: "#1a2332", cartao: "#223044", texto: "#f1faee", suave: "#a8bfc4", acento: "#a8dadc" },
      destaques: ["#a8dadc", "#d3eeee", "#5fb3b3"],
      forma: FORMAS.suave,
      capas: ["#2d8b8b", "#1a2332", "#5fb3b3", "#3d6f8a"],
    },
    {
      id: "sunset", nome: { pt: "Pôr do sol", en: "Sunset Boulevard" }, titulo: FONTES.dejavuSerif, corpo: FONTES.dejavu,
      claro: { fundo: "#fbf3e4", cartao: "#fffaf1", texto: "#264653", suave: "#4f6670", acento: "#b0452a" },
      escuro: { fundo: "#1d363f", cartao: "#264653", texto: "#fbf3e4", suave: "#c9c2b2", acento: "#f4a261" },
      destaques: ["#e9c46a", "#f4a261", "#e76f51"],
      forma: FORMAS.brutal,
      capas: ["#e76f51", "#264653", "#f4a261", "#2a9d8f"],
    },
    {
      id: "floresta", nome: { pt: "Floresta", en: "Forest Canopy" }, titulo: FONTES.freeSerif, corpo: FONTES.freeSans,
      claro: { fundo: "#faf9f6", cartao: "#ffffff", texto: "#2d4a2b", suave: "#5b6152", acento: "#3f6b3c" },
      escuro: { fundo: "#1b2e1a", cartao: "#2d4a2b", texto: "#faf9f6", suave: "#c3c8b3", acento: "#c3cc9b" },
      destaques: ["#c3cc9b", "#e6e2c8", "#a4ac86"],
      forma: FORMAS.fino,
      capas: ["#2d4a2b", "#7d8471", "#5b7a3f", "#a4ac86"],
    },
    {
      id: "minimal", nome: { pt: "Minimalista", en: "Modern Minimalist" }, titulo: FONTES.dejavu, corpo: FONTES.dejavu,
      claro: { fundo: "#f4f4f4", cartao: "#ffffff", texto: "#36454f", suave: "#5a6672", acento: "#36454f" },
      escuro: { fundo: "#22292f", cartao: "#36454f", texto: "#ffffff", suave: "#c4ccd3", acento: "#d3d3d3" },
      destaques: ["#d3d3d3", "#ececec", "#a9b4bf"],
      forma: FORMAS.fino,
      capas: ["#36454f", "#708090", "#4f5d68", "#a9b4bf"],
    },
    {
      id: "dourada", nome: { pt: "Hora dourada", en: "Golden Hour" }, titulo: FONTES.freeSans, corpo: FONTES.freeSans,
      claro: { fundo: "#f6efe3", cartao: "#fffaf2", texto: "#4a403a", suave: "#6b5d52", acento: "#a0464c" },
      escuro: { fundo: "#2e2824", cartao: "#4a403a", texto: "#f6efe3", suave: "#d4c3ad", acento: "#f4a900" },
      destaques: ["#f4a900", "#d4b896", "#e0959a"],
      forma: FORMAS.brutal,
      capas: ["#f4a900", "#c1666b", "#4a403a", "#b8935f"],
    },
    {
      id: "artico", nome: { pt: "Ártico", en: "Arctic Frost" }, titulo: FONTES.dejavu, corpo: FONTES.dejavu,
      claro: { fundo: "#eef4fb", cartao: "#fafafa", texto: "#1f3350", suave: "#4a5a70", acento: "#3d5f91" },
      escuro: { fundo: "#16233a", cartao: "#1f3350", texto: "#fafafa", suave: "#b9c6d8", acento: "#a9c4ea" },
      destaques: ["#d4e4f7", "#c0c0c0", "#9fbbe0"],
      forma: FORMAS.suave,
      capas: ["#4a6fa5", "#1f3350", "#7f9cc7", "#8a8a8a"],
    },
    {
      id: "deserto", nome: { pt: "Rosa do deserto", en: "Desert Rose" }, titulo: FONTES.freeSans, corpo: FONTES.freeSans,
      claro: { fundo: "#f4ebe3", cartao: "#fbf5ef", texto: "#5d2e46", suave: "#7a5563", acento: "#8e4f3f" },
      escuro: { fundo: "#3a1c2c", cartao: "#5d2e46", texto: "#f4ebe3", suave: "#dcc3c0", acento: "#d4a5a5" },
      destaques: ["#d4a5a5", "#e8d5c4", "#c99383"],
      forma: FORMAS.suave,
      capas: ["#5d2e46", "#b87d6d", "#d4a5a5", "#8e4f3f"],
    },
    {
      // Fonte trocada de DejaVu Sans para Geist, e um acento só: ciano com menos saturação
      id: "tech", nome: { pt: "Tecnologia", en: "Tech Innovation" }, titulo: FONTES.geist, corpo: FONTES.geist,
      claro: { fundo: "#f2f5f7", cartao: "#ffffff", texto: "#14191c", suave: "#4b565c", acento: "#0b6f72" },
      escuro: { fundo: "#181b1d", cartao: "#202426", texto: "#f2f5f7", suave: "#a9b4b9", acento: "#3fe0d8" },
      destaques: ["#3fe0d8", "#bff1ee", "#86d3d8"],
      forma: FORMAS.reto,
      capas: ["#0f6467", "#232b2e", "#13807f", "#2d4247"],
    },
    {
      // As cores que o Wireshark usa para cada protocolo; o escuro é o fundo do "Bad TCP".
      // Nas abas do "Agora", cada cor mostra o nome do protocolo dela (a legenda para quem reconhece)
      id: "wireshark", nome: { pt: "Wireshark", en: "Wireshark" }, titulo: FONTES.geist, corpo: FONTES.geist,
      claro: { fundo: "#f7f7f4", cartao: "#ffffff", texto: "#12272e", suave: "#4a5a60", acento: "#16679a" },
      escuro: { fundo: "#12272e", cartao: "#1a333c", texto: "#f2f5f7", suave: "#a9bcc2", acento: "#f78787" },
      destaques: ["#e4ffc7", "#e7e6ff", "#daeeff"],
      forma: FORMAS.reto,
      capas: ["#e7e6ff", "#daeeff", "#e4ffc7", "#fce0ff"],
    },
    {
      id: "jardim", nome: { pt: "Jardim botânico", en: "Botanical Garden" }, titulo: FONTES.dejavuSerif, corpo: FONTES.dejavu,
      claro: { fundo: "#f5f3ed", cartao: "#fffdf8", texto: "#233b2a", suave: "#4f5e52", acento: "#3f6b4c" },
      escuro: { fundo: "#1f3326", cartao: "#2a4533", texto: "#f5f3ed", suave: "#c7cbbd", acento: "#f9a620" },
      destaques: ["#f9a620", "#9cc5a8", "#e08a6f"],
      forma: FORMAS.suave,
      capas: ["#4a7c59", "#f9a620", "#b7472a", "#6a9a77"],
    },
    {
      id: "galaxia", nome: { pt: "Galáxia", en: "Midnight Galaxy" }, titulo: FONTES.freeSans, corpo: FONTES.freeSans,
      claro: { fundo: "#efeefb", cartao: "#fbfbff", texto: "#2b1e3e", suave: "#554a6b", acento: "#4a4e8f" },
      escuro: { fundo: "#2b1e3e", cartao: "#362a4d", texto: "#e6e6fa", suave: "#bdb3d2", acento: "#b9a6db" },
      destaques: ["#a490c2", "#e6e6fa", "#8f93d6"],
      forma: FORMAS.brutal,
      capas: ["#4a4e8f", "#2b1e3e", "#a490c2", "#6b5a9e"],
    },
  ];

  const ESTILOS = [...PALETAS, ...TEMAS];

  // Índice do visual a usar: o que o visitante escolheu, senão o "estilo" de dados.js, senão o original.
  // Guardado como id ("cor-2", "oceano"); versões antigas guardavam só o número da cor.
  const acharEstilo = (id) => ESTILOS.findIndex((e) => e.id === id || e.id === `cor-${id}`);
  const indiceInicial = (guardado) => [guardado, D.estilo, "cor-0"].map(acharEstilo).find((i) => i >= 0);

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
    const modo = (m, escuro) => `
      --fundo: ${m.fundo}; --cartao: ${m.cartao}; --texto: ${m.texto}; --suave: ${m.suave};
      --tinta: ${m.texto}; --linha: ${m.texto}2e; --grade: ${m.texto}${escuro ? "0f" : "14"};
      --contorno: ${contorno < 1 ? m.texto + alfa : m.texto};
      --sombra: ${escuro ? m.acento : m.texto}; --sobre-acento: ${escuro ? m.fundo : "#ffffff"};`;
    folha.textContent = `
      html:not(.modo-hacker) {
        --fonte: ${e.corpo}; --fonte-titulo: ${e.titulo};
        --lima: ${e.destaques[0]}; --amarelo: ${e.destaques[1]}; --coral: ${e.destaques[2]};
        ${Object.entries(forma).map(([k, v]) => `--${k}: ${v};`).join(" ")}
      }
      ${(e.capas || []).map((c, i) => `html:not(.modo-hacker) .projeto:nth-child(${e.capas.length}n + ${i + 1}) .projeto-capa:not(.com-imagem) { background-color: ${c}; }`).join("\n")}
      html:not(.modo-hacker)[data-theme="light"] {${modo(e.claro, false)} }
      html:not(.modo-hacker)[data-theme="dark"] {${modo(e.escuro, true)} }`;
  }

  window.TEMAS_DO_SITE = { PALETAS, TEMAS, ESTILOS, indiceInicial, aplicar };
})();
