import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import './StaffApp.css';

const CATEGORIES = [
  { key: 'all',       icon: '',   label: { en: 'All',       ja: 'すべて', zh: '全部' } },
  { key: 'howto',     icon: '🎬', label: { en: 'How To',    ja: 'How To', zh: '教程' } },
  { key: 'recipes',   icon: '📖', label: { en: 'Recipes',   ja: 'レシピ', zh: '食谱' } },
  { key: 'prep',      icon: '🔪', label: { en: 'Prep',      ja: '仕込み', zh: '备料' } },
  { key: 'reference', icon: '📋', label: { en: 'Reference', ja: '参照',   zh: '参考' } },
];

function getEmbedUrl(url) {
  if (!url) return null;

  // YouTube
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?playsinline=1&rel=0`;

  // Google Drive (fallback)
  const gd = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (gd) return `https://drive.google.com/file/d/${gd[1]}/preview`;

  return url;
}

function DriveVideo({ url, title }) {
  const embedUrl = getEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <div className="video-wrap">
      <iframe
        src={embedUrl}
        title={title}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}



function getField(recipe, field, lang) {
  // Fallback: lang -> en -> ja
  return recipe[`${field}_${lang}`] || recipe[`${field}_en`] || recipe[`${field}_ja`] || '';
}

function getJsonField(recipe, field, lang) {
  const val = recipe[`${field}_${lang}`];
  if (val && val.length) return val;
  const en = recipe[`${field}_en`];
  if (en && en.length) return en;
  return recipe[`${field}_ja`] || [];
}

export default function StaffApp() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('en');

  useEffect(() => {
    Promise.all([api.getCategories(), api.getRecipes()])
      .then(([cats, recs]) => { setCategories(cats); setRecipes(recs); })
      .finally(() => setLoading(false));
  }, []);

  const filtered = recipes.filter(r => {
    const matchCat = activeCat === 'all' || r.category_key === activeCat;
    const q = search.toLowerCase();
    const title = getField(r, 'title', lang).toLowerCase();
    const meta = getField(r, 'meta', lang).toLowerCase();
    const matchSearch = !q || title.includes(q) || meta.includes(q);
    return matchCat && matchSearch;
  });

  const activeCatData = CATEGORIES.find(c => c.key === activeCat) || CATEGORIES[0];

  const LangBtn = ({ l, label }) => (
    <button className={`lang-btn${lang === l ? ' active' : ''}`} onClick={() => setLang(l)}>{label}</button>
  );

  if (selected) {
    const title = getField(selected, 'title', lang);
    const meta = getField(selected, 'meta', lang);
    const ingredients = getJsonField(selected, 'ingredients', lang);
    const steps = getJsonField(selected, 'steps', lang);

    return (
      <div className="staff-app">
        <header className="staff-header">
          <span className="staff-title">🍜 Tanto Recipes</span>
          <div className="lang-row">
            <LangBtn l="en" label="EN" />
            <LangBtn l="ja" label="JP" />
            <LangBtn l="zh" label="CN" />
          </div>
        </header>
        <div className="detail-container">
          <button className="back-btn" onClick={() => setSelected(null)}>← Back</button>
          <div className="detail-card">
            {selected.video_url ? (
              <DriveVideo url={selected.video_url} title={title} />
            ) : (
              <div className="video-placeholder no-video">No video for this recipe</div>
            )}
            <div className="detail-body">
              <h1 className="detail-title">{selected.icon} {title}</h1>
              <span className="cat-badge" style={{ background: selected.color_badge, color: selected.color_text }}>
                {selected.category_label} · {meta}
              </span>
              <hr className="divider" />
              <h2 className="section-heading">
                { lang === 'ja' ? '材料・分量' : lang === 'zh' ? '食材与用量' : 'Ingredients & amounts' }
              </h2>
              <table className="ing-table">
                <tbody>
                  {(ingredients || []).map((ing, i) => (
                    <tr key={i}><td>{ing.name}</td><td className="amount">{ing.amount}</td></tr>
                  ))}
                </tbody>
              </table>
              <hr className="divider" />
              <h2 className="section-heading">
                { lang === 'ja' ? '手順' : lang === 'zh' ? '步骤' : 'Steps' }
              </h2>
              {(steps || []).map((step, i) => (
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
          <LangBtn l="en" label="EN" />
          <LangBtn l="ja" label="JP" />
          <LangBtn l="zh" label="CN" />
        </div>
      </header>

      <div className="search-bar">
        <input className="search-input" type="text"
          placeholder={lang === 'ja' ? 'レシピを検索...' : lang === 'zh' ? '搜索菜谱...' : 'Search recipes...'}
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="cat-bar">
        {CATEGORIES.map(cat => (
          <button key={cat.key} className={`cat-btn${activeCat === cat.key ? ' active' : ''}`}
            onClick={() => setActiveCat(cat.key)}>
            {cat.icon && <span>{cat.icon} </span>}{cat.label[lang] || cat.label.en}
          </button>
        ))}
      </div>

      <div className="content">
        {activeCat !== 'all' && (
          <div className="section-header">
            <div className="section-label">{activeCatData.icon} {activeCatData.label[lang]}</div>
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
              <p className="empty">
                {lang === 'ja' ? 'レシピが見つかりません' : lang === 'zh' ? '未找到菜谱' : 'No recipes found.'}
              </p>
            ) : filtered.map(r => (
              <div key={r.id} className="recipe-card" onClick={() => setSelected(r)}>
                <div className="card-icon" style={{ background: r.color_badge }}>{r.icon}</div>
                <div className="card-title">{getField(r, 'title', lang)}</div>
                <div className="card-meta">{getField(r, 'meta', lang)}</div>
                {r.video_url && <div className="has-video">▶ Video</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
