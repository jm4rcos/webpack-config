const path = require('path'); //Variavel que vai pegar o caminho do arquivo que esta sendo importado
const HtmlWebpackPlugin = require('html-webpack-plugin'); //Plugin que vai gerar o html
// const CopyWebpackPlugin = require('copy-webpack-plugin'); // Plugin que vai copiar os arquivos css para o diretorio dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //Plugin que vai extrair o css para o arquivo css
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin'); //Plugin que vai minimizar o css
const webpack = require('webpack'); //Plugin que nao vem ativado por padrao que otimiza de uma forma mais agressiva


module.exports = {
    entry: './app/src/js/app.js', //Arquivo de entrada para o webpack ler
    output: { //Arquivo de saída feito pelo webpack
        filename: 'bundle.js', //O nome do arquivo de saída
        path: path.resolve(__dirname, 'app/dist'), //O caminho do arquivo de saída --precisa ser absoluto. Por isso usamos path na primeira linha
        clean: true //Limpa o diretório antes de gerar o arquivo de saída
    },
    module: { //Configurações do webpack para o babel e o css
        rules: [
            //{test: /\.css$/, use: ['style-loader', 'css-loader']}, //Para gerar o css em uma tag Style
            //Usando Regex para usar o css-loader que foi instalado (npm install css-loader --save-dev) 
            //e o style-loader que foi instalado (npm install style-loader --save-dev) para pegar do JavaScript e colocar no HTML

            {
                test: /\.css$/, //Para gerar o Bundle.css e carregar os estylos pelo JavaScript
                use: [MiniCssExtractPlugin.loader, 'css-loader']
                //Substitui o style-loader pelo Plugin que esta sendo chamado abaixo e 
                //carregou o "loader" de dentro deste plugin
            }
        ]
    },
    optimization: { //Como é um plugin de otimizaçao, fica separado dos demais plugins
        minimize: true,
        minimizer: [
            new CssMinimizerWebpackPlugin(), //Plugin que vai minimizar o css
            '...' //Com o ... vai pegar todos os plugins que estão sendo usados no webpack e vai minimizar tudo
                  //Caso contrário vai minimizar apenas o arquivo css
        ] 
    },
    plugins: [
        new HtmlWebpackPlugin({//Plugin para gerar o arquivo html automaticamente
            template: './app/src/index.html', //O template que será usado para gerar o html 
            filename: 'index.html', //O nome do arquivo que será gerado
            hash: true //Adiciona um hash no arquivo gerado para evitar cache de navegação
        }),
        // new CopyWebpackPlugin({ //Plugin para copiar os arquivos css para o diretório dist
        //     patterns: [
        //         { from: './app/src/css', to: 'css' } //O caminho do arquivo que será copiado e o caminho que será salvo
        //     ]
        // }),
        new MiniCssExtractPlugin({ //Plugin para ser chamado no "module"
            filename: 'style.css' //O nome do arquivo que será gerado
        }),
        new webpack.optimize.ModuleConcatenationPlugin(), //Plugin que vai concatenar todos os arquivos do webpack
    ],
    devServer: { //Configurações do servidor de desenvolvimento pelo "webpack-dev-server"
        contentBase: path.resolve(__dirname, 'app/dist'), //O caminho que será usado para o servidor
        port: 4000 //A porta que será usada para o servidor
    }
};