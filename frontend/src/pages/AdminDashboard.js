import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const CAT_LABELS = {
  howto: '🎬 How To',
  recipes: '📖 Recipes',
  prep: '🔪 Prep',
  reference: '📋 Reference',
};

export default function AdminDashboard() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState('all');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadRecipes();
  }, []);

  async function loadRecipes() {
    try {
      const data = await api.getAllRecipes();
      setRecipes(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    await api.deleteRecipe(id);
    setRecipes(recipes.filter(r => r.id !== id));
    setConfirmDelete(null);
  }

  function logout() {
    localStorage.removeItem('tanto_token');
    navigate('/admin/login');
  }

  const filtered = filterCat === 'all' ? recipes : recipes.filter(r => r.category_key === filterCat);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f0' }}>
      <header style={{ background: '#fff', borderBottom: '1px solid #e8e8e0', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div>
          <span style={{ fontSize: 17, fontWeight: 700 }}>🍜 Tanto Recipes</span>
          <span style={{ fontSize: 13, color: '#888', marginLeft: 10 }}>Admin</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <a href="/" style={{ fontSize: 13, color: '#1D9E75', textDecoration: 'none' }}>View staff app ↗</a>
          <button onClick={logout} style={{ fontSize: 13, color: '#888', background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
        </div>
      </header>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>Recipes</h1>
          <button
            onClick={() => navigate('/admin/recipe/new')}
            style={{ padding: '10px 20px', background: '#1D9E75', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
          >
            + New recipe
          </button>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {['all', 'howto', 'recipes', 'prep', 'reference'].map(k => (
            <button key={k} onClick={() => setFilterCat(k)}
              style={{ padding: '6px 14px', borderRadius: 999, border: '1px solid #ddd', fontSize: 13, cursor: 'pointer', background: filterCat === k ? '#1D9E75' : '#fff', color: filterCat === k ? '#fff' : '#555' }}>
              {k === 'all' ? 'All' : CAT_LABELS[k]}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: 40 }}>Loading...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.map(r => (
              <div key={r.id} style={{ background: '#fff', border: '1px solid #e8e8e0', borderRadius: 12, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 24 }}>{r.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{r.title_en}</span>
                    {!r.is_active && <span style={{ fontSize: 11, background: '#f0f0e8', color: '#888', padding: '2px 8px', borderRadius: 6 }}>Hidden</span>}
                    {r.video_url && <span style={{ fontSize: 11, color: '#1D9E75' }}>▶ Video</span>}
                  </div>
                  <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>
                    {CAT_LABELS[r.category_key]} · {r.meta_en}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => navigate(`/admin/recipe/${r.id}`)}
                    style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 13, cursor: 'pointer' }}>
                    Edit
                  </button>
                  <button onClick={() => setConfirmDelete(r)}
                    style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #fcc', background: '#fff', color: '#c0392b', fontSize: 13, cursor: 'pointer' }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <p style={{ color: '#aaa', textAlign: 'center', padding: 40 }}>No recipes in this category.</p>}
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: 340, textAlign: 'center' }}>
            <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Delete recipe?</p>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>"{confirmDelete.title_en}" will be permanently deleted.</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmDelete(null)}
                style={{ flex: 1, padding: 12, borderRadius: 10, border: '1px solid #ddd', background: '#fff', fontSize: 14, cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={() => handleDelete(confirmDelete.id)}
                style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: '#c0392b', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
