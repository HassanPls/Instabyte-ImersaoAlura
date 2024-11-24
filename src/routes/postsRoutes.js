import express from "express";
import multer from "multer";
import cors from "cors";
import {
  listPosts,
  postNewPost,
  uploadImage,
  updatePost,
} from "../controllers/postsController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

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
  app.use(cors(corsOptions));

  // Rota GET para listar todos os posts (implementada em postsController.js)
  app.get("/posts", listPosts);
  
  // Rota POST para criar um novo post (implementada em postsController.js)
  app.post("/posts", postNewPost);

  // Rota POST para upload de imagem (usa o middleware 'upload')
  app.post("/upload", upload.single("image"), uploadImage);

  app.put("/upload/:id", updatePost);
};

export default routes;
