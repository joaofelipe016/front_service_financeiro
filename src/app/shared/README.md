# Componentes Compartilhados

Este diretório contém componentes reutilizáveis que foram extraídos do componente de login para melhorar a organização e reutilização do código.

## Estrutura dos Componentes

### 1. InputComponent (`input/input.component.ts`)
- **Propósito**: Input reutilizável com validação e estados visuais
- **Características**:
  - Suporte a ControlValueAccessor para integração com formulários
  - Estados de erro e sucesso
  - Estilização consistente com o design system
  - Responsivo

### 2. ButtonComponent (`button/button.component.ts`)
- **Propósito**: Botão reutilizável com loading state
- **Características**:
  - Estados de loading com spinner
  - Diferentes variantes (primary, secondary, outline)
  - Diferentes tamanhos (sm, md, lg)
  - Animações de hover e active

### 3. HeaderComponent (`header/header.component.ts`)
- **Propósito**: Cabeçalho com título e subtítulo
- **Características**:
  - Gradiente animado
  - Responsivo
  - Subtítulo opcional

### 4. SocialLoginComponent (`social-login/social-login.component.ts`)
- **Propósito**: Botões de login social
- **Características**:
  - Suporte a Google, Facebook e LinkedIn
  - Animações de hover
  - Emissão de eventos para integração

### 5. DividerComponent (`divider/divider.component.ts`)
- **Propósito**: Divisor com texto centralizado
- **Características**:
  - Linhas com gradiente
  - Texto personalizável
  - Responsivo

### 6. LoginScreenComponent (`login-screen/login-screen.component.ts`)
- **Propósito**: Tela completa de login
- **Características**:
  - Formulário de login
  - Integração com social login
  - Navegação para cadastro
  - Estados de loading

### 7. RegisterScreenComponent (`register-screen/register-screen.component.ts`)
- **Propósito**: Tela completa de cadastro
- **Características**:
  - Formulário de cadastro
  - Validação de senhas
  - Navegação para login
  - Estados de loading

## Serviços

### AnimationService (`services/animation.service.ts`)
- **Propósito**: Centralizar toda a lógica de animação
- **Características**:
  - Animações de entrada e saída
  - Transições entre telas
  - Ajuste responsivo
  - Controle de timing

## Benefícios da Componentização

1. **Reutilização**: Componentes podem ser usados em outras partes da aplicação
2. **Manutenibilidade**: Código mais organizado e fácil de manter
3. **Testabilidade**: Componentes isolados são mais fáceis de testar
4. **Legibilidade**: Código mais limpo e fácil de entender
5. **Consistência**: Design system unificado
6. **Escalabilidade**: Fácil adição de novos componentes

## Como Usar

```typescript
// Importar componentes individuais
import { InputComponent, ButtonComponent } from './shared/components';

// Ou importar tudo de uma vez
import * from './shared/components';
```

## Estrutura de Arquivos

```
shared/
├── components/
│   ├── input/
│   ├── button/
│   ├── header/
│   ├── social-login/
│   ├── divider/
│   ├── login-screen/
│   ├── register-screen/
│   └── index.ts
├── services/
│   └── animation.service.ts
└── README.md
```
