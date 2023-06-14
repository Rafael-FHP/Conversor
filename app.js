const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/convert', async (req, res) => {
  const amount = parseFloat(req.body.amount);
  const from = req.body.from;
  const to = req.body.to;
  const apiKey = 'efb8458b6ac44a64a54a81d9db7b870c';

  try {
    const response = await axios.get(
      `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`
    );

    const rates = response.data.rates;
    const exchangeRate = rates[to] / rates[from];
    const result = (amount * exchangeRate).toFixed(2);

    res.send({ result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Erro na conversão de moeda.' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});