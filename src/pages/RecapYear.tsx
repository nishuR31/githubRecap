import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
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
  Share2,
  ArrowLeft,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useGitHubRecap } from '@/hooks/useGitHubRecap';
import { getSettings, getRecapByYear } from '@/lib/recapStorage';
import { mockRecapData, GitHubRecap } from '@/lib/mockData';
import { HeroSection } from '@/components/recap/HeroSection';
import { StatCard } from '@/components/recap/StatCard';
import { ContributionHeatmap } from '@/components/recap/ContributionHeatmap';
import { LanguageChart } from '@/components/recap/LanguageChart';
import { RepositoryCard } from '@/components/recap/RepositoryCard';
import { InsightCard } from '@/components/recap/InsightCard';
import { TagBadge } from '@/components/recap/TagBadge';
import { AnimatedCounter } from '@/components/recap/AnimatedCounter';

const RecapYear = () => {
  const { year } = useParams<{ year: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const targetYear = year ? parseInt(year) : new Date().getFullYear();
  
  const { data: fetchedData, isLoading, error, useMock, fromCache, fetchRecap } = useGitHubRecap(targetYear);
  const [data, setData] = useState<GitHubRecap | null>(null);
  const settings = getSettings();

  useEffect(() => {
    // Try to load from storage first
    const stored = getRecapByYear(targetYear);
    if (stored && stored.isVisible) {
      setData(stored.data);
    } else if (fetchedData) {
      setData(fetchedData);
    } else {
      // Fetch if not in storage
      fetchRecap();
    }
  }, [targetYear, fetchedData]);

  // Update data when fetched
  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `GitHub Recap ${targetYear} - ${data?.username || 'Developer'}`,
          text: `Check out my GitHub activity recap for ${targetYear}!`,
          url,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast({ title: 'Link copied to clipboard!' });
    }
  };

  const handleRefresh = () => {
    fetchRecap(true);
  };

  // Show loading state
  if (isLoading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <RefreshCw className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Loading recap for {targetYear}...</p>
        </motion.div>
      </div>
    );
  }

  // Use mock data as fallback
  const displayData = data || { ...mockRecapData, year: targetYear };
  const ogDescription = `${displayData.totalCommits} commits, ${displayData.totalPRs} PRs, and ${displayData.activeDays} active days in ${targetYear}`;

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{`GitHub Recap ${targetYear} - ${displayData.username}`}</title>
        <meta name="description" content={ogDescription} />
        <meta property="og:title" content={`GitHub Recap ${targetYear} - ${displayData.username}`} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={displayData.avatarUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`GitHub Recap ${targetYear} - ${displayData.username}`} />
        <meta name="twitter:description" content={ogDescription} />
      </Helmet>

      <div className="min-h-screen">
        {/* Floating Controls */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-4 right-4 z-50 flex justify-between pointer-events-none"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="glass-elevated pointer-events-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex gap-2 pointer-events-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="glass-elevated"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="glass-elevated"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </motion.div>

        {/* Status Banner */}
        {(error || useMock || fromCache) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed top-16 left-4 right-4 z-40 p-3 rounded-lg text-sm flex items-center gap-2 ${
              error
                ? 'bg-destructive/20 border border-destructive/30 text-destructive'
                : useMock
                ? 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-200'
                : 'bg-muted/50 border border-border text-muted-foreground'
            }`}
          >
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>
              {error || (useMock ? 'Showing sample data (API unavailable)' : 'Loaded from cache')}
            </span>
          </motion.div>
        )}

        {/* Hero Section */}
        <HeroSection data={displayData} />

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
                value={displayData.totalCommits}
                icon={GitCommit}
                delay={0}
                gradient
              />
              <StatCard
                label="Pull Requests"
                value={displayData.totalPRs}
                icon={GitPullRequest}
                delay={0.1}
              />
              <StatCard
                label="Issues Opened"
                value={displayData.totalIssues}
                icon={AlertCircle}
                delay={0.2}
              />
              <StatCard
                label="Repositories"
                value={displayData.repositoriesWorkedOn}
                icon={Code2}
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Contribution Heatmap */}
        {settings.showHeatmap && (
          <section className="py-12 px-4">
            <div className="container max-w-6xl mx-auto">
              <ContributionHeatmap data={displayData.commitHeatmap} />
            </div>
          </section>
        )}

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
                  +<AnimatedCounter value={displayData.linesAdded} />
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
                  -<AnimatedCounter value={displayData.linesDeleted} />
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
                  +{(displayData.linesAdded - displayData.linesDeleted).toLocaleString()}
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
              {settings.showLanguages && (
                <LanguageChart languages={displayData.topLanguages} />
              )}
              
              {settings.showRepositories && (
                <div className="space-y-4">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-lg font-semibold text-foreground mb-4"
                  >
                    Top Repositories
                  </motion.h3>
                  {displayData.topRepositories.slice(0, 3).map((repo, index) => (
                    <RepositoryCard
                      key={repo.name}
                      repo={repo}
                      rank={index + 1}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Productivity Insights */}
        {settings.showInsights && (
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
                  value={`${displayData.commitStreakMax} days`}
                  description="Your maximum consecutive coding days"
                  delay={0}
                />
                <InsightCard
                  icon={Calendar}
                  title="Active Days"
                  value={`${displayData.activeDays}`}
                  description={`${Math.round((displayData.activeDays / 365) * 100)}% of the year`}
                  delay={0.1}
                />
                <InsightCard
                  icon={TrendingUp}
                  title="Peak Day"
                  value={displayData.mostProductiveDay}
                  description="Your most productive day of the week"
                  delay={0.2}
                />
                <InsightCard
                  icon={Clock}
                  title="Peak Hour"
                  value={`${displayData.mostProductiveHour}:00`}
                  description="When you ship the most code"
                  delay={0.3}
                />
              </div>
            </div>
          </section>
        )}

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
              {displayData.tags.map((tag, index) => (
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
              <Button onClick={handleShare} size="lg">
                <Share2 className="w-4 h-4 mr-2" />
                Share Your Recap
              </Button>
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
    </>
  );
};

export default RecapYear;
