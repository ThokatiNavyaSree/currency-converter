import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CurrencyConverterForm.css';

const CurrencyConverterForm = () => {
  const [topCryptos, setTopCryptos] = useState([]);
  const [sourceCrypto, setSourceCrypto] = useState('bitcoin');
  const [amount, setAmount] = useState(1);
  const [targetCurrency, setTargetCurrency] = useState('usd');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);
  const baseURL = 'https://currency-converter-backend-pb4w.onrender.com/';

  useEffect(() => {
    // Fetch the list of top cryptocurrencies from your backend
    axios.get(`${baseURL}/api/top-cryptos`)
      .then((response) => setTopCryptos(response.data))
      .catch((error) => setError(error.message));
  }, []);

  const handleConvert = () => {
    // Make a request to your backend to perform currency conversion
    axios.get(`${baseURL}/api/convert`, {
      params: { sourceCrypto, amount, targetCurrency },
    })
      .then((response) => setConvertedAmount(response.data.convertedAmount))
      .catch((error) => setError(error.response.data.error));
  };

  return (
    <div className="container">
      <h1 className='heading'>Currency Converter</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label className="label" htmlFor="sourceCrypto">Source Crypto:</label>
        <select id="sourceCrypto" value={sourceCrypto} onChange={(e) => setSourceCrypto(e.target.value)}>
          {topCryptos.map((crypto) => (
            <option key={crypto.id} value={crypto.id}>
              {crypto.name} ({crypto.symbol})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="label" htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="label" htmlFor="targetCurrency">Target Currency:</label>
        <select id="targetCurrency" value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
          {/* Can add more currency options as needed */}
        </select>
      </div>

      <button className="button" onClick={handleConvert}>Convert</button>

      {convertedAmount !== null && (
        <div className="form-group grid">
          <h2 className="label label-converted">Converted Amount:</h2>
          <p className='converted-value'>{convertedAmount} {targetCurrency.toUpperCase()}</p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverterForm;
