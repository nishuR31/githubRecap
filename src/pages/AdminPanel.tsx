import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Settings,
  RefreshCw,
  Eye,
  EyeOff,
  Trash2,
  Download,
  LogOut,
  Lock,
  AlertTriangle,
  Check,
  Database,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useGitHubRecap } from '@/hooks/useGitHubRecap';
import {
  getSettings,
  saveSettings,
  getStoredRecaps,
  updateRecapVisibility,
  deleteRecap,
  isAdminAuthenticated,
  verifyAdminPassword,
  logoutAdmin,
  RecapSettings,
  StoredRecap,
} from '@/lib/recapStorage';
import { clearRecapCache, checkRateLimit } from '@/lib/githubApi';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [settings, setSettings] = useState<RecapSettings>(getSettings());
  const [storedRecaps, setStoredRecaps] = useState<StoredRecap[]>([]);
  const [rateLimit, setRateLimit] = useState<{ remaining: number; reset: Date } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [targetYear, setTargetYear] = useState(new Date().getFullYear());

  const { fetchRecap, isLoading, error } = useGitHubRecap(targetYear);

  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
    if (isAdminAuthenticated()) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    setStoredRecaps(getStoredRecaps());
    const limit = await checkRateLimit();
    setRateLimit(limit);
  };

  const handleLogin = () => {
    if (verifyAdminPassword(password)) {
      setIsAuthenticated(true);
      loadData();
      toast({ title: 'Logged in successfully' });
    } else {
      toast({ title: 'Invalid password', variant: 'destructive' });
    }
    setPassword('');
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    toast({ title: 'Logged out' });
  };

  const handleGenerateRecap = async () => {
    setIsGenerating(true);
    try {
      await fetchRecap(true);
      setStoredRecaps(getStoredRecaps());
      toast({ title: `Recap for ${targetYear} generated successfully` });
    } catch {
      toast({ title: 'Failed to generate recap', variant: 'destructive' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSettingChange = (key: keyof RecapSettings, value: boolean | string) => {
    const updated = saveSettings({ [key]: value });
    setSettings(updated);
    toast({ title: 'Settings saved' });
  };

  const handleToggleVisibility = (year: number, isVisible: boolean) => {
    updateRecapVisibility(year, isVisible);
    setStoredRecaps(getStoredRecaps());
    toast({ title: `Recap ${isVisible ? 'visible' : 'hidden'}` });
  };

  const handleDeleteRecap = (year: number) => {
    if (confirm(`Delete recap for ${year}? This cannot be undone.`)) {
      deleteRecap(year);
      setStoredRecaps(getStoredRecaps());
      toast({ title: 'Recap deleted' });
    }
  };

  const handleClearCache = () => {
    clearRecapCache();
    toast({ title: 'Cache cleared' });
  };

  const handleExportData = () => {
    const data = {
      settings,
      recaps: storedRecaps,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `github-recap-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Data exported' });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="glass-elevated border-border/50">
            <CardHeader className="text-center">
              <Lock className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle>Admin Panel</CardTitle>
              <CardDescription>Enter password to access admin controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
              <Button onClick={handleLogin} className="w-full">
                Login
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="w-full"
              >
                Back to Recap
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate('/')}>
              View Recap
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </motion.div>

        {/* Rate Limit Status */}
        {rateLimit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 rounded-lg border ${
              rateLimit.remaining < 20
                ? 'bg-destructive/10 border-destructive/30'
                : 'bg-primary/10 border-primary/30'
            }`}
          >
            <div className="flex items-center gap-2">
              {rateLimit.remaining < 20 ? (
                <AlertTriangle className="w-5 h-5 text-destructive" />
              ) : (
                <Zap className="w-5 h-5 text-primary" />
              )}
              <span className="font-medium">
                GitHub API: {rateLimit.remaining} requests remaining
              </span>
              <span className="text-muted-foreground text-sm">
                (resets {rateLimit.reset.toLocaleTimeString()})
              </span>
            </div>
          </motion.div>
        )}

        {/* Generate Recap */}
        <Card className="glass-elevated border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Generate Recap
            </CardTitle>
            <CardDescription>
              Fetch data from GitHub and generate a new recap
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="username">GitHub Username</Label>
                <Input
                  id="username"
                  value={settings.username}
                  onChange={(e) => handleSettingChange('username', e.target.value)}
                  placeholder="username"
                />
              </div>
              <div className="w-32">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={targetYear}
                  onChange={(e) => setTargetYear(parseInt(e.target.value))}
                  min={2008}
                  max={new Date().getFullYear()}
                />
              </div>
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <div className="flex gap-2">
              <Button
                onClick={handleGenerateRecap}
                disabled={isGenerating || isLoading}
                className="flex-1"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate Recap
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleClearCache}>
                Clear Cache
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stored Recaps */}
        <Card className="glass-elevated border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Stored Recaps
            </CardTitle>
            <CardDescription>
              Manage your generated recaps
            </CardDescription>
          </CardHeader>
          <CardContent>
            {storedRecaps.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No recaps generated yet. Use the form above to create one.
              </p>
            ) : (
              <div className="space-y-3">
                {storedRecaps.map((recap) => (
                  <motion.div
                    key={recap.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{recap.data.year}</span>
                        {recap.isVisible ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success">
                            Visible
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            Hidden
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {recap.data.totalCommits} commits • Updated{' '}
                        {new Date(recap.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/recap/${recap.data.year}`)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleVisibility(recap.data.year, !recap.isVisible)}
                      >
                        {recap.isVisible ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteRecap(recap.data.year)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card className="glass-elevated border-border/50">
          <CardHeader>
            <CardTitle>Display Settings</CardTitle>
            <CardDescription>
              Control what sections are visible in the recap
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { key: 'showHeatmap', label: 'Contribution Heatmap' },
                { key: 'showLanguages', label: 'Language Distribution' },
                { key: 'showRepositories', label: 'Top Repositories' },
                { key: 'showInsights', label: 'Productivity Insights' },
                { key: 'isPublic', label: 'Public Profile' },
                { key: 'reducedMotion', label: 'Reduced Motion' },
                { key: 'compactView', label: 'Compact View' },
                { key: 'debugMode', label: 'Debug Mode' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <Label htmlFor={key}>{label}</Label>
                  <Switch
                    id={key}
                    checked={settings[key as keyof RecapSettings] as boolean}
                    onCheckedChange={(checked) =>
                      handleSettingChange(key as keyof RecapSettings, checked)
                    }
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="glass-elevated border-border/50">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>
              Export or manage your recap data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/20 border border-dashed border-border">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>Database Connection:</strong> Not connected
              </p>
              <p className="text-xs text-muted-foreground">
                Data is currently stored in localStorage. Connect to a database for persistent storage
                across devices and proper backup capabilities.
              </p>
            </div>
            <Button variant="outline" onClick={handleExportData} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export All Data (JSON)
            </Button>
          </CardContent>
        </Card>

        {/* Debug Info */}
        {settings.debugMode && (
          <Card className="glass-elevated border-border/50 border-dashed">
            <CardHeader>
              <CardTitle className="text-sm">Debug Information</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs text-muted-foreground overflow-auto p-4 rounded bg-muted/30">
                {JSON.stringify({ settings, recapCount: storedRecaps.length, rateLimit }, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
