import { motion } from "framer-motion";
import { GitBranch, Star } from "lucide-react";
import { Repository } from "@/lib/mockData";

interface RepositoryCardProps {
  repo: Repository;
  rank: number;
  delay?: number;
}

const getLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    TypeScript: "hsl(200, 80%, 55%)",
    JavaScript: "hsl(45, 90%, 55%)",
    Python: "hsl(210, 60%, 50%)",
    Go: "hsl(190, 70%, 50%)",
    Rust: "hsl(15, 80%, 55%)",
    HCL: "hsl(260, 60%, 55%)",
  };
  return colors[language] || "hsl(var(--muted-foreground))";
};

export const RepositoryCard = ({ repo, rank, delay = 0 }: RepositoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="glass-elevated rounded-2xl p-5 group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-gradient">#{rank}</span>
          <div>
            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {repo.name}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getLanguageColor(repo.language) }}
              />
              <span className="text-xs text-muted-foreground">{repo.language}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Star className="w-4 h-4" />
          <span className="text-sm font-mono">{repo.stars}</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {repo.description}
      </p>

      <div className="flex items-center gap-2 text-primary">
        <GitBranch className="w-4 h-4" />
        <span className="text-sm font-semibold">{repo.commits} commits</span>
      </div>
    </motion.div>
  );
};
