import axios from 'axios';
const API_URL = 'http://192.168.1.7:3000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const financeService = {
  getTransacoes: async (mes, ano) => {
    try {
      const params = mes && ano ? { mes, ano } : {};
      const response = await api.get('/transacoes', { params });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      return [];
    }
  },

  addTransacao: async (transacao) => {
    try {
      const response = await api.post('/transacoes', transacao);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      throw error;
    }
  },

  getCategorias: async () => {
    try {
      const response = await api.get('/categorias');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      return [];
    }
  },

  getCartoes: async () => {
    try {
      const response = await api.get('/cartoes');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar cartões:', error);
      return [];
    }
  },

  getResumo: async (mes, ano) => {
    try {
      const response = await api.get('/resumo', { params: { mes, ano } });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar resumo:', error);
      return null;
    }
  },
};