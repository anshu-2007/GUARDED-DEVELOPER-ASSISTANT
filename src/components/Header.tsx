import React from 'react';
import { Shield02Icon, CpuIcon } from 'hugeicons-react';

export const Header = () => {
  return (
    <header className="w-full h-16 bg-navy-900/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-electric-500/20 rounded-lg border border-electric-500/50">
          <Shield02Icon className="w-6 h-6 text-cyan-400" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-wide">
          GUARDED <span className="text-electric-400">DEVELOPER</span> ASSISTANT
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs font-medium text-green-400 uppercase tracking-wider">System Online</span>
        </div>
        <div className="p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
          <CpuIcon className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </header>
  );
};
