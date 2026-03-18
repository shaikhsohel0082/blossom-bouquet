import { BouquetData, SelectedFlower } from '@/types';
import { FLOWERS, CARD_THEMES, FONT_STYLES } from '@/data/constants';

/** Compress bouquet data into a URL-safe base64 string */
export function encodeBouquetData(data: BouquetData): string {
  const compact = {
    f: data.flowers.map(f => ({ i: f.flower.id, q: f.quantity })),
    c: {
      t: data.card.theme.id,
      m: data.card.message,
      r: data.card.recipientName,
      s: data.card.senderName,
      fs: data.card.fontStyle.id,
      tc: data.card.textColor,
    },
  };
  const json = JSON.stringify(compact);
  return btoa(encodeURIComponent(json));
}

/** Decode bouquet data from URL-safe base64 string */
export function decodeBouquetData(encoded: string): BouquetData | null {
  try {
    const json = decodeURIComponent(atob(encoded));
    const compact = JSON.parse(json);

    const flowers: SelectedFlower[] = compact.f
      .map((f: { i: string; q: number }) => {
        const flower = FLOWERS.find(fl => fl.id === f.i);
        return flower ? { flower, quantity: f.q } : null;
      })
      .filter(Boolean) as SelectedFlower[];

    const theme = CARD_THEMES.find(t => t.id === compact.c.t) || CARD_THEMES[0];
    const fontStyle = FONT_STYLES.find(fs => fs.id === compact.c.fs) || FONT_STYLES[0];

    return {
      id: '',
      flowers,
      card: {
        theme,
        message: compact.c.m || '',
        recipientName: compact.c.r || '',
        senderName: compact.c.s || '',
        fontStyle,
        textColor: compact.c.tc || 'hsl(20, 15%, 15%)',
      },
      createdAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}
