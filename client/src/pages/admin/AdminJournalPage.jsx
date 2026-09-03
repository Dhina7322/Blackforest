import React, { useState, useEffect } from 'react';
import { BookOpen, PlusCircle, Edit, Trash2, X, ExternalLink, Calendar } from 'lucide-react';
import { articleService } from '../../services/allServices';
import { useToast } from '../../context/ToastContext';

export default function AdminJournalPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Travel Guides',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    excerpt: '',
    content: '',
    tags: 'travel, adventure, luxury',
    status: 'published'
  });

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await articleService.getAll();
      if (res.success && res.data) {
        setArticles(res.data.articles || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Travel Guides',
      coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      excerpt: '',
      content: '',
      tags: 'travel, luxury, destination',
      status: 'published'
    });
    setModalOpen(true);
  };

  const openEdit = (art) => {
    setEditingId(art.id);
    setFormData({
      title: art.title || '',
      slug: art.slug || '',
      category: art.category || 'Travel Guides',
      coverImage: art.coverImage || '',
      excerpt: art.excerpt || '',
      content: art.content || '',
      tags: Array.isArray(art.tags) ? art.tags.join(', ') : '',
      status: art.status || 'published'
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
    };

    try {
      if (editingId) {
        await articleService.update(editingId, payload);
        showToast('Article updated', 'success');
      } else {
        await articleService.create(payload);
        showToast('Article published', 'success');
      }
      setModalOpen(false);
      fetchArticles();
    } catch {
      showToast('Error saving article', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      await articleService.delete(id);
      showToast('Article deleted', 'info');
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Travel Journal & Blog CMS</h2>
          <p className="text-xs text-gray-500">Author travel advice, trekking essentials, and destination journals.</p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2 bg-[#10221b] text-[#f29727] text-xs font-bold uppercase rounded-xl flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Write Article</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <div key={art.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col justify-between">
            <div className="relative h-44">
              <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 text-[#f29727] text-[10px] font-bold uppercase rounded-full">
                {art.category}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-gray-400 block mb-1">
                  {new Date(art.publishedAt || art.createdAt).toLocaleDateString()}
                </span>
                <h3 className="font-serif font-bold text-base text-[#10221b] line-clamp-2 mb-2">{art.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-4">{art.excerpt}</p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${art.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                  {art.status}
                </span>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(art)} className="p-1.5 text-gray-400 hover:text-gray-900"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(art.id)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden border">
            <div className="p-5 bg-[#10221b] text-white flex justify-between">
              <h3 className="font-bold text-base">{editingId ? 'Edit Article' : 'Compose Article'}</h3>
              <button onClick={() => setModalOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block font-bold mb-1">Title *</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg">
                    <option value="Trekking & Safety">Trekking & Safety</option>
                    <option value="Mountain Expeditions">Mountain Expeditions</option>
                    <option value="Gear & Equipment">Gear & Equipment</option>
                    <option value="Travel Guides">Travel Guides</option>
                    <option value="Luxury Escapes">Luxury Escapes</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg">
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold mb-1">Cover Image URL</label>
                <input type="text" value={formData.coverImage} onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg" />
              </div>
              <div>
                <label className="block font-bold mb-1">Excerpt</label>
                <textarea rows={2} value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="w-full p-2 bg-gray-50 border rounded-lg" />
              </div>
              <div>
                <label className="block font-bold mb-1">Article Body *</label>
                <textarea rows={6} required value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full p-2 bg-gray-50 border rounded-lg font-mono text-xs" />
              </div>
              <div>
                <label className="block font-bold mb-1">Tags (Comma-separated)</label>
                <input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border rounded-lg" />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#10221b] text-[#f29727] font-bold rounded-lg">Save Article</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
