/* Monta o site a partir de js/dados.js: menu, página inicial, rodapé e terminal.
   As páginas internas (notas, estudo de caso) trazem o texto no próprio HTML e usam só o menu e o rodapé. */
(function () {
  "use strict";

  const D = window.DADOS;
  const raiz = document.documentElement;
  const $ = (seletor, base = document) => base.querySelector(seletor);
  const calmo = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  const idiomas = Array.isArray(D.idiomas) && D.idiomas.length ? D.idiomas : ["pt"];
  const idioma = idiomas.includes(raiz.dataset.idioma) ? raiz.dataset.idioma : idiomas[0];
  const raizSite = raiz.dataset.raiz || "";
  const pagina = raiz.dataset.pagina || "inicio";
  const naInicial = pagina === "inicio";

  const UI = {
    pt: {
      pular: "Pular para o conteúdo",
      menu: "Menu", fechar: "Fechar",
      secoes: { gamificapampa: "GamificaPampa", jogos: "Jogos", projetos: "Projetos", sobre: "Sobre", contato: "Contato" },
      tema: "Trocar entre claro e escuro",
      outroIdioma: "English", outroIdiomaCurto: "EN",
      abreNovaAba: " (abre em nova aba)",
      gpAbrir: "Abrir o GamificaPampa",
      gpEstudo: "Ler o estudo de caso",
      jogosTitulo: "Os 19 jogos",
      jogosNota: "Cada lombada abre o jogo. Escolha a idade da turma para ver quais servem.",
      idade: "Idade da turma",
      todas: "Todas",
      anos: (n) => `${n} anos`,
      servem: (n, idade) => (idade ? `${n} ${n === 1 ? "jogo" : "jogos"} para ${idade} anos` : "19 jogos, de 6 a 17 anos"),
      faixa: (a, b) => (a === b ? `${a} anos` : `${a} a ${b} anos`),
      listaTitulo: "Mais trabalho",
      grupoProfessores: "Para professores, no GamificaPampa",
      grupoProjetos: "Outros projetos",
      grupoNotas: "Notas",
      minutos: (n) => `${n} min de leitura`,
      contatoPergunta: "Vamos conversar?",
      escrever: "Ou escreva por aqui",
      formNome: "Seu nome", formEmail: "Seu e-mail", formMensagem: "Mensagem",
      formEnviar: "Enviar", formEnviando: "Enviando...",
      formOk: "Mensagem enviada. Obrigado! Respondo pelo seu e-mail.",
      formErro: (email) => `Não consegui enviar agora. Tente de novo ou escreva para ${email}.`,
      rodapeFrase: "Feito à mão em HTML, CSS e JavaScript, sem template.",
      rodapeCredito: "Telas do GamificaPampa com a identidade visual de Paulo Severo.",
      horaLocal: "agora em Alegrete",
      convite: "Mande um oi",
      terminal: "Terminal",
      notas: "Notas",
      voltarInicio: "Início",
      outrasNotas: "Outras notas",
    },
    en: {
      pular: "Skip to content",
      menu: "Menu", fechar: "Close",
      secoes: { gamificapampa: "GamificaPampa", jogos: "Games", projetos: "Projects", sobre: "About", contato: "Contact" },
      tema: "Switch between light and dark",
      outroIdioma: "Português", outroIdiomaCurto: "PT",
      abreNovaAba: " (opens in a new tab)",
      gpAbrir: "Open GamificaPampa",
      gpEstudo: "Read the case study",
      jogosTitulo: "The 19 games",
      jogosNota: "Each spine opens its game. Pick the age of a class to see which ones fit.",
      idade: "Age of the class",
      todas: "All",
      anos: (n) => `${n} years`,
      servem: (n, idade) => (idade ? `${n} ${n === 1 ? "game" : "games"} for ${idade}-year-olds` : "19 games, ages 6 to 17"),
      faixa: (a, b) => (a === b ? `age ${a}` : `ages ${a} to ${b}`),
      listaTitulo: "More work",
      grupoProfessores: "For teachers, at GamificaPampa",
      grupoProjetos: "Other projects",
      grupoNotas: "Notes",
      minutos: (n) => `${n} min read`,
      contatoPergunta: "Shall we talk?",
      escrever: "Or write here",
      formNome: "Your name", formEmail: "Your e-mail", formMensagem: "Message",
      formEnviar: "Send", formEnviando: "Sending...",
      formOk: "Message sent. Thank you! I'll reply to your e-mail.",
      formErro: (email) => `Couldn't send it right now. Try again or write to ${email}.`,
      rodapeFrase: "Handmade in HTML, CSS and JavaScript, no template.",
      rodapeCredito: "GamificaPampa screens use Paulo Severo's visual identity.",
      horaLocal: "right now in Alegrete",
      convite: "Say hello",
      terminal: "Terminal",
      notas: "Notes",
      voltarInicio: "Home",
      outrasNotas: "Other notes",
    },
  }[idioma];

  const ROTULOS_LINK = {
    github: "GitHub", linkedin: "LinkedIn", email: "E-mail", instagram: "Instagram", orcid: "ORCID",
    lattes: { pt: "Currículo Lattes", en: "Lattes CV" },
  };

  /* ---------- Utilidades ---------- */

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
    return esc(t(texto))
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[([^\]]+)\]\(((?:https?:|mailto:|#|\/|\.)[^)\s]*)\)/g, '<a href="$2">$1</a>');
  }
  const externo = (url) => /^https?:/.test(url);
  // Link para outra aba: avisa o leitor de tela
  const atributosLink = (url) => (externo(url) ? ' target="_blank" rel="noopener"' : "");
  const avisoAba = (url) => (externo(url) ? `<span class="so-leitor">${UI.abreNovaAba}</span>` : "");
  // Caminhos relativos de dados.js (imagens) partem da raiz do site
  const caminhoLocal = (url) => (url && !/^(https?:|\/|data:|#|mailto:)/.test(url) ? raizSite + url : url);
  // Endereço da página inicial no idioma atual, e de uma seção dela
  const inicio = () => raizSite + (idioma === idiomas[0] ? "" : `${idioma}/`) || "./";
  const linkSecao = (id) => (naInicial ? `#${id}` : `${inicio()}#${id}`);
  const urlDoIdioma = (url) => (url && typeof url === "object" ? t(url) : url);
  const emailPrincipal = () => D.contato?.emails?.[0] || "";

  const memoria = {
    ler: (chave) => { try { return localStorage.getItem(chave); } catch (e) { return null; } },
    gravar: (chave, valor) => { try { localStorage.setItem(chave, valor); } catch (e) { /* sem armazenamento */ } },
  };

  // Eventos para o GoatCounter. Não faz nada se o contador estiver desligado.
  function registrarEvento(caminho, titulo) {
    try { window.goatcounter?.count?.({ path: caminho, title: titulo || caminho, event: true }); } catch (e) { /* ignora */ }
  }

  function enderecoLink(l) {
    if (l.tipo === "email") return emailPrincipal() ? `mailto:${emailPrincipal()}` : "";
    return l.url || "";
  }

  // A página no outro idioma: vem do <link rel="alternate"> de cada página
  function traducao(codigo) {
    const alt = [...document.querySelectorAll('link[rel="alternate"][hreflang]')].find((l) => l.hreflang.toLowerCase().startsWith(codigo));
    if (alt) return new URL(alt.href).pathname;
    return raizSite + (codigo === idiomas[0] ? "" : `${codigo}/`);
  }

  /* ---------- Menu ---------- */

  const SECOES_MENU = ["gamificapampa", "jogos", "projetos", "sobre", "contato"];

  function menu() {
    const outro = idiomas.find((i) => i !== idioma);
    return `
      <a class="pular" href="#conteudo">${UI.pular}</a>
      <div class="barra">
        <a class="marca" href="${naInicial ? "#topo" : inicio()}">${esc(D.nome.primeiro)} ${esc(D.nome.sobrenome)}</a>
        <nav class="barra-links" id="menuLinks" aria-label="${UI.menu}">
          ${SECOES_MENU.map((id) => `<a href="${linkSecao(id)}" data-secao="${id}">${UI.secoes[id]}</a>`).join("")}
        </nav>
        <div class="barra-acoes">
          ${outro ? `<a class="barra-idioma" href="${traducao(outro)}" hreflang="${outro}" lang="${outro}" aria-label="${UI.outroIdioma}">${UI.outroIdiomaCurto}</a>` : ""}
          <button class="barra-tema" type="button" data-acao="tema" aria-label="${UI.tema}"><span aria-hidden="true"></span></button>
          <button class="barra-menu" type="button" data-acao="menu" aria-expanded="false" aria-controls="menuLinks">${UI.menu}</button>
        </div>
      </div>`;
  }

  /* ---------- Topo: folha de contato com um painel de texto ---------- */

  // Distribui os quadros de todas as séries em colunas, alternando, para as séries se misturarem
  function quadrosDaFolha() {
    const series = D.folha || [];
    const todos = [];
    series.forEach((s) => (s.quadros || []).forEach((q) => todos.push({ ...q, serie: s })));
    return todos;
  }

  function quadro(q, i, carregar = "lazy") {
    const url = urlDoIdioma(q.serie.url) || "";
    const deitado = q.formato === "tela";
    const [w, h] = deitado ? [960, 600] : [390, 760];
    const destino = url.startsWith("#") ? linkSecao(url.slice(1)) : url;
    return `
      <a class="quadro ${deitado ? "deitado" : "em-pe"} faixa-${i % 4}" href="${esc(destino)}"${atributosLink(destino)} style="--i:${i % 8}">
        <img src="${esc(caminhoLocal(q.imagem))}" width="${w}" height="${h}" alt="${esc(t(q.legenda))}" loading="${carregar}" decoding="async">
        <span class="quadro-faixa">${esc(t(q.legenda))}</span>${avisoAba(destino)}
      </a>`;
  }

  function painel() {
    const topo = D.topo || {};
    const links = (D.links || []).filter((l) => ["github", "linkedin", "email"].includes(l.tipo) && enderecoLink(l));
    return `
      <div class="painel">
        <h1 class="painel-nome"><span>${esc(D.nome.primeiro)}</span> <span>${esc(D.nome.sobrenome)}</span></h1>
        <p class="painel-frase">${esc(t(topo.frase))}</p>
        <p class="painel-detalhe">${esc(t(topo.detalhe))}</p>
        ${topo.acao ? `<a class="botao" href="${esc(topo.acao.alvo)}">${esc(t(topo.acao.rotulo))}</a>` : ""}
        <p class="painel-links">${links.map((l) => `<a href="${esc(enderecoLink(l))}"${atributosLink(enderecoLink(l))}>${esc(t(ROTULOS_LINK[l.tipo]))}${avisoAba(enderecoLink(l))}</a>`).join("")}</p>
      </div>`;
  }

  function secaoTopo() {
    const q = quadrosDaFolha();
    // Seis colunas; a terceira e a quarta abrem espaço para o painel
    const colunas = [[], [], [], [], [], []];
    q.forEach((item, i) => colunas[i % 6].push(quadro(item, i, i < 8 ? "eager" : "lazy")));
    // Cada coluna leva os quadros duas vezes: a segunda cópia (escondida do leitor de tela) fecha o laço da rolagem lenta
    const coluna = (lista, n) => `<div class="folha-coluna c${n}"><div class="folha-rolo">${lista.join("")}<div class="copia" aria-hidden="true" inert>${lista.join("")}</div></div></div>`;
    return `
      <section class="topo" id="topo" aria-label="${esc(D.nome.primeiro)} ${esc(D.nome.sobrenome)}">
        <div class="folha">
          ${coluna(colunas[0], 0)}${coluna(colunas[1], 1)}
          <div class="folha-meio">
            <div class="folha-cima">${(colunas[2][0] || "")}${(colunas[3][0] || "")}</div>
            ${painel()}
            <div class="folha-baixo">${coluna(colunas[2].slice(1), 2)}${coluna(colunas[3].slice(1), 3)}</div>
          </div>
          ${coluna(colunas[4], 4)}${coluna(colunas[5], 5)}
        </div>
      </section>`;
  }

  /* ---------- GamificaPampa: uma tela do hub cortada em quadrados ---------- */

  // Peças coloridas [linha, coluna, largura] que não encostam umas nas outras; o resto é a imagem
  const PECAS = {
    grande: { colunas: 6, linhas: 4, titulo: [0, 0, 1], acao: [3, 1, 1], fatos: [[0, 3, 1], [1, 5, 1], [3, 4, 1]] },
    pequeno: { colunas: 3, linhas: 6, titulo: [0, 0, 2], acao: [5, 1, 2], fatos: [[2, 1, 2], [4, 0, 2]] },
  };

  function tabuleiro(tipo) {
    const gp = D.gamificapampa;
    const p = PECAS[tipo];
    const imagem = caminhoLocal(tipo === "grande" ? gp.mosaico.imagem : gp.mosaico.imagemCel);
    const ocupada = new Map();
    const marcar = ([l, c, largura], nome) => {
      ocupada.set(`${l},${c}`, { nome, largura });
      for (let k = 1; k < largura; k++) ocupada.set(`${l},${c + k}`, { nome: "pula" });
    };
    marcar(p.titulo, "titulo");
    marcar(p.acao, "acao");
    p.fatos.forEach((f, i) => marcar(f, `fato${i}`));
    let html = "";
    for (let l = 0; l < p.linhas; l++) {
      for (let c = 0; c < p.colunas; c++) {
        const peca = ocupada.get(`${l},${c}`);
        const larga = peca?.largura > 1 ? ` style="grid-column: span ${peca.largura}"` : "";
        if (peca?.nome === "pula") continue;
        if (peca?.nome === "titulo") {
          html += `<div class="peca peca-titulo"${larga}><h2${tipo === "grande" ? ` id="gp-titulo"` : ""}>${esc(t(gp.titulo))}</h2></div>`;
        } else if (peca?.nome === "acao") {
          html += `<a class="peca peca-acao"${larga} href="${esc(gp.url)}" target="_blank" rel="noopener"><span>${UI.gpAbrir}</span><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M10 30 30 10M14 10h16v16" fill="none" stroke="currentColor" stroke-width="4"/></svg><span class="so-leitor">${UI.abreNovaAba}</span></a>`;
        } else if (peca?.nome.startsWith("fato")) {
          const f = gp.numeros[Number(peca.nome.slice(4))];
          html += f ? `<div class="peca peca-fato"${larga}><b>${esc(f.valor)}</b><span>${esc(t(f.rotulo))}</span></div>` : "";
        } else {
          const x = (c / (p.colunas - 1)) * 100, y = (l / (p.linhas - 1)) * 100;
          html += `<div class="peca peca-imagem" aria-hidden="true"><i style="background-image:url('${esc(imagem)}');background-size:${p.colunas * 100}% ${p.linhas * 100}%;background-position:${x}% ${y}%"></i></div>`;
        }
      }
    }
    // Só um dos dois tabuleiros aparece por vez (o outro fica com display: none)
    return `<div class="tabuleiro tabuleiro-${tipo}">${html}</div>`;
  }

  function secaoGamificaPampa() {
    const gp = D.gamificapampa;
    if (!gp) return "";
    return `
      <section class="secao gp" id="gamificapampa" aria-labelledby="gp-titulo">
        <div class="tabuleiros obturador">${tabuleiro("grande")}${tabuleiro("pequeno")}</div>
        <div class="gp-texto">
          <p class="gp-paragrafo" data-entra>${rico(gp.texto)}</p>
          <div class="gp-lado" data-entra>
            <p class="gp-creditos">${esc(t(gp.creditos))}</p>
            <a class="link-forte" href="${esc(caminhoLocal(t(gp.estudo)))}">${UI.gpEstudo}</a>
          </div>
        </div>
      </section>`;
  }

  /* ---------- Os jogos: lombadas de livro, com o filtro de idade ---------- */

  // Quatro cores de marca-texto, por área
  const AREA = { prog: 0, mat: 1, quim: 1, bio: 1, cien: 1, port: 2, ingl: 2, geo: 3, hist: 3, artes: 3, edfis: 3 };

  function secaoJogos() {
    const gp = D.gamificapampa;
    const jogos = gp?.jogos || [];
    if (!jogos.length) return "";
    // Só as idades que têm pelo menos um jogo
    const idades = [];
    for (let i = 4; i <= 18; i++) if (jogos.some((j) => i >= j.idade[0] && i <= j.idade[1])) idades.push(i);
    return `
      <section class="secao jogos" id="jogos" aria-labelledby="jogos-titulo">
        <div class="jogos-cabeca">
          <h2 id="jogos-titulo" data-entra>${UI.jogosTitulo}</h2>
          <p data-entra>${UI.jogosNota}</p>
        </div>
        <div class="filtro" role="group" aria-labelledby="filtro-rotulo" data-entra>
          <span id="filtro-rotulo">${UI.idade}</span>
          <div class="filtro-botoes">
            <button type="button" data-idade="" aria-pressed="true">${UI.todas}</button>
            ${idades.map((n) => `<button type="button" data-idade="${n}" aria-pressed="false" aria-label="${UI.anos(n)}">${n}</button>`).join("")}
          </div>
          <output id="filtroSaida" aria-live="polite">${UI.servem(jogos.length)}</output>
        </div>
        <ul class="estante" data-entra>
          ${jogos.map((j) => {
            const url = gp.baseJogos + j.slug + "/";
            return `<li class="lombada area-${AREA[j.materia] ?? 0}" data-de="${j.idade[0]}" data-ate="${j.idade[1]}">
              <a href="${esc(url)}" target="_blank" rel="noopener">
                <span class="lombada-nome">${esc(t(j.nome))}</span>
                <span class="lombada-area">${esc(t(gp.materias[j.materia]))}<span class="lombada-idade"> · ${esc(UI.faixa(j.idade[0], j.idade[1]))}</span></span>
                <span class="so-leitor">${UI.abreNovaAba}</span>
              </a></li>`;
          }).join("")}
        </ul>
      </section>`;
  }

  function filtrarJogos(idade) {
    const n = Number(idade);
    let quantos = 0;
    document.querySelectorAll(".lombada").forEach((l) => {
      const serve = !idade || (n >= Number(l.dataset.de) && n <= Number(l.dataset.ate));
      l.classList.toggle("fora", !serve);
      if (serve) quantos++;
    });
    document.querySelectorAll(".filtro [data-idade]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.idade === String(idade))));
    $("#filtroSaida").textContent = UI.servem(quantos, idade || "");
    if (idade) registrarEvento("filtro-idade", `Filtrou os jogos por ${idade} anos`);
  }

  /* ---------- Mais trabalho: linhas com duas pontas e uma tela ao lado ---------- */

  function linha({ titulo, texto, valor, url, imagem }) {
    const destino = urlDoIdioma(url);
    const conteudo = `
      <span class="linha-esq"><i aria-hidden="true"></i><span><b>${esc(t(titulo))}</b><span class="linha-texto">${esc(t(texto))}</span></span></span>
      <span class="linha-dir">${esc(t(valor))}</span>`;
    const img = imagem ? ` data-imagem="${esc(caminhoLocal(imagem))}"` : "";
    return destino
      ? `<li${img}><a class="linha" href="${esc(caminhoLocal(destino))}"${atributosLink(destino)}>${conteudo}${avisoAba(destino)}</a></li>`
      : `<li${img}><div class="linha">${conteudo}</div></li>`;
  }

  // Imagens de cada material para professores, na mesma ordem de dados.js
  const IMAGENS_PROFESSORES = ["img/gp/aula.webp", "img/gp/oficina.webp", "img/gp/curso.webp", "img/gp/maquina.webp", "img/gp/slides.webp", "img/gp/medalhas.webp"];

  const enderecoNota = (n) => idioma === idiomas[0] ? `notas/${t(n.slug)}/` : `${idioma}/notes/${t(n.slug)}/`;

  function secaoProjetos() {
    const gp = D.gamificapampa || {};
    const grupos = [
      [UI.grupoProfessores, (gp.professores || []).map((p, i) => ({ titulo: p.nome, texto: p.texto, valor: p.valor, url: p.url, imagem: IMAGENS_PROFESSORES[i] }))],
      [UI.grupoProjetos, D.projetos || []],
      [UI.grupoNotas, (D.notas || []).map((n) => ({ titulo: n.titulo, texto: n.resumo, valor: UI.minutos(n.minutos), url: enderecoNota(n) }))],
    ].filter(([, itens]) => itens.length);
    const primeira = (D.projetos || []).find((p) => p.imagem)?.imagem || IMAGENS_PROFESSORES[0];
    return `
      <section class="secao lista" id="projetos" aria-labelledby="lista-titulo">
        <div class="lista-coluna">
          <h2 id="lista-titulo" data-entra>${UI.listaTitulo}</h2>
          ${grupos.map(([nome, itens]) => `
            <div class="grupo" data-entra>
              <h3>${esc(nome)}</h3>
              <ul>${itens.map(linha).join("")}</ul>
            </div>`).join("")}
        </div>
        <figure class="lista-tela" aria-hidden="true">
          <img id="listaTela" src="${esc(caminhoLocal(primeira))}" width="960" height="600" alt="" loading="lazy" decoding="async">
        </figure>
      </section>`;
  }

  /* ---------- Sobre: fatos ao lado, parágrafo largo ---------- */

  function secaoSobre() {
    const s = D.sobre;
    if (!s) return "";
    const lista = (itens) => `<ul class="registro">${itens.map((i) => `<li><span>${esc(t(i.nome))}</span><span>${esc(t(i.valor))}</span></li>`).join("")}</ul>`;
    return `
      <section class="secao sobre" id="sobre" aria-label="${UI.secoes.sobre}">
        <div class="sobre-linha">
          <dl class="fatos" data-entra>${(s.fatos || []).map((f) => `<div><dt>${esc(t(f.rotulo))}</dt><dd>${esc(t(f.valor))}</dd></div>`).join("")}</dl>
          <p class="sobre-texto" data-entra>${rico(s.texto)}</p>
        </div>
        <div class="sobre-linha sobre-registro">
          <div class="registros">
            <div data-entra><h3 class="registro-titulo">${idioma === "pt" ? "Trajetória" : "Path"}</h3>${lista(s.trajetoria || [])}</div>
            <div data-entra><h3 class="registro-titulo">${idioma === "pt" ? "Ferramentas" : "Tools"}</h3>${lista(s.ferramentas || [])}</div>
          </div>
        </div>
      </section>`;
  }

  /* ---------- Contato: frase, retrato e dois links ---------- */

  function enderecoFormulario() {
    const codigo = String(D.formulario || "").trim().match(/^(?:https:\/\/formspree\.io\/f\/)?([A-Za-z0-9]+)$/)?.[1];
    return codigo ? `https://formspree.io/f/${codigo}` : "";
  }

  function foto(tamanho) {
    const base = caminhoLocal(D.foto).replace(/\.\w+$/, "");
    const fontes = D.fotoLeve ? `<source srcset="${esc(base)}.avif" type="image/avif"><source srcset="${esc(base)}.webp" type="image/webp">` : "";
    return `<picture>${fontes}<img src="${esc(caminhoLocal(D.foto))}" width="${tamanho}" height="${tamanho}" alt="${esc(D.nome.primeiro)} ${esc(D.nome.sobrenome)}" loading="lazy" style="object-position:${esc(D.fotoPosicao || "50% 50%")}"></picture>`;
  }

  function secaoContato() {
    const email = emailPrincipal();
    const linkedin = (D.links || []).find((l) => l.tipo === "linkedin")?.url;
    const form = enderecoFormulario() ? `
      <details class="escrever" data-entra>
        <summary>${UI.escrever}</summary>
        <form id="formContato">
          <input class="pote-de-mel" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">
          <label>${UI.formNome}<input name="nome" required maxlength="100" autocomplete="name"></label>
          <label>${UI.formEmail}<input name="email" type="email" spellcheck="false" required maxlength="200" autocomplete="email"></label>
          <label>${UI.formMensagem}<textarea name="mensagem" required rows="4" maxlength="3000"></textarea></label>
          <button class="botao" type="submit">${UI.formEnviar}</button>
          <p class="form-resposta" aria-live="polite"></p>
        </form>
      </details>` : "";
    return `
      <section class="secao contato" id="contato" aria-labelledby="contato-pergunta">
        <p class="contato-frase" data-entra>${esc(t(D.contato?.frase))}</p>
        <div class="contato-retrato" data-entra>${foto(170)}</div>
        <div class="contato-links" data-entra>
          <h2 id="contato-pergunta">${UI.contatoPergunta}</h2>
          ${email ? `<a href="mailto:${esc(email)}">${esc(email)}</a>` : ""}
          ${linkedin ? `<a href="${esc(linkedin)}" target="_blank" rel="noopener">LinkedIn${avisoAba(linkedin)}</a>` : ""}
          <p>${esc(t(D.contato?.cidade))}</p>
        </div>
        ${form}
      </section>`;
  }

  async function enviarFormulario(form) {
    if (!form.reportValidity()) return;
    const botao = form.querySelector('button[type="submit"]');
    const resposta = form.querySelector(".form-resposta");
    const dados = new FormData(form);
    dados.append("_subject", `Mensagem pelo portfólio: ${form.elements.nome.value.trim()}`);
    dados.append("idioma", idioma);
    botao.disabled = true;
    botao.textContent = UI.formEnviando;
    try {
      const r = await fetch(enderecoFormulario(), { method: "POST", body: dados, headers: { Accept: "application/json" } });
      if (!r.ok) throw new Error(`Formspree respondeu ${r.status}`);
      resposta.textContent = UI.formOk;
      form.reset();
      registrarEvento("formulario-enviado", "Enviou mensagem pelo formulário");
    } catch (e) {
      resposta.textContent = UI.formErro(emailPrincipal());
    } finally {
      botao.disabled = false;
      botao.textContent = UI.formEnviar;
    }
  }

  /* ---------- Rodapé: os dois últimos andares do tabuleiro ---------- */

  function rodape() {
    const email = emailPrincipal();
    const perfis = (D.links || []).filter((l) => l.tipo !== "email" && l.url);
    const ano = new Date().getFullYear();
    return `
      <div class="ladrilhos">
        <div class="ladrilho l-frase">
          <p>${UI.rodapeFrase}</p>
          <p class="miudo">${UI.rodapeCredito}<br>© ${ano} ${esc(D.nomeCompleto || "")}</p>
        </div>
        <nav class="ladrilho l-nav" aria-label="${UI.menu}">
          <ul>
            ${SECOES_MENU.map((id) => `<li><a href="${linkSecao(id)}">${UI.secoes[id]}</a></li>`).join("")}
            <li><button type="button" class="link-botao" data-acao="terminal">${UI.terminal}</button></li>
          </ul>
        </nav>
        <div class="ladrilho l-hora">
          <p><span id="horaLocal">--:--</span></p>
          <p class="miudo">${UI.horaLocal}</p>
        </div>
        <div class="ladrilho l-email">
          <ul class="perfis">${perfis.map((l) => `<li><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(t(ROTULOS_LINK[l.tipo]))}${avisoAba(l.url)}</a></li>`).join("")}</ul>
          ${email ? `<a class="l-email-endereco" href="mailto:${esc(email)}">${esc(email)}</a>` : ""}
        </div>
        <div class="ladrilho l-marca" aria-hidden="true"><span>${esc(D.nome.primeiro)} ${esc(D.nome.sobrenome)}</span></div>
        <a class="ladrilho l-convite" href="mailto:${esc(email)}">
          <span>${UI.convite}</span>
          <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M10 30 30 10M14 10h16v16" fill="none" stroke="currentColor" stroke-width="4"/></svg>
        </a>
      </div>`;
  }

  function atualizarHora() {
    const el = $("#horaLocal");
    if (!el) return;
    el.textContent = new Intl.DateTimeFormat(idioma === "pt" ? "pt-BR" : "en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }).format(new Date());
  }

  /* ---------- Terminal (e o desafio CTF) ---------- */

  const HASH_FLAG = "cff206e2e31d4792d7e41e3c25bd53ce209f416b128b6a8b4c5d7a0e2e57e374";
  async function flagCorreta(texto) {
    const resumo = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto.trim()));
    return [...new Uint8Array(resumo)].map((b) => b.toString(16).padStart(2, "0")).join("") === HASH_FLAG;
  }
  const decodificar = {
    base64: (s) => new TextDecoder().decode(Uint8Array.from(atob(s.replace(/\s/g, "")), (c) => c.charCodeAt(0))),
    hex: (s) => {
      const limpo = s.replace(/0x|\s/gi, "");
      if (!/^([0-9a-f]{2})+$/i.test(limpo)) throw new Error("hex");
      return new TextDecoder().decode(Uint8Array.from(limpo.match(/../g), (h) => parseInt(h, 16)));
    },
    rot13: (s) => s.replace(/[a-z]/gi, (c) => {
      const base = c <= "Z" ? 65 : 97;
      return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    }),
  };

  const TERM = {
    pt: {
      boas: "Digite ajuda para ver os comandos.",
      ajuda: [["sobre", "quem sou eu"], ["jogos", "os jogos do GamificaPampa"], ["projetos", "outros trabalhos"], ["contato", "como falar comigo"],
        ["cd <seção>", "vai até uma parte da página"], ["ctf", "desafio: ache a flag escondida no site"], ["base64 | hex | rot13 <texto>", "decodifica"],
        ["submit flag{...}", "confere a flag"], ["limpar", "limpa a tela"], ["sair", "fecha o terminal"]],
      ctf: ["Desafio CTF: a flag está dividida em 3 pedaços escondidos neste site.", "Dica 1: o código-fonte da página inicial.", "Dica 2: o arquivo que diz aos robôs de busca o que ler.", "Dica 3: uma página que não existe.", "Juntou os 3? submit flag{...}"],
      certo: "Flag correta! Mande um print no LinkedIn, vou gostar de ver.",
      errado: "Flag errada. Confira os 3 pedaços e tente de novo.",
      uso: "uso: submit flag{...}",
      naoAchei: (c) => `comando não encontrado: ${c}. Digite ajuda.`,
      decodErro: "não consegui decodificar esse texto.",
      semSecao: "essa seção não existe. Tente: gamificapampa, jogos, projetos, sobre, contato.",
    },
    en: {
      boas: "Type help to see the commands.",
      ajuda: [["about", "who I am"], ["games", "the GamificaPampa games"], ["projects", "other work"], ["contact", "how to reach me"],
        ["cd <section>", "jumps to a part of the page"], ["ctf", "challenge: find the flag hidden on the site"], ["base64 | hex | rot13 <text>", "decodes"],
        ["submit flag{...}", "checks the flag"], ["clear", "clears the screen"], ["exit", "closes the terminal"]],
      ctf: ["CTF challenge: the flag is split into 3 pieces hidden on this site.", "Hint 1: the home page source code.", "Hint 2: the file that tells search robots what to read.", "Hint 3: a page that doesn't exist.", "Got all 3? submit flag{...}"],
      certo: "Correct flag! Send me a screenshot on LinkedIn, I'd love that.",
      errado: "Wrong flag. Check the 3 pieces and try again.",
      uso: "usage: submit flag{...}",
      naoAchei: (c) => `command not found: ${c}. Type help.`,
      decodErro: "couldn't decode that text.",
      semSecao: "no such section. Try: gamificapampa, games, projects, about, contact.",
    },
  }[idioma];

  const APELIDOS_SECAO = { games: "jogos", projects: "projetos", about: "sobre", contact: "contato", inicio: "topo", home: "topo" };

  function montarTerminal() {
    const dialogo = document.createElement("dialog");
    dialogo.className = "terminal";
    dialogo.id = "terminal";
    dialogo.setAttribute("aria-label", UI.terminal);
    dialogo.innerHTML = `
      <div class="terminal-barra" data-ui><span>${esc(D.nome.primeiro.toLowerCase())}@portfolio:~</span><button type="button" data-acao="fechar-terminal">${UI.fechar}</button></div>
      <div class="terminal-corpo" data-ui role="log" aria-live="polite" id="terminalSaida"></div>
      <form class="terminal-linha" data-ui><label for="terminalEntrada" class="so-leitor">${UI.terminal}</label><span aria-hidden="true">$</span><input id="terminalEntrada" autocomplete="off" spellcheck="false" autocapitalize="off"></form>`;
    document.body.append(dialogo);
    escrever(TERM.boas);
    dialogo.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      const entrada = $("#terminalEntrada");
      const texto = entrada.value;
      entrada.value = "";
      executar(texto);
    });
    return dialogo;
  }

  function escrever(texto, classe = "") {
    const linhaEl = document.createElement("p");
    if (classe) linhaEl.className = classe;
    linhaEl.textContent = texto;
    const saida = $("#terminalSaida");
    saida.append(linhaEl);
    saida.scrollTop = saida.scrollHeight;
  }

  function abrirTerminal() {
    const d = $("#terminal") || montarTerminal();
    if (!d.open) d.showModal();
    $("#terminalEntrada").focus();
    registrarEvento("terminal-aberto", "Abriu o terminal");
  }

  function irPara(id) {
    $("#terminal")?.close();
    if (naInicial) document.getElementById(id)?.scrollIntoView({ behavior: calmo() ? "auto" : "smooth" });
    else location.href = linkSecao(id);
  }

  function executar(entrada) {
    const texto = entrada.trim();
    if (!texto) return;
    escrever(`$ ${texto}`, "eco");
    const [cmdBruto, ...resto] = texto.split(/\s+/);
    const cmd = cmdBruto.toLowerCase();
    const arg = resto.join(" ");
    if (["ajuda", "help", "?"].includes(cmd)) TERM.ajuda.forEach(([c, d]) => escrever(`${c.padEnd(28)} ${d}`));
    else if (["sobre", "about", "whoami"].includes(cmd)) escrever(t(D.sobre?.texto));
    else if (["jogos", "games"].includes(cmd)) (D.gamificapampa?.jogos || []).forEach((j) => escrever(`${t(j.nome)} · ${t(D.gamificapampa.materias[j.materia])}`));
    else if (["projetos", "projects"].includes(cmd)) (D.projetos || []).forEach((p) => escrever(`${t(p.titulo)}: ${t(p.texto)}`));
    else if (["contato", "contact", "email"].includes(cmd)) { escrever(emailPrincipal()); (D.links || []).filter((l) => l.url).forEach((l) => escrever(`${t(ROTULOS_LINK[l.tipo])}: ${l.url}`)); }
    else if (cmd === "cd") {
      const alvo = APELIDOS_SECAO[arg.toLowerCase()] || arg.toLowerCase();
      if (document.getElementById(alvo) || (!naInicial && SECOES_MENU.includes(alvo))) irPara(alvo); else escrever(TERM.semSecao, "erro");
    } else if (cmd === "ctf") { TERM.ctf.forEach((l) => escrever(l)); registrarEvento("ctf-aberto", "Abriu o desafio CTF"); }
    else if (cmd === "submit") {
      if (!/^flag\{.+\}$/.test(arg)) escrever(TERM.uso, "erro");
      else if (!crypto?.subtle) escrever(TERM.errado, "erro");
      else flagCorreta(arg).then((certa) => {
        escrever(certa ? TERM.certo : TERM.errado, certa ? "certo" : "erro");
        if (certa) registrarEvento("ctf-resolvido", "Resolveu o CTF");
      });
    } else if (decodificar[cmd]) {
      try { escrever(decodificar[cmd](arg)); } catch (e) { escrever(TERM.decodErro, "erro"); }
    } else if (["limpar", "clear", "cls"].includes(cmd)) $("#terminalSaida").innerHTML = "";
    else if (["sair", "exit"].includes(cmd)) $("#terminal").close();
    else escrever(TERM.naoAchei(cmdBruto), "erro");
  }

  /* ---------- Tema claro e escuro ---------- */

  function alternarTema() {
    const novo = raiz.dataset.theme === "dark" ? "light" : "dark";
    raiz.dataset.theme = novo;
    memoria.gravar("tema", novo);
    $('meta[name="theme-color"]')?.setAttribute("content", novo === "dark" ? "#0f1c3f" : "#f3ead8");
  }

  /* ---------- Movimento: entrada das partes de cada seção e o obturador ---------- */

  function prepararEntradas() {
    const secoes = document.querySelectorAll(".secao, .pagina");
    secoes.forEach((s) => s.querySelectorAll("[data-entra]").forEach((el, i) => el.style.setProperty("--ordem", i)));
    if (!("IntersectionObserver" in window)) { secoes.forEach((s) => s.classList.add("entrou")); return; }
    raiz.classList.add("com-entrada");
    const obs = new IntersectionObserver((entradas) => entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("entrou");
      obs.unobserve(e.target);
    }), { rootMargin: "0px 0px -12% 0px", threshold: 0.01 });
    secoes.forEach((s) => obs.observe(s));
  }

  /* ---------- Lista: a tela ao lado acompanha a linha apontada ---------- */

  function ligarTelaDaLista() {
    const img = $("#listaTela");
    if (!img) return;
    const trocar = (li) => {
      const nova = li?.dataset.imagem;
      if (!nova || img.getAttribute("src") === nova) return;
      img.classList.remove("trocou");
      void img.offsetWidth;
      img.src = nova;
      img.classList.add("trocou");
    };
    document.querySelectorAll(".lista li").forEach((li) => {
      li.addEventListener("pointerenter", () => trocar(li));
      li.addEventListener("focusin", () => trocar(li));
    });
  }

  /* ---------- Páginas de nota: as outras notas no fim ---------- */

  function preencherOutrasNotas() {
    const alvo = $("#outrasNotas");
    if (!alvo) return;
    const aqui = location.pathname.replace(/\/index\.html$/, "/");
    const outras = (D.notas || []).filter((n) => !aqui.endsWith(`/${t(n.slug)}/`));
    if (!outras.length) return;
    alvo.innerHTML = `<h2>${UI.outrasNotas}</h2><ul class="registro">${outras.map((n) => `<li><a href="${esc(raizSite + enderecoNota(n))}">${esc(t(n.titulo))}</a><span>${esc(UI.minutos(n.minutos))}</span></li>`).join("")}</ul>`;
  }

  /* ---------- Montagem ---------- */

  function ativarContador() {
    const codigo = String(D.contador || "").trim();
    if (!/^[a-z0-9-]+$/i.test(codigo) || /^(localhost|127\.)/.test(location.hostname)) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://gc.zgo.at/count.js";
    script.dataset.goatcounter = `https://${codigo}.goatcounter.com/count`;
    document.head.appendChild(script);
  }

  function montar() {
    const nav = $("#nav");
    if (nav) nav.innerHTML = menu();
    if (naInicial) {
      $("#conteudo").innerHTML = secaoTopo() + secaoGamificaPampa() + secaoJogos() + secaoProjetos() + secaoSobre() + secaoContato();
      ligarTelaDaLista();
    }
    const rod = $("#rodape");
    if (rod) rod.innerHTML = rodape();
    preencherOutrasNotas();
    atualizarHora();
    setInterval(atualizarHora, 30000);
    prepararEntradas();
    ativarContador();
    if (location.hash === "#terminal") abrirTerminal();
  }

  document.addEventListener("click", (e) => {
    const alvo = e.target.closest("[data-acao], [data-idade], .barra-links a");
    if (!alvo) return;
    if (alvo.dataset.idade !== undefined) return filtrarJogos(alvo.dataset.idade);
    const acao = alvo.dataset.acao;
    if (acao === "tema") alternarTema();
    else if (acao === "terminal") abrirTerminal();
    else if (acao === "fechar-terminal") $("#terminal")?.close();
    else if (acao === "menu") {
      const aberto = $("#nav").classList.toggle("aberto");
      alvo.setAttribute("aria-expanded", String(aberto));
      alvo.textContent = aberto ? UI.fechar : UI.menu;
    }
    if (alvo.matches(".barra-links a")) {
      $("#nav").classList.remove("aberto");
      const botao = $(".barra-menu");
      if (botao) { botao.setAttribute("aria-expanded", "false"); botao.textContent = UI.menu; }
    }
  });

  document.addEventListener("submit", (e) => {
    if (e.target.id !== "formContato") return;
    e.preventDefault();
    enviarFormulario(e.target);
  });

  addEventListener("hashchange", () => { if (location.hash === "#terminal") abrirTerminal(); });

  montar();
})();
