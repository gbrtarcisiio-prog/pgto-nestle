# Landing Page de Ativação - Nestlé Sorvetes

Este projeto consiste em uma Landing Page de alta conversão, desenvolvida com foco total em **Mobile-First** e seguindo o fluxo obrigatório de ativação de cadastro e pagamento de taxa simbólica via Pix.

## 🎨 Paleta de Cores

A paleta de cores foi extraída do logo fornecido, configurada no Tailwind CSS para garantir a identidade visual da marca:

| Nome da Cor | Código Hex | Uso Sugerido |
| :--- | :--- | :--- |
| **Primária** | `#E31837` | Botões de Ação (CTA), Destaques |
| **Secundária** | `#004A99` | Fundo de Seções, Elementos Institucionais |
| **Terciária** | `#00AEEF` | Elementos Visuais Suaves |
| **Texto** | `#333333` | Texto Principal |
| **Neutro** | `#F3F4F6` | Backgrounds, Bordas |

## ⚙️ Tecnologias Utilizadas

*   **HTML5:** Estrutura da página.
*   **Tailwind CSS:** Framework de CSS utilitário para estilização rápida e responsiva.
*   **JavaScript Puro (Vanilla JS):** Lógica de modais, validação de CPF e fluxo de navegação.

## 🚀 Como Executar Localmente

Para visualizar e testar a Landing Page, siga os passos abaixo:

### 1. Pré-requisitos

Você precisará ter o **Node.js** e o **pnpm** (ou npm/yarn) instalados em sua máquina.

### 2. Instalação das Dependências

Navegue até o diretório do projeto (`nestle-landing-page`) e instale as dependências do Tailwind CSS:

\`\`\`bash
pnpm install
# ou npm install
\`\`\`

### 3. Compilação do CSS

O arquivo CSS final (`dist/output.css`) já está compilado e pronto para uso. Caso deseje fazer alterações no código e recompilar o CSS, utilize o script de build:

\`\`\`bash
pnpm run build
\`\`\`

Para desenvolvimento e acompanhamento de mudanças em tempo real, utilize o modo `watch`:

\`\`\`bash
pnpm run watch
\`\`\`

### 4. Visualização

Basta abrir o arquivo `index.html` em seu navegador.

**Importante:** Lembre-se que a página possui uma **restrição de dispositivo** e só exibirá o conteúdo principal se for acessada em uma tela com largura máxima de 767px (simulando um celular). Para testar no desktop, utilize as ferramentas de desenvolvedor do navegador (F12) e ative a visualização mobile.

## 📂 Estrutura de Pastas

\`\`\`
nestle-landing-page/
├── dist/
│   └── output.css      # CSS compilado do Tailwind
├── src/
│   └── input.css       # Arquivo de entrada do Tailwind
├── index.html          # Estrutura principal da Landing Page
├── script.js           # Lógica JavaScript (Modais, Validação, Fluxo)
├── logonestle.png      # Imagem do logo
├── package.json        # Configurações do projeto e scripts
├── tailwind.config.js  # Configuração do Tailwind CSS (com paleta de cores customizada)
└── README.md           # Este arquivo
\`\`\`
