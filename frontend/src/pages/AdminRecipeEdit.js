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
  title_ja: '', meta_ja: '',
  ingredients_ja: [{ name: '', amount: '' }],
  steps_ja: [''],
  title_en: '', meta_en: '',
  ingredients_en: [{ name: '', amount: '' }],
  steps_en: [''],
  title_zh: '', meta_zh: '',
  ingredients_zh: [{ name: '', amount: '' }],
  steps_zh: [''],
  video_url: '',
  is_active: true,
  sort_order: 0,
};

const LANG_TABS = [
  { key: 'ja', label: '🇯🇵 日本語', primary: true },
  { key: 'en', label: '🇺🇸 English' },
  { key: 'zh', label: '🇨🇳 中文' },
];

export default function AdminRecipeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [form, setForm] = useState(EMPTY);
  const [dbCategories, setDbCategories] = useState([]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState('');
  const [activeLang, setActiveLang] = useState('ja');

  useEffect(() => {
    api.getCategories().then(setDbCategories);
    if (!isNew) {
      (api.getAdminRecipe ? api.getAdminRecipe(id) : api.getRecipe(id)).then(r => {
        setForm({
          category_id: r.category_id,
          icon: r.icon || '🍽',
          title_ja: r.title_ja || '', meta_ja: r.meta_ja || '',
          ingredients_ja: r.ingredients_ja?.length ? r.ingredients_ja : [{ name: '', amount: '' }],
          steps_ja: r.steps_ja?.length ? r.steps_ja : [''],
          title_en: r.title_en || '', meta_en: r.meta_en || '',
          ingredients_en: r.ingredients_en?.length ? r.ingredients_en : [{ name: '', amount: '' }],
          steps_en: r.steps_en?.length ? r.steps_en : [''],
          title_zh: r.title_zh || '', meta_zh: r.meta_zh || '',
          ingredients_zh: r.ingredients_zh?.length ? r.ingredients_zh : [{ name: '', amount: '' }],
          steps_zh: r.steps_zh?.length ? r.steps_zh : [''],
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

  function setIng(lang, i, key, value) {
    const field = `ingredients_${lang}`;
    const ings = [...form[field]];
    ings[i] = { ...ings[i], [key]: value };
    setField(field, ings);
  }
  function addIng(lang) { setField(`ingredients_${lang}`, [...form[`ingredients_${lang}`], { name: '', amount: '' }]); }
  function removeIng(lang, i) { setField(`ingredients_${lang}`, form[`ingredients_${lang}`].filter((_, idx) => idx !== i)); }

  function setStep(lang, i, value) {
    const field = `steps_${lang}`;
    const steps = [...form[field]];
    steps[i] = value;
    setField(field, steps);
  }
  function addStep(lang) { setField(`steps_${lang}`, [...form[`steps_${lang}`], '']); }
  function removeStep(lang, i) { setField(`steps_${lang}`, form[`steps_${lang}`].filter((_, idx) => idx !== i)); }

  async function handleSave(retranslate = false) {
    const titleField = form.title_ja || form.title_en;
    if (!titleField?.trim()) { setError('タイトルを入力してください'); return; }
    if (!form.category_id) { setError('カテゴリを選択してください'); return; }
    setSaving(true);
    if (retranslate) setTranslating(true);
    setError('');
    try {
      const payload = {
        ...form,
        retranslate,
        ingredients_ja: form.ingredients_ja.filter(i => i.name.trim()),
        steps_ja: form.steps_ja.filter(s => s.trim()),
        ingredients_en: form.ingredients_en.filter(i => i.name.trim()),
        steps_en: form.steps_en.filter(s => s.trim()),
        ingredients_zh: form.ingredients_zh.filter(i => i.name.trim()),
        steps_zh: form.steps_zh.filter(s => s.trim()),
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
      setTranslating(false);
    }
  }

  const inputStyle = { width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #ddd', fontSize: 15, fontFamily: 'inherit' };
  const labelStyle = { fontSize: 13, color: '#555', display: 'block', marginBottom: 6, fontWeight: 500 };
  const sectionStyle = { background: '#fff', border: '1px solid #e8e8e0', borderRadius: 14, padding: 20, marginBottom: 16 };

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: '#aaa' }}>Loading...</div>;

  const lang = activeLang;

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f0' }}>
      <header style={{ background: '#fff', borderBottom: '1px solid #e8e8e0', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate('/admin')} style={{ background: 'none', border: 'none', color: '#1D9E75', fontSize: 15, cursor: 'pointer' }}>← Back</button>
          <span style={{ fontSize: 16, fontWeight: 700 }}>{isNew ? 'New recipe' : 'Edit recipe'}</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {!isNew && (
            <button onClick={() => handleSave(true)} disabled={saving}
              style={{ padding: '10px 16px', background: '#fff', color: '#1D9E75', border: '1px solid #1D9E75', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              {translating ? '翻訳中...' : '🔄 再翻訳'}
            </button>
          )}
          <button onClick={() => handleSave(false)} disabled={saving}
            style={{ padding: '10px 24px', background: '#1D9E75', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            {saving && !translating ? '保存中...' : '保存'}
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '24px 20px' }}>
        {error && <div style={{ background: '#fdf0f0', border: '1px solid #fcc', borderRadius: 10, padding: '12px 16px', marginBottom: 16, color: '#c0392b', fontSize: 14 }}>{error}</div>}

        {/* Basic info */}
        <div style={sectionStyle}>
          <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>基本情報</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>アイコン</label>
              <input value={form.icon} onChange={e => setField('icon', e.target.value)} style={{ ...inputStyle, textAlign: 'center', fontSize: 22 }} />
            </div>
            <div>
              <label style={labelStyle}>カテゴリ</label>
              <select value={form.category_id} onChange={e => setField('category_id', e.target.value)} style={inputStyle}>
                <option value="">カテゴリを選択...</option>
                {dbCategories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label_en}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>動画URL（YouTube）</label>
            <input value={form.video_url} onChange={e => setField('video_url', e.target.value)} style={inputStyle} placeholder="https://drive.google.com/file/d/..." />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input type="checkbox" id="is_active" checked={form.is_active} onChange={e => setField('is_active', e.target.checked)} style={{ width: 18, height: 18 }} />
            <label htmlFor="is_active" style={{ fontSize: 14, color: '#333' }}>スタッフに公開</label>
          </div>
        </div>

        {/* Language tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
          {LANG_TABS.map(t => (
            <button key={t.key} onClick={() => setActiveLang(t.key)}
              style={{ padding: '8px 18px', borderRadius: 10, border: '1px solid #ddd', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: activeLang === t.key ? '#1D9E75' : '#fff', color: activeLang === t.key ? '#fff' : '#555' }}>
              {t.label}{t.primary ? ' ★' : ''}
            </button>
          ))}
        </div>

        {lang === 'ja' && (
          <div style={{ background: '#fffbf0', border: '1px solid #f5e0a0', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#7a5a00' }}>
            ★ 日本語で入力して保存すると、英語と中国語が自動翻訳されます。
          </div>
        )}

        {/* Title / meta */}
        <div style={sectionStyle}>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>タイトル</label>
            <input value={form[`title_${lang}`]} onChange={e => setField(`title_${lang}`, e.target.value)} style={inputStyle}
              placeholder={lang === 'ja' ? '例：餃子の焼き方' : lang === 'en' ? 'e.g. Gyoza — how to cook' : '例：饺子的烹饪方法'} />
          </div>
          <div>
            <label style={labelStyle}>サブタイトル / メタ</label>
            <input value={form[`meta_${lang}`]} onChange={e => setField(`meta_${lang}`, e.target.value)} style={inputStyle}
              placeholder={lang === 'ja' ? '例：鉄板焼き方法' : lang === 'en' ? 'e.g. Griddle method' : '例：铁板烹饪方法'} />
          </div>
        </div>

        {/* Ingredients */}
        <div style={sectionStyle}>
          <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>材料・分量</h2>
          {form[`ingredients_${lang}`].map((ing, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 36px', gap: 8, marginBottom: 8 }}>
              <input value={ing.name} onChange={e => setIng(lang, i, 'name', e.target.value)} style={inputStyle} placeholder="材料名" />
              <input value={ing.amount} onChange={e => setIng(lang, i, 'amount', e.target.value)} style={inputStyle} placeholder="分量" />
              <button onClick={() => removeIng(lang, i)} style={{ borderRadius: 8, border: '1px solid #fcc', background: '#fff', color: '#c0392b', cursor: 'pointer', fontSize: 18 }}>×</button>
            </div>
          ))}
          <button onClick={() => addIng(lang)} style={{ marginTop: 8, padding: '8px 16px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 13, cursor: 'pointer' }}>+ 追加</button>
        </div>

        {/* Steps */}
        <div style={sectionStyle}>
          <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>手順</h2>
          {form[`steps_${lang}`].map((step, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '28px 1fr 36px', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
              <span style={{ width: 26, height: 26, borderRadius: '50%', background: '#E1F5EE', color: '#0F6E56', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>{i + 1}</span>
              <textarea value={step} onChange={e => setStep(lang, i, e.target.value)} rows={2}
                style={{ ...inputStyle, resize: 'vertical' }} placeholder={`手順 ${i + 1}`} />
              <button onClick={() => removeStep(lang, i)} style={{ marginTop: 8, borderRadius: 8, border: '1px solid #fcc', background: '#fff', color: '#c0392b', cursor: 'pointer', fontSize: 18, height: 36 }}>×</button>
            </div>
          ))}
          <button onClick={() => addStep(lang)} style={{ marginTop: 8, padding: '8px 16px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', fontSize: 13, cursor: 'pointer' }}>+ 追加</button>
        </div>
      </div>
    </div>
  );
}
