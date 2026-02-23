import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload01Icon, 
  SourceCodeIcon, 
  Settings01Icon, 
  PlayIcon, 
  Loading03Icon,
  CheckmarkCircle01Icon,
  Cancel01Icon,
  ArrowDown01Icon
} from 'hugeicons-react';
import { Policy } from '../lib/types';

interface AIConsoleProps {
  onExecute: (file: File, instruction: string, policy: Policy) => void;
  isProcessing: boolean;
}

const FOLDERS = ['src', 'public', 'tests', 'docs', 'api'];
const RESTRICTED_FILES = ['.env', 'package.json', 'tsconfig.json', 'README.md'];
const FILE_TYPES = ['.js', '.ts', '.tsx', '.css', '.json', '.md'];
const COMMANDS = ['delete', 'create', 'refactor'];

export const AIConsole: React.FC<AIConsoleProps> = ({ onExecute, isProcessing }) => {
  const [file, setFile] = useState<File | null>(null);
  const [instruction, setInstruction] = useState('');
  const [policy, setPolicy] = useState<Policy>({
    allowedFolders: ['src'],
    restrictedFiles: ['.env'],
    allowedFileTypes: ['.ts', '.tsx'],
    maxFileChanges: 5,
    restrictedCommands: ['delete'],
  });
  const [showPolicy, setShowPolicy] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const toggleSelection = (list: string[], item: string) => {
    return list.includes(item) ? list.filter(i => i !== item) : [...list, item];
  };

  const handleSubmit = () => {
    if (file && instruction) {
      onExecute(file, instruction, policy);
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 p-6 bg-navy-800/50 border-r border-white/5 relative overflow-hidden custom-scrollbar">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col gap-6 h-full">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-1 h-6 bg-electric-500 rounded-full"></span>
            AI Console
          </h2>
          <button 
            onClick={() => setShowPolicy(!showPolicy)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <Settings01Icon className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Section */}
        <div className="p-6 border-2 border-dashed border-white/10 rounded-xl bg-navy-900/30 hover:border-electric-500/50 transition-colors group cursor-pointer relative">
          <input 
            type="file" 
            accept=".zip" 
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="p-3 bg-navy-800 rounded-full group-hover:scale-110 transition-transform duration-300">
              {file ? <SourceCodeIcon className="w-8 h-8 text-electric-400" /> : <Upload01Icon className="w-8 h-8 text-gray-500" />}
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {file ? file.name : "Upload Project Archive"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {file ? `${(file.size / 1024).toFixed(2)} KB` : "Drag & Drop ZIP file here"}
              </p>
            </div>
          </div>
        </div>

        {/* Instruction Input */}
        <div className="flex-col gap-2">
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Instruction</label>
          <textarea
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="Enter instruction for AI (e.g., 'Delete test folder', 'Refactor auth.ts')..."
            className="w-full h-32 bg-navy-900/50 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-electric-500/50 focus:ring-1 focus:ring-electric-500/20 resize-none font-mono"
          />
        </div>

        {/* Policy Settings (MCQ Style) */}
        <AnimatePresence>
          {showPolicy && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden flex-1 overflow-y-auto custom-scrollbar pr-2"
            >
              <div className="space-y-6 pb-4">
                
                {/* Allowed Folders */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Allowed Folders</label>
                  <div className="grid grid-cols-2 gap-2">
                    {FOLDERS.map(folder => (
                      <button
                        key={folder}
                        onClick={() => setPolicy(p => ({ ...p, allowedFolders: toggleSelection(p.allowedFolders, folder) }))}
                        className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all flex items-center justify-between ${
                          policy.allowedFolders.includes(folder) 
                            ? 'bg-electric-500/20 border-electric-500 text-electric-400' 
                            : 'bg-navy-900/50 border-white/10 text-gray-500 hover:border-white/20'
                        }`}
                      >
                        /{folder}
                        {policy.allowedFolders.includes(folder) && <CheckmarkCircle01Icon className="w-3 h-3" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Restricted Files */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-red-400 uppercase tracking-wider">Restricted Files</label>
                  <div className="flex flex-wrap gap-2">
                    {RESTRICTED_FILES.map(file => (
                      <button
                        key={file}
                        onClick={() => setPolicy(p => ({ ...p, restrictedFiles: toggleSelection(p.restrictedFiles, file) }))}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                          policy.restrictedFiles.includes(file) 
                            ? 'bg-red-500/20 border-red-500 text-red-400' 
                            : 'bg-navy-900/50 border-white/10 text-gray-500 hover:border-white/20'
                        }`}
                      >
                        {file}
                      </button>
                    ))}
                  </div>
                </div>

                {/* File Types */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Allowed File Types</label>
                  <div className="flex flex-wrap gap-2">
                    {FILE_TYPES.map(type => (
                      <button
                        key={type}
                        onClick={() => setPolicy(p => ({ ...p, allowedFileTypes: toggleSelection(p.allowedFileTypes, type) }))}
                        className={`px-3 py-1 rounded text-xs font-mono border transition-all ${
                          policy.allowedFileTypes.includes(type) 
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' 
                            : 'bg-navy-900/50 border-white/10 text-gray-500 hover:border-white/20'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Restricted Commands */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-orange-400 uppercase tracking-wider">Blocked Commands</label>
                  <div className="flex flex-wrap gap-2">
                    {COMMANDS.map(cmd => (
                      <button
                        key={cmd}
                        onClick={() => setPolicy(p => ({ ...p, restrictedCommands: toggleSelection(p.restrictedCommands, cmd) }))}
                        className={`px-3 py-1 rounded text-xs font-bold uppercase border transition-all ${
                          policy.restrictedCommands.includes(cmd) 
                            ? 'bg-orange-500/20 border-orange-500 text-orange-400' 
                            : 'bg-navy-900/50 border-white/10 text-gray-500 hover:border-white/20'
                        }`}
                      >
                        {cmd}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!file || !instruction || isProcessing}
          className={`
            w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all mt-auto
            ${!file || !instruction 
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
              : 'bg-electric-600 hover:bg-electric-500 text-white shadow-lg shadow-electric-500/20 hover:shadow-electric-500/40'
            }
          `}
        >
          {isProcessing ? (
            <>
              <Loading03Icon className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <PlayIcon className="w-5 h-5" />
              Execute Instruction
            </>
          )}
        </button>
      </div>
    </div>
  );
};
