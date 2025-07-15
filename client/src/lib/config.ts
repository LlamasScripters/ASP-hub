// Configuration de l'API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  API_PREFIX: '/api',
  get FULL_URL() {
    return `${this.BASE_URL}${this.API_PREFIX}`;
  }
};

// URL complète de l'API pour l'usage interne
export const API_BASE_URL = API_CONFIG.FULL_URL;

// Export pour compatibilité avec le code existant
export default API_CONFIG;
