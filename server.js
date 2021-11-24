const express = require('express');
const caminho = require('path');
const { connected } = require('process');
const { Socket } = require('socket.io');

const aplicacao = express();
// aplicação http
const servidor = require('http').createServer(aplicacao);
const io = require('socket.io')(servidor);

// definir uma pasta para que os aquivos fiquem estaticos 
aplicacao.use(express.static(caminho.join(__dirname, 'public')));
aplicacao.set('views', caminho.join(__dirname, 'public'));
aplicacao.engine('html', require('ejs').renderFile);

aplicacao.use('/', (req, res) => {
    res.render('index.html');
});

//depois de executar a tela
let mensagens = [];

io.on('connection', (socket) => {
    console.log(`Conectado ${socket.id}`);
    socket.on('sendMessage', dados => {
        mensagens.push(dados);
        // retirar o console se quiser kdkdkdk 
        console.log(dados);

    });
});
// esta parte só sera feita quando for falar do envio da mensagem 

servidor.listen(3000);

