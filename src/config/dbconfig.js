import { MongoClient } from "mongodb";

export default async function conectarAoBanco(stringConexao) {
  // Cria um cliente MongoDB para conectar ao banco de dados
  let mongoClient;

  try {
    // Conecta ao banco de dados usando a string de conexão fornecida
    mongoClient = new MongoClient(stringConexao);
    console.log("Conectando ao cluster do banco de dados.");
    await mongoClient.connect();
    console.log("Conectado ao MongoDB Atlas com sucesso!");

    // Retorna o cliente MongoDB para uso em outras partes da aplicação
    return mongoClient;
  } catch (error) {
    // Caso ocorra um erro durante a conexão, registra o erro no console e encerra a aplicação
    console.log("Falha na conexão com o banco!", error);
    process.exit();
  }
}