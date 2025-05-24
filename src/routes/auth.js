import express from "express";
import {
  mostrarLogin,
  mostrarCadastro,
  cadastrarUsuario,
  login,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/login", mostrarLogin);
router.post("/login", login);
router.get("/cadastro", mostrarCadastro);
router.post("/cadastro", cadastrarUsuario);
router.get("/logout", logout);

export default router;
