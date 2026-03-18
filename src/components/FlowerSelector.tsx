import { motion } from 'framer-motion';
import { useBouquet } from '@/context/BouquetContext';
import { FLOWERS } from '@/data/constants';
import { FLOWER_IMAGES } from '@/data/flowerImages';
import { Minus, Plus, X } from 'lucide-react';

export default function FlowerSelector() {
  const { selectedFlowers, addFlower, removeFlower, updateFlowerQuantity } = useBouquet();

  const getQuantity = (flowerId: string) => {
    return selectedFlowers.find(f => f.flower.id === flowerId)?.quantity || 0;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-semibold text-foreground">Choose Your Flowers</h2>
        <p className="text-muted-foreground mt-1">Select flowers and quantities for your bouquet</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {FLOWERS.map((flower, i) => {
          const qty = getQuantity(flower.id);
          const isSelected = qty > 0;

          return (
            <motion.div
              key={flower.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`relative glass-card p-4 cursor-pointer transition-all duration-200 ${
                isSelected ? 'ring-2 ring-primary shadow-elevated' : 'hover:shadow-elevated'
              }`}
              onClick={() => !isSelected && addFlower(flower)}
            >
              {isSelected && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive flex items-center justify-center z-10"
                  onClick={(e) => { e.stopPropagation(); removeFlower(flower.id); }}
                >
                  <X className="w-3 h-3 text-destructive-foreground" />
                </motion.button>
              )}

              <div className="text-center">
                <motion.div
                  className="w-20 h-20 mx-auto mb-2 flex items-center justify-center"
                  animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={FLOWER_IMAGES[flower.id]}
                    alt={flower.name}
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </motion.div>
                <h3 className="font-display font-medium text-sm text-foreground">{flower.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{flower.description}</p>
              </div>

              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-border"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => updateFlowerQuantity(flower.id, qty - 1)}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-display font-semibold text-lg w-6 text-center">{qty}</span>
                  <button
                    className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => updateFlowerQuantity(flower.id, qty + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
