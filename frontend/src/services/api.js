const API_BASE_URL = 'http://127.0.0.1:8000/api';

const getAuthToken = () => {
    return localStorage.getItem('token');
};

export const api = {
    login: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });
        
        if (!response.ok) {
            throw new Error('Login failed');
        }
        
        return response.json();
    },

    getProducts: async (filters = {}) => {
        const queryParams = new URLSearchParams();
        if (filters.category) {
            queryParams.append('category', filters.category);
        }
        if (filters.search) {
            queryParams.append('search', filters.search);
        }

        const url = `${API_BASE_URL}/products${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
        
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        return response.json();
    },

    getProduct: async (productId) => {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Product not found.');
            }
            throw new Error('Failed to fetch product.');
        }

        return response.json();
    }
};