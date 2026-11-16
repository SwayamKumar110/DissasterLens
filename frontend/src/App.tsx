import React, { useState } from 'react';
import { NavPage, AnalysisResponse } from './types';
import { INITIAL_ANALYSIS_RESULT } from './data/fallbackData';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { OverviewPage } from './pages/OverviewPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { ExplainabilityPage } from './pages/ExplainabilityPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { ResearchInsightsPage } from './pages/ResearchInsightsPage';
import { AboutPage } from './pages/AboutPage';

export function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('overview');
  const [currentResult, setCurrentResult] = useState<AnalysisResponse>(INITIAL_ANALYSIS_RESULT);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleNavigate = (page: NavPage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#202B38] flex font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-xs" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          <div className="relative z-50">
            <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentPage === 'overview' && (
            <OverviewPage onNavigate={handleNavigate} />
          )}

          {currentPage === 'analysis' && (
            <AnalysisPage
              currentResult={currentResult}
              onUpdateResult={setCurrentResult}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'explainability' && (
            <ExplainabilityPage currentResult={currentResult} />
          )}

          {currentPage === 'architecture' && (
            <ArchitecturePage />
          )}

          {currentPage === 'insights' && (
            <ResearchInsightsPage />
          )}

          {currentPage === 'about' && (
            <AboutPage />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-[#E7EAF0] bg-[#FFFFFF] py-5 px-6 text-center text-[12px] text-[#697586]">
          <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-2">
            <span>DisasterLens AI • Multimodal Disaster Intelligence</span>
            <span>Computer Science & Engineering Research</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
