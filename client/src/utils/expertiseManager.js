const STORAGE_KEY = 'bf_expertise_cards_v1';
export const EXPERTISE_EVENT = 'bf_expertise_updated';

export const initialTenPartners = [
  {
    id: 1,
    name: 'PERU',
    subtitle: 'Travel Specialist',
    image: '/11.webp',
    url: 'https://www.peru.travel',
    isPublished: true
  },
  {
    id: 2,
    name: 'KOREA',
    subtitle: 'Travel Specialist',
    image: '/12.webp',
    url: 'https://english.visitkorea.or.kr',
    isPublished: true
  },
  {
    id: 3,
    name: 'GREECE',
    subtitle: 'Tourism Specialist',
    image: '/13.webp',
    url: 'https://www.visitgreece.gr',
    isPublished: true
  },
  {
    id: 4,
    name: 'JAPAN',
    subtitle: 'Travel Specialist',
    image: '/14.webp',
    url: 'https://www.japan.travel',
    isPublished: true
  },
  {
    id: 5,
    name: 'IATA',
    subtitle: 'TIDS Certified',
    image: '/15.webp',
    url: 'https://www.iata.org',
    isPublished: true
  },
  {
    id: 6,
    name: 'PORTUGAL',
    subtitle: 'Tourism Partner',
    image: '/16.webp',
    url: 'https://www.visitportugal.com',
    isPublished: true
  },
  {
    id: 7,
    name: 'PERU',
    subtitle: 'Urban Explorer Specialist',
    image: '/17.webp',
    url: 'https://www.peru.travel',
    isPublished: true
  },
  {
    id: 8,
    name: 'ALGARVE',
    subtitle: 'Sustainable Experiences Specialist',
    image: '/18.webp',
    url: 'https://www.visitalgarve.pt',
    isPublished: true
  },
  {
    id: 9,
    name: 'SPAIN',
    subtitle: 'Destination Specialist',
    image: '/19.webp',
    url: 'https://www.spain.info',
    isPublished: true
  },
  {
    id: 10,
    name: 'TARGET MARKETS',
    subtitle: 'Specialist',
    image: '/20.webp',
    url: 'https://www.peru.travel',
    isPublished: true
  }
];

export function getStoredExpertiseCards() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialTenPartners;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return initialTenPartners.map(item => {
        const found = parsed.find(p => p.id === item.id);
        return found ? { ...item, ...found } : item;
      });
    }
  } catch (err) {
    console.error('Error reading expertise cards from storage', err);
  }
  return initialTenPartners;
}

export function saveStoredExpertiseCards(cards) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    window.dispatchEvent(new Event(EXPERTISE_EVENT));
  } catch (err) {
    console.error('Error saving expertise cards to storage', err);
  }
}

export function toggleExpertiseCardPublish(id) {
  const list = getStoredExpertiseCards();
  const updated = list.map(c => {
    if (c.id === id) {
      return { ...c, isPublished: !c.isPublished };
    }
    return c;
  });
  saveStoredExpertiseCards(updated);
  return updated.find(c => c.id === id);
}

export function updateExpertiseCardDetails(id, details) {
  const list = getStoredExpertiseCards();
  const updated = list.map(c => {
    if (c.id === id) {
      return { ...c, ...details };
    }
    return c;
  });
  saveStoredExpertiseCards(updated);
  return updated.find(c => c.id === id);
}

export function getPublishedExpertiseCards() {
  const list = getStoredExpertiseCards();
  return list.filter(c => c.isPublished !== false);
}
