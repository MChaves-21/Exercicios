const { Router } = require("express");
const prisma = require("../database");

const router = Router()

// Rota GET para listar todos os usuários
router.get("/", async (req, res) => {
  // Consulta todos os usuários no banco de dados
  const users = await prisma.user.findMany()
  // Retorna os usuários em formato JSON
  res.json(users)
})

// Rota POST para criar um novo usuário
router.post("/", async (req, res) => {
  // Extrai os dados do corpo da requisição (name, email)
  const { name, email } = req.body
  // Cria um novo usuário no banco de dados
  const newPost = await prisma.user.create({
    data: {
      title,  
      published  
    }
  })
  res.status(201).json(newPost)
})

router.get("/:id", async (req, res) => {
  // Consulta o usuário pelo ID, incluindo os posts associados a ele
  const user = await prisma.user.findUnique({
    where: {
      id: +req.params.id 
    },
    include: {
      posts: true // Inclui os posts relacionados ao usuário
    }
  })
  // Retorna o usuário encontrado com os posts (se houver)
  res.json(user)
})

// Rota PUT para atualizar um usuário existente com base no ID
router.put("/:id", async (req, res) => {
  // Extrai os dados para atualização (name, email) do corpo da requisição
  const { name, email } = req.body
  // Atualiza o usuário no banco de dados
  const updatedUser = await prisma.user.update({
    data: { name, email }, // Dados para atualização
    where: { id: Number(req.params.id) } // ID do usuário que será atualizado
  })
  // Retorna o usuário atualizado
  res.json(updatedUser)
})

// Rota DELETE para deletar um usuário com base no ID
router.delete("/:id", async (req, res) => {
  // Deleta o usuário do banco de dados pelo ID
  const deletedUser = await prisma.user.delete({
    where: { id: Number(req.params.id) } // ID do usuário a ser deletado
  })
  // Retorna o usuário deletado
  res.json({ deletedUser })
})

module.exports = router
