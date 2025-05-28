// Serviço simulado para envio de SMS (apenas console)
async function sendSMS(to, content) {
  console.log(`Simulando envio de SMS para ${to}: ${content}`);
  return { status: "simulado", to, content };
}

export { sendSMS };
