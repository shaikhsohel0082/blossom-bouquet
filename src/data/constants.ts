import { Flower, CardTheme, FontStyle } from '@/types';

export const FLOWERS: Flower[] = [
  { id: 'rose', name: 'Rose', emoji: '🌹', color: 'hsl(350, 55%, 65%)', description: 'Classic symbol of love' },
  { id: 'tulip', name: 'Tulip', emoji: '🌷', color: 'hsl(330, 50%, 60%)', description: 'Perfect spring beauty' },
  { id: 'sunflower', name: 'Sunflower', emoji: '🌻', color: 'hsl(45, 80%, 55%)', description: 'Radiant happiness' },
  { id: 'lily', name: 'Lily', emoji: '🪷', color: 'hsl(300, 30%, 75%)', description: 'Elegant purity' },
  { id: 'daisy', name: 'Daisy', emoji: '🌼', color: 'hsl(50, 80%, 70%)', description: 'Innocent charm' },
  { id: 'cherry-blossom', name: 'Cherry Blossom', emoji: '🌸', color: 'hsl(340, 60%, 80%)', description: 'Fleeting beauty' },
  { id: 'hibiscus', name: 'Hibiscus', emoji: '🌺', color: 'hsl(0, 60%, 55%)', description: 'Tropical warmth' },
  { id: 'lavender', name: 'Lavender', emoji: '💜', color: 'hsl(270, 40%, 65%)', description: 'Calming serenity' },
];

export const CARD_THEMES: CardTheme[] = [
  { id: 'birthday', name: 'Birthday', emoji: '🎂', bgClass: 'bg-gold-light', accentColor: 'hsl(38, 60%, 55%)' },
  { id: 'anniversary', name: 'Anniversary', emoji: '💍', bgClass: 'bg-rose-light', accentColor: 'hsl(350, 55%, 65%)' },
  { id: 'love', name: 'Love', emoji: '❤️', bgClass: 'bg-rose-light', accentColor: 'hsl(0, 65%, 55%)' },
  { id: 'congratulations', name: 'Congrats', emoji: '🎉', bgClass: 'bg-sage-light', accentColor: 'hsl(150, 25%, 35%)' },
  { id: 'thank-you', name: 'Thank You', emoji: '🙏', bgClass: 'bg-gold-light', accentColor: 'hsl(38, 60%, 55%)' },
  { id: 'get-well', name: 'Get Well', emoji: '💐', bgClass: 'bg-sage-light', accentColor: 'hsl(150, 20%, 50%)' },
];

export const FONT_STYLES: FontStyle[] = [
  { id: 'elegant', name: 'Elegant', className: 'font-display' },
  { id: 'classic', name: 'Classic', className: 'font-body' },
  { id: 'script', name: 'Script', className: 'font-script' },
  { id: 'handwritten', name: 'Handwritten', className: 'font-handwritten' },
];

export const TEXT_COLORS = [
  { id: 'dark', value: 'hsl(20, 15%, 15%)', name: 'Dark' },
  { id: 'rose', value: 'hsl(350, 55%, 40%)', name: 'Rose' },
  { id: 'sage', value: 'hsl(150, 25%, 30%)', name: 'Sage' },
  { id: 'gold', value: 'hsl(38, 50%, 40%)', name: 'Gold' },
  { id: 'lavender', value: 'hsl(270, 30%, 45%)', name: 'Lavender' },
];
