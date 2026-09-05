const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'database', 'data.json');

if (!fs.existsSync(path.join(__dirname, 'database'))) {
    fs.mkdirSync(path.join(__dirname, 'database'));
}
if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, JSON.stringify([]));
}

app.get('/api/mensagens', (req, res) => {
    const data = fs.readFileSync(dbPath, 'utf8');
    const mensagens = JSON.parse(data);
    res.json(mensagens);
});

app.post('/api/mensagem', (req, res) => {
    const novaMensagem = req.body.mensagem;

    const data = fs.readFileSync(dbPath, 'utf8');
    const mensagens = JSON.parse(data);

    mensagens.push({ id: Date.now(), mensagem: novaMensagem });
    fs.writeFileSync(dbPath, JSON.stringify(mensagens, null, 2));

    res.json({
        status: 'sucesso',
        novoTitulo: 'Backend Conectado! HAHhahA Sou Backendezeiro',
        novoSubtitulo: 'Paçoca Molhada!',
        novaImagem: './image2.jpg'
    })
})

app.listen(PORT, () => {
    console.log('Backend ON na porta: ', PORT);
    console.log('Banco em: ', dbPath);
})