import React from 'react';
import { Menu, X } from 'lucide-react';
import { NavPage } from '../types';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const getPageTitle = (page: NavPage) => {
    switch (page) {
      case 'overview':
        return 'Overview';
      case 'analysis':
        return 'Disaster Analysis';
      case 'explainability':
        return 'AI Explainability';
      case 'architecture':
        return 'Model Architecture';
      case 'insights':
        return 'Research Insights';
      case 'about':
        return 'About Project';
      default:
        return 'Overview';
    }
  };

  return (
    <header className="h-14 bg-[#FFFFFF] border-b border-[#E7EAF0] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Mobile Menu Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 rounded-md text-[#697586] hover:text-[#202B38] hover:bg-[#F0F4F8] border border-[#E7EAF0] cursor-pointer"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        <div className="flex items-center gap-2 text-[13.5px]">
          <span className="text-[#697586] font-normal">DisasterLens AI</span>
          <span className="text-[#B0BCCE]">/</span>
          <span className="text-[#202B38] font-medium">{getPageTitle(currentPage)}</span>
        </div>
      </div>

      {/* Right Information Badges (Subtle, clean, non-glowing) */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md bg-[#F7F8FA] border border-[#E7EAF0] text-[11.5px] font-normal text-[#697586]">
          Model: ResNet-50 + BERT
        </div>

        <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#F0F4F8] text-[#2563A6] border border-[#D5E1ED] text-[11.5px] font-medium">
          Demonstration Mode
        </div>

        <div className="hidden md:inline-flex items-center px-2.5 py-1 rounded-md bg-[#F7F8FA] border border-[#E7EAF0] text-[11.5px] font-normal text-[#697586]">
          CSE Research
        </div>
      </div>
    </header>
  );
};
