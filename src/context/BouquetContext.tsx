import React, { createContext, useContext, useState, useCallback } from 'react';
import { SelectedFlower, CardTheme, FontStyle, BouquetData, BuilderStep } from '@/types';
import { CARD_THEMES, FONT_STYLES } from '@/data/constants';

interface BouquetContextType {
  // State
  selectedFlowers: SelectedFlower[];
  cardTheme: CardTheme;
  cardMessage: string;
  recipientName: string;
  senderName: string;
  fontStyle: FontStyle;
  textColor: string;
  currentStep: BuilderStep;

  // Actions
  addFlower: (flower: SelectedFlower['flower']) => void;
  removeFlower: (flowerId: string) => void;
  updateFlowerQuantity: (flowerId: string, quantity: number) => void;
  setCardTheme: (theme: CardTheme) => void;
  setCardMessage: (message: string) => void;
  setRecipientName: (name: string) => void;
  setSenderName: (name: string) => void;
  setFontStyle: (font: FontStyle) => void;
  setTextColor: (color: string) => void;
  setCurrentStep: (step: BuilderStep) => void;
  getTotalFlowers: () => number;
  saveBouquet: () => string;
  reset: () => void;
}

const BouquetContext = createContext<BouquetContextType | null>(null);

export function BouquetProvider({ children }: { children: React.ReactNode }) {
  const [selectedFlowers, setSelectedFlowers] = useState<SelectedFlower[]>([]);
  const [cardTheme, setCardTheme] = useState<CardTheme>(CARD_THEMES[0]);
  const [cardMessage, setCardMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [fontStyle, setFontStyle] = useState<FontStyle>(FONT_STYLES[0]);
  const [textColor, setTextColor] = useState('hsl(20, 15%, 15%)');
  const [currentStep, setCurrentStep] = useState<BuilderStep>('flowers');

  const addFlower = useCallback((flower: SelectedFlower['flower']) => {
    setSelectedFlowers(prev => {
      const existing = prev.find(f => f.flower.id === flower.id);
      if (existing) {
        return prev.map(f => f.flower.id === flower.id ? { ...f, quantity: f.quantity + 1 } : f);
      }
      return [...prev, { flower, quantity: 1 }];
    });
  }, []);

  const removeFlower = useCallback((flowerId: string) => {
    setSelectedFlowers(prev => prev.filter(f => f.flower.id !== flowerId));
  }, []);

  const updateFlowerQuantity = useCallback((flowerId: string, quantity: number) => {
    if (quantity <= 0) {
      setSelectedFlowers(prev => prev.filter(f => f.flower.id !== flowerId));
      return;
    }
    setSelectedFlowers(prev => prev.map(f => f.flower.id === flowerId ? { ...f, quantity } : f));
  }, []);

  const getTotalFlowers = useCallback(() => {
    return selectedFlowers.reduce((sum, f) => sum + f.quantity, 0);
  }, [selectedFlowers]);

  const saveBouquet = useCallback(() => {
    const id = Math.random().toString(36).substring(2, 10);
    const data: BouquetData = {
      id,
      flowers: selectedFlowers,
      card: { theme: cardTheme, message: cardMessage, recipientName, senderName, fontStyle, textColor },
      createdAt: new Date().toISOString(),
    };
    const stored = JSON.parse(localStorage.getItem('bouquets') || '{}');
    stored[id] = data;
    localStorage.setItem('bouquets', JSON.stringify(stored));
    return id;
  }, [selectedFlowers, cardTheme, cardMessage, recipientName, senderName, fontStyle, textColor]);

  const reset = useCallback(() => {
    setSelectedFlowers([]);
    setCardTheme(CARD_THEMES[0]);
    setCardMessage('');
    setRecipientName('');
    setSenderName('');
    setFontStyle(FONT_STYLES[0]);
    setTextColor('hsl(20, 15%, 15%)');
    setCurrentStep('flowers');
  }, []);

  return (
    <BouquetContext.Provider value={{
      selectedFlowers, cardTheme, cardMessage, recipientName, senderName, fontStyle, textColor, currentStep,
      addFlower, removeFlower, updateFlowerQuantity, setCardTheme, setCardMessage,
      setRecipientName, setSenderName, setFontStyle, setTextColor, setCurrentStep,
      getTotalFlowers, saveBouquet, reset,
    }}>
      {children}
    </BouquetContext.Provider>
  );
}

export function useBouquet() {
  const context = useContext(BouquetContext);
  if (!context) throw new Error('useBouquet must be used within BouquetProvider');
  return context;
}
