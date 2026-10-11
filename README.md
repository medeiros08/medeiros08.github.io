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
