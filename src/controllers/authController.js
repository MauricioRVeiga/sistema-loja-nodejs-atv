import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";
import { sendSMS } from "../services/smsService.js";
import { Op } from "sequelize";

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
  const { telefone, senha } = req.body;
  console.log("Telefone recebido:", telefone);
  console.log("Senha recebida:", senha);
  try {
    // Logar todos os usuários cadastrados para depuração
    const todosUsuarios = await Usuario.findAll();
    console.log(
      "Usuários cadastrados:",
      todosUsuarios.map((u) => ({
        id: u.id,
        email: u.email,
        telefone: u.telefone,
      }))
    );
    // Permitir login por telefone OU email
    const usuario = await Usuario.findOne({
      where: {
        [Op.or]: [{ telefone }, { email: telefone }],
      },
    });
    console.log("Usuário encontrado:", usuario);
    if (!usuario) {
      return res.render("login", {
        error: "Telefone/E-mail ou senha inválidos.",
      });
    }
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.render("login", {
        error: "Telefone/E-mail ou senha inválidos.",
      });
    }
    // Gerar token de 6 dígitos
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    req.session.tokenLogin = token;
    req.session.telefoneLogin = usuario.telefone;
    await sendSMS(usuario.telefone, `Seu código de acesso: ${token}`);
    return res.redirect("/login/token");
  } catch (error) {
    console.error("Erro no login:", error);
    return res.render("login", { error: "Erro ao tentar logar." });
  }
};

export const tokenForm = (req, res) => {
  res.render("login_token", { error: null });
};

export const validarToken = async (req, res) => {
  const { token } = req.body;
  if (token === req.session.tokenLogin) {
    // Buscar usuário pelo telefone salvo na sessão
    const usuario = await Usuario.findOne({
      where: { telefone: req.session.telefoneLogin },
    });
    if (usuario) {
      req.session.usuarioLogado = usuario.id; // Salva o id do usuário na sessão
      // Limpar token da sessão
      delete req.session.tokenLogin;
      delete req.session.telefoneLogin;
      return res.redirect("/dashboard");
    } else {
      // Usuário não encontrado, volta para login
      return res.redirect("/login");
    }
  } else {
    return res.render("login_token", {
      error: "Token incorreto. Tente novamente.",
    });
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
