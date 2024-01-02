const express = require('express');
const cors = require('cors');
const cryptoRoutes = require('./routes/cryptoRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Parse environment variables
const sourceCrypto = process.env.SOURCE_CRYPTO || 'defaultCrypto';
const amount = parseFloat(process.env.AMOUNT) || 0;
const targetCurrency = process.env.TARGET_CURRENCY || 'defaultCurrency';

app.use('/api', cryptoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
