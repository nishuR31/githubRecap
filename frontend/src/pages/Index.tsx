import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GitCommit,
  GitPullRequest,
  AlertCircle,
  Code2,
  Flame,
  Calendar,
  Clock,
  TrendingUp,
  Zap,
  Settings,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGitHubRecap } from "@/hooks/useGitHubRecap";
import { mockRecapData } from "@/lib/mockData";
import { HeroSection } from "@/components/recap/HeroSection";
import { StatCard } from "@/components/recap/StatCard";
import { ContributionHeatmap } from "@/components/recap/ContributionHeatmap";
import { LanguageChart } from "@/components/recap/LanguageChart";
import { RepositoryCard } from "@/components/recap/RepositoryCard";
import { InsightCard } from "@/components/recap/InsightCard";
import { TagBadge } from "@/components/recap/TagBadge";
import { AnimatedCounter } from "@/components/recap/AnimatedCounter";
import { YearSelector } from "@/components/recap/YearSelector";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { data: fetchedData, isLoading, fetchRecap } = useGitHubRecap(selectedYear);

  useEffect(() => {
    fetchRecap();
  }, [selectedYear]);

  const data = fetchedData || { ...mockRecapData, year: selectedYear };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/recap/${selectedYear}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `GitHub Recap ${selectedYear} - ${data.username}`,
          text: `Check out my GitHub activity recap for ${selectedYear}!`,
          url,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast({ title: 'Link copied to clipboard!' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Fixed Header Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center pointer-events-none"
      >
        <div className="pointer-events-auto">
          <YearSelector
            currentYear={selectedYear}
            onYearChange={handleYearChange}
          />
        </div>
        <div className="flex gap-2 pointer-events-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="glass-elevated"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/admin')}
            className="glass-elevated"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Loading Indicator */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full glass-elevated text-sm text-muted-foreground"
        >
          Loading {selectedYear} data...
        </motion.div>
      )}

      {/* Hero Section */}
      <HeroSection data={data} />

      {/* Stats Overview */}
      <section className="py-24 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Numbers
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your engineering output, quantified and visualized.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="Total Commits"
              value={data.totalCommits}
              icon={GitCommit}
              delay={0}
              gradient
            />
            <StatCard
              label="Pull Requests"
              value={data.totalPRs}
              icon={GitPullRequest}
              delay={0.1}
            />
            <StatCard
              label="Issues Opened"
              value={data.totalIssues}
              icon={AlertCircle}
              delay={0.2}
            />
            <StatCard
              label="Repositories"
              value={data.repositoriesWorkedOn}
              icon={Code2}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Contribution Heatmap */}
      <section className="py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <ContributionHeatmap data={data.commitHeatmap} />
        </div>
      </section>

      {/* Code Impact */}
      <section className="py-24 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Code Impact
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Lines written, deleted, and the balance of creation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-elevated rounded-2xl p-8 text-center"
            >
              <div className="text-5xl md:text-6xl font-bold text-success mb-2">
                +<AnimatedCounter value={data.linesAdded} />
              </div>
              <p className="text-muted-foreground">Lines Added</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-elevated rounded-2xl p-8 text-center"
            >
              <div className="text-5xl md:text-6xl font-bold text-destructive mb-2">
                -<AnimatedCounter value={data.linesDeleted} />
              </div>
              <p className="text-muted-foreground">Lines Deleted</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-lg text-muted-foreground">
              Net contribution:{" "}
              <span className="font-bold text-primary">
                +{(data.linesAdded - data.linesDeleted).toLocaleString()}
              </span>{" "}
              lines
            </p>
          </motion.div>
        </div>
      </section>

      {/* Languages & Repos Grid */}
      <section className="py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <LanguageChart languages={data.topLanguages} />
            
            <div className="space-y-4">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-lg font-semibold text-foreground mb-4"
              >
                Top Repositories
              </motion.h3>
              {data.topRepositories.slice(0, 3).map((repo, index) => (
                <RepositoryCard
                  key={repo.name}
                  repo={repo}
                  rank={index + 1}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Productivity Insights */}
      <section className="py-24 px-4">
        <div className="container max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Productivity Patterns
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              When you code best, and how consistently.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InsightCard
              icon={Flame}
              title="Longest Streak"
              value={`${data.commitStreakMax} days`}
              description="Your maximum consecutive coding days"
              delay={0}
            />
            <InsightCard
              icon={Calendar}
              title="Active Days"
              value={`${data.activeDays}`}
              description={`${Math.round((data.activeDays / 365) * 100)}% of the year`}
              delay={0.1}
            />
            <InsightCard
              icon={TrendingUp}
              title="Peak Day"
              value={data.mostProductiveDay}
              description="Your most productive day of the week"
              delay={0.2}
            />
            <InsightCard
              icon={Clock}
              title="Peak Hour"
              value={`${data.mostProductiveHour}:00`}
              description="When you ship the most code"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Your Engineering Focus
            </h3>
            <p className="text-sm text-muted-foreground">
              The areas you invested your time in
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {data.tags.map((tag, index) => (
              <TagBadge key={tag} tag={tag} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-4">
        <div className="container max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-elevated rounded-3xl p-12 border-gradient glow-primary"
          >
            <Zap className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Keep Building
            </h2>
            <p className="text-muted-foreground mb-8">
              Every commit tells a story. Every line of code shapes your journey.
              Here's to another year of shipping.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium">
              <span>Share Your Recap</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="container max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Built with data, designed with purpose.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
