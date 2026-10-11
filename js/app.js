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
      agora: "Agora", pesquisa: "Pesquisa", publicacoes: "Publicações", projetos: "Projetos",
      trajetoria: "Trajetória", contato: "Contato", sobre: "Sobre",
      linhas: "Linhas de pesquisa", interesses: "Outras áreas de interesse",
      pubsDestaque: "Publicações em destaque",
      verTodas: (n) => `Ver todas as ${n} publicações`, verMenos: "Mostrar menos",
      meuPapel: "Meu papel:", maisProjetos: "Mais projetos no GitHub",
      formacao: "Formação", experiencia: "Experiência",
      reconhecimentos: "Reconhecimentos e atuação",
      emAndamento: "em andamento", hoje: "hoje", ou: "ou", role: "Role",
      tema: "Alternar tema claro/escuro", idioma: "Read in English", menu: "Menu",
      voltarTopo: "Voltar ao topo",
    },
    en: {
      agora: "Now", pesquisa: "Research", publicacoes: "Publications", projetos: "Projects",
      trajetoria: "Background", contato: "Contact", sobre: "About",
      linhas: "Research lines", interesses: "Other interests",
      pubsDestaque: "Selected publications",
      verTodas: (n) => `See all ${n} publications`, verMenos: "Show less",
      meuPapel: "My role:", maisProjetos: "More projects on GitHub",
      formacao: "Education", experiencia: "Experience",
      reconhecimentos: "Awards and service",
      emAndamento: "in progress", hoje: "present", ou: "or", role: "Scroll",
      tema: "Toggle light/dark theme", idioma: "Ler em português", menu: "Menu",
      voltarTopo: "Back to top",
    },
  };

  const ICONES = {
    lattes: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm-1 1.6L18.4 9H13zM8 12.5h8V14H8zm0 3.5h8v1.5H8zm0-7h3v1.5H8z"/></svg>',
    orcid: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.2" fill="none" stroke="currentColor" stroke-width="1.6"/><text x="12" y="15.7" text-anchor="middle" font-size="10" font-weight="700" font-family="Arial, sans-serif" fill="currentColor">iD</text></svg>',
    scholar: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.9V17h2V9zM5 13.2v4L12 21l7-3.8v-4L12 17z"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1.1.9 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13M7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>',
    site: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.4 2.6 3.7 5.6 3.7 9s-1.3 6.4-3.7 9c-2.4-2.6-3.7-5.6-3.7-9S9.6 5.6 12 3z"/></svg>',
    tema: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 3.6a8.4 8.4 0 0 1 0 16.8z" fill="currentColor"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
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

  const CAPAS = {
    indigo: "linear-gradient(135deg, #0b1026, #4338ca 55%, #818cf8)",
    violeta: "linear-gradient(135deg, #1a0b2e, #7c3aed 55%, #c4b5fd)",
    azul: "linear-gradient(135deg, #061a2e, #1d4ed8 55%, #60a5fa)",
    ciano: "linear-gradient(135deg, #04202a, #0e7490 55%, #67e8f9)",
    verde: "linear-gradient(135deg, #04201a, #047857 55%, #6ee7b7)",
    laranja: "linear-gradient(135deg, #2a1204, #c2410c 55%, #fdba74)",
    vermelho: "linear-gradient(135deg, #2a0a0f, #b91c1c 55%, #fb7185)",
    rosa: "linear-gradient(135deg, #2a0820, #be185d 55%, #f9a8d4)",
  };

  /* ---------- Utilitários ---------- */

  const memoria = {
    ler(chave) { try { return localStorage.getItem(chave); } catch (e) { return null; } },
    gravar(chave, valor) { try { localStorage.setItem(chave, valor); } catch (e) { /* sem armazenamento */ } },
  };

  const idiomas = Array.isArray(D.idiomas) && D.idiomas.length ? D.idiomas : ["pt"];
  let idioma = idiomas.includes(memoria.ler("idioma")) ? memoria.ler("idioma") : idiomas[0];
  let pubsAbertas = false;
  let jaRenderizou = false;

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

  const temItens = (lista) => Array.isArray(lista) && lista.length > 0;
  const linkExterno = (url) => /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : "";

  /* ---------- Seções ---------- */

  function topo() {
    const nome = D.nome || {};
    const foto = D.foto
      ? `<img src="${esc(D.foto)}" alt="" onerror="this.closest('.hero').classList.remove('com-foto'); this.remove()">`
      : "";
    const detalhes = (D.topo?.detalhes || []).map(t).filter(Boolean).map(esc).join(" · ");
    const primeiroEmail = D.contato?.emails?.[0];

    const links = (D.links || []).map((link, i) => {
      const url = link.url || (link.tipo === "email" && primeiroEmail ? `mailto:${primeiroEmail}` : "#");
      const rotulo = t(link.rotulo) || t(ROTULOS_LINK[link.tipo]) || link.tipo;
      const icone = ICONES[link.tipo] || ICONES.site;
      const principal = (link.principal ?? i === 0) ? " principal" : "";
      return `<a class="link-botao${principal}" href="${esc(url)}"${linkExterno(url)}>${icone}<span>${esc(rotulo)}</span></a>`;
    }).join("");

    return `
      <section class="hero${foto ? " com-foto" : ""}" id="inicio">
        <div class="hero-fundo" style="--foto-posicao:${esc(D.fotoPosicao || "50% 20%")}">${foto}</div>
        <div class="hero-conteudo container">
          ${D.topo?.chamada ? `<p class="eyebrow">${esc(t(D.topo.chamada))}</p>` : ""}
          <h1 class="hero-nome"><span>${esc(nome.primeiro || "")}</span><span>${esc(nome.sobrenome || "")}</span></h1>
          ${D.topo?.frase ? `<p class="hero-frase texto-rico">${rico(t(D.topo.frase))}</p>` : ""}
          ${detalhes ? `<p class="hero-detalhes">${detalhes}</p>` : ""}
          ${links ? `<div class="hero-links">${links}</div>` : ""}
        </div>
        <a class="hero-role" href="#conteudo-inicio">${UI[idioma].role} <span>↓</span></a>
      </section>
      <div id="conteudo-inicio"></div>`;
  }

  function secaoAgora() {
    if (!temItens(D.agora)) return "";
    const colunas = D.agora.slice(0, 3);
    const classe = colunas.length < 3 ? ` colunas-${colunas.length}` : "";
    return `
      <section class="secao" id="agora">
        <div class="container agora-grade${classe}">
          ${colunas.map((col) => `
            <div class="agora-col revelar">
              <h2 class="rotulo">${esc(t(col.rotulo))}</h2>
              ${(col.itens || []).map((item) => `
                <div class="agora-item">
                  <h3>${esc(t(item.titulo))}${item.selo ? `<span class="selo">${esc(t(item.selo))}</span>` : ""}</h3>
                  ${item.texto ? `<p class="texto-rico">${rico(t(item.texto))}</p>` : ""}
                </div>`).join("")}
            </div>`).join("")}
        </div>
      </section>`;
  }

  function secaoSobre() {
    if (!temItens(D.sobre)) return "";
    return `
      <section class="secao" id="sobre">
        <div class="container revelar">
          <h2 class="rotulo">${UI[idioma].sobre}</h2>
          <div class="sobre-texto texto-rico">${D.sobre.map((p) => `<p>${rico(t(p))}</p>`).join("")}</div>
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
        <div class="container revelar">
          <h2 class="rotulo">${esc(t(D.pesquisa.rotulo)) || u.linhas}</h2>
          <ol class="linhas">
            ${linhas.map((l, i) => `<li><span class="num">${String(i + 1).padStart(2, "0")}</span><span>${esc(t(l))}</span></li>`).join("")}
          </ol>
          ${interesses.length ? `
            <h3 class="subrotulo">${u.interesses}</h3>
            <ul class="chips">${interesses.map((x) => `<li>${esc(t(x))}</li>`).join("")}</ul>` : ""}
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
          <h2 class="rotulo">${extras.length ? u.pubsDestaque : u.publicacoes}</h2>
          <ol class="pubs-lista">${visiveis.map(itemPublicacao).join("")}</ol>
          ${extras.length ? `
            <ol class="pubs-lista pubs-extra" id="pubsExtra"${pubsAbertas ? "" : " hidden"}>${extras.map(itemPublicacao).join("")}</ol>
            <button class="pubs-alternar" type="button" aria-expanded="${pubsAbertas}" aria-controls="pubsExtra" data-total="${todas.length}">
              ${rotuloAlternarPubs(todas.length)}
            </button>` : ""}
        </div>
      </section>`;
  }

  function rotuloAlternarPubs(total) {
    const u = UI[idioma];
    return pubsAbertas ? `${u.verMenos} <span>−</span>` : `${u.verTodas(total)} <span>+</span>`;
  }

  function capaProjeto(p) {
    const fundo = CAPAS[p.cor] || (p.cor && /gradient|^#|^rgb/.test(p.cor) ? p.cor : CAPAS.indigo);
    if (p.imagem) {
      return `background-image: linear-gradient(0deg, #0009, #0000 70%), url('${esc(p.imagem).replace(/'/g, "%27")}')`;
    }
    return `background: ${esc(fundo)}`;
  }

  function secaoProjetos() {
    if (!temItens(D.projetos)) return "";
    const u = UI[idioma];
    return `
      <section class="secao" id="projetos">
        <div class="container">
          <h2 class="rotulo revelar">${u.projetos}</h2>
          <div class="projetos-grade">
            ${D.projetos.map((p) => {
              const titulo = esc(t(p.titulo));
              return `
                <article class="projeto revelar">
                  <div class="projeto-capa" style="${capaProjeto(p)}">
                    ${p.categoria ? `<span class="projeto-tag">${esc(t(p.categoria))}</span>` : ""}
                    ${p.status ? `<span class="projeto-status">${esc(t(p.status))}</span>` : ""}
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
          ${D.maisProjetos ? `<a class="link-seta revelar" href="${esc(D.maisProjetos)}"${linkExterno(D.maisProjetos)}>${u.maisProjetos} <span aria-hidden="true">↗</span></a>` : ""}
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
              <div>
                <h4>${esc(t(i.titulo))}</h4>
                ${i.instituicao ? `<p class="traj-inst">${esc(t(i.instituicao))}</p>` : ""}
                ${i.detalhe ? `<p class="traj-det texto-rico">${rico(t(i.detalhe))}</p>` : ""}
              </div>
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
          <h2 class="rotulo revelar">${u.trajetoria}</h2>
          <div class="traj-grade">
            ${colunaTrajetoria(u.formacao, D.formacao)}
            ${colunaTrajetoria(u.experiencia, D.experiencia)}
          </div>
        </div>
      </section>`;
  }

  function secaoReconhecimentos() {
    if (!temItens(D.reconhecimentos)) return "";
    return `
      <section class="secao" id="reconhecimentos">
        <div class="container revelar">
          <h2 class="rotulo">${UI[idioma].reconhecimentos}</h2>
          <ul class="reconhecimentos">
            ${D.reconhecimentos.map((r) => `
              <li><span class="ano">${esc(r.ano ?? "")}</span><span class="texto-rico">${rico(t(r.texto))}</span></li>`).join("")}
          </ul>
        </div>
      </section>`;
  }

  function secaoContato() {
    const emails = D.contato?.emails || [];
    if (!emails.length && !D.contato?.cidade) return "";
    const u = UI[idioma];
    return `
      <section class="secao" id="contato">
        <div class="container revelar">
          <h2 class="rotulo">${u.contato}</h2>
          <div class="contato-emails">
            ${emails.map((e) => `<a class="contato-email" href="mailto:${esc(e)}">${esc(e)}</a>`).join(`<span class="contato-ou">${u.ou}</span>`)}
          </div>
          ${D.contato?.cidade ? `<p class="contato-local">${esc(t(D.contato.cidade))}</p>` : ""}
        </div>
      </section>`;
  }

  /* ---------- Montagem ---------- */

  function render() {
    const u = UI[idioma];
    const nomeCompleto = `${D.nome?.primeiro || ""} ${D.nome?.sobrenome || ""}`.trim();

    raiz.lang = idioma === "pt" ? "pt-BR" : "en";
    document.title = [nomeCompleto, t(D.topo?.chamada)].filter(Boolean).join(" · ");
    $("#metaDescricao").setAttribute("content", t(D.topo?.frase).replace(/\*\*|\[|\]\([^)]*\)/g, ""));

    const secoes = [
      { id: "agora", menu: u.agora, html: secaoAgora() },
      { id: "sobre", html: secaoSobre() },
      { id: "pesquisa", menu: u.pesquisa, html: secaoPesquisa() },
      { id: "publicacoes", menu: u.publicacoes, html: secaoPublicacoes() },
      { id: "projetos", menu: u.projetos, html: secaoProjetos() },
      { id: "trajetoria", menu: u.trajetoria, html: secaoTrajetoria() },
      { id: "reconhecimentos", html: secaoReconhecimentos() },
      { id: "contato", menu: u.contato, html: secaoContato() },
    ].filter((s) => s.html);

    const outroIdioma = idiomas.find((i) => i !== idioma);

    $("#nav").innerHTML = `
      <div class="container nav-dentro">
        <a class="nav-nome" href="#inicio">${esc(nomeCompleto)}</a>
        <nav class="nav-links" id="navLinks" aria-label="Seções">
          ${secoes.filter((s) => s.menu).map((s) => `<a href="#${s.id}" data-secao="${s.id}">${s.menu}</a>`).join("")}
        </nav>
        <div class="nav-acoes">
          ${outroIdioma ? `<button class="botao-icone" id="btnIdioma" type="button" title="${u.idioma}" aria-label="${u.idioma}">${outroIdioma.toUpperCase()}</button>` : ""}
          <button class="botao-icone" id="btnTema" type="button" title="${u.tema}" aria-label="${u.tema}">${ICONES.tema}</button>
          <button class="botao-icone nav-menu" id="btnMenu" type="button" aria-label="${u.menu}" aria-expanded="false" aria-controls="navLinks">${ICONES.menu}</button>
        </div>
      </div>`;

    $("#conteudo").innerHTML = topo() + secoes.map((s) => s.html).join("");

    $("#rodape").innerHTML = `
      <div class="container">
        <span>© ${new Date().getFullYear()} ${esc(nomeCompleto)}</span>
        <a href="#inicio">${u.voltarTopo} ↑</a>
      </div>`;

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
    // O topo não tem link; observá-lo limpa o destaque ao voltar para cima
    ["inicio", ...links.keys()].forEach((id) => { const s = document.getElementById(id); if (s) obsSecao.observe(s); });
  }

  function atualizarNav() {
    $("#nav").classList.toggle("no-topo", window.scrollY < 40);
  }

  function fecharMenu() {
    $("#nav").classList.remove("menu-aberto");
    $("#btnMenu")?.setAttribute("aria-expanded", "false");
  }

  function aplicarCores() {
    if (D.cores?.escuro) raiz.style.setProperty("--acento-escuro", D.cores.escuro);
    if (D.cores?.claro) raiz.style.setProperty("--acento-claro", D.cores.claro);
  }

  function aplicarFavicon() {
    const iniciais = ((D.nome?.primeiro || "")[0] || "") + ((D.nome?.sobrenome || "")[0] || "");
    const cor = D.cores?.escuro || "#a594ff";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#06060f"/><text x="32" y="41" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="26" fill="${cor}">${esc(iniciais)}</text></svg>`;
    $("#favicon").href = "data:image/svg+xml," + encodeURIComponent(svg);
  }

  document.addEventListener("click", (evento) => {
    const alvo = evento.target.closest("button, a");
    if (!alvo) return;

    if (alvo.id === "btnTema") {
      const novo = raiz.dataset.theme === "light" ? "dark" : "light";
      raiz.dataset.theme = novo;
      memoria.gravar("tema", novo);
    } else if (alvo.id === "btnIdioma") {
      idioma = idiomas.find((i) => i !== idioma) || idioma;
      memoria.gravar("idioma", idioma);
      render();
    } else if (alvo.id === "btnMenu") {
      const aberto = $("#nav").classList.toggle("menu-aberto");
      alvo.setAttribute("aria-expanded", String(aberto));
    } else if (alvo.classList.contains("pubs-alternar")) {
      pubsAbertas = !pubsAbertas;
      $("#pubsExtra").hidden = !pubsAbertas;
      alvo.setAttribute("aria-expanded", String(pubsAbertas));
      alvo.innerHTML = rotuloAlternarPubs(Number(alvo.dataset.total));
    } else if (alvo.closest(".nav-links")) {
      fecharMenu();
    }
  });

  document.addEventListener("keydown", (e) => { if (e.key === "Escape") fecharMenu(); });
  window.addEventListener("scroll", atualizarNav, { passive: true });

  aplicarCores();
  aplicarFavicon();
  render();
  atualizarNav();
})();
