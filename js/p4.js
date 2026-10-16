/* "Por dentro de um switch P4": a pesquisa em forma de coisa para mexer.
   Primeiro uma história guiada pela rolagem: a seção fica parada enquanto um pacote atravessa
   parser → match-action → deparser. Depois um simulador: o visitante monta um pacote e vê quais
   regras ele casa (ACL de segurança e a tabela ipv4_lpm, com o prefixo mais longo vencendo).
   O app.js chama LabP4.montar(elemento, { idioma, registrarEvento }). */
(function () {
  "use strict";

  const TEXTOS = {
    pt: {
      etapas: [
        ["Parser", "lê os cabeçalhos"],
        ["Match-action", "consulta as tabelas"],
        ["Deparser", "remonta e envia"],
      ],
      legendas: [
        "O pacote chega e o <b>parser</b> separa os cabeçalhos: Ethernet, IPv4 e TCP. Agora o switch sabe para onde ele quer ir: <b>10.0.2.7</b>, porta <b>443</b>.",
        "No <b>match-action</b>, a tabela <b>ipv4_lpm</b> procura o destino. A regra <b>10.0.2.0/24</b> casa, e a ação dela é: encaminhar pela porta 2.",
        "O <b>deparser</b> junta os cabeçalhos de novo e o pacote sai pela <b>porta 2</b>. Tudo isso escrito em P4, direto no equipamento de rede.",
      ],
      rolar: "Role para o pacote andar",
      saida: "porta 2",
      simTitulo: "Agora monte o seu pacote",
      simSub: "Escolha de onde ele vem e para onde vai. O switch passa o pacote pela lista de segurança (ACL) e depois pela tabela de rotas.",
      origem: "Origem", deDentro: "de dentro da rede", daInternet: "da internet",
      destino: "IP de destino", protocolo: "Protocolo", porta: "Porta",
      enviar: "Enviar pacote",
      exemplos: "Exemplos:",
      presets: [
        ["Site interno", { origem: "internet", ip: "10.0.2.7", proto: "TCP", porta: 443 }],
        ["SSH de fora", { origem: "internet", ip: "10.0.1.20", proto: "TCP", porta: 22 }],
        ["DNS", { origem: "dentro", ip: "10.0.1.53", proto: "UDP", porta: 53 }],
        ["Fora da rede", { origem: "dentro", ip: "8.8.8.8", proto: "UDP", porta: 53 }],
      ],
      tabelaAcl: "Tabela acl (segurança)", tabelaLpm: "Tabela ipv4_lpm (rotas)",
      colOrigem: "Origem", colProto: "Proto", colPorta: "Porta", colAcao: "Ação", colPrefixo: "Prefixo",
      internet: "internet", qualquer: "qualquer",
      drop: "descartar", seguir: "seguir",
      portaN: (n) => `porta ${n}`,
      nomesRede: ["laboratório", "servidores", "universidade"],
      padrao: "padrão",
      log: {
        parserOk: (ip, proto, porta) => `parser    ipv4.dst=${ip}  ${proto.toLowerCase()}.dport=${porta}`,
        parserRuim: "parser    endereço IPv4 inválido: o pacote é descartado logo na entrada",
        aclDrop: (motivo) => `acl       casou: ${motivo} → descartar`,
        aclOk: "acl       nenhuma regra de bloqueio casou → seguir",
        lpmCasa: (prefixo, extra) => `ipv4_lpm  casou ${prefixo}${extra}`,
        lpmPerde: (outros) => ` (também casa ${outros}, mas o prefixo mais longo vence)`,
        lpmNada: "ipv4_lpm  nenhum prefixo casou → ação padrão: descartar",
        saiu: (n) => `deparser  pacote remontado, saiu pela porta ${n}`,
        descartado: "resultado pacote descartado",
      },
      motivos: { 22: "SSH vindo da internet", 23: "Telnet vindo da internet" },
      portaInvalida: "A porta vai de 0 a 65535.",
    },
    en: {
      etapas: [
        ["Parser", "reads the headers"],
        ["Match-action", "looks up the tables"],
        ["Deparser", "rebuilds and sends"],
      ],
      legendas: [
        "The packet arrives and the <b>parser</b> splits its headers: Ethernet, IPv4 and TCP. Now the switch knows where it wants to go: <b>10.0.2.7</b>, port <b>443</b>.",
        "In <b>match-action</b>, the <b>ipv4_lpm</b> table looks up the destination. The <b>10.0.2.0/24</b> rule matches, and its action is: forward through port 2.",
        "The <b>deparser</b> puts the headers back together and the packet leaves through <b>port 2</b>. All of it written in P4, right on the network device.",
      ],
      rolar: "Scroll to move the packet",
      saida: "port 2",
      simTitulo: "Now build your own packet",
      simSub: "Choose where it comes from and where it goes. The switch runs it through the security list (ACL) and then the routing table.",
      origem: "Source", deDentro: "inside the network", daInternet: "from the internet",
      destino: "Destination IP", protocolo: "Protocol", porta: "Port",
      enviar: "Send packet",
      exemplos: "Examples:",
      presets: [
        ["Internal site", { origem: "internet", ip: "10.0.2.7", proto: "TCP", porta: 443 }],
        ["SSH from outside", { origem: "internet", ip: "10.0.1.20", proto: "TCP", porta: 22 }],
        ["DNS", { origem: "dentro", ip: "10.0.1.53", proto: "UDP", porta: 53 }],
        ["Off the network", { origem: "dentro", ip: "8.8.8.8", proto: "UDP", porta: 53 }],
      ],
      tabelaAcl: "acl table (security)", tabelaLpm: "ipv4_lpm table (routes)",
      colOrigem: "Source", colProto: "Proto", colPorta: "Port", colAcao: "Action", colPrefixo: "Prefix",
      internet: "internet", qualquer: "any",
      drop: "drop", seguir: "continue",
      portaN: (n) => `port ${n}`,
      nomesRede: ["lab", "servers", "university"],
      padrao: "default",
      log: {
        parserOk: (ip, proto, porta) => `parser    ipv4.dst=${ip}  ${proto.toLowerCase()}.dport=${porta}`,
        parserRuim: "parser    invalid IPv4 address: the packet is dropped right at the entrance",
        aclDrop: (motivo) => `acl       matched: ${motivo} → drop`,
        aclOk: "acl       no blocking rule matched → continue",
        lpmCasa: (prefixo, extra) => `ipv4_lpm  matched ${prefixo}${extra}`,
        lpmPerde: (outros) => ` (${outros} matches too, but the longest prefix wins)`,
        lpmNada: "ipv4_lpm  no prefix matched → default action: drop",
        saiu: (n) => `deparser  packet rebuilt, left through port ${n}`,
        descartado: "result    packet dropped",
      },
      motivos: { 22: "SSH from the internet", 23: "Telnet from the internet" },
      portaInvalida: "Ports go from 0 to 65535.",
    },
  };

  // As regras que o "switch" do simulador tem instaladas
  const ACL = [
    { origem: "internet", proto: "TCP", porta: 22 },
    { origem: "internet", proto: "TCP", porta: 23 },
  ];
  const LPM = [
    { prefixo: "10.0.1.0", tam: 24, porta: 1 },
    { prefixo: "10.0.2.0", tam: 24, porta: 2 },
    { prefixo: "10.0.0.0", tam: 8, porta: 3 },
  ];

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const calmo = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  const espera = (ms) => new Promise((r) => setTimeout(r, calmo() ? 0 : ms));

  function ipParaNumero(ip) {
    const partes = String(ip).trim().split(".");
    if (partes.length !== 4 || partes.some((p) => !/^\d{1,3}$/.test(p) || Number(p) > 255)) return null;
    return partes.reduce((n, p) => n * 256 + Number(p), 0);
  }
  // Casa quando os primeiros "tam" bits são iguais (divisão em vez de bits: os números passam de 2^31)
  const casaPrefixo = (ipN, regra) => {
    const bloco = 2 ** (32 - regra.tam);
    return Math.floor(ipN / bloco) === Math.floor(ipParaNumero(regra.prefixo) / bloco);
  };

  /* ---------- Montagem ---------- */

  function montar(el, opcoes = {}) {
    if (!el) return;
    const idioma = opcoes.idioma === "en" ? "en" : "pt";
    const T = TEXTOS[idioma];
    const registrar = opcoes.registrarEvento || (() => {});

    el.innerHTML = `
      <div class="p4-historia" data-etapa="0">
        <div class="p4-palco">
          <div class="p4-pipeline" aria-hidden="true" data-ui>
            ${T.etapas.map(([nome, oque], i) => `<div class="p4-etapa" data-n="${i}"><b>${nome}</b><small>${oque}</small></div>`).join("")}
            <div class="p4-trilho">
              <span class="p4-pacote"><i>eth</i><i>ipv4 10.0.2.7</i><i>tcp 443</i></span>
              <span class="p4-saida">${T.saida} →</span>
            </div>
          </div>
          <ol class="p4-legendas">${T.legendas.map((l, i) => `<li data-n="${i}">${l}</li>`).join("")}</ol>
          <p class="p4-rolar" aria-hidden="true">${T.rolar} ↓</p>
        </div>
      </div>

      <div class="p4-sim">
        <h3 class="p4-sim-titulo">${T.simTitulo}</h3>
        <p class="p4-sim-sub">${T.simSub}</p>
        <form class="p4-form" novalidate>
          <label>${T.origem}
            <select name="origem"><option value="internet">${T.daInternet}</option><option value="dentro">${T.deDentro}</option></select>
          </label>
          <label>${T.destino}
            <input name="ip" value="10.0.2.7" inputmode="decimal" autocomplete="off" spellcheck="false" translate="no">
          </label>
          <label>${T.protocolo}
            <select name="proto"><option>TCP</option><option>UDP</option></select>
          </label>
          <label>${T.porta}
            <input name="porta" type="number" min="0" max="65535" value="443" inputmode="numeric">
          </label>
          <button class="botao principal p4-enviar" type="submit">${T.enviar} →</button>
        </form>
        <p class="p4-exemplos"><span>${T.exemplos}</span>${T.presets.map(([nome], i) => `<button type="button" class="atalho" data-p4-exemplo="${i}">${nome}</button>`).join("")}</p>
        <div class="p4-mesa">
          <div class="p4-tabelas">
            <figure data-ui>
              <figcaption translate="no">${T.tabelaAcl}</figcaption>
              <table class="p4-tabela" data-tabela="acl">
                <thead><tr><th>${T.colOrigem}</th><th>${T.colProto}</th><th>${T.colPorta}</th><th>${T.colAcao}</th></tr></thead>
                <tbody>
                  ${ACL.map((r, i) => `<tr data-linha="${i}"><td>${T.internet}</td><td>${r.proto}</td><td>${r.porta}</td><td class="ruim">${T.drop}</td></tr>`).join("")}
                  <tr data-linha="padrao"><td>${T.qualquer}</td><td>*</td><td>*</td><td>${T.seguir}</td></tr>
                </tbody>
              </table>
            </figure>
            <figure data-ui>
              <figcaption translate="no">${T.tabelaLpm}</figcaption>
              <table class="p4-tabela" data-tabela="lpm">
                <thead><tr><th>${T.colPrefixo}</th><th>${T.colAcao}</th></tr></thead>
                <tbody>
                  ${LPM.map((r, i) => `<tr data-linha="${i}"><td translate="no">${r.prefixo}/${r.tam}</td><td>${T.portaN(r.porta)} <small>${T.nomesRede[i]}</small></td></tr>`).join("")}
                  <tr data-linha="padrao"><td>${T.padrao}</td><td class="ruim">${T.drop}</td></tr>
                </tbody>
              </table>
            </figure>
          </div>
          <pre class="p4-log" aria-live="polite" translate="no"><code></code></pre>
        </div>
      </div>`;

    prepararHistoria(el.querySelector(".p4-historia"));
    prepararSimulador(el, T, registrar);
  }

  /* ---------- História guiada pela rolagem ---------- */

  function prepararHistoria(h) {
    if (calmo()) { h.classList.add("estatica"); return; }
    let pendente = false;
    const atualizar = () => {
      pendente = false;
      const r = h.getBoundingClientRect();
      const palco = h.firstElementChild;
      const topo = parseFloat(getComputedStyle(palco).top) || 0;
      const total = r.height - palco.offsetHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, (topo - r.top) / total)) : 0;
      h.style.setProperty("--p", p.toFixed(4));
      h.dataset.etapa = String(Math.min(2, Math.floor(p * 3)));
    };
    const pedir = () => { if (!pendente) { pendente = true; requestAnimationFrame(atualizar); } };
    addEventListener("scroll", pedir, { passive: true });
    addEventListener("resize", pedir);
    atualizar();
  }

  /* ---------- Simulador ---------- */

  function prepararSimulador(el, T, registrar) {
    const form = el.querySelector(".p4-form");
    const log = el.querySelector(".p4-log code");
    const mesa = el.querySelector(".p4-mesa");
    let rodada = 0;

    const limpar = () => el.querySelectorAll(".p4-tabela tr").forEach((tr) => tr.classList.remove("casou", "venceu", "perdeu", "ruim-casou"));
    const escrever = (texto, classe = "") => { log.insertAdjacentHTML("beforeend", `<span class="${classe}">${esc(texto)}</span>\n`); };
    const marcar = (tabela, linha, classe) => el.querySelector(`[data-tabela="${tabela}"] [data-linha="${linha}"]`)?.classList.add(classe);

    async function processar() {
      const minha = ++rodada;
      const dados = Object.fromEntries(new FormData(form));
      const porta = Number(dados.porta);
      limpar();
      log.textContent = "";
      mesa.dataset.resultado = "";
      registrar("p4-pacote", `Simulador P4: ${dados.proto} ${dados.ip}:${dados.porta}`);

      const ipN = ipParaNumero(dados.ip);
      if (ipN === null) { escrever(T.log.parserRuim, "ruim"); mesa.dataset.resultado = "descartado"; window.EfeitosSite?.barrado(); return; }
      if (!Number.isInteger(porta) || porta < 0 || porta > 65535) { escrever(`parser    ${T.portaInvalida}`, "ruim"); mesa.dataset.resultado = "descartado"; window.EfeitosSite?.barrado(); return; }

      escrever(T.log.parserOk(dados.ip.trim(), dados.proto, porta));
      await espera(450); if (minha !== rodada) return;

      // ACL: regras de bloqueio por origem, protocolo e porta
      const bloqueio = ACL.findIndex((r) => r.origem === dados.origem && r.proto === dados.proto && r.porta === porta);
      if (bloqueio >= 0) {
        marcar("acl", bloqueio, "ruim-casou");
        escrever(T.log.aclDrop(T.motivos[porta] || `${dados.proto} ${porta}`), "ruim");
        escrever(T.log.descartado, "ruim");
        mesa.dataset.resultado = "descartado";
        window.EfeitosSite?.barrado();
        return;
      }
      marcar("acl", "padrao", "casou");
      escrever(T.log.aclOk);
      await espera(450); if (minha !== rodada) return;

      // LPM: entre os prefixos que casam, vence o mais longo
      const casam = LPM.map((r, i) => ({ ...r, i })).filter((r) => casaPrefixo(ipN, r)).sort((a, b) => b.tam - a.tam);
      if (!casam.length) {
        marcar("lpm", "padrao", "ruim-casou");
        escrever(T.log.lpmNada, "ruim");
        escrever(T.log.descartado, "ruim");
        mesa.dataset.resultado = "descartado";
        window.EfeitosSite?.barrado();
        return;
      }
      const [vence, ...perdem] = casam;
      perdem.forEach((r) => marcar("lpm", r.i, "perdeu"));
      marcar("lpm", vence.i, "venceu");
      escrever(T.log.lpmCasa(`${vence.prefixo}/${vence.tam}`, perdem.length ? T.log.lpmPerde(perdem.map((r) => `/${r.tam}`).join(", ")) : ""));
      await espera(450); if (minha !== rodada) return;

      escrever(T.log.saiu(vence.porta), "bom");
      mesa.dataset.resultado = "encaminhado";
      window.EfeitosSite?.passou();
    }

    form.addEventListener("submit", (e) => { e.preventDefault(); processar(); });
    el.querySelectorAll("[data-p4-exemplo]").forEach((b) => b.addEventListener("click", () => {
      const [, ex] = T.presets[Number(b.dataset.p4Exemplo)];
      form.origem.value = ex.origem;
      form.ip.value = ex.ip;
      form.proto.value = ex.proto;
      form.porta.value = ex.porta;
      processar();
    }));
    processar();
  }

  window.LabP4 = { montar };
})();
