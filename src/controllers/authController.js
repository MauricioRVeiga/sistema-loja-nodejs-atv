import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

export const mostrarLogin = (req, res) => {
  res.render("login", { error: null });
};

export const mostrarCadastro = (req, res) => {
  res.render("cadastro", { error: null });
};

export const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha, telefone, cpf } = req.body;
  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.render("cadastro", { error: "E-mail já cadastrado!" });
    }
    const hash = await bcrypt.hash(senha, 10);
    // Gera data no formato yyyy-mm-dd
    const dataCadastro = new Date().toISOString().slice(0, 10);
    await Usuario.create({
      nome,
      email,
      senha: hash,
      telefone,
      cpf,
      endereco: "", // campo opcional, mas sempre enviado
      cadastro: dataCadastro,
      acesso: "Usuario",
    });
    res.redirect("/login");
  } catch (err) {
    // Mostra mensagem detalhada do Sequelize
    let errorMsg = "Erro ao cadastrar usuário.";
    if (err.errors && err.errors.length > 0) {
      errorMsg += " " + err.errors.map((e) => e.message).join(" ");
    } else if (err.message) {
      errorMsg += " " + err.message;
    }
    res.render("cadastro", { error: errorMsg });
  }
};

export const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.render("login", { error: "Usuário ou senha inválidos." });
    }
    const senhaOk = await bcrypt.compare(senha, usuario.senha);
    if (!senhaOk) {
      return res.render("login", { error: "Usuário ou senha inválidos." });
    }
    req.session.usuarioId = usuario.id;
    req.session.usuarioNome = usuario.nome;
    return res.redirect("/dashboard"); // Redireciona para o dashboard após login
  } catch (err) {
    res.render("login", { error: "Erro ao fazer login." });
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
