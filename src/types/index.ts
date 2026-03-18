// Types for the digital gifting platform

export interface Flower {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
}

export interface SelectedFlower {
  flower: Flower;
  quantity: number;
}

export interface CardTheme {
  id: string;
  name: string;
  emoji: string;
  bgClass: string;
  accentColor: string;
}

export interface FontStyle {
  id: string;
  name: string;
  className: string;
}

export interface BouquetData {
  id: string;
  flowers: SelectedFlower[];
  card: {
    theme: CardTheme;
    message: string;
    recipientName: string;
    senderName: string;
    fontStyle: FontStyle;
    textColor: string;
  };
  createdAt: string;
}

export type BuilderStep = 'flowers' | 'card' | 'preview';
