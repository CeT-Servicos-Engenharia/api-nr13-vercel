// 1. Importa as bibliotecas necessárias
const express = require('express');
const cors = require('cors');

// 2. Inicializa o servidor Express
const app = express();

// 3. Configura os middlewares
app.use(cors()); // Permite que seu app front-end acesse a API
app.use(express.json()); // Permite que o servidor entenda requisições com corpo em JSON

// --- AQUI VOCÊ VAI ADICIONAR A LÓGICA DA SUA API ---
// Por enquanto, vamos deixar uma rota de teste.

// 4. Cria uma rota de teste
app.get('/', (req, res) => {
  res.status(200).send({ message: 'API NR13 conectada com sucesso!' });
});

// Exemplo de como seria uma rota para buscar clientes:
/*
app.get('/clients', (req, res) => {
  // Aqui você colocaria a lógica para buscar os clientes no Firebase
  // e depois retorná-los.
  // const clients = await db.collection('clients').get();
  res.status(200).send({ message: 'Rota de clientes a ser implementada' });
});
*/

// 5. Exporta o 'app' para a Vercel poder utilizá-lo
module.exports = app;
