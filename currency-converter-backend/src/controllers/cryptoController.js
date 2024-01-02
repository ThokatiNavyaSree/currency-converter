const axios = require("axios");

exports.getTopCryptos = async (req, res) => {
  try {
    const topCryptos = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
        },
      }
    );

    res.json(topCryptos.data);
  } catch (error) {
    console.error(error);
    if (res && res.status) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

exports.validateInput = async (req, res, next) => {
  const { sourceCrypto, amount, targetCurrency } = req.query;

  // Check if required parameters are present
  if (!sourceCrypto || !amount || !targetCurrency) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  // Validate amount as a positive number
  if (!/^\d*\.?\d+$/.test(amount) || parseFloat(amount) <= 0) {
    return res.status(400).json({ error: "Amount must be a positive number" });
  }

  next();
};

exports.convertCurrency = async (req, res) => {
  try {
    const { sourceCrypto, amount, targetCurrency } = req.query;
    const conversionData = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: sourceCrypto,
          vs_currencies: targetCurrency,
        },
      }
    );

    const convertedAmount =
      amount * conversionData.data[sourceCrypto][targetCurrency];

    res.json({ convertedAmount });
  } catch (error) {
    console.error(error);
    if (res && res.status) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
