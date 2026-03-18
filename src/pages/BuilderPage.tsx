import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBouquet } from '@/context/BouquetContext';
import { encodeBouquetData } from '@/lib/shareUtils';
import FlowerSelector from '@/components/FlowerSelector';
import BouquetPreview from '@/components/BouquetPreview';
import CardCustomizer from '@/components/CardCustomizer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Share2, Flower2, MessageSquare, Eye, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BouquetData } from '@/types';

export default function BuilderPage() {
  const {
    currentStep, setCurrentStep, getTotalFlowers, selectedFlowers,
    cardMessage, cardTheme, recipientName, senderName, fontStyle, textColor,
  } = useBouquet();
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const steps = [
    { id: 'flowers' as const, label: 'Flowers', icon: Flower2 },
    { id: 'card' as const, label: 'Card', icon: MessageSquare },
    { id: 'preview' as const, label: 'Preview', icon: Eye },
  ];

  const currentIndex = steps.findIndex(s => s.id === currentStep);

  const canProceed = () => {
    if (currentStep === 'flowers') return getTotalFlowers() > 0;
    return true;
  };

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const handleShare = useCallback(() => {
    const data: BouquetData = {
      id: '',
      flowers: selectedFlowers,
      card: { theme: cardTheme, message: cardMessage, recipientName, senderName, fontStyle, textColor },
      createdAt: new Date().toISOString(),
    };
    const encoded = encodeBouquetData(data);
    const url = `${window.location.origin}/bouquet/${encoded}`;
    setShareUrl(url);
    toast({ title: 'Bouquet created! 🎉', description: 'Your shareable link is ready' });
  }, [selectedFlowers, cardTheme, cardMessage, recipientName, senderName, fontStyle, textColor, toast]);

  const handleCopy = useCallback(() => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareUrl]);

  const shareId = shareUrl ? shareUrl.split('/bouquet/')[1] : null;

  return (
    <div className="min-h-screen bg-botanical">
      {/* Header */}
      <header className="border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-50">
        <div className="container max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 group">
            <span className="text-2xl">💐</span>
            <span className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
              Petal & Post
            </span>
          </button>

          <div className="flex items-center gap-2">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = i === currentIndex;
              const isCompleted = i < currentIndex;
              return (
                <button
                  key={step.id}
                  onClick={() => i <= currentIndex && setCurrentStep(step.id)}
                  className="flex items-center gap-1.5"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isActive ? 'bg-primary text-primary-foreground' :
                    isCompleted ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`hidden md:block text-sm font-body ${
                    isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                  {i < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-1 ${isCompleted ? 'bg-primary' : 'bg-border'}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container max-w-5xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {currentStep === 'flowers' && (
            <motion.div key="flowers" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2"><FlowerSelector /></div>
              <div className="lg:col-span-1"><div className="sticky top-24"><BouquetPreview /></div></div>
            </motion.div>
          )}

          {currentStep === 'card' && (
            <motion.div key="card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              className="max-w-2xl mx-auto">
              <CardCustomizer />
            </motion.div>
          )}

          {currentStep === 'preview' && (
            <motion.div key="preview" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              className="max-w-2xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-display font-semibold text-foreground">Your Gift is Ready!</h2>
                <p className="text-muted-foreground mt-1">Review and share your bouquet & card</p>
              </div>

              <BouquetPreview />

              <div className="glass-card p-6">
                <h3 className="font-display font-semibold text-center mb-4 text-foreground">Greeting Card</h3>
                <div className={`${cardTheme.bgClass} rounded-xl p-6 border border-border text-center`}>
                  <span className="text-3xl block mb-2">{cardTheme.emoji}</span>
                  {recipientName && <p className={`${fontStyle.className} text-sm text-muted-foreground`}>Dear {recipientName},</p>}
                  <p className={`${fontStyle.className} text-lg mt-2`} style={{ color: textColor }}>
                    {cardMessage || 'No message added'}
                  </p>
                  {senderName && <p className={`${fontStyle.className} text-sm text-muted-foreground mt-4`}>With love, {senderName}</p>}
                </div>
              </div>

              {!shareUrl ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                  <Button onClick={handleShare}
                    className="bg-gradient-rose text-primary-foreground hover:opacity-90 px-8 py-6 text-lg rounded-xl shadow-glow-rose">
                    <Share2 className="w-5 h-5 mr-2" /> Generate Share Link
                  </Button>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-6 text-center space-y-4">
                  <span className="text-4xl block">🎉</span>
                  <h3 className="font-display text-lg font-semibold text-foreground">Share Your Gift!</h3>
                  <div className="flex items-center gap-2 bg-muted rounded-lg p-3">
                    <input readOnly value={shareUrl}
                      className="flex-1 bg-transparent text-xs text-foreground font-mono outline-none truncate" />
                    <Button variant="outline" size="sm" onClick={handleCopy} className="shrink-0">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <Button variant="outline" onClick={() => navigate(`/bouquet/${shareId}`)} className="mt-2">
                    Preview as recipient →
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-8 max-w-2xl mx-auto">
          <Button variant="outline" onClick={handleBack} disabled={currentIndex === 0} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          {currentStep !== 'preview' && (
            <Button onClick={handleNext} disabled={!canProceed()}
              className="gap-2 bg-gradient-sage text-primary-foreground hover:opacity-90">
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
