import express from "express";
import multer from "multer";
import {
  listPosts,
  postNewPost,
  uploadImage,
} from "../controllers/postsController.js";

// Configuração do armazenamento de imagens
const storage = multer.diskStorage({
  // Define o destino para salvar as imagens enviadas
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Pasta 'uploads' armazenará as imagens
  },
  // Define o nome do arquivo salvo
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Mantém o nome original do arquivo
  },
});

// Define o middleware de upload utilizando a configuração 'storage'
const upload = multer({ dest: "./uploads", storage });

// Função para definir as rotas da aplicação
const routes = (app) => {
  // Habilita o parsing de JSON no corpo das requisições
  app.use(express.json());

  // Rota GET para listar todos os posts (implementada em postsController.js)
  app.get("/posts", listPosts);

  // Rota GET para buscar um post por ID (comentada, não implementada)
  // app.get("/posts/:id", (req, res) => {
  //   const index = buscarPostPorID(req.params.id);
  //   res.status(200).json(posts[index]);
  // });

  // Rota POST para criar um novo post (implementada em postsController.js)
  app.post("/posts", postNewPost);

  // Rota POST para upload de imagem (usa o middleware 'upload')
  app.post("/upload", upload.single("image"), uploadImage);
};

export default routes;
