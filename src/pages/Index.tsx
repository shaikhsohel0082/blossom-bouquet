import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-botanical overflow-hidden relative">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {['🌸', '🌹', '🌷', '🌻', '🌺', '🌼'].map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-20"
            initial={{
              x: `${10 + i * 15}vw`,
              y: `${20 + (i % 3) * 25}vh`,
            }}
            animate={{
              y: [`${20 + (i % 3) * 25}vh`, `${15 + (i % 3) * 25}vh`, `${20 + (i % 3) * 25}vh`],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="mb-6"
        >
          <span className="text-7xl md:text-8xl block">💐</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight"
        >
          Petal & Post
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-script text-2xl md:text-3xl text-secondary mt-2"
        >
          Send love, one petal at a time
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-muted-foreground max-w-md mt-6 leading-relaxed"
        >
          Create beautiful virtual bouquets with personalized greeting cards
          and share them instantly with anyone, anywhere.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8"
        >
          <Button
            onClick={() => navigate('/builder')}
            className="bg-gradient-rose text-primary-foreground hover:opacity-90 px-8 py-6 text-lg rounded-xl shadow-glow-rose gap-2 font-display"
          >
            Create a Bouquet <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl w-full"
        >
          {[
            { emoji: '🌺', title: 'Pick Your Flowers', desc: '8 beautiful flower varieties to choose from' },
            { emoji: '✉️', title: 'Add a Card', desc: 'Customize with themes, fonts & colors' },
            { emoji: '🔗', title: 'Share Instantly', desc: 'Send a magical link to your loved one' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="glass-card p-6 text-center"
            >
              <span className="text-3xl block mb-3">{feature.emoji}</span>
              <h3 className="font-display font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
