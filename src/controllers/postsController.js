import fs from "fs";
import { getAllPosts, createPost } from "../models/postsModel.js";

// Função para listar todos os posts
export async function listPosts(req, res) {
  // Obtém todos os posts do banco de dados usando a função getAllPosts()
  const posts = await getAllPosts();

  // Envia os posts como resposta JSON com status 200 (OK)
  res.status(200).json(posts);
}

// Função para criar um novo post
export async function postNewPost(req, res) {
  // Obtém os dados do novo post do corpo da requisição
  const newPost = req.body;

  try {
    // Cria o novo post no banco de dados usando a função createPost()
    const postCreated = await createPost(newPost);

    // Envia o post criado como resposta JSON com status 200 (OK)
    res.status(200).json(postCreated);
  } catch (error) {
    // Caso ocorra um erro, imprime a mensagem de erro no console
    console.error(error.message);

    // Envia uma resposta de erro com status 500 (Internal Server Error)
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

// Função para fazer upload de uma imagem e criar um novo post
export async function uploadImage(req, res) {
  // Cria um objeto com os dados do novo post, incluindo a URL da imagem
  const newPost = {
    descricao: "",
    url: req.file.originalname,
    alt: "",
  };

  try {
    // Cria o novo post no banco de dados usando a função createPost()
    const postCreated = await createPost(newPost);

    // Constrói o novo nome do arquivo da imagem com o ID do post criado
    const imageUpdated = `uploads/${postCreated.insertedId}.png`;

    // Renomeia o arquivo da imagem para o novo nome
    fs.renameSync(req.file.path, imageUpdated);

    // Envia o post criado como resposta JSON com status 200 (OK)
    res.status(200).json(postCreated);
  } catch (error) {
    // Caso ocorra um erro, imprime a mensagem de erro no console
    console.error(error.message);

    // Envia uma resposta de erro com status 500 (Internal Server Error)
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}
