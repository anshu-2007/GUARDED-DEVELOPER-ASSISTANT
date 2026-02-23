import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckmarkCircle01Icon, 
  AlertCircleIcon, 
  CodeIcon, 
  ComputerTerminal01Icon,
  Download01Icon,
  Loading03Icon
} from 'hugeicons-react';
import { ExecutionResult } from '../lib/types';

interface ExecutionPanelProps {
  result: ExecutionResult | null;
  isProcessing: boolean;
  currentStep?: string;
}

export const ExecutionPanel: React.FC<ExecutionPanelProps> = ({ result, isProcessing, currentStep }) => {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [result?.logs]);

  const handleDownload = () => {
    if (result?.modifiedZip) {
      const url = URL.createObjectURL(result.modifiedZip);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'modified_project.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const steps = [
    { id: '0', label: 'Parsing Instruction' },
    { id: '1', label: 'Validating Intent' },
    { id: '2', label: 'ArmorClaw Enforcement' },
    { id: '3', label: 'Sandboxed Execution' },
  ];

  return (
    <div className="h-full flex flex-col gap-6 p-6 bg-navy-900/50 relative overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

      {/* Status Card */}
      <div className="flex-shrink-0">
        {!result && !isProcessing && (
          <div className="h-32 rounded-xl border border-white/10 bg-navy-800/50 flex items-center justify-center text-gray-500">
            <p>Waiting for execution...</p>
          </div>
        )}

        {isProcessing && (
          <div className="h-32 rounded-xl border border-electric-500/30 bg-electric-900/10 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
            <div className="flex items-center gap-3">
               <Loading03Icon className="w-6 h-6 text-electric-400 animate-spin" />
               <span className="text-electric-400 font-mono text-sm tracking-widest">PROCESSING...</span>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center gap-2 w-full max-w-md px-8">
              {steps.map((step, idx) => {
                const isActive = currentStep === step.id;
                const isCompleted = parseInt(currentStep || '-1') > idx;
                
                return (
                  <div key={step.id} className="flex-1 flex flex-col items-center gap-2">
                    <div className={`w-full h-1 rounded-full transition-all duration-500 ${isCompleted ? 'bg-green-500' : isActive ? 'bg-electric-500 animate-pulse' : 'bg-gray-700'}`}></div>
                    <span className={`text-[10px] uppercase font-bold ${isActive ? 'text-white' : 'text-gray-600'}`}>{step.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {result && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              h-32 rounded-xl border flex items-center justify-between px-8 relative overflow-hidden
              ${result.status === 'allowed' 
                ? 'border-green-500/50 bg-green-900/10 shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]' 
                : 'border-red-500/50 bg-red-900/10 shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]'
              }
            `}
          >
            <div className="flex items-center gap-4 z-10">
              <div className={`p-3 rounded-full ${result.status === 'allowed' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                {result.status === 'allowed' ? (
                  <CheckmarkCircle01Icon className="w-8 h-8 text-green-400" />
                ) : (
                  <AlertCircleIcon className="w-8 h-8 text-red-400" />
                )}
              </div>
              <div>
                <h2 className={`text-2xl font-bold tracking-wider ${result.status === 'allowed' ? 'text-green-400' : 'text-red-400'}`}>
                  {result.status === 'allowed' ? 'EXECUTION APPROVED' : 'EXECUTION BLOCKED'}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  {result.reason || "Policy validation passed successfully."}
                </p>
              </div>
            </div>

            {result.status === 'allowed' && (
              <button 
                onClick={handleDownload}
                className="z-10 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg text-green-400 flex items-center gap-2 transition-colors"
              >
                <Download01Icon className="w-4 h-4" />
                Download Result
              </button>
            )}

            {/* Background Glow */}
            <div className={`absolute inset-0 opacity-20 blur-3xl ${result.status === 'allowed' ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </motion.div>
        )}
      </div>

      {/* Split View: Intent & Logs */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        
        {/* Intent Viewer */}
        <div className="flex flex-col gap-2 min-h-0">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <CodeIcon className="w-4 h-4" />
            Structured Intent
          </div>
          <div className="flex-1 bg-navy-950 rounded-xl border border-white/10 p-4 overflow-auto font-mono text-xs text-blue-300 custom-scrollbar">
            {result ? (
              <pre>{JSON.stringify(result.intent, null, 2)}</pre>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-700 italic">
                Waiting for input...
              </div>
            )}
          </div>
        </div>

        {/* Audit Logs */}
        <div className="flex flex-col gap-2 min-h-0">
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
            <ComputerTerminal01Icon className="w-4 h-4" />
            Audit Log Console
          </div>
          <div className="flex-1 bg-black rounded-xl border border-white/10 p-4 overflow-auto font-mono text-xs custom-scrollbar shadow-inner">
            <div className="space-y-1">
              {result?.logs.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`
                    ${log.includes('[ERROR]') || log.includes('VIOLATION') ? 'text-red-400' : ''}
                    ${log.includes('[SUCCESS]') ? 'text-green-400' : ''}
                    ${log.includes('[WARN]') ? 'text-yellow-400' : ''}
                    ${log.includes('[SYSTEM]') ? 'text-gray-500' : ''}
                    ${log.includes('[OPENCLAW]') ? 'text-electric-400' : ''}
                    ${log.includes('[ARMORCLAW]') ? 'text-orange-400' : ''}
                    ${!log.match(/\[(ERROR|SUCCESS|WARN|SYSTEM|OPENCLAW|ARMORCLAW)\]/) ? 'text-gray-300' : ''}
                  `}
                >
                  <span className="opacity-50 mr-2">{new Date().toLocaleTimeString()}</span>
                  {log}
                </motion.div>
              ))}
              {isProcessing && (
                <div className="text-electric-400 animate-pulse">_</div>
              )}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
