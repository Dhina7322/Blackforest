const STORAGE_KEY = 'bf_blogs_v1';
export const BLOGS_EVENT = 'bf_blogs_updated';

export const initialBlogs = [
  {
    id: 1,
    title: 'Safety measures for safe trekking in waterfalls',
    slug: 'safety-measures-for-safe-trekking-in-waterfalls',
    category: 'Trekking & Safety',
    author: 'Blackforest',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    date: 'July 10, 2021',
    coverImage: 'https://blackforestholidays.com/wp-content/uploads/2020/06/blog-010.jpg',
    detailImage1: 'https://blackforestholidays.com/wp-content/uploads/2021/07/blog-detail-001.jpg',
    detailImage2: 'https://blackforestholidays.com/wp-content/uploads/2021/07/blog-detail-002.jpg',
    excerpt: 'Est culpa architecto cum perferendis quasi in nihil aliquam ut temporibus porro. In repellendus similique sit ipsum recusandae At velit doloribus et temporibus dolorem.',
    content: `Waterfalls are some of the most captivating natural wonders on Earth, drawing millions of adventurers, hikers, and landscape photographers each year. The thunderous roar of plunging cascades, the cool mist floating through verdant canyons, and the thrill of climbing rocky trails make waterfall trekking an incomparable outdoor pursuit. However, the unique convergence of wet stone, sudden depth changes, and powerful water currents demands rigorous safety discipline.

Before you embark on your trail, always verify local weather forecasts and ranger advisories. Mountain watersheds can experience flash floods triggered by rainstorms miles upstream, causing riverbeds to surge violently without immediate warning. Wear dedicated trail shoes with aggressive Vibram or rubberized treads that grip slick river boulders, and avoid stepping on dark green algae-covered rocks which are as slippery as black ice.

Always keep a minimum safe distance of 15 to 20 feet from the slippery precipice of the waterfall crest. When crossing riverbeds or stream tributaries, unbuckle the hip belt and chest strap of your backpack; in the rare event of slipping into deep rapids, this allows you to jettison heavy gear instantly instead of being weighed down. Carry a compact waterproof dry bag for communication devices, dry warmth layers, and a whistle to signal trail companions across roaring waterfalls.`,
    quote: 'Vel saepe possimus sit corporis ipsa et quia fugit vel magnam iure rem voluptate voluptas ut earum tempora.',
    quoteAuthor: 'Barry Hilligan, Co Founder of Houzy',
    tags: ['Trekking', 'Waterfalls', 'Safety', 'Adventure', 'Travel Tips'],
    commentsCount: 1,
    comments: [
      {
        id: 1,
        author: 'adventor',
        date: 'July 21, 2021 at 3:11 pm',
        text: 'Sit amet consectetur adipiscing elit pellentesque habitant morbi. Vulputate mi sit amet mauris commodo quis imperdiet. Dui vivamus arcu felis bibendum ut.'
      }
    ],
    status: 'published'
  },
  {
    id: 2,
    title: 'Top 10 must-see spots for nature lovers',
    slug: 'top-10-must-see-spots',
    category: 'Trekking',
    author: 'Blackforest Specialist',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    date: 'August 15, 2024',
    coverImage: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80',
    detailImage1: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    detailImage2: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
    excerpt: 'From misty alpine peaks in the Swiss Alps to untamed African wildlife reserves and pristine tropical fjords, explore our premier nature trails.',
    content: `For travelers seeking tranquility and raw natural grandeur, few experiences rival venturing into the world's most pristine wilderness landscapes. Whether you are trekking along secluded mountain ridges or discovering hidden valleys, these destinations offer unmatched biodiversity and awe-inspiring vistas.

Our top curated spots encompass the serene glacial lakes of the Bernese Oberland, the sun-drenched savannahs of the Serengeti, and the ancient rainforests of New Zealand. Each destination features carefully maintained trail networks, sustainable eco-lodges, and knowledgeable local guides who ensure your trek leaves no trace while enriching your soul.`,
    quote: 'In every walk with nature one receives far more than he seeks.',
    quoteAuthor: 'John Muir, Naturalist',
    tags: ['Trekking', 'Nature', 'Wilderness', 'Mountains'],
    commentsCount: 0,
    comments: [],
    status: 'published'
  },
  {
    id: 3,
    title: 'Unforgettable cultural experiences in Kyoto',
    slug: 'kyoto-culture',
    category: 'Culture',
    author: 'Kyoto Cultural Concierge',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    date: 'September 2, 2024',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    detailImage1: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    detailImage2: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Wander through thousand-year-old cedar shrines, savor authentic Kaiseki dining, and experience Zen tranquility in historic Japanese gardens.',
    content: `Kyoto stands as the eternal cultural heart of Japan, preserving centuries of artistic mastery, spiritual devotion, and architectural wonder. Walking the narrow lantern-lit stone alleys of Gion in the twilight hours reveals glimpses of geiko and maiko gracefully traversing between wooden machiya tea houses.

A curated visit to Kyoto is incomplete without participating in a private Chado (tea ceremony) overseen by a master practitioner in a secluded garden pavilion. From the serene raked gravel of Ryoan-ji to the thousands of vermilion torii gates winding up the wooded sacred slopes of Fushimi Inari, Kyoto provides a profound respite from the bustling modern world.`,
    quote: 'To understand Japan, one must first feel the stillness of Kyoto in the dawn mist.',
    quoteAuthor: 'Kenji Takahashi, Kyoto Artisan',
    tags: ['Culture', 'Kyoto', 'Japan', 'Heritage'],
    commentsCount: 0,
    comments: [],
    status: 'published'
  },
  {
    id: 4,
    title: 'How to safely pack for a backcountry camping trip',
    slug: 'camping-guide',
    category: 'Camping',
    author: 'Outdoor Expedition Lead',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    date: 'October 12, 2024',
    coverImage: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80',
    detailImage1: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    detailImage2: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Mastering the art of lightweight packing, moisture management, and backcountry campsite safety for multi-day expeditions.',
    content: `Venturing beyond established campgrounds into the deep backcountry requires meticulous preparation. Every ounce on your back impacts your endurance, and every forgotten emergency essential can turn an invigorating wilderness journey into a hazardous trial.

Organize your backpack using the three-zone weight distribution system: lightweight sleeping gear at the bottom, heaviest items (tent, food canister, water filters) pressed close against your upper spine, and frequently accessed items (rain shell, first-aid kit, trail snacks) stored in the top lid. Always carry water purification tablets alongside your mechanical filter, and never store scented toiletries inside your sleeping tent in bear country.`,
    quote: 'Preparation is the supreme key to backcountry freedom and self-reliance.',
    quoteAuthor: 'Elena Vance, Alpine Guide',
    tags: ['Camping', 'Backcountry', 'Gear', 'Safety'],
    commentsCount: 0,
    comments: [],
    status: 'published'
  }
];

export function getStoredBlogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBlogs));
      return initialBlogs;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Ensure the waterfall article always exists
      const hasWaterfall = parsed.some(b => b.slug === 'safety-measures-for-safe-trekking-in-waterfalls');
      if (!hasWaterfall) {
        const merged = [initialBlogs[0], ...parsed];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        return merged;
      }
      return parsed;
    }
  } catch (err) {
    console.error('Error reading blogs from storage', err);
  }
  return initialBlogs;
}

export function saveStoredBlogs(blogs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    window.dispatchEvent(new Event(BLOGS_EVENT));
  } catch (err) {
    console.error('Error saving blogs to storage', err);
  }
}

export function getPublishedBlogs() {
  const list = getStoredBlogs();
  return list.filter(b => b.status === 'published');
}

export function getBlogBySlug(slug) {
  const clean = (slug || '').toLowerCase().replace(/^\//, '').replace(/\/$/, '');
  const list = getStoredBlogs();
  return list.find(b => b.slug === clean) || null;
}

export function createBlog(data) {
  const list = getStoredBlogs();
  const slug = (data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
  const newBlog = {
    id: Date.now(),
    title: data.title,
    slug,
    category: data.category || 'Travel Guides',
    author: data.author || 'Blackforest',
    authorAvatar: data.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    date: data.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    coverImage: data.coverImage || 'https://blackforestholidays.com/wp-content/uploads/2020/06/blog-010.jpg',
    detailImage1: data.detailImage1 || '',
    detailImage2: data.detailImage2 || '',
    excerpt: data.excerpt || '',
    content: data.content || '',
    quote: data.quote || '',
    quoteAuthor: data.quoteAuthor || '',
    tags: Array.isArray(data.tags) ? data.tags : (data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : []),
    commentsCount: 0,
    comments: [],
    status: data.status || 'published'
  };

  const updated = [newBlog, ...list];
  saveStoredBlogs(updated);
  return newBlog;
}

export function updateBlog(id, data) {
  const list = getStoredBlogs();
  const updated = list.map(b => {
    if (b.id === id || String(b.id) === String(id)) {
      return {
        ...b,
        ...data,
        tags: Array.isArray(data.tags) ? data.tags : (data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : b.tags)
      };
    }
    return b;
  });
  saveStoredBlogs(updated);
  return updated.find(b => b.id === id || String(b.id) === String(id));
}

export function deleteBlog(id) {
  const list = getStoredBlogs();
  const updated = list.filter(b => b.id !== id && String(b.id) !== String(id));
  saveStoredBlogs(updated);
  return true;
}

export function toggleBlogPublish(id) {
  const list = getStoredBlogs();
  const updated = list.map(b => {
    if (b.id === id || String(b.id) === String(id)) {
      const nextStatus = b.status === 'published' ? 'draft' : 'published';
      return { ...b, status: nextStatus };
    }
    return b;
  });
  saveStoredBlogs(updated);
  return updated.find(b => b.id === id || String(b.id) === String(id));
}
