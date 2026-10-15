# Portfólio

Site pessoal estático (HTML, CSS e JavaScript, sem build), inspirado em [tucelos.github.io](https://tucelos.github.io/).

## Como editar

Todo o conteúdo fica em **`js/dados.js`**. Os outros arquivos não precisam ser mexidos.

- Troque tudo que está marcado com ✏️.
- Textos aceitam só português (`"Olá"`) ou os dois idiomas (`{ pt: "Olá", en: "Hello" }`).
- Lista vazia (`[]`) esconde a seção inteira.
- A foto do topo fica em `img/foto.jpg`, num quadro estilo polaroide. Ajuste o enquadramento com `fotoPosicao`.
- O terminal da página lê os mesmos dados: não precisa editar nada nele.
- A versão em inglês fica em `en/index.html` e usa os mesmos dados (os textos `{ pt, en }`).
- `trilhaSonora` (link do Spotify) e `formulario` (código do Formspree) ficam escondidos enquanto estiverem vazios.
- O site abre no tema escuro. Para abrir no claro, troque `data-theme="dark"` por `data-theme="light"` na primeira linha do `index.html`.
- `habilidades`: grupos de linguagens e ferramentas. `onde` diz onde você usou cada uma, e `aprendendo: true` marca o que está aprendendo.
- `livroDeVisitas`: os recados ficam nas Discussions do repositório (giscus). Desligue com `ligado: false`.
- O botão de paleta (bolinha no menu) abre **Cores e temas**: as 4 cores de destaque do site e 10 temas completos do [theme-factory](https://github.com/anthropics/skills/tree/main/skills/theme-factory), que trocam cores, fontes e a forma do site (cantos, bordas, sombras, inclinações e fundo). Os temas ficam em `js/temas.js`, que o site e a página 404 usam.
- O visual com que o site abre fica em `estilo` no `dados.js` (hoje `"tech"`; `"cor-0"` volta ao lilás original).
- O jogo "Seja o firewall" fica em `js/firewall.js`. Para esconder a seção, ponha `firewall: false` em `dados.js`.

## Páginas internas

- **Estudo de caso** do Código Mirim: `projetos/codigo-mirim/` (inglês em `en/projects/codigo-mirim/`). No cartão do projeto, o campo `estudo` aponta para essa página.
- **Notas**: cada nota tem uma pasta em `notas/<slug>/` (inglês em `en/notes/<slug>/`). Para criar uma, copie a pasta de uma nota, troque o texto e os endereços do `<head>`, e acrescente a nota na lista `notas` do `dados.js`. Depois, inclua os dois endereços no `sitemap.xml`.
- Essas páginas têm o texto no próprio HTML (melhor para o Google). O menu, o rodapé e os botões vêm do `js/app.js`.

## Fontes e imagens

- As fontes (Bricolage Grotesque e JetBrains Mono, licença OFL) ficam em `fontes/`, sem depender do Google Fonts.
- A foto tem versões mais leves em `img/foto.avif` e `img/foto.webp`. Se trocar a foto sem gerar essas versões, ponha `fotoLeve: false` em `dados.js`.

## Atalhos

- **Ctrl K** (ou **/**) abre a busca rápida: seções, notas, ações e links.
- No terminal, `firewall`, `notas` e `habilidades` também funcionam.

## Como ver no computador

Abrir o `index.html` direto funciona na maioria dos navegadores. Se algo não carregar, rode na pasta do projeto:

```bash
python -m http.server 8080
```

e acesse http://localhost:8080.

## Como publicar no GitHub Pages

1. Crie um repositório chamado `SEU-USUARIO.github.io`.
2. Envie todos os arquivos desta pasta para ele.
3. Em **Settings → Pages**, escolha a branch `main` e a pasta `/ (root)`.
4. Em alguns minutos o site fica no ar em `https://SEU-USUARIO.github.io`.

## Depois de mudar o CSS ou o JS

Os arquivos são carregados com `?v=...` no fim do endereço (em todos os `.html`). Ao mudar `css/estilo.css` ou algum `js/*.js`, troque esse número em todos os `.html` para o navegador de quem já visitou baixar a versão nova.
