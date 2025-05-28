// src/controllers/pedidoController.js

export const listarPedidos = (req, res) => {
    const pedidos = [
      {
        numero: 'PED1555',
        cliente: 'Rubens Feijão',
        total: 'R$ 240,00',
        status: 'Entregue',
        data: '2025-06-12'
      },
      {
        numero: 'PED1556',
        cliente: 'Ailton Lira',
        total: 'R$ 100,00',
        status: 'Saiu para entrega',
        data: '2025-04-10'
      },
      {
        numero: 'PED1557',
        cliente: 'Antonio Luis',
        total: 'R$ 200,00',
        status: 'Em preparo',
        data: '2025-04-11'
      },
      {
        numero: 'PED1558',
        cliente: 'Anderson Luis',
        total: 'R$ 180,00',
        status: 'Em preparo',
        data: '2025-04-11'
      },
      {
        numero: 'PED1559',
        cliente: 'José Macia',
        total: 'R$ 300,00',
        status: 'Em preparo',
        data: '2025-04-11'
      }
    ];
  
    res.render('pedidos', { pedidos });
  };
  