// Local storage management for recap settings and data
// This can be replaced with database calls when backend is connected

import { GitHubRecap } from './mockData';

const STORAGE_KEYS = {
  RECAPS: 'github_recaps',
  SETTINGS: 'recap_settings',
  ADMIN_AUTH: 'admin_authenticated',
};

export interface RecapSettings {
  username: string;
  showHeatmap: boolean;
  showLanguages: boolean;
  showRepositories: boolean;
  showInsights: boolean;
  isPublic: boolean;
  reducedMotion: boolean;
  compactView: boolean;
  debugMode: boolean;
}

export interface StoredRecap {
  id: string;
  data: GitHubRecap;
  createdAt: string;
  updatedAt: string;
  isVisible: boolean;
}

const DEFAULT_SETTINGS: RecapSettings = {
  username: 'nishur31',
  showHeatmap: true,
  showLanguages: true,
  showRepositories: true,
  showInsights: true,
  isPublic: true,
  reducedMotion: false,
  compactView: false,
  debugMode: false,
};

// Settings management
export function getSettings(): RecapSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.warn('Failed to load settings:', e);
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: Partial<RecapSettings>): RecapSettings {
  const current = getSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
  return updated;
}

// Recap storage management
export function getStoredRecaps(): StoredRecap[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RECAPS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Failed to load recaps:', e);
  }
  return [];
}

export function getRecapByYear(year: number): StoredRecap | null {
  const recaps = getStoredRecaps();
  return recaps.find((r) => r.data.year === year) || null;
}

export function saveRecap(data: GitHubRecap): StoredRecap {
  const recaps = getStoredRecaps();
  const existingIndex = recaps.findIndex((r) => r.data.year === data.year);
  
  const recap: StoredRecap = {
    id: `recap-${data.year}`,
    data,
    createdAt: existingIndex >= 0 ? recaps[existingIndex].createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isVisible: true,
  };

  if (existingIndex >= 0) {
    recaps[existingIndex] = recap;
  } else {
    recaps.push(recap);
  }

  // Sort by year descending
  recaps.sort((a, b) => b.data.year - a.data.year);
  
  localStorage.setItem(STORAGE_KEYS.RECAPS, JSON.stringify(recaps));
  return recap;
}

export function updateRecapVisibility(year: number, isVisible: boolean): void {
  const recaps = getStoredRecaps();
  const recap = recaps.find((r) => r.data.year === year);
  if (recap) {
    recap.isVisible = isVisible;
    recap.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.RECAPS, JSON.stringify(recaps));
  }
}

export function deleteRecap(year: number): void {
  const recaps = getStoredRecaps();
  const filtered = recaps.filter((r) => r.data.year !== year);
  localStorage.setItem(STORAGE_KEYS.RECAPS, JSON.stringify(filtered));
}

// Simple admin auth (replace with real auth when backend is ready)
export function isAdminAuthenticated(): boolean {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
}

export function setAdminAuthenticated(value: boolean): void {
  localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, value ? 'true' : 'false');
}

// Admin password check (simple for now - replace with proper auth)
const ADMIN_PASSWORD = 'recap2025'; // In production, this would be server-side

export function verifyAdminPassword(password: string): boolean {
  const isValid = password === ADMIN_PASSWORD;
  if (isValid) {
    setAdminAuthenticated(true);
  }
  return isValid;
}

export function logoutAdmin(): void {
  setAdminAuthenticated(false);
}
