import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import adminRoutes from "./src/routes/admin.js";
import authRoutes from "./src/routes/auth.js";
import connection from "./src/config/sequelize-config.js";
import { dashboard } from "./src/controllers/produtoController.js";
import { tokenForm, validarToken } from "./src/controllers/authController.js";

// Importe os models aqui para garantir que as tabelas sejam criadas
import "./src/models/Usuario.js";
import "./src/models/Cliente.js";

// Sincronize todos os models após importar
await connection.sync({ alter: true });

// Criando os dados de conexão com o banco de dados
connection
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

const app = express();

app.use(
  session({
    secret: "segredo-pipas",
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware para proteger rotas (exceto login/cadastro)
app.use((req, res, next) => {
  // Permite acesso se estiver logado
  if (req.session.usuarioLogado) {
    return next();
  }
  // Permite acesso às rotas de login/cadastro/logout/token/public
  if (
    req.path.startsWith("/login") ||
    req.path.startsWith("/cadastro") ||
    req.path.startsWith("/logout") ||
    req.path.startsWith("/public")
  ) {
    return next();
  }
  // Redireciona para login se não autenticado
  res.redirect("/login");
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.static(path.join(__dirname, "src/public")));
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);

// Adicione esta linha ANTES do adminRoutes para garantir prioridade
app.get("/dashboard", dashboard);
app.get("/login/token", tokenForm);
app.post("/login/token", validarToken);

app.use("/", adminRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
