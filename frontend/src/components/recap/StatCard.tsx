import { motion } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  delay?: number;
  gradient?: boolean;
}

export const StatCard = ({
  label,
  value,
  suffix = "",
  icon: Icon,
  delay = 0,
  gradient = false,
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className={`glass-elevated rounded-2xl p-6 ${gradient ? "border-gradient glow-primary" : ""}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-xl bg-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      <div className="space-y-1">
        <AnimatedCounter
          value={value}
          suffix={suffix}
          className="text-4xl font-bold text-foreground"
        />
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
};
