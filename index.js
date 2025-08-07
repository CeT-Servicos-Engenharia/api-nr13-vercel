// 1. Importa as bibliotecas
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// 2. Inicializa o servidor Express
const app = express();

// 3. Configura os middlewares
app.use(cors());
app.use(express.json());

// --- LÓGICA DE INICIALIZAÇÃO "PREGUIÇOSA" DO FIREBASE ---
// Garante que o Firebase só seja inicializado uma vez.
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.CREDENCIAS_FIREBASE);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log("Firebase Admin inicializado com sucesso.");
  } catch (error) {
    console.error("ERRO CRÍTICO: Falha ao inicializar o Firebase Admin. Verifique as credenciais.", error);
  }
}

// Cria uma referência para o banco de dados Firestore
const db = admin.firestore();
// ---------------------------------------------------------


// --- SUAS ROTAS VÊM AQUI ---

// Rota de teste
app.get('/', (req, res) => {
  res.status(200).send({ message: 'API NR13 conectada com sucesso!' });
});

// Rota de exemplo para buscar clientes do Firestore
app.get('/clients', async (req, res) => {
  if (!db) {
     return res.status(500).send({ message: 'Erro: Conexão com o banco de dados não está disponível.' });
  }
  try {
    const clientsSnapshot = await db.collection('clients').get();
    const clients = [];
    clientsSnapshot.forEach((doc) => {
      clients.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(clients);
  } catch (error) {
    console.error("Erro ao buscar clientes: ", error);
    res.status(500).send({ message: 'Erro ao buscar clientes no servidor.' });
  }
});

// 4. Exporta o 'app' para a Vercel
module.exports = app;
