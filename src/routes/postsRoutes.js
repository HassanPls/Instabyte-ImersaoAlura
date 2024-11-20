import express from "express";
import { listarPosts } from "../controllers/postsController.js";

const routes = (app) => {
  // Habilita o parsing de JSON no corpo das requisições
  app.use(express.json());

  // Rota GET para obter todos os posts
  app.get("/posts", listarPosts);

  // function buscarPostPorID(id) {
  //   return posts.findIndex((post) => {
  //     return post.id === Number(id);
  //   });
  // }

  // app.get("/posts/:id", (req, res) => {
  //   const index = buscarPostPorID(req.params.id);
  //   res.status(200).json(posts[index]);
  // });
};

export default routes;