import { allDestinationsData } from '../data/destinationsData';

const STORAGE_KEY = 'bf_destinations_v1';
export const DESTINATIONS_EVENT = 'bf_destinations_updated';

// Default 8 destinations
export const initialEightDestinations = [
  {
    id: 1,
    slug: 'africa',
    name: 'Africa',
    tagline: 'Untamed Wilderness & Safaris',
    heroImage: allDestinationsData['africa']?.heroImage || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80',
    countriesCount: allDestinationsData['africa']?.countries?.length || 11,
    isPublished: true
  },
  {
    id: 2,
    slug: 'america',
    name: 'America',
    tagline: 'From Coast to Coast',
    heroImage: allDestinationsData['america']?.heroImage || 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1920&q=80',
    countriesCount: allDestinationsData['america']?.countries?.length || 10,
    isPublished: true
  },
  {
    id: 3,
    slug: 'asian-countries',
    name: 'Asian Countries',
    tagline: 'Heritage to Himalayas',
    heroImage: allDestinationsData['asian-countries']?.heroImage || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80',
    countriesCount: allDestinationsData['asian-countries']?.countries?.length || 10,
    isPublished: true
  },
  {
    id: 4,
    slug: 'australia',
    name: 'Australia',
    tagline: 'Wonders Down Under',
    heroImage: allDestinationsData['australia']?.heroImage || 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1920&q=80',
    countriesCount: allDestinationsData['australia']?.countries?.length || 6,
    isPublished: true
  },
  {
    id: 5,
    slug: 'europe',
    name: 'Europe',
    tagline: 'Timeless Charm & Grandeur',
    heroImage: allDestinationsData['europe']?.heroImage || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=80',
    countriesCount: allDestinationsData['europe']?.countries?.length || 8,
    isPublished: true
  },
  {
    id: 6,
    slug: 'indian-ocean',
    name: 'Indian Ocean',
    tagline: 'Your Island Story Begins Here',
    heroImage: allDestinationsData['indian-ocean']?.heroImage || 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=80',
    countriesCount: allDestinationsData['indian-ocean']?.countries?.length || 4,
    isPublished: true
  },
  {
    id: 7,
    slug: 'middle-east',
    name: 'Middle East',
    tagline: 'Desert Dunes & Gilded Skylines',
    heroImage: allDestinationsData['middle-east']?.heroImage || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80',
    countriesCount: allDestinationsData['middle-east']?.countries?.length || 5,
    isPublished: true
  },
  {
    id: 8,
    slug: 'south-asia',
    name: 'South Asia',
    tagline: 'Heritage to Himalayas',
    heroImage: allDestinationsData['south-asia']?.heroImage || 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1920&q=80',
    countriesCount: allDestinationsData['south-asia']?.countries?.length || 6,
    isPublished: true
  }
];

export function getStoredDestinations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialEightDestinations;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Ensure all 8 slugs exist
      return initialEightDestinations.map(item => {
        const found = parsed.find(p => p.slug === item.slug);
        return found ? { ...item, ...found } : item;
      });
    }
  } catch (err) {
    console.error('Error reading destinations from storage', err);
  }
  return initialEightDestinations;
}

export function saveStoredDestinations(destinations) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(destinations));
    window.dispatchEvent(new Event(DESTINATIONS_EVENT));
  } catch (err) {
    console.error('Error saving destinations to storage', err);
  }
}

export function toggleDestinationPublish(slug) {
  const list = getStoredDestinations();
  const updated = list.map(d => {
    if (d.slug === slug) {
      return { ...d, isPublished: !d.isPublished };
    }
    return d;
  });
  saveStoredDestinations(updated);
  return updated.find(d => d.slug === slug);
}

export function updateDestinationDetails(slug, details) {
  const list = getStoredDestinations();
  const updated = list.map(d => {
    if (d.slug === slug) {
      return { ...d, ...details };
    }
    return d;
  });
  saveStoredDestinations(updated);
  return updated.find(d => d.slug === slug);
}

export function isDestinationPublished(slug) {
  const cleanSlug = (slug || '').toLowerCase().replace(/^\//, '');
  const list = getStoredDestinations();
  const found = list.find(d => d.slug === cleanSlug);
  return found ? Boolean(found.isPublished) : true;
}

export function getPublishedDestinations() {
  const list = getStoredDestinations();
  return list.filter(d => d.isPublished !== false);
}
