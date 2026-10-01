# Checklist da UR (Unidade de Resgate) 🚑

Aplicação Next.js com TypeScript e Tailwind CSS desenvolvida para a conferência rápida, precisa e moderna dos materiais, medicamentos e equipamentos de uma Unidade de Resgate (UR).

LINK: [https://leandrohee.github.io/checklist_ur/](https://leandrohee.github.io/checklist_ur/)

---

## ✨ Características do Projeto

- **Arquitetura Modular e Limpa**: Cada função, hook e componente possui arquivo dedicado de responsabilidade única.
- **Categorias e Itens em Arquivos JSON**: Cada compartimento ou bolsa possui seu próprio arquivo `.json` em [`src/data/categories/`](file:///Users/leandrotorres/Documents/Leandro/checklist_ur/src/data/categories/), facilitando a edição ou adição de materiais por qualquer membro da equipe.
- **Suporte a Subcategorias**: Bolsas divididas por bolsos (ex: *Bolsa de Trauma* e *Bolsa de Clínico*) organizadas em subseções com contadores independentes.
- **Persistência Local (LocalStorage)**: A conferência permanece salva mesmo se a página for recarregada ou o navegador fechado.
- **Busca em Tempo Real e Filtros**: Campo de busca inteligente e filtros por status (*Todos*, *Pendentes* e *Conferidos*).
- **Relatório de Faltas e Impressão**: Modal com visualização rápida dos materiais em falta, botão de cópia de texto para WhatsApp/comunicação e atalho para impressão.
- **Compatível com GitHub Pages**: Configurado com `output: "export"` gerando arquivos 100% estáticos na pasta `out/`, acompanhado de pipeline modular no GitHub Actions dividido em 3 arquivos: `main.yml`, `build.yml` e `deploy.yml`.

---

## 📁 Estrutura de Arquivos

```text
src/
├── app/
│   ├── globals.css                # Estilos globais Tailwind CSS
│   ├── layout.tsx                 # Metadados e layout raiz em pt-BR
│   └── page.tsx                   # Página principal orquestrada
├── types/
│   └── checklist.ts               # Tipos TypeScript (Item, Categoria, Progresso, etc.)
├── data/
│   └── categories/                # 1 ARQUIVO JSON PARA CADA CATEGORIA
│       ├── 01-bolsa-de-trauma.json
│       ├── 02-bolsa-de-clinico.json
│       ├── 03-maleta-de-sinais-vitais.json
│       ├── 04-bolsa-o2.json
│       ├── 05-balcao-da-ur.json
│       ├── 06-gaveta-1.json
│       ├── 07-gaveta-2.json
│       ├── 08-compartimento-superior-aberto.json
│       ├── 09-compartimento-superior-fechado.json
│       ├── 10-compartimento-embaixo-banco.json
│       └── index.ts               # Agregador ordenado das categorias
├── services/
│   ├── checklist/
│   │   ├── getItemList.ts         # Extrai lista plana de itens da categoria
│   │   ├── getAllCategoryItems.ts # Extrai todos os itens de todas as categorias
│   │   ├── calculateCategoryProgress.ts # Calcula porcentagem e conferidos por categoria
│   │   ├── calculateOverallProgress.ts  # Calcula estatísticas gerais da viatura
│   │   └── filterChecklist.ts     # Filtra por texto de busca e status
│   └── storage/
│       ├── loadChecklistState.ts  # Leitura segura do LocalStorage
│       ├── saveChecklistState.ts  # Gravação com notificação de evento
│       └── clearChecklistState.ts # Limpeza da conferência
├── hooks/
│   ├── useChecklistState.ts       # Hook de estado reativo e persistência (useSyncExternalStore)
│   ├── useChecklistFilter.ts      # Hook para busca e filtros de status
│   └── useExpandedCategories.ts   # Hook para controle de abertura dos acordeões
├── utils/
│   ├── getCategoryIcon.tsx        # Mapeamento dinâmico de ícones Lucide
│   └── formatReportText.ts        # Formatador de relatório textual da viatura
└── components/
    ├── common/
    │   ├── Badge.tsx              # Tag visual de quantidade e status
    │   └── Checkbox.tsx           # Checkbox acessível e tátil
    ├── header/
    │   ├── Header.tsx             # Cabeçalho da Unidade de Resgate
    │   ├── ProgressBar.tsx        # Barra de progresso dinâmica
    │   └── OverallProgressCard.tsx# Painel de resumo geral e pendências
    ├── filter/
    │   ├── SearchInput.tsx        # Campo de busca por material
    │   ├── FilterTabs.tsx         # Abas Todos / Pendentes / Conferidos
    │   ├── ActionButtons.tsx      # Botões de lote (Marcar Todos, Reiniciar, Relatório)
    │   └── FilterBar.tsx          # Barra integradora de busca e filtros
    ├── category/
    │   ├── ChecklistItemRow.tsx   # Linha de item com checkbox e quantidade
    │   ├── SubcategorySection.tsx # Seção de bolso/subcategoria
    │   ├── CategoryHeader.tsx     # Cabeçalho do cartão com progresso e ações
    │   ├── CategoryCard.tsx       # Cartão acordeão da categoria
    │   └── CategoryList.tsx       # Lista de categorias com tratamento de busca vazia
    └── modals/
        ├── MissingItemsModal.tsx  # Modal com lista de pendências e cópia de relatório
        └── ConfirmResetModal.tsx  # Modal de confirmação para reiniciar
```

---

## 🚑 Como Atualizar Categorias e Itens

Para adicionar, remover ou alterar itens ou quantidades, basta abrir o arquivo JSON correspondente dentro de `src/data/categories/`:

### Categoria com Subcategorias (ex: Bolsos)
```json
{
  "id": "bolsa-de-trauma",
  "title": "BOLSA DE TRAUMA",
  "icon": "ShieldAlert",
  "subcategories": [
    {
      "id": "bt-bolso-externo-laranjado",
      "title": "BOLSO EXTERNO LARANJADO",
      "items": [
        {
          "id": "bt-colar-adulto",
          "name": "COLAR CERVICAL REGULÁVEL ADULTO",
          "quantity": 1
        }
      ]
    }
  ]
}
```

### Categoria Direta (sem bolsos/subdivisões)
```json
{
  "id": "gaveta-1",
  "title": "GAVETA 1",
  "icon": "Archive",
  "items": [
    {
      "id": "gav1-gaze-esteril",
      "name": "GAZE ESTÉRIL",
      "quantity": 10
    }
  ]
}
```

---

## 🚀 Como Executar o Projeto Localmente

1. **Instalar dependências** (caso ainda não tenha feito):
   ```bash
   npm install
   ```

2. **Iniciar servidor de desenvolvimento**:
   ```bash
   npm run start:dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 📦 Como Publicar no GitHub Pages

O projeto já inclui o arquivo de workflow automatizado em `.github/workflows/deploy.yml`.

### Passos no GitHub:
1. Suba o código para o seu repositório no GitHub (`git push origin main`).
2. No repositório no GitHub, acesse a aba **Settings** > **Pages**.
3. Em **Build and deployment** > **Source**, selecione **GitHub Actions**.
4. O workflow será acionado automaticamente a cada commit na branch `main`, publicando a aplicação estática no endereço do seu GitHub Pages!

Para gerar a pasta estática manualmente:
```bash
npm run build
```
A pasta `out/` conterá todo o site estático pronto para publicação.
