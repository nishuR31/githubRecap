import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface YearSelectorProps {
  currentYear: number;
  onYearChange: (year: number) => void;
  minYear?: number;
  maxYear?: number;
}

export const YearSelector = ({
  currentYear,
  onYearChange,
  minYear = 2008, // GitHub was founded in 2008
  maxYear = new Date().getFullYear(),
}: YearSelectorProps) => {
  const canGoBack = currentYear > minYear;
  const canGoForward = currentYear < maxYear;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-4"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => canGoBack && onYearChange(currentYear - 1)}
        disabled={!canGoBack}
        className="glass-elevated"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <div className="flex items-center gap-2 px-6 py-2 rounded-full glass-elevated">
        <span className="text-2xl font-bold text-foreground">{currentYear}</span>
        <span className="text-sm text-muted-foreground">Recap</span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => canGoForward && onYearChange(currentYear + 1)}
        disabled={!canGoForward}
        className="glass-elevated"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </motion.div>
  );
};
