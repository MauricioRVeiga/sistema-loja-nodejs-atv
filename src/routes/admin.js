import express from "express";
import { listarProdutos, dashboard } from "../controllers/produtoController.js";
import {
  listarUsuarios,
  mostrarFormNovoUsuario,
  criarUsuario,
  mostrarFormEditarUsuario,
  atualizarUsuario,
  deletarUsuario,
} from "../controllers/usuarioController.js";
import { listarPedidos } from "../controllers/pedidoController.js";
import {
  listarClientes,
  mostrarFormNovoCliente,
  criarCliente,
  mostrarFormEditarCliente,
  atualizarCliente,
  deletarCliente,
} from "../controllers/clienteController.js";

const router = express.Router();

router.get("/", dashboard);

//Produtos
router.get("/produtos", listarProdutos);

//Usuarios
router.get("/usuarios", listarUsuarios);
router.get("/usuarios/novo", mostrarFormNovoUsuario);
router.post("/usuarios", criarUsuario);
router.get("/usuarios/:id/editar", mostrarFormEditarUsuario);
router.post("/usuarios/:id/editar", atualizarUsuario);
router.post("/usuarios/:id/deletar", deletarUsuario);

//Pedidos
router.get("/pedidos", listarPedidos);

// Clientes CRUD
router.get("/clientes", listarClientes);
router.get("/clientes/novo", mostrarFormNovoCliente);
router.post("/clientes", criarCliente);
router.get("/clientes/:id/editar", mostrarFormEditarCliente);
router.post("/clientes/:id/editar", atualizarCliente);
router.post("/clientes/:id/deletar", deletarCliente);

export default router;
