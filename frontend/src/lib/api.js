const BASE = process.env.REACT_APP_API_URL || '/api';

function getToken() {
  return localStorage.getItem('tanto_token');
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
}

export const api = {
  // Auth
  login: (username, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),

  // Public
  getCategories: () => request('/categories'),
  getRecipes: (category) =>
    request(`/recipes${category && category !== 'all' ? `?category=${category}` : ''}`),
  getRecipe: (id) => request(`/recipes/${id}`),

  // Admin
  getAllRecipes: () => request('/recipes/admin/all'),
  getAdminRecipe: (id) => request(`/recipes/admin/${id}`),
  createRecipe: (data) => request('/recipes', { method: 'POST', body: JSON.stringify(data) }),
  updateRecipe: (id, data) => request(`/recipes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteRecipe: (id) => request(`/recipes/${id}`, { method: 'DELETE' }),
  reorderRecipes: (order) => request('/recipes/reorder/batch', { method: 'PUT', body: JSON.stringify({ order }) }),
};
