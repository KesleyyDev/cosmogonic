# Cosmogonic AI: site institucional

## O que é
Site da Cosmogonic AI, empresa digital B2B de Kesley Doles (Sorocaba/SP). Faz sites, sistemas, automações com IA, marketing e consultoria, e quer vender também para fora do Brasil.
- Domínio: cosmogonic.space
- Contato: kesleyydev@gmail.com · WhatsApp +55 (15) 99722-9580
- Idiomas: PT (padrão) e EN, com troca no header

## Conceito
Cosmogonia é a criação do universo. A empresa pega o que está espalhado no negócio do cliente e organiza até virar um mundo que funciona. Por isso o site segue a linha do tempo de uma estrela nascendo: nebulosa → colapso → protoestrela → ignição → estrela. No fim, a poeira forma um planeta.

## Identidade (não mudar sem pedir)
- Cores:
  - noite `#0B0D12` (fundo)
  - creme `#F2EDE3` (texto)
  - âmbar `#E8A33D` (destaque, a "estrela")
  - ardósia `#2A3550` / `#151923`
  - cinza de apoio `#B3AEA4`
- Fontes:
  - **Fraunces** (serifada) para títulos, sempre com `opsz` 72: no tamanho de pôster (144) o traço do "e" some
  - **Sora** para texto e interface
- Logo:
  - o "C" com anel em órbita e uma lua âmbar
  - wordmark "cosmogonic" com o pingo do i em âmbar
  - "AI" é descritor, pequeno

## Peças já prontas, para reaproveitar
- `fundo-estrela.js`: canvas fixo de fundo guiado pelo scroll (detalhes no LEIA-ME.md)
- `abertura.js` + `abertura-dados.json`: animação de abertura
- `header.html`: o wordmark compacta no C ao rolar
- `site-completo-referencia.html`: protótipo antigo. **Use só como referência das peças acima.** A estrutura e os textos dele estão genéricos demais e vão ser refeitos.

## Regras para o novo protótipo
- **Fugir da "cara de IA"**:
  - nada de cards para todo conteúdo
  - nada de gradiente roxo/azul nem efeito de vidro
  - nada de frases vagas ("soluções inovadoras")
  - nada de layout de template
- Textos específicos e concretos: o que é feito, para quem, com que resultado.
- **Acessibilidade**:
  - responsivo (celular e PC)
  - navegação por teclado com foco visível
  - respeitar `prefers-reduced-motion`
  - estados de carregando, vazio, sucesso e erro no formulário
- Testar no navegador em tamanho de celular e de PC antes de dar como pronto.
