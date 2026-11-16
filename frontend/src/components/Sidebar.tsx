import React from 'react';
import { 
  LayoutDashboard, 
  Flame, 
  Eye, 
  GitBranch, 
  BarChart3, 
  Info,
  Shield
} from 'lucide-react';
import { NavPage } from '../types';

interface SidebarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const navItems: Array<{ id: NavPage; label: string; icon: React.ReactNode }> = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'analysis', label: 'Disaster Analysis', icon: <Flame className="w-4 h-4" /> },
    { id: 'explainability', label: 'AI Explainability', icon: <Eye className="w-4 h-4" /> },
    { id: 'architecture', label: 'Model Architecture', icon: <GitBranch className="w-4 h-4" /> },
    { id: 'insights', label: 'Research Insights', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'about', label: 'About Project', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 bg-[#FFFFFF] border-r border-[#E7EAF0] flex flex-col shrink-0 h-screen sticky top-0 select-none z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#E7EAF0]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#2563A6] flex items-center justify-center text-white shrink-0 shadow-xs">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-semibold text-[15px] text-[#202B38] tracking-tight leading-tight">
              DisasterLens AI
            </h1>
            <p className="text-[11px] text-[#697586] font-normal leading-tight mt-0.5">
              Multimodal Disaster Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 text-[11px] font-medium text-[#9AA4B2] uppercase tracking-wider mb-2">
          Platform
        </p>
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13.5px] font-medium transition-colors cursor-pointer text-left ${
                isActive
                  ? 'bg-[#F0F4F8] text-[#2563A6]'
                  : 'text-[#697586] hover:text-[#202B38] hover:bg-[#F7F8FA]'
              }`}
            >
              <span className={isActive ? 'text-[#2563A6]' : 'text-[#8792A2]'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Institutional Footer */}
      <div className="p-4 border-t border-[#E7EAF0] bg-[#FFFFFF]">
        <div className="px-3 py-2.5 rounded-lg bg-[#F7F8FA] border border-[#E7EAF0]">
          <p className="text-[12px] font-semibold text-[#202B38] leading-tight">
            DisasterLens AI Research
          </p>
          <p className="text-[11px] text-[#697586] font-normal mt-0.5">
            Computer Science & Engineering
          </p>
        </div>
      </div>
    </aside>
  );
};
