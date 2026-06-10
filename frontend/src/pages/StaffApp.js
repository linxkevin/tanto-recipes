import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import './StaffApp.css';

const CATEGORIES = [
  { key: 'all', icon: '', label: 'All' },
  { key: 'howto', icon: '🎬', label: 'How To' },
  { key: 'recipes', icon: '📖', label: 'Recipes' },
  { key: 'prep', icon: '🔪', label: 'Prep' },
  { key: 'reference', icon: '📋', label: 'Reference' },
];

function driveEmbedUrl(url) {
  if (!url) return null;
  // Convert Google Drive share link to embed link
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
  return url;
}

export default function StaffApp() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getCategories(), api.getRecipes()])
      .then(([cats, recs]) => {
        setCategories(cats);
        setRecipes(recs);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = recipes.filter(r => {
    const matchCat = activeCat === 'all' || r.category_key === activeCat;
    const q = search.toLowerCase();
    const matchSearch = !q || r.title_en.toLowerCase().includes(q) || (r.meta_en || '').toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const activeCatData = CATEGORIES.find(c => c.key === activeCat) || CATEGORIES[0];

  if (selected) {
    const embedUrl = driveEmbedUrl(selected.video_url);
    return (
      <div className="staff-app">
        <header className="staff-header">
          <span className="staff-title">🍜 Tanto Recipes</span>
          <div className="lang-row">
            <button className="lang-btn active">EN</button>
            <button className="lang-btn disabled" title="Coming soon">JP</button>
            <button className="lang-btn disabled" title="Coming soon">CN</button>
          </div>
        </header>
        <div className="detail-container">
          <button className="back-btn" onClick={() => setSelected(null)}>← Back</button>
          <div className="detail-card">
            {embedUrl ? (
              <div className="video-wrap">
                <iframe
                  src={embedUrl}
                  title={selected.title_en}
                  allow="autoplay"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="video-placeholder no-video">No video for this recipe</div>
            )}
            <div className="detail-body">
              <h1 className="detail-title">{selected.icon} {selected.title_en}</h1>
              <span className="cat-badge" style={{ background: selected.color_badge, color: selected.color_text }}>
                {selected.category_label} · {selected.meta_en}
              </span>

              <hr className="divider" />
              <h2 className="section-heading">Ingredients & amounts</h2>
              <table className="ing-table">
                <tbody>
                  {(selected.ingredients_en || []).map((ing, i) => (
                    <tr key={i}>
                      <td>{ing.name}</td>
                      <td className="amount">{ing.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <hr className="divider" />
              <h2 className="section-heading">Steps</h2>
              {(selected.steps_en || []).map((step, i) => (
                <div className="step" key={i}>
                  <div className="step-num">{i + 1}</div>
                  <div className="step-text">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="staff-app">
      <header className="staff-header">
        <span className="staff-title">🍜 Tanto Recipes</span>
        <div className="lang-row">
          <button className="lang-btn active">EN</button>
          <button className="lang-btn disabled" title="Coming soon">JP</button>
          <button className="lang-btn disabled" title="Coming soon">CN</button>
        </div>
      </header>

      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="cat-bar">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            className={`cat-btn${activeCat === cat.key ? ' active' : ''}`}
            onClick={() => setActiveCat(cat.key)}
          >
            {cat.icon && <span>{cat.icon} </span>}{cat.label}
          </button>
        ))}
      </div>

      <div className="content">
        {activeCat !== 'all' && (
          <div className="section-header">
            <div className="section-label">{activeCatData.icon} {activeCatData.label}</div>
            <div className="section-sub">
              {categories.find(c => c.key === activeCat)?.sub_en || ''}
            </div>
          </div>
        )}

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="recipe-grid">
            {filtered.length === 0 ? (
              <p className="empty">No recipes found.</p>
            ) : filtered.map(r => (
              <div key={r.id} className="recipe-card" onClick={() => setSelected(r)}>
                <div className="card-icon" style={{ background: r.color_badge }}>{r.icon}</div>
                <div className="card-title">{r.title_en}</div>
                <div className="card-meta">{r.meta_en}</div>
                {r.video_url && <div className="has-video">▶ Video</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
