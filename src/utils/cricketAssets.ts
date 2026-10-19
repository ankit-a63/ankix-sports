// ANKIX SPORTS - Cricket Assets & Brand Palette Utilities

export interface TeamIdentity {
  name: string;
  code: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  badgeSvg: string;
}

// Crisp vector badges for cricket teams
export const TEAM_IDENTITIES: Record<string, TeamIdentity> = {
  'India': {
    name: 'India',
    code: 'IND',
    primaryColor: '#0055A5',
    secondaryColor: '#FF9933',
    textColor: '#FFFFFF',
    badgeSvg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#0055A5" stroke="#FF9933" stroke-width="2"/><circle cx="20" cy="20" r="6" stroke="#FFFFFF" stroke-width="1.5"/><path d="M20 8v24M8 20h24M11.5 11.5l17 17M11.5 28.5l17-17" stroke="#FFFFFF" stroke-width="0.8"/><text x="20" y="37" font-size="6" font-weight="bold" fill="#FFFFFF" text-anchor="middle">IND</text></svg>`
  },
  'Australia': {
    name: 'Australia',
    code: 'AUS',
    primaryColor: '#006B3F',
    secondaryColor: '#FDB913',
    textColor: '#FFFFFF',
    badgeSvg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#006B3F" stroke="#FDB913" stroke-width="2"/><polygon points="20,10 22,17 29,17 23,21 25,28 20,24 15,28 17,21 11,17 18,17" fill="#FDB913"/><text x="20" y="37" font-size="6" font-weight="bold" fill="#FFFFFF" text-anchor="middle">AUS</text></svg>`
  },
  'England': {
    name: 'England',
    code: 'ENG',
    primaryColor: '#192C55',
    secondaryColor: '#C8102E',
    textColor: '#FFFFFF',
    badgeSvg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#192C55" stroke="#C8102E" stroke-width="2"/><path d="M12 20h16M20 12v16" stroke="#C8102E" stroke-width="4"/><path d="M12 20h16M20 12v16" stroke="#FFFFFF" stroke-width="2"/><text x="20" y="37" font-size="6" font-weight="bold" fill="#FFFFFF" text-anchor="middle">ENG</text></svg>`
  },
  'South Africa': {
    name: 'South Africa',
    code: 'SA',
    primaryColor: '#007A4D',
    secondaryColor: '#FFB612',
    textColor: '#FFFFFF',
    badgeSvg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#007A4D" stroke="#FFB612" stroke-width="2"/><path d="M10 14h20L20 28Z" fill="#FFB612"/><text x="20" y="37" font-size="6" font-weight="bold" fill="#FFFFFF" text-anchor="middle">SA</text></svg>`
  },
  'New Zealand': {
    name: 'New Zealand',
    code: 'NZ',
    primaryColor: '#111827',
    secondaryColor: '#00F59B',
    textColor: '#FFFFFF',
    badgeSvg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#111827" stroke="#FFFFFF" stroke-width="2"/><path d="M14 26 C14 16, 26 12, 26 12 C26 22, 14 26, 14 26 Z" fill="#FFFFFF"/><text x="20" y="37" font-size="6" font-weight="bold" fill="#FFFFFF" text-anchor="middle">NZ</text></svg>`
  },
  'Pakistan': {
    name: 'Pakistan',
    code: 'PAK',
    primaryColor: '#01411C',
    secondaryColor: '#FFFFFF',
    textColor: '#FFFFFF',
    badgeSvg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#01411C" stroke="#FFFFFF" stroke-width="2"/><path d="M22 14 A 7 7 0 1 0 25 25 A 9 9 0 1 1 22 14 Z" fill="#FFFFFF"/><polygon points="23,17 24,19 26,19 24.5,20.5 25,23 23,21.5 21,23 21.5,20.5 20,19 22,19" fill="#FFFFFF"/><text x="20" y="37" font-size="6" font-weight="bold" fill="#FFFFFF" text-anchor="middle">PAK</text></svg>`
  },
  'Chennai Super Kings': {
    name: 'Chennai Super Kings',
    code: 'CSK',
    primaryColor: '#F9CD05',
    secondaryColor: '#0055A5',
    textColor: '#070B14',
    badgeSvg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#F9CD05" stroke="#0055A5" stroke-width="2"/><text x="20" y="24" font-size="12" font-weight="900" fill="#070B14" text-anchor="middle">CSK</text></svg>`
  },
  'Mumbai Indians': {
    name: 'Mumbai Indians',
    code: 'MI',
    primaryColor: '#004BA0',
    secondaryColor: '#D1AB3E',
    textColor: '#FFFFFF',
    badgeSvg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#004BA0" stroke="#D1AB3E" stroke-width="2"/><text x="20" y="24" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">MI</text></svg>`
  },
  'Royal Challengers Bengaluru': {
    name: 'Royal Challengers Bengaluru',
    code: 'RCB',
    primaryColor: '#2B2A29',
    secondaryColor: '#EC1C24',
    textColor: '#FFFFFF',
    badgeSvg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#2B2A29" stroke="#EC1C24" stroke-width="2"/><text x="20" y="24" font-size="11" font-weight="900" fill="#EC1C24" text-anchor="middle">RCB</text></svg>`
  },
  'Kolkata Knight Riders': {
    name: 'Kolkata Knight Riders',
    code: 'KKR',
    primaryColor: '#3A225D',
    secondaryColor: '#F3BE27',
    textColor: '#FFFFFF',
    badgeSvg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#3A225D" stroke="#F3BE27" stroke-width="2"/><text x="20" y="24" font-size="11" font-weight="900" fill="#F3BE27" text-anchor="middle">KKR</text></svg>`
  },
  'Gujarat Titans': {
    name: 'Gujarat Titans',
    code: 'GT',
    primaryColor: '#1B2133',
    secondaryColor: '#BCA06B',
    textColor: '#FFFFFF',
    badgeSvg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#1B2133" stroke="#BCA06B" stroke-width="2"/><text x="20" y="24" font-size="12" font-weight="900" fill="#BCA06B" text-anchor="middle">GT</text></svg>`
  },
  'Rajasthan Royals': {
    name: 'Rajasthan Royals',
    code: 'RR',
    primaryColor: '#EA1A85',
    secondaryColor: '#254AA5',
    textColor: '#FFFFFF',
    badgeSvg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#EA1A85" stroke="#254AA5" stroke-width="2"/><text x="20" y="24" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">RR</text></svg>`
  },
  'Sunrisers Hyderabad': {
    name: 'Sunrisers Hyderabad',
    code: 'SRH',
    primaryColor: '#F26522',
    secondaryColor: '#000000',
    textColor: '#FFFFFF',
    badgeSvg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#F26522" stroke="#000000" stroke-width="2"/><text x="20" y="24" font-size="11" font-weight="900" fill="#FFFFFF" text-anchor="middle">SRH</text></svg>`
  },
};

export function getTeamIdentity(teamName: string): TeamIdentity {
  if (!teamName) {
    return {
      name: 'Unknown',
      code: 'UNK',
      primaryColor: '#1E2D4A',
      secondaryColor: '#00F59B',
      textColor: '#FFFFFF',
      badgeSvg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#1E2D4A" stroke="#00F59B" stroke-width="1.5"/><text x="20" y="24" font-size="10" font-weight="bold" fill="#00F59B" text-anchor="middle">CRK</text></svg>`
    };
  }

  // Exact or partial match
  const normalized = teamName.trim();
  for (const [key, identity] of Object.entries(TEAM_IDENTITIES)) {
    if (normalized.toLowerCase() === key.toLowerCase() || normalized.toLowerCase().includes(key.toLowerCase())) {
      return identity;
    }
  }

  // Generate dynamic deterministic monogram badge
  const words = normalized.split(/\s+/).filter(Boolean);
  let code = '';
  if (words.length >= 3) {
    code = (words[0][0] + words[1][0] + words[2][0]).toUpperCase();
  } else if (words.length === 2) {
    code = (words[0][0] + words[1][0]).toUpperCase();
  } else {
    code = normalized.slice(0, 3).toUpperCase();
  }

  return {
    name: normalized,
    code,
    primaryColor: '#131D35',
    secondaryColor: '#00F59B',
    textColor: '#FFFFFF',
    badgeSvg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#131D35" stroke="#00F59B" stroke-width="1.5"/><text x="20" y="24" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">${code}</text></svg>`
  };
}

// Convert UTC or GMT date string to Asia/Kolkata (IST) display format
export function formatToIST(dateString: string | undefined): { date: string; time: string; full: string } {
  if (!dateString) {
    return { date: 'TBD', time: 'TBD', full: 'Schedule Pending' };
  }

  try {
    const parsed = new Date(dateString);
    if (isNaN(parsed.getTime())) {
      return { date: dateString, time: '', full: dateString };
    }

    const formatter = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const parts = formatter.formatToParts(parsed);
    const day = parts.find(p => p.type === 'day')?.value || '';
    const month = parts.find(p => p.type === 'month')?.value || '';
    const weekday = parts.find(p => p.type === 'weekday')?.value || '';
    const year = parts.find(p => p.type === 'year')?.value || '';
    const hour = parts.find(p => p.type === 'hour')?.value || '';
    const minute = parts.find(p => p.type === 'minute')?.value || '';
    const dayPeriod = parts.find(p => p.type === 'dayPeriod')?.value?.toUpperCase() || '';

    const formattedDate = `${weekday}, ${day} ${month} ${year}`;
    const formattedTime = `${hour}:${minute} ${dayPeriod} IST`;

    return {
      date: formattedDate,
      time: formattedTime,
      full: `${formattedDate} • ${formattedTime}`
    };
  } catch {
    return { date: dateString, time: '', full: dateString };
  }
}

// Calculate countdown string to match start
export function getCountdown(targetDateStr: string | undefined): string | null {
  if (!targetDateStr) return null;
  const target = new Date(targetDateStr).getTime();
  if (isNaN(target)) return null;

  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) return 'Starts soon';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  if (days > 1) return `in ${days} days`;
  if (days === 1) return `in 1 day ${hours}h`;
  if (hours > 0) return `in ${hours}h ${minutes}m`;
  return `in ${minutes}m`;
}
