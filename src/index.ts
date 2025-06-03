import express from "express";
import db from "./client/db";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// buscar todos - GET /users
app.get("/user", (_req, res) => {
  const usuarios = db.findAll();
  res.status(200).json(usuarios);
});

// buscar por id - GET /users/:id
app.get("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const usuarios = db.findById(id);
  if (!usuarios) {
    res.status(404).json({ mensagem: "User not found!" });
  }
  res.status(200).json(usuarios);
});

// Criar um usuario - POST/user
app.post("/user", (req, res) => {
  const {name, email, password} = req.body;
  if (!name || !email || !password) {
    return res.status(400).send({mensagem: "Todos os campos devem ser preenchidos!"});
  }

  const criarUsuario = {
    id: parseInt(""),
    name: name,
    email: email,
    password:password
  }

  const novoUsuario = db.create(criarUsuario);
  res.status(201).json(novoUsuario);
});

// Atualizar um usuário - PUT/user/:id
app.put("/user/:id", (req, res)=> {
  const id = parseInt(req.params.id);
  if(!id){
    return res.status(404).json({mensagem: "Usuário não encontrado."});
  }

  const {name, email, password} = req.body;
  if(!name || !email || !password){
    return res.status(400).json({mensagem: "Todos os campos são obrigatórios"})
  }
  const atualizarUsuario = {
    id: id,
    name: name,
    email: email,
    password: password
  };

  const usuarioAtualizado = db.updateById(id, atualizarUsuario);
  res.status(200).json(usuarioAtualizado);
})

// Excluir um usuário - DELETE/user/id
app.delete("/user/:id", (req, res)=>{
  const deletar = db.remove(parseInt(req.params.id));
  res.status(204).json(deletar)  
});

app.get("/", (req, res) => {
  res.end("Hello World");
});

app.listen(port, () => {
  console.log(`Esse servidor está rodando em ${port}`);
});
