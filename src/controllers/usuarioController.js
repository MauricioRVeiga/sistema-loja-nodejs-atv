// src/controllers/usuarioController.js
import Usuario from "../models/Usuario.js";
import Sequelize from "sequelize";

// Listar usuários
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    const totalUsuarios = await Usuario.count();
    const ativos = await Usuario.count({ where: { acesso: "Admin" } }); // ajuste conforme sua lógica de "ativo"
    const novos7d = await Usuario.count({
      where: {
        cadastro: {
          [Sequelize.Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });
    const admins = await Usuario.count({ where: { acesso: "Admin" } });

    res.render("usuarios", {
      usuarios,
      totalUsuarios,
      ativos,
      novos7d,
      admins,
    });
  } catch (error) {
    res.status(500).send("Erro ao listar usuários: " + error.message);
  }
};

// Mostrar formulário de novo usuário
export const mostrarFormNovoUsuario = (req, res) => {
  res.render("usuarios_novo");
};

// Criar novo usuário
export const criarUsuario = (req, res) => {
<<<<<<< HEAD
  const { nome, email, cadastro, acesso, cpf, endereco, telefone } = req.body;
  Usuario.create({ nome, email, cadastro, acesso, cpf, endereco, telefone })
=======
  const { nome, email, cadastro, acesso, cpf, endereco } = req.body;
  Usuario.create({ nome, email, cadastro, acesso, cpf, endereco })
>>>>>>> a1e246ac5504867d535c9fb9228de85f34af145c
    .then(() => res.redirect("/usuarios"))
    .catch((error) =>
      res.status(500).send("Erro ao criar usuário: " + error.message)
    );
};

// Mostrar formulário de edição
export const mostrarFormEditarUsuario = (req, res) => {
  Usuario.findByPk(req.params.id)
    .then((usuario) => {
      if (!usuario) return res.status(404).send("Usuário não encontrado");
      res.render("usuarios_editar", { usuario });
    })
    .catch((error) =>
      res.status(500).send("Erro ao buscar usuário: " + error.message)
    );
};

// Atualizar usuário
export const atualizarUsuario = (req, res) => {
  const { nome, email, cadastro, acesso, cpf, endereco } = req.body;
  Usuario.update(
    { nome, email, cadastro, acesso, cpf, endereco },
    { where: { id: req.params.id } }
  )
    .then(() => res.redirect("/usuarios"))
    .catch((error) =>
      res.status(500).send("Erro ao atualizar usuário: " + error.message)
    );
};

// Deletar usuário
export const deletarUsuario = (req, res) => {
  Usuario.destroy({ where: { id: req.params.id } })
    .then(() => res.redirect("/usuarios"))
    .catch((error) =>
      res.status(500).send("Erro ao deletar usuário: " + error.message)
    );
};
