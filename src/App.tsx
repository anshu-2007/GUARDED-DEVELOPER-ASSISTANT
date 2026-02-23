import React, { useState } from 'react';
import { Header } from './components/Header';
import { AIConsole } from './components/AIConsole';
import { ExecutionPanel } from './components/ExecutionPanel';
import { executeVirtualTask } from './lib/virtual-backend';
import { Policy, ExecutionResult } from './lib/types';

function App() {
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>('0');

  const handleExecute = async (file: File, instruction: string, policy: Policy) => {
    setIsProcessing(true);
    setResult(null);
    setCurrentStep('0');
    
    try {
      const res = await executeVirtualTask(
        file, 
        instruction, 
        policy,
        (type, val) => {
          if (type === 'step') setCurrentStep(val);
          // Logs are handled by the result object update if we were streaming, 
          // but here we wait for final result. 
          // For real-time logs, we'd need a state update here.
        }
      );
      setResult(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-900 text-white font-sans selection:bg-electric-500/30">
      <Header />
      
      <main className="h-[calc(100vh-64px)] flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel - 40% width on large screens */}
        <div className="w-full lg:w-[400px] xl:w-[450px] flex-shrink-0 h-full overflow-y-auto border-r border-white/5">
          <AIConsole onExecute={handleExecute} isProcessing={isProcessing} />
        </div>

        {/* Right Panel - Remaining width */}
        <div className="flex-1 h-full overflow-hidden bg-navy-900 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 z-0"></div>
          <div className="relative z-10 h-full">
            <ExecutionPanel result={result} isProcessing={isProcessing} currentStep={currentStep} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
