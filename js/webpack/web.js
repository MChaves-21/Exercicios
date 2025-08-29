const path = require('path') // Importa o módulo 'path' do Node.js para manipulação de caminhos de arquivos

module.exports = { // Exporta um objeto de configuração para o Webpack
  entry: { // Define os pontos de entrada do aplicativo
    index: './src/index.js', // Primeiro ponto de entrada: 'index.js'
    hello: './src/hello.js' // Segundo ponto de entrada: 'hello.js'
  },
  output: { // Configura onde e como os arquivos de saída serão gerados
    path: path.resolve(__dirname, 'public'), // Define o diretório de saída como 'public', resolvendo o caminho absoluto
    filename: '[name].min.js' // Define o nome do arquivo de saída, onde [name] será substituído pelo nome do ponto de entrada
  },
  mode: 'development' // Define o modo como 'development' para facilitar a depuração
}

const path = require('path') // Importa o módulo 'path' do Node.js para manipulação de caminhos de arquivos
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // Importa o plugin para extrair CSS em arquivos separados

module.exports = { // Exporta um objeto de configuração para o Webpack
  entry: { // Define os pontos de entrada do aplicativo
    index: './src/index.js' // Ponto de entrada: 'index.js'
  },
  output: { // Configura onde e como os arquivos de saída serão gerados
    path: path.resolve(__dirname, 'dist') // Define o diretório de saída como 'dist', resolvendo o caminho absoluto
  },
  mode: 'development', // Define o modo como 'development' para facilitar a depuração
  module: { // Configura as regras de carregamento de módulos
    rules: [{ // Define as regras para processar diferentes tipos de arquivos
      test: /\.css$/, // Testa se o arquivo é um CSS
      use: [ // Define os loaders a serem usados
        MiniCssExtractPlugin.loader, // Usa o loader do MiniCssExtractPlugin para extrair CSS em arquivos separados
        'css-loader' // Usa o css-loader para interpretar @import e url() dentro do CSS
      ]
    }]
  },
  plugins: [ // Define os plugins a serem usados
    new MiniCssExtractPlugin() // Instancia o MiniCssExtractPlugin para extrair o CSS durante o processo de build
  ]
}
