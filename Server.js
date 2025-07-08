require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const ACCESS_TOKEN_HERE = process.env.MP_ACCESS_TOKEN;

app.post("/webhook", async (req, res) => {
  const { id, topic } = req.body;

  console.log("Webhook recebido:", req.body);

  if (topic === "payment") {
    try {
      const response = await axios.get(
        `https://api.mercadopago.com/v1/payments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN_HERE}`
          }
        }
      );

      const payment = response.data;

      if (payment.status === "approved") {
        console.log("💰 Pagamento aprovado para:", payment.payer.email);
      }
    } catch (err) {
      console.error("Erro consultando pagamento:", err.message);
    }
  }

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Servidor webhook escutando na porta 3000 🚀");
});


