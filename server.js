const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;  // Usando a porta que a Render fornecer

// Servindo arquivos estáticos da raiz do projeto
app.use(express.static(path.join(__dirname, 'public')));

// Rota para o arquivo principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
