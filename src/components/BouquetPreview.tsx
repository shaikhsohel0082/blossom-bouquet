import { motion } from 'framer-motion';
import { useBouquet } from '@/context/BouquetContext';
import { FLOWER_IMAGES } from '@/data/flowerImages';

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

  const allFlowers: { id: string; image: string; index: number }[] = [];
  selectedFlowers.forEach(sf => {
    for (let i = 0; i < sf.quantity; i++) {
      allFlowers.push({ id: sf.flower.id, image: FLOWER_IMAGES[sf.flower.id], index: allFlowers.length });
    }
  });

  const centerX = 50;
  const centerY = 50;

  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-center mb-4 text-foreground">
        Your Bouquet <span className="text-muted-foreground font-body text-sm">({total} flowers)</span>
      </h3>

      <div className="relative w-full aspect-square max-w-[300px] mx-auto">
        {/* Wrapping paper */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{ width: '40%', height: '40%' }}
        >
          <div className="w-full h-full bg-gradient-sage rounded-b-3xl rounded-t-lg opacity-60" />
        </motion.div>

        {/* Ribbon */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="absolute z-20 text-2xl"
          style={{ bottom: '35%', left: '50%', transform: 'translateX(-50%)' }}
        >
          🎀
        </motion.div>

        {/* Flowers */}
        {allFlowers.map((f, i) => {
          const angle = (i / Math.max(allFlowers.length, 1)) * Math.PI * 2 - Math.PI / 2;
          const radius = Math.min(15 + i * 3, 30);
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius * 0.5 - 10;
          const rotation = (Math.cos(angle) * 20);

          return (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: rotation, opacity: 1 }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
              className="absolute z-10"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: '22%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <motion.img
                src={f.image}
                alt=""
                className="w-full h-full object-contain drop-shadow-lg"
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2 + i * 0.3, delay: i * 0.2 }}
              />
            </motion.div>
          );
        })}

        {/* Greenery */}
        {allFlowers.length > 0 && (
          <>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.5 }}
              className="absolute text-2xl" style={{ left: '15%', top: '65%' }}>🌿</motion.span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.6 }}
              className="absolute text-2xl" style={{ left: '75%', top: '60%', transform: 'scaleX(-1)' }}>🌿</motion.span>
          </>
        )}
      </div>
    </div>
  );
}
