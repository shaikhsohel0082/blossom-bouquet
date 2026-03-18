import { motion } from 'framer-motion';
import { useBouquet } from '@/context/BouquetContext';

export default function BouquetPreview() {
  const { selectedFlowers, getTotalFlowers } = useBouquet();
  const total = getTotalFlowers();

  if (total === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-5xl mb-3"
        >
          💐
        </motion.div>
        <p className="text-muted-foreground font-body">Select flowers to see your bouquet</p>
      </div>
    );
  }

  // Generate flower positions in a bouquet arrangement
  const allFlowers: { emoji: string; color: string; index: number }[] = [];
  selectedFlowers.forEach(sf => {
    for (let i = 0; i < sf.quantity; i++) {
      allFlowers.push({ emoji: sf.flower.emoji, color: sf.flower.color, index: allFlowers.length });
    }
  });

  // Arrange in circular pattern
  const centerX = 50;
  const centerY = 55;

  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-center mb-4 text-foreground">
        Your Bouquet <span className="text-muted-foreground font-body text-sm">({total} flowers)</span>
      </h3>

      <div className="relative w-full aspect-square max-w-[280px] mx-auto">
        {/* Wrapping paper / base */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-32"
        >
          <div className="w-full h-full bg-gradient-sage rounded-b-3xl rounded-t-lg opacity-70" />
        </motion.div>

        {/* Bow */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 text-2xl z-10"
        >
          🎀
        </motion.div>

        {/* Flowers */}
        {allFlowers.map((f, i) => {
          const angle = (i / Math.max(allFlowers.length, 1)) * Math.PI * 2 - Math.PI / 2;
          const radius = Math.min(20 + i * 2, 35);
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius * 0.6 - 15;

          return (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
              className="absolute text-3xl"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: i,
              }}
            >
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2 + i * 0.3, delay: i * 0.2 }}
                className="block"
              >
                {f.emoji}
              </motion.span>
            </motion.div>
          );
        })}

        {/* Greenery */}
        {allFlowers.length > 0 && (
          <>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5 }}
              className="absolute text-2xl"
              style={{ left: '25%', top: '65%' }}
            >🌿</motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.6 }}
              className="absolute text-2xl"
              style={{ left: '70%', top: '60%', transform: 'scaleX(-1)' }}
            >🌿</motion.span>
          </>
        )}
      </div>
    </div>
  );
}
