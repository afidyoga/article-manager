import api from './api';
import fallback from '../mock/db.json';

export async function fetchWithFallback(path: string, params = {}) {
  try {
    const res = await api.get(path, { params });
    return res.data;
  } catch (e) {
    console.warn('Fetch failed for', path, 'using fallback');
    if (path.includes('/articles')) return fallback.articles;
    if (path.includes('/categories')) return fallback.categories;
    if (path.includes('/users')) return fallback.users;
    return [];
  }
}
export default fetchWithFallback;
