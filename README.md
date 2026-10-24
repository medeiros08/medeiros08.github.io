# Portfólio

Site pessoal estático (HTML, CSS e JavaScript, sem build).

## Como editar

Todo o conteúdo fica em **`js/dados.js`**. Os outros arquivos não precisam ser mexidos.

- Textos aceitam só português (`"Olá"`) ou os dois idiomas (`{ pt: "Olá", en: "Hello" }`).
- Lista vazia (`[]`) esconde a seção inteira.
- Só entra o que é trabalho meu. Na dúvida, confira os commits no GitHub.
- A versão em inglês fica em `en/index.html` e usa os mesmos dados (os textos `{ pt, en }`).

O que cada parte de `dados.js` mostra na página inicial:

- `topo` e `folha`: o painel com o nome e a folha de contato de telas em volta. Cada série da `folha` é um trabalho; cada quadro é uma tela (`"cel"` em pé, `"tela"` deitada).
- `gamificapampa`: o mosaico com a tela do hub e os números, a estante com os jogos (o filtro de idade usa `idade: [de, até]`) e os materiais para professores.
- `projetos` e `notas`: as linhas de "Mais trabalho".
- `sobre`: fatos, parágrafo, trajetória e ferramentas.
- `contato` e `formulario` (código do Formspree; vazio esconde o formulário).

O site abre no tema claro de dia e no escuro de noite (horário de Alegrete), e o botão de meia-lua troca.

## Páginas internas

- **Estudo de caso** do GamificaPampa: `projetos/gamificapampa/` (inglês em `en/projects/gamificapampa/`).
- **Notas**: cada nota tem uma pasta em `notas/<slug>/` (inglês em `en/notes/<slug>/`). Para criar uma, copie a pasta de uma nota, troque o texto e os endereços do `<head>`, e acrescente a nota na lista `notas` do `dados.js`. Depois, inclua os dois endereços no `sitemap.xml`.
- Essas páginas têm o texto no próprio HTML (melhor para o Google). O menu e o rodapé vêm do `js/site.js`.

## Terminal

O link **Terminal** no rodapé (ou o endereço `#terminal`) abre um terminal com `ajuda`, `sobre`, `jogos`, `projetos`, `contato`, `cd <seção>` e o desafio `ctf`.

## Fontes e imagens

- As fontes (Schibsted Grotesk e JetBrains Mono, licença OFL) ficam em `fontes/`, sem depender do Google Fonts.
- As telas ficam em `img/gp/` (GamificaPampa), `img/expresso/` e `img/sites/`, em WebP.
- A foto tem versões mais leves em `img/foto.avif` e `img/foto.webp`. Se trocar a foto sem gerar essas versões, ponha `fotoLeve: false` em `dados.js`.

## Como ver no computador

Rode na pasta do projeto:

```bash
python -m http.server 8080
```

e acesse http://localhost:8080.

## Depois de mudar o CSS ou o JS

Os arquivos são carregados com `?v=...` no fim do endereço (em todos os `.html`). Ao mudar `css/site.css` ou algum `js/*.js`, troque esse número em todos os `.html` para o navegador de quem já visitou baixar a versão nova.
