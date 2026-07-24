# AnimeApp

## Descrição

O AnimeApp é um aplicativo móvel desenvolvido com React Native e Expo, projetado para entusiastas de anime. Ele oferece uma experiência rica para descobrir, explorar e gerenciar seus animes favoritos. Com uma interface intuitiva e recursos personalizáveis, você pode mergulhar no mundo do anime como nunca antes.

## Funcionalidades

- **Exploração de Animes**: Navegue por uma vasta coleção de animes, incluindo os mais populares e recém-adicionados.
- **Detalhes Abrangentes**: Visualize informações detalhadas sobre cada anime, como sinopse, pontuação, gêneros, ano de lançamento e trailers incorporados.
- **Categorias e Gêneros**: Descubra animes por diferentes categorias e gêneros, facilitando a busca por algo novo.
- **Lista de Favoritos**: Marque seus animes preferidos para acesso rápido e fácil.
- **Temas Personalizáveis**: Alterne entre os modos claro e escuro para uma experiência de visualização confortável.
- **Tradução de Texto (Experimental)**: Um recurso experimental para traduzir descrições e nomes de gêneros para Português.

## Tecnologias Utilizadas

- **React Native**: Framework para construção de interfaces de usuário móveis.
- **Expo**: Conjunto de ferramentas e plataforma para desenvolvimento universal de aplicativos React Native.
- **Tamagui**: Kit de UI para React Native e Web, focado em performance e temas.
- **AsyncStorage**: Para persistência de dados localmente (favoritos, configurações de tema e tradução).
- **Jikan API**: Utilizada para buscar dados de animes e gêneros.

## Como Rodar o Projeto

Siga os passos abaixo para configurar e rodar o AnimeApp em seu ambiente de desenvolvimento.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Node.js (versão LTS recomendada)
- npm ou Yarn
- Expo CLI (`npm install -g expo-cli` ou `yarn global add expo-cli`)

### Instalação

1. Install dependencies
2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

### Executando o Aplicativo

Para iniciar o aplicativo em seu dispositivo ou emulador:

```bash
npx expo start
```

Após executar o comando, você terá as seguintes opções no terminal:

- **Abrir no Expo Go**: Escaneie o código QR com o aplicativo Expo Go no seu celular (disponível para Android e iOS).
- **Executar em um emulador Android**: Certifique-se de ter um emulador Android configurado e rodando.
- **Executar em um simulador iOS**: (Apenas macOS) Certifique-se de ter o Xcode instalado e um simulador iOS configurado.
- **Criar um build de desenvolvimento**: Para testar funcionalidades nativas ou módulos personalizados.

## Contribuição

Contribuições são bem-vindas! Se você tiver sugestões, melhorias ou encontrar bugs, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
