const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 6200;

// Configura o EJS como view engine
app.set('view engine', 'ejs');
app.use(express.static('public')); // Para servir imagens ou CSS, se precisar

// Função auxiliar para ler os arquivos JSON
const lerDados = (arquivo) => {
    const caminho = path.join(__dirname, 'data', arquivo);
    const dados = fs.readFileSync(caminho, 'utf-8');
    return JSON.parse(dados);
};

// ================= ROTAS ================= //

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/quemsou', (req, res) => {
    res.render('quemsou');
});

app.get('/ofertas', (req, res) => {
    const ofertas = lerDados('ofertas.json');
    res.render('ofertas', { ofertas });
});

app.get('/novos', (req, res) => {
    const novos = lerDados('novos.json');
    res.render('novos', { novos });
});

app.get('/seminovos', (req, res) => {
    const seminovos = lerDados('seminovos.json');
    res.render('seminovos', { seminovos });
});

// ================= INICIAR SERVIDOR ================= //
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} - http://localhost:${PORT}`);
});