import { motion } from 'framer-motion';
import { useBouquet } from '@/context/BouquetContext';
import { CARD_THEMES, FONT_STYLES, TEXT_COLORS } from '@/data/constants';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function CardCustomizer() {
  const {
    cardTheme, setCardTheme, cardMessage, setCardMessage,
    recipientName, setRecipientName, senderName, setSenderName,
    fontStyle, setFontStyle, textColor, setTextColor,
  } = useBouquet();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-semibold text-foreground">Customize Your Card</h2>
        <p className="text-muted-foreground mt-1">Add a personal touch to your gift</p>
      </div>

      {/* Theme Selection */}
      <div className="space-y-3">
        <Label className="font-display text-sm">Card Theme</Label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {CARD_THEMES.map((theme, i) => (
            <motion.button
              key={theme.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`glass-card p-3 text-center transition-all ${
                cardTheme.id === theme.id ? 'ring-2 ring-primary shadow-elevated' : ''
              }`}
              onClick={() => setCardTheme(theme)}
            >
              <span className="text-2xl block">{theme.emoji}</span>
              <span className="text-xs text-foreground mt-1 block">{theme.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Names */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="font-display text-sm">To</Label>
          <Input
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Recipient's name"
            className="bg-card border-border focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <Label className="font-display text-sm">From</Label>
          <Input
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Your name"
            className="bg-card border-border focus:ring-primary"
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label className="font-display text-sm">Your Message</Label>
        <Textarea
          value={cardMessage}
          onChange={(e) => setCardMessage(e.target.value)}
          placeholder="Write something heartfelt..."
          rows={4}
          className="bg-card border-border focus:ring-primary resize-none"
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground text-right">{cardMessage.length}/500</p>
      </div>

      {/* Font Style */}
      <div className="space-y-3">
        <Label className="font-display text-sm">Font Style</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {FONT_STYLES.map(font => (
            <button
              key={font.id}
              className={`glass-card p-3 text-center transition-all ${
                fontStyle.id === font.id ? 'ring-2 ring-primary shadow-elevated' : ''
              }`}
              onClick={() => setFontStyle(font)}
            >
              <span className={`${font.className} text-lg text-foreground`}>Aa</span>
              <span className="text-xs text-muted-foreground block mt-1">{font.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Text Color */}
      <div className="space-y-3">
        <Label className="font-display text-sm">Text Color</Label>
        <div className="flex gap-3">
          {TEXT_COLORS.map(color => (
            <button
              key={color.id}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                textColor === color.value ? 'border-foreground scale-110' : 'border-border'
              }`}
              style={{ backgroundColor: color.value }}
              onClick={() => setTextColor(color.value)}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Card Preview */}
      <div className="space-y-2">
        <Label className="font-display text-sm">Preview</Label>
        <motion.div
          layout
          className={`${cardTheme.bgClass} rounded-xl p-6 border border-border min-h-[180px] flex flex-col justify-center items-center text-center`}
        >
          <span className="text-3xl mb-2">{cardTheme.emoji}</span>
          {recipientName && (
            <p className={`${fontStyle.className} text-sm text-muted-foreground`}>
              Dear {recipientName},
            </p>
          )}
          <p
            className={`${fontStyle.className} text-lg mt-2 max-w-sm leading-relaxed`}
            style={{ color: textColor }}
          >
            {cardMessage || 'Your message will appear here...'}
          </p>
          {senderName && (
            <p className={`${fontStyle.className} text-sm text-muted-foreground mt-4`}>
              With love, {senderName}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
