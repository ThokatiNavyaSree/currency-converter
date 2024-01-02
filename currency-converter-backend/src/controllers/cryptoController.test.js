const axios = require('axios');
const { getTopCryptos, validateInput, convertCurrency } = require('./cryptoController');

jest.mock('axios');

describe('Currency Converter Backend Tests', () => {
  it('should fetch top cryptocurrencies successfully', async () => {
    const mockResponse = {
      data: [{ id: 'bitcoin', name: 'Bitcoin' }],
    };

    axios.get.mockResolvedValue(mockResponse);

    const req = {};
    const res = { json: jest.fn() };

    await getTopCryptos(req, res);

    expect(res.json).toHaveBeenCalledWith(mockResponse.data);
    expect(res.json).toMatchSnapshot();
  });


  it('should convert currency successfully', async () => {
    const mockConversionData = {
      data: {
        bitcoin: { usd: 50000 },
      },
    };

    axios.get.mockResolvedValue(mockConversionData);

    const req = { query: { sourceCrypto: 'bitcoin', amount: 1, targetCurrency: 'usd' } };
    const res = { json: jest.fn() };

    await convertCurrency(req, res);

    expect(res.json).toHaveBeenCalledWith({ convertedAmount: 50000 });
    expect(res.json).toMatchSnapshot();
  });
});
