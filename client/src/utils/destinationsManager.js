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
    heroImage: allDestinationsData['africa']?.heroImage || '/assets/images/sean-robertson-5ftxFgXLtkI-unsplash-scaled.jpg',
    countriesCount: allDestinationsData['africa']?.countries?.length || 11,
    isPublished: true
  },
  {
    id: 2,
    slug: 'america',
    name: 'America',
    tagline: 'From Coast to Coast',
    heroImage: allDestinationsData['america']?.heroImage || '/assets/images/sidra-s-KHYCVWu-Tng-unsplash-scaled.jpg',
    countriesCount: allDestinationsData['america']?.countries?.length || 10,
    isPublished: true
  },
  {
    id: 3,
    slug: 'asian-countries',
    name: 'Asian Countries',
    tagline: 'Heritage to Himalayas',
    heroImage: allDestinationsData['asian-countries']?.heroImage || '/assets/images/xavier-coiffic-ByAHlRiTQjo-unsplash-scaled.jpg',
    countriesCount: allDestinationsData['asian-countries']?.countries?.length || 10,
    isPublished: true
  },
  {
    id: 4,
    slug: 'australia',
    name: 'Australia',
    tagline: 'Wonders Down Under',
    heroImage: allDestinationsData['australia']?.heroImage || '/assets/images/family-holidays-nsw-main.jpg',
    countriesCount: allDestinationsData['australia']?.countries?.length || 6,
    isPublished: true
  },
  {
    id: 5,
    slug: 'europe',
    name: 'Europe',
    tagline: 'Timeless Charm & Grandeur',
    heroImage: allDestinationsData['europe']?.heroImage || '/assets/images/snow-dusts-spires-famed-neuschwanstein-castle.jpg',
    countriesCount: allDestinationsData['europe']?.countries?.length || 8,
    isPublished: true
  },
  {
    id: 6,
    slug: 'indian-ocean',
    name: 'Indian Ocean',
    tagline: 'Your Island Story Begins Here',
    heroImage: allDestinationsData['indian-ocean']?.heroImage || '/assets/images/idyllic-tropical-island-resort-hotel-luxury-travel-concept-generative-ai.jpg',
    countriesCount: allDestinationsData['indian-ocean']?.countries?.length || 4,
    isPublished: true
  },
  {
    id: 7,
    slug: 'middle-east',
    name: 'Middle East',
    tagline: 'Desert Dunes & Gilded Skylines',
    heroImage: allDestinationsData['middle-east']?.heroImage || '/assets/images/metro-railway-station-dubai-night-concept-modern-urban-architecture.jpg',
    countriesCount: allDestinationsData['middle-east']?.countries?.length || 5,
    isPublished: true
  },
  {
    id: 8,
    slug: 'south-asia',
    name: 'South Asia',
    tagline: 'Heritage to Himalayas',
    heroImage: allDestinationsData['south-asia']?.heroImage || '/assets/images/swayambhunath-ancient-religious-architecture-kathmandu-valley-nepal.jpg',
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
