---
target: site/index.html
total_score: 26
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 3
target_identity: "file:/home/kesleyydev/Desktop/cosmogonic/cosmogonic/site/index.html"
target_fingerprint: "sha256:589ee93d0aa70fbbdc33cab2affc98f4d03bbd3a185b5dc574fbb8b37af120e6"
target_path: /home/kesleyydev/Desktop/cosmogonic/cosmogonic/site/index.html
timestamp: 2026-11-26T04-37-06Z
slug: site-index-html
---
⚠️ DEGRADED: single-context (regra de orçamento: sem subagentes sem pedido)

## Nota de saúde: 26/32 (Bom, 81%). n/a: 7, 10 (Persuade)
1 Visibilidade 3 · 2 Mundo real 4 · 3 Controle 3 · 4 Consistência 3 · 5 Prevenção 3 · 6 Reconhecimento 3 · 7 n/a · 8 Estética 3 · 9 Recuperação 4 · 10 n/a

## Especificidade
Autoral: narrativa nebulosa→estrela estrutural, serviços como linhas tipográficas com exemplo concreto. Trabalhos é o trecho com cara de template. Detector CLI: 1 aviso (Fraunces overused) = falso positivo, fonte fixada pela marca. Overlay: nenhum anti-pattern.

## Problemas prioritários
- [P0] Contato não chega a ninguém: CONFIG vazio em site.js; wa.me/ sem número; texto promete "abre o WhatsApp da Cosmogonic"; canais "a definir". → harden
- [P1] Prova vem por último e vazia: Trabalhos a ~69-72% da página, dois cards idênticos sem nome/link/imagem. → layout
- [P1] Domínio errado nos metadados: canonical/og/hreflang/rodapé em cosmogonicai.com, deploy em cosmogonic.space; og:image quebra no cartão do WhatsApp. → harden
- [P1] Celular: ponto da estrela cobre o H2 do "Antes" em 375px. → adapt
- [P2] Hero com 8 ações competindo com o H1 (7 serviços + "Ver o que cada serviço inclui"). → layout

## Personas
Dono vindo do rodapé: não acha o site que viu; botão final abre seletor de contato vazio. Jordan: 7 opções sem hierarquia; promessa do WhatsApp quebrada. Casey: página com ~14 telas; título do Antes some sob a estrela. Riley: caminho feliz termina em wa.me/ sem número.

## Menores
Prévia da mensagem em monoespaçada; "Pedro Maciel" em âmbar fora da regra; frases do Antes pequenas/fracas no desktop; área clicável do logo compacto maior que o C.

## Perguntas
Prova = o próprio site enquanto não há trabalhos? Hero precisa de 7 escolhas? Página reordenada para quem chega por ?de=?
