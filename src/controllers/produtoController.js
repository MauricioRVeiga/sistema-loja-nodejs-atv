import Usuario from "../models/Usuario.js";
import Cliente from "../models/Cliente.js";
import Sequelize from "sequelize";
const Op = Sequelize.Op;

export const dashboard = async (req, res) => {
  try {
    // Busca todos os clientes sem filtro por 'cadastro'
    const clientes = await Cliente.findAll();
    const totalClientes = await Cliente.count();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);
    const novos7d = await Cliente.count({
      where: {
        createdAt: { [Op.gte]: seteDiasAtras },
      },
    });
    res.render("dashboard", { clientes, totalClientes, novos7d });
  } catch (error) {
    res.status(500).send("Erro ao buscar clientes");
  }
};

export const listarProdutos = (req, res) => {
  const produtos = [
    {
      nome: "Pacote de Pipas 50cm",
      descricao: "Pipa de 50cm ideal para ventos fortes.",
      imagem:
        "https://cdn.awsli.com.br/300x300/2660/2660666/produto/257095630/73-e15zq9kn9i.png",
      estoque: 50,
      vendasHoje: 2,
      custoCompra: 120.0,
      precoVenda: 20.0,
      categoria: " Pipas",
    },
    {
      nome: "Pacote de Pipas 40cm",
      descricao: "Pipa de 40cm ideal para ventos médios/fortes.",
      imagem:
        "https://cdn.awsli.com.br/300x300/2660/2660666/produto/258840019/91-iyr6ip0sh3.png",
      estoque: 20,
      vendasHoje: 12,
      custoCompra: 100.0,
      precoVenda: 18.0,
      categoria: " Pipas",
    },
    {
      nome: "Linha Shark clássica",
      descricao: "Linha Shark clássica ideal para pipas de 50cm.",
      imagem: "https://cf.shopee.com.br/file/br-11134201-22120-e7jrif3pwmlv24",
      estoque: 18,
      vendasHoje: 4,
      custoCompra: 80.0,
      precoVenda: 150.0,
      categoria: "Linhas",
    },
    {
      nome: "Linha Shark Gold",
      descricao: "Linha Shark Gold ideal para pipas de 40cm.",
      imagem:
        "https://www.gelasanbrasil.com.br/image/cache/catalog/Produtos/02-900x1200.jpg",
      estoque: 19,
      vendasHoje: 3,
      custoCompra: 170.0,
      precoVenda: 200.0,
      categoria: " Linhas",
    },
    {
      nome: "Carretel 35cm",
      descricao: "Carretel feito de plástico",
      imagem:
        "https://a-static.mlcdn.com.br/800x600/carretilha-carretel-para-linha-de-pipa-com-rolamentos-255cm-bocao/asprepresentacoes/13836171366/710784721295ab383bb4fd8c8baa78bf.jpeg",
      estoque: 40,
      vendasHoje: 3,
      custoCompra: 10.0,
      precoVenda: 25.0,
      categoria: " Carreteis",
    },
    {
      nome: "Rabiola",
      descricao: "Pacote de rabiola contendo 10 pacotes de 2 metros",
      imagem:
        "https://down-br.img.susercontent.com/file/br-11134211-7r98o-lt7c0csapcsc1b",
      estoque: 60,
      vendasHoje: 25,
      custoCompra: 5.0,
      precoVenda: 10.0,
      categoria: " Rabiolas",
    },
  ];

  res.render("produtos", { produtos });
};
