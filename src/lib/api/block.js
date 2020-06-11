import apiClient from './apiClient';

export const getCryptocurrencyInfo = () => apiClient.get(`/api/cryptocurrency`);
