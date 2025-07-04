const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    
    // Sačuvaj token
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('tokenType', data.token_type);
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getProducts = async (category = null, search = null) => {
  try {
    const token = localStorage.getItem('token');
    
    let url = `${API_BASE_URL}/products`;
    const params = new URLSearchParams();
    
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return await response.json();
  } catch (error) {
    console.error('Products error:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return await response.json();
  } catch (error) {
    console.error('Product detail error:', error);
    throw error;
  }
};

// Export kao productsAPI objekat za kompatibilnost
export const productsAPI = {
  getProducts,
  getProductById,
};

// Default export
export default {
  loginUser,
  getProducts,
  getProductById,
  productsAPI,
};
