// 1. Importa as bibliotecas necessárias
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// 2. Inicializa o servidor Express
const app = express();

// 3. Configura os middlewares para permitir requisições de outras origens (CORS) e para entender JSON
app.use(cors());
app.use(express.json());

// --- LÓGICA DE INICIALIZAÇÃO SEGURA DO FIREBASE ---
// Garante que o Firebase só seja inicializado uma vez.
if (!admin.apps.length) {
  try {
    // Lê as credenciais da variável de ambiente da Vercel
    const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);

    // Inicializa o SDK do Firebase Admin com as credenciais
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log("Firebase Admin inicializado com sucesso.");

  } catch (error) {
    console.error("ERRO CRÍTICO: Falha ao inicializar o Firebase Admin. Verifique a variável de ambiente 'FIREBASE_CREDENTIALS'.", error);
  }
}

// Cria uma referência para o banco de dados Firestore para ser usada nas rotas
const db = admin.firestore();
// ---------------------------------------------------------


// --- ROTAS DA API ---

// Rota de teste para verificar se a API está no ar
app.get('/', (req, res) => {
  res.status(200).send({ message: 'API NR13 conectada com sucesso!' });
});

// Rota de exemplo para buscar todos os documentos da coleção 'clients'
app.get('/clients', async (req, res) => {
  // Verifica se a conexão com o banco de dados foi estabelecida
  if (!db) {
     return res.status(500).send({ message: 'Erro: Conexão com o banco de dados não está disponível.' });
  }

  try {
    const clientsSnapshot = await db.collection('clients').get();
    const clients = [];
    clientsSnapshot.forEach((doc) => {
      clients.push({ id: doc.id, ...doc.data() });
    });
    // Retorna a lista de clientes em formato JSON
    res.status(200).json(clients);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    res.status(500).send({ message: 'Erro interno ao buscar clientes no servidor.' });
  }
});

// Adicione outras rotas aqui (POST, PUT, DELETE, etc.)


// 4. Exporta o 'app' para que a Vercel possa usá-lo como um endpoint serverless
module.exports = app;
