import React, { useState, useEffect } from 'react';
import { Terminal, Folder, FileCode, CheckCircle, PlusCircle, Activity, ChevronRight, HardDrive } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [logs, setLogs] = useState<{ id: string; text: string; type: 'info' | 'success' | 'warn' | 'error' | 'cmd' }[]>([]);
  const [input, setInput] = useState('');
  const [currentView, setCurrentView] = useState<'terminal' | 'structure'>('terminal');

  const addLog = (text: string, type: 'info' | 'success' | 'warn' | 'error' | 'cmd' = 'info') => {
    setLogs(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), text, type }]);
  };

  const executeCommand = (cmd: string) => {
    addLog(`$ php-cli ${cmd}`, 'cmd');

    const parts = cmd.split(' ');
    const mainCmd = parts[0];
    const arg = parts[1];

    switch (mainCmd) {
      case 'init':
        addLog('🚀 Initializing project scaffolding...', 'info');
        setTimeout(() => {
          addLog('✔ MVC Directory structure established', 'success');
          addLog('✔ config.json generated successfully', 'success');
          addLog('✨ Project initialized!', 'success');
        }, 800);
        break;
      case 'make:controller':
        if (!arg) return addLog('✖ Error: Missing controller name', 'error');
        addLog(`🛠 Scaffolding ${arg}Controller.php...`, 'info');
        setTimeout(() => addLog(`✔ Controller ${arg} generated in app/controllers/`, 'success'), 500);
        break;
      case 'make:model':
        if (!arg) return addLog('✖ Error: Missing model name', 'error');
        addLog(`🛠 Scaffolding ${arg}.php...`, 'info');
        setTimeout(() => addLog(`✔ Model ${arg} generated in app/models/`, 'success'), 500);
        break;
      case 'make:crud':
        if (!arg) return addLog('✖ Error: Missing entity name', 'error');
        addLog(`🔥 Triggering smart CRUD generation for ${arg}...`, 'info');
        setTimeout(() => {
          addLog(`✔ Model ${arg} generated`, 'success');
          addLog(`✔ Controller ${arg}Controller generated`, 'success');
          addLog(`✔ Smart routes injected into routes/web.php`, 'success');
          addLog(`✔ Views scaffolded automatically`, 'success');
          addLog(`✅ CRUD for ${arg} is now operational!`, 'success');
        }, 1200);
        break;
      case 'help':
        addLog('Available Commands:', 'info');
        addLog('  init [project]        - Structure initialization', 'info');
        addLog('  make:controller <N>    - Generate controller stub', 'info');
        addLog('  make:model <N>         - Generate model stub', 'info');
        addLog('  make:crud <N>          - Full MVC boilerplate', 'info');
        break;
      default:
        addLog(`✖ Unknown command: ${cmd}. Type 'help' for guidance.`, 'error');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      executeCommand(input.trim());
      setInput('');
    }
  };

  useEffect(() => {
    addLog('👋 Welcome to PHP-CLI Generator — System Ready.', 'info');
    addLog('Type "help" to see available scaffolding commands.', 'info');
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans p-6 md:p-10 flex flex-col gap-8">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col gap-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-end border-b border-slate-800 pb-6 gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
              PHP-CLI <span className="text-emerald-500 italic font-light font-serif">Generator</span>
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-2">Advanced MVC Scaffolding & Route Intelligence</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 text-[10px] font-mono text-slate-400 hidden sm:flex">
              <div className="px-3 py-1 bg-slate-900 border border-slate-800 rounded">VER: 1.0.4-BETA</div>
              <div className="px-3 py-1 bg-slate-900 border border-slate-800 rounded">ENV: DEV</div>
            </div>
            <div className="flex bg-slate-900 p-1 rounded border border-slate-800">
              <button 
                onClick={() => setCurrentView('terminal')}
                className={`px-4 py-1.5 rounded text-[11px] font-medium transition-all ${currentView === 'terminal' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                TERMINAL
              </button>
              <button 
                onClick={() => setCurrentView('structure')}
                className={`px-4 py-1.5 rounded text-[11px] font-medium transition-all ${currentView === 'structure' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                STRUCTURE
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Explorer */}
          <div className={`${currentView === 'structure' ? 'col-span-12' : 'hidden lg:flex'} col-span-3 flex flex-col gap-6`}>
            <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-5 flex-1 shadow-sm">
              <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span> 
                Project Structure
              </h2>
              
              <div className="space-y-3 font-mono text-xs">
                <FileItem name="app/" icon={<Folder size={14} className="text-emerald-500/70" />} />
                <div className="ml-4 space-y-2.5 border-l border-slate-800/60 pl-4 py-1">
                  <FileItem name="controllers/" icon={<Folder size={14} className="text-slate-600" />} />
                  <FileItem name="models/" icon={<Folder size={14} className="text-slate-600" />} />
                  <FileItem name="views/" icon={<Folder size={14} className="text-slate-600" />} />
                </div>
                <FileItem name="config/" icon={<Folder size={14} className="text-emerald-500/40" />} />
                <FileItem name="routes/" icon={<Folder size={14} className="text-emerald-500/40" />} />
                <div className="ml-4 border-l border-slate-800/60 pl-4 py-1">
                   <FileItem name="web.php" icon={<FileCode size={14} className="text-slate-400" />} />
                </div>
                <FileItem name="public/" icon={<Folder size={14} className="text-slate-600" />} />
                <div className="mt-6 pt-6 border-t border-slate-800/40 space-y-2.5">
                  <FileItem name="config.json" icon={<FileCode size={14} className="text-emerald-500/60" />} />
                  <FileItem name="package.json" icon={<FileCode size={14} className="text-slate-500" />} />
                </div>
              </div>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-5">
              <h3 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Activity size={12} /> Mode Interactif
              </h3>
              <p className="text-[11px] leading-relaxed text-emerald-100/40 font-medium">
                Auto-détection des arguments manquants. Le moteur pose des questions intelligentes en temps réel.
              </p>
            </div>
          </div>

          {/* Center Column: Terminal */}
          <div className={`${currentView === 'terminal' ? 'col-span-12 lg:col-span-6' : 'hidden lg:block col-span-6'} flex flex-col`}>
            <div className="bg-black border border-slate-800 rounded-lg shadow-2xl flex-1 flex flex-col overflow-hidden min-h-[500px]">
              <div className="flex items-center gap-1.5 px-5 py-3 border-b border-slate-900 bg-slate-950">
                <div className="flex gap-1.5 mr-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" />
                </div>
                <span className="text-[10px] text-slate-600 font-mono tracking-wider ml-2 uppercase">zsh — node cli.js</span>
              </div>
              
              <div className="flex-1 p-6 font-mono text-[13px] overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {logs.map((log) => (
                    <motion.div 
                      key={log.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-2 leading-relaxed ${
                        log.type === 'error' ? 'text-red-400' :
                        log.type === 'success' ? 'text-emerald-400' :
                        log.type === 'warn' ? 'text-amber-400' :
                        log.type === 'cmd' ? 'text-white' : 'text-slate-500'
                      }`}
                    >
                      {log.type === 'cmd' && <span className="text-emerald-500 mr-2">$</span>}
                      {log.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div className="flex items-center gap-2 mt-6">
                  <span className="text-emerald-500">$</span>
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none outline-none flex-1 text-white placeholder-slate-700"
                    placeholder="Enter command... (try 'make:crud User')"
                    autoFocus
                  />
                  <div className="w-2 h-4 bg-emerald-500/80 animate-pulse" />
                </div>
              </div>
            </div>
            
            {/* Quick Actions Bar */}
            <div className="mt-4 flex flex-col gap-3">
              <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Available Operations</span>
              <div className="flex flex-wrap gap-2">
                {['init', 'make:controller User', 'make:model Article', 'make:crud Post'].map(cmd => (
                  <button 
                    key={cmd}
                    onClick={() => executeCommand(cmd)}
                    className="px-4 py-1.5 text-[10px] font-mono bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-white rounded border border-slate-800 transition-all active:scale-95"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Intelligence & Blueprint */}
          <div className={`${currentView === 'terminal' ? 'hidden lg:flex' : 'hidden'} col-span-3 flex flex-col gap-6`}>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 shadow-sm">
              <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Base Generation</h2>
              <div className="space-y-5">
                {[
                  { label: 'Controller', cmd: 'make:controller' },
                  { label: 'Model', cmd: 'make:model' },
                  { label: 'View', cmd: 'make:view' },
                  { label: 'Auth System', cmd: 'make:auth' }
                ].map(item => (
                  <div key={item.label} className="flex flex-col group cursor-pointer">
                    <span className="text-[9px] text-slate-600 group-hover:text-emerald-500 transition-colors uppercase tracking-wider">{item.label}</span>
                    <span className="text-[11px] font-mono text-slate-300 group-hover:text-white">{item.cmd}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 flex-1">
              <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Config Blueprint</h2>
              <div className="text-[11px] font-mono leading-relaxed text-slate-500 space-y-0.5">
                <p className="text-emerald-500/70">{"{"}</p>
                <p className="pl-4 italic text-slate-700">// User preferences</p>
                <p className="pl-4 text-emerald-300">"db": <span className="text-white">"mysql"</span>,</p>
                <p className="pl-4 text-emerald-300">"engine": <span className="text-white">"twig"</span>,</p>
                <p className="pl-4 text-emerald-300">"modules": [</p>
                <p className="pl-8 text-white">"api",</p>
                <p className="pl-8 text-white">"middleware"</p>
                <p className="pl-4">],</p>
                <p className="pl-4 text-emerald-300">"strict": <span className="text-white">true</span></p>
                <p className="text-emerald-500/70">{"}"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex justify-between items-center text-[9px] text-slate-600 uppercase tracking-[0.2em] border-t border-slate-800/60 pt-6 mt-auto">
          <div className="flex gap-8 hidden sm:flex">
            <span className="hover:text-slate-400 transition-colors cursor-default">Node.js v20.x</span>
            <span className="hover:text-slate-400 transition-colors cursor-default">MVC Boilerplate Engine</span>
            <span className="text-emerald-500/50">Smart Update System Enabled</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse outline outline-emerald-500/20 outline-offset-4"></span>
            <span className="font-semibold text-emerald-500/80">System Optimized</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function FileItem({ name, icon }: { name: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 group cursor-pointer transition-colors text-xs">
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      <span className="text-slate-400 group-hover:text-white transition-colors">{name}</span>
    </div>
  );
}

