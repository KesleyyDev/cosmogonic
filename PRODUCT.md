# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegado, com o pedido de "o mais leve possível": **HTML, CSS e JS estáticos, sem framework e sem build.** As peças prontas (`fundo-estrela.js`, `abertura.js`, `header.html`) já são JS puro e entram direto. O site pode ser hospedado em qualquer host estático. O domínio planejado é cosmogonicai.com, e o host ainda não foi escolhido.

## Users

Os donos e gestores de pequenas e médias empresas de serviço. Em ordem de foco:

1. PMEs locais de Sorocaba e região
2. PMEs de qualquer lugar do Brasil, atendidas a distância
3. Empresas de fora do Brasil, atendidas em inglês

A situação típica: a operação roda em WhatsApp pessoal, planilhas soltas e um site que ninguém atualiza. Quem visita quer saber se a Cosmogonic resolve o problema dela e se dá pra confiar.

## Product Purpose

É o site-portfólio da Cosmogonic AI, uma empresa digital B2B de dois sócios, Kesley Doles e Pedro Maciel (Sorocaba/SP). O site fala como empresa ("nós"), não como uma pessoa só. Ela faz sites, sistemas, automações com IA, marketing e consultoria.

O site existe principalmente como destino. Os sites entregues para clientes vão ter um crédito no rodapé ("feito por Cosmogonic"), e quem clica nele chega aqui.

O sucesso do site é esse visitante sair convencido de duas coisas:

- o trabalho que ele acabou de ver é da Cosmogonic;
- dá pra contratar o mesmo para a empresa dele.

Na prática, sucesso é ele abrir uma conversa pelo WhatsApp ou por e-mail.

## Positioning

*Confirmado com o Kesley em 2026-11-25.*

- O cliente fala direto com quem constrói, sem intermediário.
- Primeiro vem o entendimento da operação, depois a proposta.
- A entrega é em partes, rápidas, e o cliente vê cada uma funcionando.

Não prometer plano por escrito nem acompanhamento contínuo depois da entrega: nenhum dos dois é prática atual. Os projetos até agora foram sites simples com um sistema básico. O ritmo de entrega dos primeiros clientes é temporário e não vai para o site (ver "Fora do site por decisão").

O conceito de marca é a cosmogonia: pegar o que está espalhado no negócio e organizar até virar um sistema que funciona.

## Operating Context

- **Por onde o visitante chega:** sobretudo pelo link no rodapé dos sites de clientes, ou seja, logo depois de ver um trabalho real. Também pode chegar por indicação direta ou pelo cartão do WhatsApp.
- **Como o contato acontece:** o formulário do protótipo antigo não tem backend. Ele monta a mensagem e abre o WhatsApp com o texto pronto, com opção de copiar. O e-mail e o WhatsApp aparecem por escrito como alternativa.
- **Contato:** kesleyydev@gmail.com · WhatsApp +55 (15) 99722-9580.
- **Idiomas:** PT (padrão) e EN, com troca no header. Hoje a troca é feita no cliente, via atributo `data-i`.

## Capabilities and Constraints

- **Serviços:** sites, sistemas (painéis, agendas, cadastros), automação, assistentes com IA, marketing medido e consultoria.
- **Peças obrigatórias a reaproveitar:**
  - fundo de canvas guiado pelo scroll (nebulosa → estrela → planeta);
  - abertura animada do wordmark (uma vez por sessão, dá pra pular com Esc, espaço ou Enter);
  - header em que o wordmark compacta no "C".
- **Sem backend.** Tudo que precisar de servidor fica fora do escopo, a menos que seja pedido.
- **Fora do site por decisão (por enquanto):** preços, faixas de preço e prazos. Não mostrar nem sugerir valores.
- **Em aberto:**
  - escopo exato de cada serviço;
  - se cada projeto do portfólio vai ter página própria (case) ou só uma entrada na lista.

## Brand Commitments

- **Nome:** Cosmogonic AI. "AI" é descritor e aparece pequeno.
- **Logo:** o "C" com anel em órbita e uma lua âmbar. O wordmark é "cosmogonic", com o pingo do i em âmbar.
- **Cores e fontes** já estão fixadas no CLAUDE.md e não mudam sem pedido.
- **Voz:** textos concretos que dizem o que é feito, para quem e com que resultado.
- **Proibido:**
  - frases vagas ("soluções inovadoras");
  - cards para todo conteúdo;
  - gradiente roxo/azul e efeito de vidro;
  - layout de template.
- **Fonte das peças:** o protótipo `site-completo-referencia.html` serve só como referência das peças. A estrutura e os textos dele vão ser descartados.

## Evidence on Hand

- **Em andamento:** 2 sites de clientes, já prontos, só falta a entrega. Entram no portfólio depois de entregues. Até lá, o portfólio fica com 2 espaços reservados (nome, link, imagem e o que mudou para o cliente).
- **Não existe ainda:**
  - depoimentos;
  - números de resultado;
  - logos de clientes;
  - imprensa.

  Nada disso pode ser inventado. Onde faltar, o site usa um espaço reservado bem marcado.
- **Ativos que já existem:**
  - desenhos vetoriais do wordmark e do C (`abertura-dados.json` e `header.html`);
  - sem fotos dos sócios por decisão: o site não mostra rostos.

## Product Principles

1. **O trabalho é a prova.** O portfólio vem antes do discurso. Quem chega pelo rodapé de um cliente precisa reconhecer aquele trabalho e ver os outros logo de cara.
2. **Específico ou nada.** Cada frase diz o que foi feito, para quem e o que mudou. O que não dá pra afirmar com verdade fica de fora.
3. **Contato direto com quem constrói.** O caminho até falar com os sócios é curto e visível, em qualquer tela.
4. **Leve por padrão.** É um site estático e rápido. A animação é enfeite opcional e nunca bloqueia o conteúdo nem o contato.
5. **Bilíngue de verdade.** O EN é escrito para cliente de fora, não traduzido palavra por palavra.

## Accessibility & Inclusion

- Responsivo, de celular a PC.
- Navegação completa por teclado, com foco visível.
- Respeitar `prefers-reduced-motion`. A abertura e o fundo já fazem isso.
- O formulário tem estados de carregando, vazio, sucesso e erro.
- Testar em tamanho de celular e de PC antes de dar como pronto.
