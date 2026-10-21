/* Fundo animado: um globo de rede em 3D atrás da página.
   Nós (os quadrados são switches) ligados aos vizinhos mais próximos, com pacotes andando pelos enlaces;
   de vez em quando o firewall barra um e ele fica coral e some. O globo gira sozinho, vira na direção
   do mouse com uma mola, gira junto com a rolagem e, depois do topo, encolhe para o canto e fica discreto.
   Passar o mouse perto de um nó faz ele "pingar" e soltar pacotes. Desenhado em canvas 2D, sem biblioteca.
   Quem prefere menos movimento vê o globo parado. */
(function () {
  if (!window.HTMLCanvasElement) return;
  const raiz = document.documentElement;
  const movimentoReduzido = matchMedia("(prefers-reduced-motion: reduce)");
  const temMouse = matchMedia("(hover: hover) and (pointer: fine)").matches;

  const canvas = document.createElement("canvas");
  canvas.className = "fundo-rede";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  /* ---------- A rede: pontos espalhados por uma esfera (espiral de Fibonacci) ---------- */

  // A rede tem três formas e muda de uma para outra conforme a seção na tela:
  // globo (o topo e quase tudo), pipeline (três colunas: parser, match-action, deparser, no laboratório P4)
  // e estrela (todos os nós ligados a um só, você, no contato)
  const FORMAS = ["globo", "pipeline", "estrela"];
  let nos = [];
  let formas = {};
  const peso = { globo: 1, pipeline: 0, estrela: 0 };

  function ligar(pares) {
    const vistos = new Set();
    const enlaces = [];
    const vizinhos = nos.map(() => []);
    for (const [i, j] of pares) {
      const chave = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (i === j || vistos.has(chave)) continue;
      vistos.add(chave);
      enlaces.push([i, j]);
      vizinhos[i].push(j);
      vizinhos[j].push(i);
    }
    return { enlaces, vizinhos };
  }

  function montarRede(qtd) {
    const ouro = Math.PI * (3 - Math.sqrt(5));
    const porColuna = Math.ceil(qtd / 3);
    nos = Array.from({ length: qtd }, (_, i) => {
      const y = 1 - (i / (qtd - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const a = i * ouro;
      // Um pouco de irregularidade para não parecer uma bola perfeita
      const raio = 0.86 + Math.random() * 0.24;
      const globo = { x: Math.cos(a) * r * raio, y: y * raio, z: Math.sin(a) * r * raio };
      const coluna = i % 3, k = Math.floor(i / 3);
      const pipeline = { x: (coluna - 1) * 0.95 + (Math.random() - 0.5) * 0.14, y: -0.72 + (1.44 * k) / Math.max(1, porColuna - 1), z: (Math.random() - 0.5) * 0.4 };
      const ang = (i / (qtd - 1)) * Math.PI * 2, anel = 0.72 + (i % 3) * 0.14;
      const estrela = i === 0 ? { x: 0, y: 0, z: 0 } : { x: Math.cos(ang) * anel, y: Math.sin(ang) * anel, z: (i % 2 ? 0.12 : -0.12) };
      return { alvo: { globo, pipeline, estrela }, ...globo, switch: i % 7 === 0, ping: 0, coluna, k };
    });

    const pertos = [];
    nos.forEach((a, i) => {
      nos
        .map((b, j) => ({ j, d: (a.alvo.globo.x - b.alvo.globo.x) ** 2 + (a.alvo.globo.y - b.alvo.globo.y) ** 2 + (a.alvo.globo.z - b.alvo.globo.z) ** 2 }))
        .filter((o) => o.j !== i)
        .sort((p, q) => p.d - q.d)
        .slice(0, a.switch ? 5 : 3)
        .forEach(({ j }) => pertos.push([i, j]));
    });
    // Pipeline: cada coluna é uma corrente, e alguns nós passam o pacote para a coluna seguinte
    const cadeia = [];
    nos.forEach((a, i) => {
      if (i + 3 < qtd) cadeia.push([i, i + 3]);
      if (a.coluna < 2 && a.k % 3 === 0 && i + 1 < qtd) cadeia.push([i, i + 1]);
    });
    formas = {
      globo: ligar(pertos),
      pipeline: ligar(cadeia),
      estrela: ligar(nos.map((_, i) => [0, i])),
    };
    nos[0].switch = true;
  }

  // A forma que manda nos pacotes é a de maior peso no momento
  const formaAtual = () => FORMAS.reduce((a, b) => (peso[b] > peso[a] ? b : a), "globo");

  /* ---------- Pacotes: andam de nó em nó; alguns são barrados ---------- */

  let pacotes = [];
  function novoPacote(de = Math.floor(Math.random() * nos.length)) {
    const opcoes = formas[formaAtual()].vizinhos[de];
    if (!opcoes?.length) return;
    pacotes.push({ de, para: opcoes[Math.floor(Math.random() * opcoes.length)], t: 0, vel: 0.6 + Math.random() * 0.7, saltos: 2 + Math.floor(Math.random() * 6), barrado: false, some: 1 });
  }

  function andarPacotes(dt) {
    for (const p of pacotes) {
      if (p.barrado) { p.some -= dt * 1.6; continue; }
      p.t += dt * p.vel;
      if (p.t < 1) continue;
      nos[p.para].ping = Math.max(nos[p.para].ping, 0.35);
      p.saltos--;
      // O firewall barra cerca de 1 em cada 12 chegadas
      if (p.saltos <= 0 || Math.random() < 0.08) { p.barrado = p.saltos > 0; p.t = 1; if (!p.barrado) p.some = 0; continue; }
      const opcoes = formas[formaAtual()].vizinhos[p.para].filter((n) => n !== p.de);
      p.de = p.para;
      p.para = opcoes.length ? opcoes[Math.floor(Math.random() * opcoes.length)] : p.de;
      p.t = 0;
    }
    pacotes = pacotes.filter((p) => p.some > 0);
    while (pacotes.length < alvoPacotes) novoPacote();
  }

  /* ---------- Cores do tema atual ---------- */

  let cores = {};
  function lerCores() {
    const cs = getComputedStyle(raiz);
    const ler = (v, reserva) => cs.getPropertyValue(v).trim() || reserva;
    cores = { linha: ler("--texto", "#f3efe6"), acento: ler("--acento", "#9d9bff"), coral: ler("--perigo", "#ff5f57") };
  }
  // Tema, paleta e modo hacker mudam atributos e variáveis no <html>
  // A classe "parado" vem do botão "Pausar animações" do rodapé
  const parado = () => movimentoReduzido.matches || raiz.classList.contains("parado");
  // A troca de cor do campo invertido é animada: relê as cores algumas vezes até ela terminar
  new MutationObserver(() => {
    lerCores();
    [250, 500, 800].forEach((ms) => setTimeout(() => { lerCores(); if (parado()) desenhar(0); }, ms));
    if (parado()) { rodando = false; desenhar(0); } else iniciar();
  })
    .observe(raiz, { attributes: true, attributeFilter: ["data-theme", "data-estilo", "class", "style"] });

  /* ---------- Tamanho, mouse e rolagem ---------- */

  let L = 0, A = 0, dpr = 1, alvoPacotes = 14;
  function medir() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    L = innerWidth;
    A = innerHeight;
    canvas.width = Math.round(L * dpr);
    canvas.height = Math.round(A * dpr);
    const pequeno = L < 760;
    if (!nos.length || (pequeno ? nos.length !== 46 : nos.length !== 72)) { montarRede(pequeno ? 46 : 72); pacotes = []; }
    alvoPacotes = pequeno ? 8 : 14;
  }

  // Mola: o globo persegue a posição do mouse com um pouco de balanço, como no fundo de itssharl.ee
  const mola = { x: 0, y: 0, vx: 0, vy: 0, alvoX: 0, alvoY: 0 };
  let mouse = null;
  if (temMouse) {
    document.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      mola.alvoX = (e.clientX / L) * 2 - 1;
      mola.alvoY = (e.clientY / A) * 2 - 1;
      mouse = { x: e.clientX, y: e.clientY };
    }, { passive: true });
    raiz.addEventListener("mouseleave", () => { mola.alvoX = mola.alvoY = 0; mouse = null; });
  }

  // Laboratório P4 no meio da tela: pipeline. Contato aparecendo: estrela. Fora disso: globo.
  function formaDaSecao() {
    const meio = A / 2;
    const lab = document.getElementById("laboratorio")?.getBoundingClientRect();
    if (lab && lab.top < meio && lab.bottom > meio) return "pipeline";
    const contato = document.getElementById("contato")?.getBoundingClientRect();
    if (contato && contato.top < A * 0.7) return "estrela";
    return "globo";
  }

  // 0 no topo, 1 quando o topo já saiu da tela
  function saidaDoTopo() {
    const hero = document.querySelector(".hero");
    const h = hero ? hero.offsetHeight : A;
    return Math.min(1, Math.max(0, scrollY / (h * 0.8)));
  }

  /* ---------- Desenho ---------- */

  const suave = (t) => t * t * (3 - 2 * t);
  const mistura = (a, b, t) => a + (b - a) * t;
  let giro = 0;
  let ultimoPingMouse = 0;

  function desenhar(dt) {
    const pequeno = L < 760;
    const s = suave(saidaDoTopo());
    // No topo o globo fica grande atrás da foto; depois encolhe para a direita e fica discreto
    const cxSolto = mistura(pequeno ? 0.5 : 0.75, pequeno ? 0.86 : 0.9, s);
    const cy = mistura(pequeno ? 0.62 : 0.5, 0.62, s) * A;
    const raio = mistura(Math.min(L, A) * (pequeno ? 0.42 : 0.44), Math.min(L, A) * (pequeno ? 0.3 : 0.26), s);
    // Qual forma a seção na tela pede; os pesos andam até ela aos poucos (parado: na hora)
    const alvo = formaDaSecao();
    const k = dt ? 1 - Math.exp(-dt * 2.6) : 1;
    for (const f of FORMAS) peso[f] += ((f === alvo ? 1 : 0) - peso[f]) * k;
    const calma = Math.max(peso.pipeline, peso.estrela);
    // O pipeline vem mais para o meio, para as três colunas caberem; a estrela fica com o centro (você) na margem direita
    const cx = (cxSolto * peso.globo + (pequeno ? 0.5 : 0.8) * peso.pipeline + (pequeno ? 0.9 : 0.95) * peso.estrela) * L;
    // Pipeline e estrela aparecem um pouco mais, para dar para ler a forma
    const opacidade = mistura(pequeno ? 0.5 : 0.75, pequeno ? 0.22 : 0.32, s) * (1 + calma * 0.45);

    for (const n of nos) {
      n.x = n.y = n.z = 0;
      for (const f of FORMAS) { n.x += n.alvo[f].x * peso[f]; n.y += n.alvo[f].y * peso[f]; n.z += n.alvo[f].z * peso[f]; }
    }

    giro += dt * 0.12;
    // Girando livre no globo; quase de frente no pipeline e na estrela (ângulo normalizado para não dar voltas)
    const livre = Math.atan2(Math.sin(giro + scrollY * 0.0009), Math.cos(giro + scrollY * 0.0009));
    const ry = mistura(livre, 0, calma) + mola.x * 0.6;
    const rx = mistura(0.32, 0.1, calma) + mola.y * 0.45;
    const [sy, cyR, sx, cxR] = [Math.sin(ry), Math.cos(ry), Math.sin(rx), Math.cos(rx)];
    const camera = 3.2;

    const proj = nos.map((n) => {
      const x1 = n.x * cyR + n.z * sy;
      const z1 = -n.x * sy + n.z * cyR;
      const y2 = n.y * cxR - z1 * sx;
      const z2 = n.y * sx + z1 * cxR;
      const f = camera / (camera + z2);
      // profundidade: 0 atrás, 1 na frente
      return { x: cx + x1 * raio * f, y: cy + y2 * raio * f, f, p: (1 - z2) / 2 };
    });

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, L, A);
    ctx.globalAlpha = 1;

    // Enlaces de cada forma, na medida do peso dela; mais fortes na frente
    ctx.strokeStyle = cores.linha;
    ctx.lineWidth = 1;
    for (const f of FORMAS) {
      if (peso[f] < 0.02) continue;
      for (const [i, j] of formas[f].enlaces) {
        const a = proj[i], b = proj[j];
        ctx.globalAlpha = opacidade * peso[f] * (0.05 + 0.22 * Math.min(a.p, b.p));
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    // Mouse perto de um nó: ele pinga e solta pacotes
    if (mouse && s < 0.9 && dt) {
      let perto = -1, menor = 70 * 70;
      proj.forEach((q, i) => { const d = (q.x - mouse.x) ** 2 + (q.y - mouse.y) ** 2; if (d < menor && q.p > 0.45) { menor = d; perto = i; } });
      const agora = performance.now();
      if (perto >= 0 && agora - ultimoPingMouse > 260) {
        ultimoPingMouse = agora;
        nos[perto].ping = 1;
        novoPacote(perto);
      }
    }

    // Nós: círculos; switches são quadrados, como os nós da rota no topo da página
    nos.forEach((n, i) => {
      const q = proj[i];
      const tam = (n.switch ? 3.4 : 2.1) * q.f * (0.7 + q.p * 0.6);
      ctx.globalAlpha = opacidade * (0.18 + 0.7 * q.p);
      ctx.fillStyle = n.switch || n.ping > 0.5 ? cores.acento : cores.linha;
      if (n.switch) ctx.fillRect(q.x - tam, q.y - tam, tam * 2, tam * 2);
      else { ctx.beginPath(); ctx.arc(q.x, q.y, tam, 0, Math.PI * 2); ctx.fill(); }
      if (n.ping > 0) {
        ctx.globalAlpha = opacidade * n.ping * 0.8;
        ctx.strokeStyle = cores.acento;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(q.x, q.y, tam + (1 - n.ping) * 18, 0, Math.PI * 2);
        ctx.stroke();
        n.ping = Math.max(0, n.ping - dt * 1.8);
      }
    });

    // Pacotes: um ponto com rastro curto ao longo do enlace
    for (const p of pacotes) {
      const a = proj[p.de], b = proj[p.para];
      const t = Math.min(1, p.t);
      const x = mistura(a.x, b.x, t), y = mistura(a.y, b.y, t);
      const prof = mistura(a.p, b.p, t);
      const cor = p.barrado ? cores.coral : cores.acento;
      ctx.globalAlpha = opacidade * (0.35 + 0.65 * prof) * p.some;
      ctx.strokeStyle = cor;
      ctx.lineWidth = 2 * mistura(a.f, b.f, t);
      ctx.beginPath();
      const t0 = Math.max(0, t - 0.22);
      ctx.moveTo(mistura(a.x, b.x, t0), mistura(a.y, b.y, t0));
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.fillStyle = cor;
      ctx.beginPath();
      ctx.arc(x, y, (p.barrado ? 4 : 2.8) * mistura(a.f, b.f, t), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  /* ---------- Laço de animação ---------- */

  let anterior = 0;
  let rodando = false;
  function quadro(agora) {
    const dt = Math.min(0.05, (agora - anterior) / 1000 || 0);
    anterior = agora;
    // Mola amortecida
    mola.vx = (mola.vx + (mola.alvoX - mola.x) * 0.04) * 0.86;
    mola.vy = (mola.vy + (mola.alvoY - mola.y) * 0.04) * 0.86;
    mola.x += mola.vx;
    mola.y += mola.vy;
    andarPacotes(dt);
    desenhar(dt);
    if (rodando) requestAnimationFrame(quadro);
  }

  function iniciar() {
    if (parado()) { rodando = false; andarPacotes(0); desenhar(0); return; }
    if (rodando) return;
    rodando = true;
    anterior = performance.now();
    requestAnimationFrame(quadro);
  }

  window.addEventListener("resize", () => { medir(); if (parado()) desenhar(0); });
  // Parado, a rolagem ainda muda onde o globo fica
  window.addEventListener("scroll", () => { if (parado()) desenhar(0); }, { passive: true });
  movimentoReduzido.addEventListener?.("change", () => { rodando = false; iniciar(); });

  lerCores();
  medir();
  iniciar();
})();
