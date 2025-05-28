import express from "express";
import db from "./client/db";
import { log } from "console";

const app = express();
// 8080
const port = process.env.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Exercicio de CRUD
// Utilizando as 5 funções encontradas em db, crie 5 endpoints para o recurso "usuario".
// (Leia em README para saber mais sobre as funções)
/* 
    O recurso usuario deve ter as seguintes propriedades com seus respectivos tipos:
    { 
        name: String, 
        email: String, 
        password: String 
    }
*/

// buscar todos - GET /users
app.get("/user", (_req, res) => {
  const usuarios = db.findAll();
  res.json(usuarios)
  // res.send("Estamos aqui");
});

// buscar por id - GET /users/:id
app.get("/user/:id", (req, res) => {
 const id = parseInt(req.params.id);
 const usuarios = db.findById(id)
   res.json(usuarios)
});

// Criar um usuario - POST /user
app.post("/user", (req, res) => {
  let usuario = req.body;
  let novoUsuario = db.create(usuario);
  res.status(201).json(novoUsuario);
});

// Atualizar um usuário - PUT/user/:id
app.put("/user/:id", (req, res)=> {
  const id = parseInt(req.params.id);
  const usuario = req.body;
  const usuarioAtualizado = db.updateById(id, usuario);
  res.json(usuarioAtualizado);
})

// Excluir um usuário - DELETE/user/id
app.delete("/user/:id", (req, res)=>{
  const deletar = db.remove(parseInt(req.params.id));
  res.json(deletar)  
});

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });



app.listen(port, () => {
  console.log(`Esse servidor está rodando em ${port}`);
});
