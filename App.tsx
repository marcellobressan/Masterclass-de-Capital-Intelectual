import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import SectionContent from './components/SectionContent';
import { SectionId } from './types';
import { Menu, ChevronRight, ChevronLeft } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.INTRO);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Scroll to top on section change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  const sections = Object.values(SectionId);
  const currentIndex = sections.indexOf(activeSection);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === sections.length - 1;

  const handleNext = () => {
    if (!isLast) setActiveSection(sections[currentIndex + 1]);
  };

  const handlePrev = () => {
    if (!isFirst) setActiveSection(sections[currentIndex - 1]);
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar 
        activeSection={activeSection} 
        onSelect={setActiveSection}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Mobile Header */}
        <header className="bg-white border-b border-slate-200 p-4 flex items-center justify-between md:hidden sticky top-0 z-30">
          <div className="font-bold text-slate-800">Masterclass de CI</div>
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-md"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
           <SectionContent activeSection={activeSection} />
        </main>

        {/* Footer Navigation */}
        <footer className="bg-white border-t border-slate-200 p-6 sticky bottom-0 z-20">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <button 
              onClick={handlePrev}
              disabled={isFirst}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors
                ${isFirst 
                  ? 'text-slate-300 cursor-not-allowed' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
              `}
            >
              <ChevronLeft size={16} />
              Anterior
            </button>

            <span className="text-xs text-slate-400 hidden sm:block">
               {currentIndex + 1} / {sections.length}
            </span>

            <button 
               onClick={handleNext}
               disabled={isLast}
               className={`
                flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-sm transition-all
                ${isLast
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200'}
              `}
            >
              {isLast ? 'Concluído' : 'Próxima Lição'}
              {!isLast && <ChevronRight size={16} />}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;