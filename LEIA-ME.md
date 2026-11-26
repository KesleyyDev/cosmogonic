# Cosmogonic: módulos para levar ao protótipo

Cada módulo funciona sozinho. `site-completo-referencia.html` serve pra consultar como as peças se encaixam.

## 1. Fundo: nascimento da estrela (`fundo-estrela.js`)
Nebulosa → colapso → protoestrela com disco e jatos → ignição → estrela âmbar → a poeira forma um planeta com fases de luz reais.

Precisa de:
- `<canvas id="sky"></canvas>`, fixo atrás de tudo:
  `#sky{position:fixed;inset:0;width:100%;height:100%;z-index:0;opacity:0;transition:opacity 1.2s ease}` e `#sky.on{opacity:1}`; o script coloca a classe `on` sozinho, pro fundo entrar suave.
- `<div class="bar" id="bar" aria-hidden="true"></div>`, a barra de progresso do scroll. Se não quiser a barra, apague a linha `document.getElementById('bar')...` em `onScroll`.
- O conteúdo com `position:relative;z-index:1`, por cima do canvas.

Pontos que dá pra ajustar:
- **Posição da estrela:** `X`/`Y` em `frame()`. No PC fica à direita (`W*.68`), no celular no alto (`H*.27`).
- **Momento de cada etapa no scroll:** os valores `sm(a,b,p)` logo no começo de `frame()`, onde `p` vai de 0 (topo) a 1 (fim).
- **Cores da estrela:** `SURF` (superfície), `RAY` (raios) e os `radial(...)` do bloco `/* a estrela */`.
- Com "reduzir movimento" ligado no sistema, a animação para e o fundo só acompanha o scroll.
- Em aparelho fraco, o modo `lite` corta partículas sozinho.

## 2. Abertura (`abertura.js` + `abertura-dados.json`)
O C cresce, as letras "osmogonic" orbitam, se juntam no wordmark e a barra carrega em 2 s.
- No `abertura.js`, troque `__DATA__` pelo conteúdo de `abertura-dados.json`, que tem os desenhos de cada letra e do C.
- Precisa de: `<div id="intro" hidden><canvas aria-hidden="true"></canvas></div>`
- Roda uma vez por sessão (`sessionStorage`, chave `cg-intro`). O botão `#replay` ("Rever abertura") é opcional.
- Esc, espaço ou Enter pulam a abertura.

## 3. Header que compacta (`header.html`)
Mostra o "cosmogonic" inteiro no topo. Depois de 80 px de scroll, as letras se espremem no c e ele vira o símbolo com órbita.
- Tem CSS + HTML + JS. A cor do wordmark vem de `var(--ink)`.

## Paleta
Noite `#0B0D12` · ardósia `#151923` / `#2A3550` · creme `#F2EDE3` · âmbar `#E8A33D` · âmbar escuro `#C9861F`
