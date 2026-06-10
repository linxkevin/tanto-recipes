import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../lib/api';

const CATEGORIES = [
  { key: 'howto',     label: '🎬 How To' },
  { key: 'recipes',   label: '📖 Recipes' },
  { key: 'prep',      label: '🔪 Prep' },
  { key: 'reference', label: '📋 Reference' },
];

const EMPTY = {
  category_id: '',
  icon: '🍽',
  title_en: '',
  meta_en: '',
  ingredients_en: [{ name: '', amount: '' }],
  steps_en: [''],
  video_url: '',
  is_active: true,
  sort_order: 0,
};

export default function AdminRecipeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [form, setForm] = useState(EMPTY);
  const [dbCategories, setDbCategories] = useState([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getCategories().then(setDbCategories);
    if (!isNew) {
      api.getRecipe(id).then(r => {
        setForm({
          category_id: r.category_id,
          icon: r.icon || '🍽',
          title_en: r.title_en,
          meta_en: r.meta_en || '',
          ingredients_en: r.ingredients_en?.length ? r.ingredients_en : [{ name: '', amount: '' }],
          steps_en: r.steps_en?.length ? r.steps_en : [''],
          video_url: r.video_url || '',
          is_active: r.is_active,
          sort_order: r.sort_order || 0,
        });
        setLoading(false);
      });
    }
  }, [id, isNew]);

  function setField(key, value) {
    setForm(f => ({ ...f, [key]: value }));
  }

  // Ingredients
  function setIng(i, key, value) {
    const ings = [...form.ingredients_en];
    ings[i] = { ...ings[i], [key]: value };
    setField('ingredients_en', ings);
  }
  function addIng() { setField('ingredients_en', [...form.ingredients_en, { name: '', amount: '' }]); }
  function removeIng(i) { setField('ingredients_en', form.ingredients_en.filter((_, idx) => idx !== i)); }

  // Steps
  function setStep(i, value) {
    const steps = [...form.steps_en];
    steps[i] = value;
    setField('steps_en', steps);
  }
  function addStep() { setField('steps_en', [...form.steps_en, '']); }
  function removeStep(i) { setField('steps_en', form.steps_en.filter((_, idx) => idx !== i)); }

  async function handleSave() {
    if (!form.title_en.trim()) { setError('Title is required'); return; }
    if (!form.category_id) { setError('Category is required'); return; }
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        ingredients_en: form.ingredients_en.filter(i => i.name.trim()),
        steps_en: form.steps_en.filter(s => s.trim()),
      };
      if (isNew) {
        await api.createRecipe(payload);
      } else {
        await api.updateRecipe(id, payload);
      }
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #ddd', fontSize: 15, fontFamily: 'inherit' };
  const labelStyle = { fontSize: 13, color: '#555', display: 'block', marginBottom: 6, fontWeight: 500 };
  const sectionStyle = { background: '#fff', border: '1px solid #e8e8e0', borderRadius: 14, padding: 20, marginBottom: 16 };

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: '#aaa' }}>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f0' }}>
      <header style={{ background: '#fff', borderBottom: '1px solid #e8e8e0', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate('/admin')} style={{ background: 'none', border: 'none', color: '#1D9E75', fontSize: 15, cursor: 'pointer' }}>← Back</button>
          <span style={{ fontSize: 16, fontWeight: 700 }}>{isNew ? 'New recipe' : 'Edit recipe'}</span>
        </div>
        <button onClick={handleSave} disabled={saving}
          style={{ padding: '10px 24px', background: '#1D9E75', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          {saving ? 'Saving...' : 'Save'}
        </button>
      </header>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '24px 20px' }}>
        {error && <div style={{ background: '#fdf0f0', border: '1px solid #fcc', borderRadius: 10, padding: '12px 16px', marginBottom: 16, color: '#c0392b', fontSize: 14 }}>{error}</div>}

        {/* Basic info */}
        <div style={sectionStyle}>
          <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Basic info</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Icon</label>
              <input value={form.icon} onChange={e => setField('icon', e.target.value)} style={{ ...inputStyle, textAlign: 'center', fontSize: 22 }} />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select value={form.category_id} onChange={e => setField('category_id', e.target.value)} style={{ ...inputStyle }}>
                <option value="">Select category...</option>
                {dbCategories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label_en}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Title</label>
            <input value={form.title_en} onChange={e => setField('title_en', e.target.value)} style={inputStyle} placeholder="e.g. Gyoza — how to cook" />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Subtitle / meta</label>
            <input value={form.meta_en} onChange={e => setField('meta_en', e.target.value)} style={inputStyle} placeholder="e.g. Griddle method" />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Google Drive video URL</label>
            <input value={form.video_url} onChange={e => setField('video_url', e.target.value)} style={inputStyle} placeholder="https://drive.google.com/file/d/..." />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input type="checkbox" id="is_active" checked={form.is_active} onChange={e => setField('is_active', e.target.checked)} style={{ width: 18, height: 18 }} />
            <label htmlFor="is_active" style={{ fontSize: 14, color: '#333' }}>Visible to staff</label>
          </div>
        </div>

        {/* Ingredients */}
        <div style={sectionStyle}>
          <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Ingredients & amounts</h2>
          {form.ingredients_en.map((ing, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 36px', gap: 8, marginBottom: 8 }}>
              <input value={ing.name} onChange={e => setIng(i, 'name', e.target.value)} style={inputStyle} placeholder="Ingredient name" />
              <input value={ing.amount} onChange={e => setIng(i, 'amount', e.target.value)} style={inputStyle} placeholder="Amount" />
              <button onClick={() => removeIng(i)} style={{ borderRadius: 8, border: '1px solid #fcc', background: '#fff', color: '#c0392b', cursor: 'pointer', fontSize: 18 }}>×</button>
            </div>
          ))}
          <button onClick={addIng} style={{ marginTop: 8, padding: '8px 16px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 13, cursor: 'pointer' }}>+ Add ingredient</button>
        </div>

        {/* Steps */}
        <div style={sectionStyle}>
          <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Steps</h2>
          {form.steps_en.map((step, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr 36px', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
              <span style={{ width: 26, height: 26, borderRadius: '50%', background: '#E1F5EE', color: '#0F6E56', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>{i + 1}</span>
              <textarea value={step} onChange={e => setStep(i, e.target.value)} rows={2}
                style={{ ...inputStyle, resize: 'vertical' }} placeholder={`Step ${i + 1}`} />
              <button onClick={() => removeStep(i)} style={{ marginTop: 8, borderRadius: 8, border: '1px solid #fcc', background: '#fff', color: '#c0392b', cursor: 'pointer', fontSize: 18, height: 36 }}>×</button>
            </div>
          ))}
          <button onClick={addStep} style={{ marginTop: 8, padding: '8px 16px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 13, cursor: 'pointer' }}>+ Add step</button>
        </div>
      </div>
    </div>
  );
}
