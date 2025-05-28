import Cliente from "../models/Cliente.js";

// Listar clientes
export const listarClientes = (req, res) => {
  Cliente.findAll()
    .then((clientes) => {
      res.render("clientes", { clientes });
    })
    .catch((error) => {
      res.status(500).send("Erro ao listar clientes: " + error.message);
    });
};

// Mostrar formulário de novo cliente
export const mostrarFormNovoCliente = (req, res) => {
  res.render("clientes_novo");
};

// Criar novo cliente
export const criarCliente = (req, res) => {
  const { nome, cpf, endereco, idade } = req.body;
  Cliente.create({ nome, cpf, endereco, idade })
    .then(() => res.redirect("/clientes"))
    .catch((error) =>
      res.status(500).send("Erro ao criar cliente: " + error.message)
    );
};

// Mostrar formulário de edição
export const mostrarFormEditarCliente = (req, res) => {
  Cliente.findByPk(req.params.id)
    .then((cliente) => {
      if (!cliente) return res.status(404).send("Cliente não encontrado");
      res.render("clientes_editar", { cliente });
    })
    .catch((error) =>
      res.status(500).send("Erro ao buscar cliente: " + error.message)
    );
};

// Atualizar cliente
export const atualizarCliente = (req, res) => {
  const { nome, cpf, endereco, idade } = req.body;
  Cliente.update(
    { nome, cpf, endereco, idade },
    { where: { id: req.params.id } }
  )
    .then(() => res.redirect("/clientes"))
    .catch((error) =>
      res.status(500).send("Erro ao atualizar cliente: " + error.message)
    );
};

// Deletar cliente
export const deletarCliente = (req, res) => {
  Cliente.destroy({ where: { id: req.params.id } })
    .then(() => res.redirect("/clientes"))
    .catch((error) =>
      res.status(500).send("Erro ao deletar cliente: " + error.message)
    );
};
