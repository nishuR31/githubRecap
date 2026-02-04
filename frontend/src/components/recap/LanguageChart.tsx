import { motion } from "framer-motion";
import { LanguageStat } from "@/lib/mockData";

interface LanguageChartProps {
  languages: LanguageStat[];
}

export const LanguageChart = ({ languages }: LanguageChartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="glass-elevated rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold mb-6 text-foreground">Top Languages</h3>

      {/* Stacked bar */}
      <div className="h-4 rounded-full overflow-hidden flex mb-6">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.name}
            initial={{ width: 0 }}
            whileInView={{ width: `${lang.percentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{ backgroundColor: lang.color }}
          />
        ))}
      </div>

      {/* Language list */}
      <div className="space-y-4">
        {languages.map((lang, index) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-sm font-medium text-foreground">{lang.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground font-mono">
                {(lang.linesOfCode / 1000).toFixed(0)}K lines
              </span>
              <span className="text-sm font-semibold text-foreground w-12 text-right">
                {lang.percentage}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
