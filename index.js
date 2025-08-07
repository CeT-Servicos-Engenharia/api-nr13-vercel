// 1. Importa as bibliotecas
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// 2. Carrega as credenciais do Firebase a partir das Variáveis de Ambiente
const serviceAccount = JSON.parse(process.env.CREDENCIAS_FIREBASE); // <-- CORRIGIDO

// 3. Inicializa o Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Cria uma referência para o banco de dados Firestore
const db = admin.firestore();

// 4. Inicializa o servidor Express
const app = express();

// 5. Configura os middlewares
app.use(cors());
app.use(express.json());

// --- SUAS ROTAS VÊM AQUI ---

// Rota de teste
app.get('/', (req, res) => {
  res.status(200).send({ message: 'API NR13 conectada com sucesso!' });
});

// Rota de exemplo para buscar clientes do Firestore
app.get('/clients', async (req, res) => {
  try {
    const clientsSnapshot = await db.collection('clients').get();
    const clients = [];
    clientsSnapshot.forEach((doc) => {
      clients.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(clients);
  } catch (error)
    {
    console.error("Erro ao buscar clientes: ", error);
    res.status(500).send({ message: 'Erro ao buscar clientes no servidor.' });
  }
});

// 6. Exporta o 'app' para a Vercel
module.exports = app;
