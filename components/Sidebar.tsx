import React from 'react';
import { SectionId } from '../types';
import { 
  BookOpen, 
  Layers, 
  RefreshCw, 
  BarChart3, 
  Megaphone, 
  Award,
  PenTool
} from 'lucide-react';

interface Props {
  activeSection: SectionId;
  onSelect: (id: SectionId) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (v: boolean) => void;
}

const MENU_ITEMS = [
  { id: SectionId.INTRO, label: 'Introdução', icon: BookOpen },
  { id: SectionId.COMPONENTS, label: 'Componentes do CI', icon: Layers },
  { id: SectionId.PROCESSES, label: 'Processos de GC', icon: RefreshCw },
  { id: SectionId.SECI_WORKSHOP, label: 'Workshop: Guia SECI', icon: PenTool },
  { id: SectionId.MEASUREMENT, label: 'Mensuração', icon: BarChart3 },
  { id: SectionId.DISCLOSURE, label: 'Estratégia de Divulgação', icon: Megaphone },
  { id: SectionId.CONCLUSION, label: 'Conclusão', icon: Award },
];

const Sidebar: React.FC<Props> = ({ activeSection, onSelect, isMobileOpen, setIsMobileOpen }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 bottom-0 w-64 bg-slate-900 text-slate-300 z-50 transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static
      `}>
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-white tracking-tight">Masterclass de CI</h1>
          <p className="text-xs text-slate-500 mt-1">Gestão Estratégica de Ativos</p>
        </div>

        <nav className="p-4 space-y-1">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelect(item.id);
                  setIsMobileOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                    : 'hover:bg-slate-800 hover:text-white'}
                `}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-slate-800">
            <div className="text-xs text-slate-600">
                Progresso do Curso
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2">
                <div 
                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ 
                        width: `${((Object.values(SectionId).indexOf(activeSection) + 1) / Object.values(SectionId).length) * 100}%` 
                    }}
                ></div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;