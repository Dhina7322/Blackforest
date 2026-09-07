const STORAGE_KEY = 'bf_expertise_cards_v1';
export const EXPERTISE_EVENT = 'bf_expertise_updated';

export const initialTenPartners = [
  {
    id: 1,
    name: 'PERU',
    subtitle: 'Travel Specialist',
    image: '/assets/images/WhatsApp-Image-2026-08-17-at-20.35.24.jpeg',
    url: 'https://www.peru.travel',
    isPublished: true
  },
  {
    id: 2,
    name: 'KOREA',
    subtitle: 'Travel Specialist',
    image: '/assets/images/WhatsApp-Image-2026-08-17-at-20.35.21-2.jpeg',
    url: 'https://english.visitkorea.or.kr',
    isPublished: true
  },
  {
    id: 3,
    name: 'GREECE',
    subtitle: 'Tourism Specialist',
    image: '/assets/images/WhatsApp-Image-2026-08-17-at-20.35.22-1.jpeg',
    url: 'https://www.visitgreece.gr',
    isPublished: true
  },
  {
    id: 4,
    name: 'JAPAN',
    subtitle: 'Travel Specialist',
    image: '/assets/images/WhatsApp-Image-2026-08-17-at-20.35.22.jpeg',
    url: 'https://www.japan.travel',
    isPublished: true
  },
  {
    id: 5,
    name: 'IATA',
    subtitle: 'TIDS Certified',
    image: '/assets/images/WhatsApp-Image-2026-08-17-at-20.35.23-1.jpeg',
    url: 'https://www.iata.org',
    isPublished: true
  },
  {
    id: 6,
    name: 'PORTUGAL',
    subtitle: 'Tourism Partner',
    image: '/assets/images/WhatsApp-Image-2026-08-17-at-20.35.24-1.jpeg',
    url: 'https://www.visitportugal.com',
    isPublished: true
  },
  {
    id: 7,
    name: 'PERU',
    subtitle: 'Urban Explorer Specialist',
    image: '/assets/images/WhatsApp-Image-2026-08-17-at-20.35.18.jpeg',
    url: 'https://www.peru.travel',
    isPublished: true
  },
  {
    id: 8,
    name: 'ALGARVE',
    subtitle: 'Sustainable Experiences Specialist',
    image: '/assets/images/WhatsApp-Image-2026-08-17-at-20.35.22-2.jpeg',
    url: 'https://www.visitalgarve.pt',
    isPublished: true
  },
  {
    id: 9,
    name: 'SPAIN',
    subtitle: 'Destination Specialist',
    image: '/assets/images/WhatsApp-Image-2026-07-24-at-09.32.10-removebg-preview.png',
    url: 'https://www.spain.info',
    isPublished: true
  },
  {
    id: 10,
    name: 'TARGET MARKETS',
    subtitle: 'Specialist',
    image: '/assets/images/WhatsApp-Image-2026-08-17-at-20.35.19-1.jpeg',
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
