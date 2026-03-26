import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiRequest = async (url: string, options: any = {}) => {
  const { method = 'GET', data, headers = {} } = options;
  
  try {
    const config: any = {
      url,
      method,
      headers: { ...api.defaults.headers, ...headers },
    };
    if (data !== undefined) config.data = data;
    
    const response = await api(config);
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'API request failed',
      error: error.response?.data,
    };
  }
};
