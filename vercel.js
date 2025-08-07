{
  "version": 2,
  "build": {
    "env": {
      "CREDENCIAS_FIREBASE": "@credenciais_firebase" // <-- CORRIGIDO
    }
  },
  "builds": [
    {
      "src": "./index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.js"
    }
  ]
}
