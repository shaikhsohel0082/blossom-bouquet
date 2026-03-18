import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BouquetData } from '@/types';
import { decodeBouquetData } from '@/lib/shareUtils';
import { FLOWER_IMAGES } from '@/data/flowerImages';

export default function SharePage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<BouquetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [cardOpen, setCardOpen] = useState(false);
  const [showBouquet, setShowBouquet] = useState(false);

  useEffect(() => {
    if (id) {
      // Decode bouquet data from URL parameter
      const decoded = decodeBouquetData(id);
      if (decoded) {
        setData(decoded);
      }
    }
    setLoading(false);
    setTimeout(() => setShowBouquet(true), 500);
    setTimeout(() => setCardOpen(true), 2000);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-botanical flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }} className="text-4xl">
          🌸
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-botanical flex items-center justify-center">
        <div className="glass-card p-8 text-center max-w-md">
          <span className="text-5xl block mb-4">😔</span>
          <h2 className="font-display text-xl font-semibold text-foreground">Bouquet Not Found</h2>
          <p className="text-muted-foreground mt-2">This bouquet may have been removed or the link is incorrect.</p>
        </div>
      </div>
    );
  }

  const allFlowers: { id: string; image: string }[] = [];
  data.flowers.forEach(sf => {
    for (let i = 0; i < sf.quantity; i++) {
      allFlowers.push({ id: sf.flower.id, image: FLOWER_IMAGES[sf.flower.id] });
    }
  });

  return (
    <div className="min-h-screen bg-botanical overflow-hidden relative">
      {/* Floating petals */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-30"
            initial={{ x: `${Math.random() * 100}vw`, y: '-10%', rotate: 0 }}
            animate={{ y: '110vh', rotate: 360, x: `${Math.random() * 100}vw` }}
            transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, delay: i * 1.5, ease: 'linear' }}
          >
            {['🌸', '🌺', '🌷', '💮', '🪻', '🌼'][i % 6]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 gap-8">
        {/* Bouquet Display */}
        <AnimatePresence>
          {showBouquet && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              className="glass-card p-8 text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6"
              >
                {data.card.recipientName
                  ? `A bouquet for ${data.card.recipientName}`
                  : 'A bouquet for you'
                } 💝
              </motion.h1>

              <div className="relative w-72 h-72 mx-auto">
                {/* Wrapper */}
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ width: '35%', height: '38%' }}>
                  <div className="w-full h-full bg-gradient-sage rounded-b-3xl rounded-t-lg opacity-60" />
                </motion.div>

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}
                  className="absolute z-20 text-xl" style={{ bottom: '32%', left: '50%', transform: 'translateX(-50%)' }}>
                  🎀
                </motion.div>

                {allFlowers.map((f, i) => {
                  const angle = (i / Math.max(allFlowers.length, 1)) * Math.PI * 2 - Math.PI / 2;
                  const radius = Math.min(15 + i * 3, 30);
                  const x = 50 + Math.cos(angle) * radius;
                  const y = 48 + Math.sin(angle) * radius * 0.5 - 10;
                  const rotation = Math.cos(angle) * 20;

                  return (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -90, opacity: 0 }}
                      animate={{ scale: 1, rotate: rotation, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.12, type: 'spring', stiffness: 200 }}
                      className="absolute z-10"
                      style={{ left: `${x}%`, top: `${y}%`, width: '22%', transform: 'translate(-50%, -50%)' }}
                    >
                      <motion.img
                        src={f.image}
                        alt=""
                        className="w-full h-full object-contain drop-shadow-lg"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 2 + i * 0.2, delay: i * 0.1 }}
                      />
                    </motion.div>
                  );
                })}

                {allFlowers.length > 0 && (
                  <>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1 }}
                      className="absolute text-xl" style={{ left: '15%', top: '62%' }}>🌿</motion.span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.2 }}
                      className="absolute text-xl" style={{ left: '78%', top: '58%', transform: 'scaleX(-1)' }}>🌿</motion.span>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Greeting Card */}
        <AnimatePresence>
          {cardOpen && (
            <motion.div
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 80, damping: 20 }}
              className="w-full max-w-md"
            >
              <div className={`${data.card.theme.bgClass} rounded-2xl p-8 border border-border shadow-elevated text-center`}>
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}
                  className="text-4xl block mb-4">{data.card.theme.emoji}</motion.span>

                {data.card.recipientName && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className={`${data.card.fontStyle.className} text-sm text-muted-foreground`}>
                    Dear {data.card.recipientName},
                  </motion.p>
                )}

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className={`${data.card.fontStyle.className} text-xl mt-4 leading-relaxed max-w-sm mx-auto`}
                  style={{ color: data.card.textColor }}
                >
                  {data.card.message || 'Sent with love 💕'}
                </motion.p>

                {data.card.senderName && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
                    className={`${data.card.fontStyle.className} text-sm text-muted-foreground mt-6`}>
                    With love, {data.card.senderName} 💌
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
