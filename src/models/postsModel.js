
import conectarAoBanco from "../config/dbconfig.js";

// Conecta ao banco de dados MongoDB usando a string de conexão fornecida pelo ambiente
const connection = await conectarAoBanco(process.env.STRING_CONNECTION);

// Função assíncrona para obter todos os posts da coleção "posts" no banco de dados
export async function getAllPosts() {
    // Seleciona o banco de dados "imersao-instabyte"
    const db = connection.db("imersao-instabyte");
    // Seleciona a coleção "posts"
    const collection = db.collection("posts");
    // Busca todos os documentos da coleção e retorna como um array
    return collection.find().toArray();
}
  
  