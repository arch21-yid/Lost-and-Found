import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:8081/api/items';

const translations = {
  en: {
    hubTitle: "INSA Lost & Found Hub",
    reportTitle: "Report an Item",
    editTitle: "Edit Item",
    formTitle: "Item Title (e.g., ID Card, Keys)",
    formDesc: "Description",
    formLoc: "Location Found/Lost",
    formContact: "Your Contact Info",
    formStatus: "Status",
    submitBtn: "Submit Report",
    updateBtn: "Update Item",
    cancelBtn: "Cancel",
    recentReports: "Recent Reports",
    searchPlaceholder: "Search items, locations...",
    all: "All Statuses",
    lost: "Lost Only",
    found: "Found Only",
    editBtn: "Edit",
    resolveBtn: "Resolve",
    deleteBtn: "Delete"
  },
  am: {
    hubTitle: "ኢንሳ የጠፉ እና የተገኙ ዕቃዎች ማዕከል",
    reportTitle: "ዕቃ ይመዝግቡ",
    editTitle: "ዕቃ አስተካክል",
    formTitle: "የዕቃው ስም (ለምሳሌ፦ መታወቂያ፣ ቁልፍ)",
    formDesc: "መግለጫ",
    formLoc: "የተገኘበት/የጠፋበት ቦታ",
    formContact: "የመገናኛ መረጃ",
    formStatus: "ሁኔታ",
    submitBtn: "መዝግብ",
    updateBtn: "አስቀምጥ",
    cancelBtn: "ሰርዝ",
    recentReports: "የቅርብ ጊዜ ዘገባዎች",
    searchPlaceholder: "ዕቃዎችን፣ ቦታዎችን ይፈልጉ...",
    all: "ሁሉንም",
    lost: "የጠፉ ብቻ",
    found: "የተገኙ ብቻ",
    editBtn: "አስተካክል",
    resolveBtn: "ተፈትቷል",
    deleteBtn: "ሰርዝ"
  }
};

function App() {
  const [items, setItems] = useState([]);
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('light');
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState({ title: '', description: '', location: '', contactInfo: '', status: 'LOST' });

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    fetchItems();
  }, [theme]);

  const fetchItems = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const method = currentItem.id ? 'PUT' : 'POST';
    const url = currentItem.id ? `${API_URL}/${currentItem.id}` : API_URL;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentItem)
    });

    setCurrentItem({ title: '', description: '', location: '', contactInfo: '', status: 'LOST' });
    setIsEditing(false);
    fetchItems();
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const handleResolve = async (item) => {
    const updated = { ...item, status: item.status === 'RESOLVED' ? 'LOST' : 'RESOLVED' };
    await fetch(`${API_URL}/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    });
    fetchItems();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  const filteredItems = items.filter(item => {
    const matchesFilter = filter === 'ALL' || item.status === filter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase()) ||
                          item.location.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container">
      <div className="header">
        <h1>{t.hubTitle}</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn" onClick={() => setLang(lang === 'en' ? 'am' : 'en')}>
            🌐 {lang === 'en' ? 'አማርኛ' : 'English'}
          </button>
          <button className="btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>

      <div className="main-grid">
        <div className="card">
          <h2 className="form-title">{isEditing ? t.editTitle : t.reportTitle}</h2>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>{t.formTitle}</label>
              <input value={currentItem.title} onChange={e => setCurrentItem({...currentItem, title: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>{t.formDesc}</label>
              <textarea rows="3" value={currentItem.description} onChange={e => setCurrentItem({...currentItem, description: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>{t.formLoc}</label>
              <input value={currentItem.location} onChange={e => setCurrentItem({...currentItem, location: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>{t.formContact}</label>
              <input value={currentItem.contactInfo} onChange={e => setCurrentItem({...currentItem, contactInfo: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>{t.formStatus}</label>
              <select value={currentItem.status} onChange={e => setCurrentItem({...currentItem, status: e.target.value})}>
                <option value="LOST">Lost</option>
                <option value="FOUND">Found</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              {isEditing ? t.updateBtn : t.submitBtn}
            </button>
            {isEditing && (
              <button type="button" className="btn" style={{ marginTop: '8px', width: '100%' }} onClick={() => { setIsEditing(false); setCurrentItem({ title: '', description: '', location: '', contactInfo: '', status: 'LOST' }); }}>
                {t.cancelBtn}
              </button>
            )}
          </form>
        </div>

        <div>
          <h2 style={{ marginTop: 0, fontSize: '1.3rem' }}>{t.recentReports}</h2>
          
          <div className="controls-bar">
            <input 
              type="text" 
              className="search-input" 
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className={`btn btn-all ${filter === 'ALL' ? 'btn-active' : ''}`} onClick={() => setFilter('ALL')}>{t.all}</button>
            <button className={`btn btn-lost ${filter === 'LOST' ? 'btn-active' : ''}`} onClick={() => setFilter('LOST')}>{t.lost}</button>
            <button className={`btn btn-found ${filter === 'FOUND' ? 'btn-active' : ''}`} onClick={() => setFilter('FOUND')}>{t.found}</button>
          </div>

          <div className="reports-grid">
            {filteredItems.map(item => (
              <div key={item.id} className={`item-card card-${item.status}`}>
                <div className="item-details">
                  <h3>
                    {item.title}
                    <span className={`status-badge status-${item.status}`}>{item.status}</span>
                  </h3>
                  <p>{item.description}</p>
                  <div className="item-meta">
                    <span>📍 {item.location}</span>
                    <span>📞 {item.contactInfo}</span>
                  </div>
                </div>
                <div className="action-buttons">
                  <button className="btn" onClick={() => handleEdit(item)}>{t.editBtn}</button>
                  <button className="btn" onClick={() => handleResolve(item)}>{t.resolveBtn}</button>
                  <button className="btn" style={{ color: 'var(--danger-red)', borderColor: 'var(--danger-red-border)' }} onClick={() => handleDelete(item.id)}>{t.deleteBtn}</button>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="card" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '32px' }}>
              No reports found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;