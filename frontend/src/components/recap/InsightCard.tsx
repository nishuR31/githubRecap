import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface InsightCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  description: string;
  delay?: number;
}

export const InsightCard = ({
  icon: Icon,
  title,
  value,
  description,
  delay = 0,
}: InsightCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="glass-elevated rounded-2xl p-6 text-center"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h4 className="text-sm font-medium text-muted-foreground mb-2">{title}</h4>
      <p className="text-2xl font-bold text-gradient mb-2">{value}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </motion.div>
  );
};
