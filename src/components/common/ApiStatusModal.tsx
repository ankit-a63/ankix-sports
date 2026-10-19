import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Key, CheckCircle2, AlertCircle, ExternalLink, RefreshCw, Database, ShieldAlert } from 'lucide-react';
import { isDemoModeActive, setDemoModeActive } from '../../services/api';

interface ApiStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiStatusModal: React.FC<ApiStatusModalProps> = ({ isOpen, onClose }) => {
  const [isDemo, setIsDemo] = useState(isDemoModeActive());
  const [testingApi, setTestingApi] = useState(false);
  const [testResult, setTestResult] = useState<{ status: string; message: string } | null>(null);

  useEffect(() => {
    setIsDemo(isDemoModeActive());
  }, [isOpen]);

  const handleToggleDemo = () => {
    const nextVal = !isDemo;
    setIsDemo(nextVal);
    setDemoModeActive(nextVal);
  };

  const handleTestConnection = async () => {
    setTestingApi(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/matches/live');
      const data = await res.json();
      if (data.status === 'apiKeyMissing') {
        setTestResult({
          status: 'missing',
          message: 'CRICKET_API_KEY is not configured in the server environment.'
        });
      } else if (data.status === 'success') {
        setTestResult({
          status: 'success',
          message: `Connected successfully to CricAPI! Hits today: ${data.info?.hitsToday ?? 0}/${data.info?.hitsLimit ?? 500}`
        });
      } else {
        setTestResult({
          status: 'error',
          message: data.info?.error || 'Provider returned an error.'
        });
      }
    } catch (err: any) {
      setTestResult({
        status: 'error',
        message: err.message || 'Failed to reach API server route.'
      });
    } finally {
      setTestingApi(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl rounded-2xl glass-card border border-brand-border/80 p-6 sm:p-8 text-white shadow-card-elevated max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-brand-border/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-brand-surface text-brand-emerald border border-brand-border">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-white">
                  Cricket Data Provider & Setup
                </h3>
                <p className="text-xs text-brand-muted font-mono">
                  ANKIX SPORTS • CricketData.org / CricAPI Integration
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-brand-muted hover:text-white hover:bg-brand-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="my-6 p-4 rounded-xl bg-brand-surface/70 border border-brand-border flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-white">
                Demo Mode (Sample Reference Data)
              </div>
              <p className="text-xs text-brand-muted mt-0.5">
                Renders complete reference matches and scorecards without consuming API key quotas.
              </p>
            </div>

            <button
              type="button"
              onClick={handleToggleDemo}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isDemo ? 'bg-brand-emerald' : 'bg-brand-charcoal'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-brand-bg shadow transform ring-0 transition duration-200 ease-in-out ${
                  isDemo ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Connection Test Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-muted">
                Live Server-Side Proxy Status
              </span>
              <button
                onClick={handleTestConnection}
                disabled={testingApi}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-surface hover:bg-brand-charcoal border border-brand-border text-brand-emerald transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${testingApi ? 'animate-spin' : ''}`} />
                <span>Test Connection</span>
              </button>
            </div>

            {testResult && (
              <div
                className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                  testResult.status === 'success'
                    ? 'bg-emerald-950/60 border border-brand-emerald/40 text-emerald-200'
                    : testResult.status === 'missing'
                    ? 'bg-amber-950/60 border border-amber-500/40 text-amber-200'
                    : 'bg-red-950/60 border border-red-500/40 text-red-200'
                }`}
              >
                {testResult.status === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold">
                    {testResult.status === 'success'
                      ? 'Connection Verified'
                      : testResult.status === 'missing'
                      ? 'API Key Not Set'
                      : 'Connection Failed'}
                  </div>
                  <div className="mt-0.5 opacity-90">{testResult.message}</div>
                </div>
              </div>
            )}

            {/* How to configure API key */}
            <div className="rounded-xl p-4 bg-brand-charcoal/60 border border-brand-border/60 text-xs space-y-3">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Key className="w-4 h-4 text-brand-cyan" />
                <span>How to connect your Cricket Data API key:</span>
              </div>

              <ol className="list-decimal list-inside space-y-1.5 text-brand-muted">
                <li>
                  Get a free lifetime API key from{' '}
                  <a
                    href="https://cricketdata.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-cyan hover:underline inline-flex items-center gap-0.5"
                  >
                    cricketdata.org <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  Create or edit <code className="text-brand-emerald font-mono bg-brand-surface px-1 py-0.5 rounded">.env</code> in the project root:
                </li>
                <li className="list-none pl-4">
                  <div className="font-mono bg-brand-bg p-2 rounded border border-brand-border text-white text-[11px] select-all">
                    CRICKET_API_KEY=your_guid_key_here
                  </div>
                </li>
                <li>Restart the dev server or redeploy to Vercel with the environment variable set.</li>
              </ol>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-brand-border/60 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-brand-surface hover:bg-brand-charcoal border border-brand-border text-white transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
