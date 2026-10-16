/* "Seja o firewall": um minijogo para explicar a pesquisa sem jargão.
   Pacotes chegam na rede de uma casa e o visitante decide: bloquear ou deixar passar.
   O app.js chama JogoFirewall.montar(elemento, { idioma, registrarEvento }). */
(function () {
  "use strict";

  const TEXTOS = {
    pt: {
      intro: "Pacotes da internet estão chegando na rede de uma casa. Você é o firewall: confere cada um e decide se ele <b>entra</b> ou é <b>bloqueado</b>, seguindo as regras.",
      comoJogar: "São 3 níveis, e cada um traz uma regra nova. Use os botões ou as setas do teclado: <kbd>←</kbd> bloquear, <kbd>→</kbd> deixar passar.",
      comecar: "Começar", semTempo: "Jogar sem cronômetro", jogarDeNovo: "Jogar de novo", continuar: "Continuar",
      recorde: (n, total) => `Seu recorde: ${n} de ${total}`,
      nivel: (n) => `Nível ${n}`, pacote: (n, total) => `Pacote ${n} de ${total}`, acertos: (n) => `${n} acertos`,
      regras: "Regras", nova: "nova!", tempo: "Tempo para decidir",
      bloquear: "Bloquear", deixar: "Deixar passar",
      de: "De", quer: "Quer", ritmo: "Ritmo",
      internet: "da internet",
      porSegundo: (n) => `${n} pacote${n > 1 ? "s" : ""} por segundo`,
      novaRegra: "Nova regra",
      certoBloqueio: "Certo, bloqueado!", certoPassou: "Certo, pode passar!",
      erroPassou: "Ops, esse era perigoso e passou.", erroBloqueio: "Ops, esse era do bem e foi bloqueado.",
      tempoEsgotado: "Tempo esgotado! Enquanto você pensava, a fila de pacotes cresceu.",
      semRegra: "Nenhuma regra bloqueia este pacote.",
      desconhecidoOk: "Desconhecido não quer dizer perigoso: nenhuma regra bloqueia este pacote.",
      tecnicoOk: "É o técnico cadastrado: a regra 2 deixa ele entrar.",
      fimTitulo: (a, total) => `Você acertou ${a} de ${total}`,
      notas: [
        [0.9, "Firewall de elite 🛡️"],
        [0.7, "Bom firewall! 👍"],
        [0.4, "Quase lá: alguns ataques passaram 😅"],
        [0, "Precisa de uma atualização de segurança 😄"],
      ],
      fimResumo: (ataques, total, bloqueadosErrado) =>
        `Ataques barrados: ${ataques} de ${total}. Pacotes do bem bloqueados por engano: ${bloqueadosErrado}.`,
      fimTempo: (seg) => `Você levou ${seg} segundos.`,
      fimExplica: "Um equipamento de rede de verdade faz essa triagem com milhões de pacotes por segundo, sem cansar e sem esquecer nenhuma regra. É isso que o <b>P4</b> permite: escrever as regras direto nos equipamentos da rede. Na minha pesquisa, uso isso para que a própria rede separe os pacotes que merecem uma análise mais cuidadosa do sistema que procura ataques.",
      novoRecorde: "Novo recorde!",
    },
    en: {
      intro: "Packets from the internet are arriving at a home network. You are the firewall: check each one and decide whether it gets <b>in</b> or gets <b>blocked</b>, following the rules.",
      comoJogar: "There are 3 levels, and each one adds a new rule. Use the buttons or the arrow keys: <kbd>←</kbd> block, <kbd>→</kbd> let it in.",
      comecar: "Start", semTempo: "Play without a timer", jogarDeNovo: "Play again", continuar: "Continue",
      recorde: (n, total) => `Your best: ${n} out of ${total}`,
      nivel: (n) => `Level ${n}`, pacote: (n, total) => `Packet ${n} of ${total}`, acertos: (n) => `${n} correct`,
      regras: "Rules", nova: "new!", tempo: "Time to decide",
      bloquear: "Block", deixar: "Let it in",
      de: "From", quer: "Wants to", ritmo: "Rate",
      internet: "from the internet",
      porSegundo: (n) => `${n} packet${n > 1 ? "s" : ""} per second`,
      novaRegra: "New rule",
      certoBloqueio: "Right, blocked!", certoPassou: "Right, let it in!",
      erroPassou: "Oops, that one was dangerous and got in.", erroBloqueio: "Oops, that one was harmless and got blocked.",
      tempoEsgotado: "Time's up! While you were thinking, the packet queue grew.",
      semRegra: "No rule blocks this packet.",
      desconhecidoOk: "Unknown doesn't mean dangerous: no rule blocks this packet.",
      tecnicoOk: "It's the registered technician: rule 2 lets them in.",
      fimTitulo: (a, total) => `You got ${a} out of ${total} right`,
      notas: [
        [0.9, "Elite firewall 🛡️"],
        [0.7, "Good firewall! 👍"],
        [0.4, "Almost there: some attacks got in 😅"],
        [0, "Needs a security update 😄"],
      ],
      fimResumo: (ataques, total, bloqueadosErrado) =>
        `Attacks stopped: ${ataques} out of ${total}. Harmless packets blocked by mistake: ${bloqueadosErrado}.`,
      fimTempo: (seg) => `It took you ${seg} seconds.`,
      fimExplica: "A real network device does this sorting with millions of packets per second, without getting tired or forgetting a rule. That's what <b>P4</b> makes possible: writing the rules straight into network devices. In my research, I use it so the network itself sets aside the packets that deserve a closer look from the system that hunts for attacks.",
      novoRecorde: "New record!",
    },
  };

  // Quem manda os pacotes
  const REMETENTES = {
    escola: { icone: "🏫", nome: { pt: "Site da escola", en: "School website" } },
    musica: { icone: "🎵", nome: { pt: "App de música", en: "Music app" } },
    vovo: { icone: "👵", nome: { pt: "Vovó", en: "Grandma" } },
    loja: { icone: "🛒", nome: { pt: "Loja online", en: "Online store" } },
    desconhecido: { icone: "❔", nome: { pt: "Computador desconhecido", en: "Unknown computer" } },
    tecnico: { icone: "🧰", nome: { pt: "Técnico cadastrado", en: "Registered technician" } },
    atacante: { icone: "👾", nome: { pt: "Endereço 66.6.6.6", en: "Address 66.6.6.6" } },
  };

  // O que o pacote quer fazer
  const PEDIDOS = {
    pagina: { icone: "📄", nome: { pt: "entregar uma página", en: "deliver a web page" } },
    som: { icone: "🎧", nome: { pt: "entregar uma música", en: "deliver a song" } },
    chamada: { icone: "📞", nome: { pt: "fazer uma chamada de vídeo", en: "start a video call" } },
    pedido: { icone: "📦", nome: { pt: "confirmar uma compra", en: "confirm a purchase" } },
    painel: { icone: "🔑", nome: { pt: "entrar no painel do roteador", en: "log into the router panel" }, restrito: true },
    camera: { icone: "📷", nome: { pt: "ver a câmera da sala", en: "watch the living room camera" }, restrito: true },
  };

  const REGRAS = {
    lista: {
      pt: "Bloqueie tudo que vem de 👾 66.6.6.6: esse endereço está na lista de ataques conhecidos.",
      en: "Block everything from 👾 66.6.6.6: that address is on the list of known attackers.",
      motivo: { pt: "66.6.6.6 está na lista de ataques (regra 1).", en: "66.6.6.6 is on the attackers list (rule 1)." },
    },
    restrito: {
      pt: "Só o 🧰 técnico cadastrado pode entrar no 🔑 painel do roteador ou ver a 📷 câmera.",
      en: "Only the 🧰 registered technician may log into the 🔑 router panel or watch the 📷 camera.",
      motivo: { pt: "só o técnico cadastrado pode fazer isso (regra 2).", en: "only the registered technician may do that (rule 2)." },
    },
    enxurrada: {
      pt: "Bloqueie quem manda mais de 100 pacotes por segundo: é uma enxurrada para derrubar a rede.",
      en: "Block anyone sending more than 100 packets per second: it's a flood meant to take the network down.",
      motivo: { pt: "uma enxurrada de pacotes para derrubar a rede (regra 3).", en: "a flood of packets meant to take the network down (rule 3)." },
    },
  };

  const NIVEIS = [
    { regras: ["lista"], pacotes: 6, tempo: 8000 },
    { regras: ["lista", "restrito"], pacotes: 7, tempo: 7000 },
    { regras: ["lista", "restrito", "enxurrada"], pacotes: 8, tempo: 6000 },
  ];
  const TOTAL = NIVEIS.reduce((s, n) => s + n.pacotes, 0);

  const sortear = (lista) => lista[Math.floor(Math.random() * lista.length)];
  const embaralhar = (lista) => {
    for (let i = lista.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lista[i], lista[j]] = [lista[j], lista[i]];
    }
    return lista;
  };

  // Decide se um pacote deve ser bloqueado, e por qual regra, pelas regras do nível
  function avaliar(p, regras) {
    if (regras.includes("enxurrada") && p.ritmo > 100) return "enxurrada";
    if (regras.includes("lista") && p.de === "atacante") return "lista";
    if (regras.includes("restrito") && PEDIDOS[p.quer].restrito && p.de !== "tecnico") return "restrito";
    return null;
  }

  // Monta a fila de um nível: mais ou menos metade perigosa, sem repetir o mesmo pacote seguido
  function gerarFila(nivel) {
    const { regras, pacotes } = NIVEIS[nivel];
    const comuns = ["pagina", "som", "chamada", "pedido"];
    const doBem = ["escola", "musica", "vovo", "loja", "desconhecido"];
    const perigosos = [];
    const bons = [];
    const quantosPerigosos = Math.round(pacotes / 2);

    for (let i = 0; i < quantosPerigosos; i++) {
      const tipo = sortear(regras);
      if (tipo === "lista") perigosos.push({ de: "atacante", quer: sortear([...comuns, "painel"]), ritmo: 1 });
      if (tipo === "restrito") perigosos.push({ de: sortear(["desconhecido", "loja", "atacante", "escola"]), quer: sortear(["painel", "camera"]), ritmo: 1 });
      if (tipo === "enxurrada") perigosos.push({ de: sortear(doBem), quer: sortear(comuns), ritmo: sortear([250, 600, 1200, 5000]) });
    }
    for (let i = bons.length; i < pacotes - quantosPerigosos; i++) {
      // Os casos que confundem também aparecem: desconhecido inofensivo e técnico no painel
      const caso = Math.random();
      if (regras.includes("restrito") && caso < 0.3) bons.push({ de: "tecnico", quer: sortear(["painel", "camera"]), ritmo: 1 });
      else if (caso < 0.5) bons.push({ de: "desconhecido", quer: sortear(comuns), ritmo: 1 });
      else bons.push({ de: sortear(doBem), quer: sortear(comuns), ritmo: regras.includes("enxurrada") ? sortear([1, 2, 5, 20]) : 1 });
    }
    const fila = embaralhar([...perigosos, ...bons]).map((p) => ({ ...p, regra: avaliar(p, regras) }));
    // Evita dois pacotes idênticos em seguida
    for (let i = 1; i < fila.length; i++) {
      if (fila[i].de === fila[i - 1].de && fila[i].quer === fila[i - 1].quer && i + 1 < fila.length) {
        [fila[i], fila[i + 1]] = [fila[i + 1], fila[i]];
      }
    }
    return fila;
  }

  let el = null;
  let opcoes = { idioma: "pt", registrarEvento() {} };
  let estado = null;
  let quadro = 0;

  const T = () => TEXTOS[opcoes.idioma] || TEXTOS.pt;
  const nome = (obj) => obj.nome[opcoes.idioma] || obj.nome.pt;
  const lerRecorde = () => { try { return Number(localStorage.getItem("firewall:recorde")) || 0; } catch (e) { return 0; } };
  const gravarRecorde = (n) => { try { localStorage.setItem("firewall:recorde", String(n)); } catch (e) { /* sem armazenamento */ } };

  function regrasHtml(nivel, destacarNova) {
    const t = T();
    const regras = NIVEIS[nivel].regras;
    return `
      <div class="fw-regras">
        <h3>${t.regras}</h3>
        <ol>
          ${regras.map((r, i) => `<li${destacarNova && i === regras.length - 1 && nivel > 0 ? ' class="fw-nova"' : ""}>
            ${destacarNova && i === regras.length - 1 && nivel > 0 ? `<span class="fw-selo">${t.nova}</span>` : ""}${REGRAS[r][opcoes.idioma] || REGRAS[r].pt}</li>`).join("")}
          <li class="fw-resto">${opcoes.idioma === "pt" ? "Todo o resto pode passar." : "Everything else may come in."}</li>
        </ol>
      </div>`;
  }

  function telaInicial() {
    const t = T();
    const recorde = lerRecorde();
    pararRelogio();
    estado = null;
    el.innerHTML = `
      <div class="fw fw-inicio">
        <div class="fw-casa" aria-hidden="true">
          <span class="fw-nuvem">🌐</span><span class="fw-seta">→</span><span class="fw-muro">🧱</span><span class="fw-seta">→</span><span class="fw-lar">🏠</span>
        </div>
        <p class="fw-intro">${t.intro}</p>
        <p class="fw-como">${t.comoJogar}</p>
        <div class="fw-acoes-inicio">
          <button type="button" class="botao principal" data-fw="comecar"><span aria-hidden="true">▶</span> ${t.comecar}</button>
          <button type="button" class="botao" data-fw="comecar-sem-tempo">${t.semTempo}</button>
          ${recorde ? `<span class="fw-recorde">${t.recorde(recorde, TOTAL)}</span>` : ""}
        </div>
      </div>`;
  }

  let semTempo = false;

  function comecar(modoSemTempo = semTempo) {
    if (!el) return;
    semTempo = modoSemTempo;
    estado = { nivel: 0, indice: 0, numero: 0, acertos: 0, ataques: 0, ataquesBarrados: 0, bloqueiosErrados: 0, inicio: Date.now(), fila: gerarFila(0), travado: false };
    opcoes.registrarEvento("firewall-inicio", "Começou o jogo do firewall");
    telaNivel();
  }

  // Abertura de cada nível (o 1º já começa direto, com as regras na tela)
  function telaNivel() {
    const t = T();
    if (estado.nivel === 0) return proximoPacote();
    pararRelogio();
    const nova = NIVEIS[estado.nivel].regras.at(-1);
    el.innerHTML = `
      <div class="fw fw-transicao">
        <p class="fw-rotulo">${t.nivel(estado.nivel + 1)} · ${t.novaRegra}</p>
        <p class="fw-regra-grande">${REGRAS[nova][opcoes.idioma] || REGRAS[nova].pt}</p>
        <button type="button" class="botao principal" data-fw="continuar">${t.continuar} <span aria-hidden="true">→</span></button>
      </div>`;
    el.querySelector('[data-fw="continuar"]').focus({ preventScroll: true });
  }

  function proximoPacote() {
    const t = T();
    const nivel = NIVEIS[estado.nivel];
    const p = estado.fila[estado.indice];
    estado.numero += 1;
    estado.travado = false;
    const de = REMETENTES[p.de];
    const quer = PEDIDOS[p.quer];
    const mostrarRitmo = nivel.regras.includes("enxurrada");
    // Quem joga pelo teclado continua com o foco nos botões a cada pacote
    const focoNosBotoes = estado.focoNoJogo || el.contains(document.activeElement);
    const descricao = `fwDe fwQuer${mostrarRitmo ? " fwRitmo" : ""}`;

    el.innerHTML = `
      <div class="fw fw-jogo">
        <div class="fw-barra">
          <span class="fw-nivel">${t.nivel(estado.nivel + 1)}</span>
          <span>${t.pacote(estado.numero, TOTAL)}</span>
          <span class="fw-placar">${t.acertos(estado.acertos)}</span>
        </div>
        <div class="fw-grade">
          ${regrasHtml(estado.nivel, estado.indice === 0)}
          <div class="fw-mesa">
            <article class="fw-pacote" aria-label="${t.pacote(estado.numero, TOTAL)}">
              <div class="fw-campo" id="fwDe"><span>${t.de}</span><b><i aria-hidden="true">${de.icone}</i>${nome(de)}</b><small>${t.internet}</small></div>
              <div class="fw-campo" id="fwQuer"><span>${t.quer}</span><b><i aria-hidden="true">${quer.icone}</i>${nome(quer)}</b></div>
              ${mostrarRitmo ? `<div class="fw-campo${p.ritmo > 100 ? " fw-alerta" : ""}" id="fwRitmo"><span>${t.ritmo}</span><b>${t.porSegundo(p.ritmo.toLocaleString(opcoes.idioma === "pt" ? "pt-BR" : "en"))}</b></div>` : ""}
              ${semTempo ? "" : `<div class="fw-tempo" role="progressbar" aria-label="${t.tempo}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100"><i></i></div>`}
            </article>
            <div class="fw-botoes">
              <button type="button" class="botao fw-bloquear" data-fw="bloquear" aria-describedby="${descricao}"><span aria-hidden="true">✋</span> ${t.bloquear} <kbd aria-hidden="true">←</kbd></button>
              <button type="button" class="botao fw-deixar" data-fw="deixar" aria-describedby="${descricao}">${t.deixar} <span aria-hidden="true">✅</span> <kbd aria-hidden="true">→</kbd></button>
            </div>
            <p class="fw-retorno" aria-live="polite"></p>
          </div>
        </div>
      </div>`;
    if (focoNosBotoes) el.querySelector('[data-fw="bloquear"]').focus({ preventScroll: true });
    // O primeiro pacote de cada nível ganha tempo extra para ler as regras
    if (!semTempo) iniciarRelogio(nivel.tempo + (estado.indice === 0 ? 5000 : 0));
  }

  /* Relógio de cada pacote (atualizado por JavaScript, então funciona mesmo sem animações) */
  let relogio = { fim: 0, total: 0, restante: 0, pausado: false };
  // Motivos para o relógio estar parado: aba escondida ou jogo fora da tela
  const pausas = new Set();

  function pausar(motivo) {
    pausas.add(motivo);
    relogio.pausado = true;
  }

  function retomar(motivo) {
    pausas.delete(motivo);
    if (pausas.size || !relogio.pausado) return;
    relogio.fim = performance.now() + relogio.restante;
    relogio.pausado = false;
  }

  function iniciarRelogio(total) {
    pararRelogio();
    relogio = { fim: performance.now() + total, total, restante: total, pausado: pausas.size > 0 };
    const passo = (agora) => {
      if (relogio.pausado) { quadro = requestAnimationFrame(passo); return; }
      const restante = Math.max(0, relogio.fim - agora);
      relogio.restante = restante;
      const barra = el?.querySelector(".fw-tempo");
      if (barra) {
        const fracao = restante / total;
        barra.firstElementChild.style.transform = `scaleX(${fracao})`;
        const passo10 = String(Math.ceil(fracao * 10) * 10);
        if (barra.getAttribute("aria-valuenow") !== passo10) barra.setAttribute("aria-valuenow", passo10);
        barra.classList.toggle("fw-acabando", fracao < 0.3);
      }
      if (restante <= 0) { decidir(null); return; }
      quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);
  }

  function pararRelogio() { cancelAnimationFrame(quadro); }

  // Pausa o relógio quando a aba fica escondida
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pausar("aba"); else retomar("aba");
  });

  // escolha: "bloquear", "deixar" ou null (tempo esgotado)
  function decidir(escolha) {
    if (!estado || estado.travado) return;
    estado.travado = true;
    estado.focoNoJogo = el.contains(document.activeElement);
    pararRelogio();
    const t = T();
    const p = estado.fila[estado.indice];
    const perigoso = Boolean(p.regra);
    const certo = escolha !== null && (escolha === "bloquear") === perigoso;
    if (perigoso) estado.ataques += 1;
    if (certo) estado.acertos += 1;
    if (perigoso && escolha === "bloquear") estado.ataquesBarrados += 1;
    if (!perigoso && escolha === "bloquear") estado.bloqueiosErrados += 1;

    const motivo = perigoso
      ? (REGRAS[p.regra].motivo[opcoes.idioma] || REGRAS[p.regra].motivo.pt)
      : p.de === "desconhecido" ? t.desconhecidoOk
      : p.de === "tecnico" && PEDIDOS[p.quer].restrito ? t.tecnicoOk
      : t.semRegra;
    const titulo = escolha === null ? t.tempoEsgotado
      : certo ? (perigoso ? t.certoBloqueio : t.certoPassou)
      : (perigoso ? t.erroPassou : t.erroBloqueio);

    const pacote = el.querySelector(".fw-pacote");
    pacote?.classList.add(escolha === "bloquear" ? "fw-saiu-bloqueado" : "fw-saiu-passou", certo ? "fw-certo" : "fw-errado");
    // Som e vibração (app.js): o bloqueio vibra no celular
    if (escolha === "bloquear") window.EfeitosSite?.barrado(); else if (escolha) window.EfeitosSite?.passou();
    el.querySelectorAll("[data-fw]").forEach((b) => { b.disabled = true; });
    const retorno = el.querySelector(".fw-retorno");
    if (retorno) {
      retorno.className = `fw-retorno ${certo ? "fw-ok" : "fw-ruim"}`;
      retorno.innerHTML = `<b><span aria-hidden="true">${certo ? "✔" : "✖"}</span> ${titulo}</b> ${motivo}`;
    }
    const placar = el.querySelector(".fw-placar");
    if (placar) placar.textContent = t.acertos(estado.acertos);

    if (semTempo) {
      const seguir = document.createElement("button");
      seguir.type = "button";
      seguir.className = "botao principal fw-seguir";
      seguir.dataset.fw = "avancar";
      seguir.innerHTML = `${t.continuar} <span aria-hidden="true">→</span>`;
      retorno?.after(seguir);
      seguir.focus({ preventScroll: true });
    } else {
      setTimeout(avancar, certo ? 1300 : 2600);
    }
  }

  function avancar() {
    if (!estado) return;
    estado.indice += 1;
    if (estado.indice < estado.fila.length) return proximoPacote();
    estado.nivel += 1;
    estado.indice = 0;
    if (estado.nivel < NIVEIS.length) {
      estado.fila = gerarFila(estado.nivel);
      return telaNivel();
    }
    telaFinal();
  }

  function telaFinal() {
    const t = T();
    const { acertos, ataques, ataquesBarrados, bloqueiosErrados } = estado;
    const segundos = Math.round((Date.now() - estado.inicio) / 1000);
    const nota = t.notas.find(([minimo]) => acertos / TOTAL >= minimo)[1];
    const recordeAntes = lerRecorde();
    const recorde = acertos > recordeAntes;
    if (recorde) gravarRecorde(acertos);
    opcoes.registrarEvento(`firewall-fim-${Math.round((acertos / TOTAL) * 10) * 10}`, `Terminou o firewall: ${acertos}/${TOTAL}`);
    estado = null;

    el.innerHTML = `
      <div class="fw fw-fim">
        <p class="fw-rotulo">${nota}${recorde && recordeAntes ? ` · ${t.novoRecorde}` : ""}</p>
        <h3 class="fw-resultado">${t.fimTitulo(acertos, TOTAL)}</h3>
        <p class="fw-resumo">${t.fimResumo(ataquesBarrados, ataques, bloqueiosErrados)} ${t.fimTempo(segundos)}</p>
        <p class="fw-explica">${t.fimExplica}</p>
        <button type="button" class="botao principal" data-fw="repetir"><span aria-hidden="true">↻</span> ${t.jogarDeNovo}</button>
      </div>`;
    el.querySelector('[data-fw="repetir"]').focus({ preventScroll: true });
  }

  function aoClicar(e) {
    const botao = e.target.closest("[data-fw]");
    if (!botao || botao.disabled) return;
    const acao = botao.dataset.fw;
    if (acao === "comecar") comecar(false);
    else if (acao === "comecar-sem-tempo") comecar(true);
    // "Jogar de novo" mantém o modo escolhido (com ou sem cronômetro)
    else if (acao === "repetir") comecar();
    else if (acao === "continuar") proximoPacote();
    else if (acao === "avancar") avancar();
    else decidir(acao);
  }

  // Setas do teclado durante a partida (fora de campos de texto)
  document.addEventListener("keydown", (e) => {
    if (!estado || estado.travado || !el?.querySelector(".fw-jogo")) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || document.querySelector("dialog[open]")) return;
    const foco = document.activeElement;
    if (pausas.has("tela") || !(foco === document.body || el.contains(foco))) return;
    if (e.key === "ArrowLeft") { e.preventDefault(); decidir("bloquear"); }
    if (e.key === "ArrowRight") { e.preventDefault(); decidir("deixar"); }
  });

  window.JogoFirewall = {
    montar(alvo, configuracao) {
      if (!alvo) return;
      if (el) el.removeEventListener("click", aoClicar);
      el = alvo;
      opcoes = { ...opcoes, ...configuracao };
      el.addEventListener("click", aoClicar);
      // Se o visitante rolar a página para longe do jogo, o tempo para
      if ("IntersectionObserver" in window) {
        new IntersectionObserver((entradas) => {
          for (const e of entradas) { if (e.isIntersecting) retomar("tela"); else pausar("tela"); }
        }, { threshold: 0.35 }).observe(el);
      }
      telaInicial();
    },
    comecar() {
      if (el && !estado) comecar(false);
    },
  };
})();
