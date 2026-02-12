import { motion } from "framer-motion";

interface TagBadgeProps {
  tag: string;
  delay?: number;
}

export const TagBadge = ({ tag, delay = 0 }: TagBadgeProps) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05 }}
      className="inline-flex items-center px-4 py-2 rounded-full glass text-sm font-medium text-foreground"
    >
      #{tag}
    </motion.span>
  );
};
