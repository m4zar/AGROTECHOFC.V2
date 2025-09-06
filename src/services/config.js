// Configuração global do AgroInfo
// Config do AgroInfo (clima via Open‑Meteo, sem chave)

const userConfig = window.AGRO_CONFIG || {};

const defaultConfig = {
  weather: {
    baseUrl: 'https://api.open-meteo.com/v1',
    lang: 'pt_br',
    units: 'metric',
  },
  market: {
    baseUrl: 'https://api.agroinfo.com/v1',
    timeout: 30000,
  },
};

// Nenhuma API key necessária para Open‑Meteo

// Shallow merge suficiente para este caso
export const AGRO_CONFIG = Object.assign({}, defaultConfig, userConfig);

export default AGRO_CONFIG;