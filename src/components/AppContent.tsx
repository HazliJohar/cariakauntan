import { useState } from 'react';
import { AccountantList } from './accountants/AccountantList';
import ServiceFilter from './ServiceFilter';
import CountryFilter from './CountryFilter';
import Profile from '@/pages/Profile';
import Media from '@/pages/Media';
import Community from '@/pages/Community';
import Mergers from '@/pages/Mergers';
import ModeratorDashboard from '@/pages/ModeratorDashboard';
import { useAuth } from '@/hooks/useAuth';
import { Header } from './layout/Header';
import { services } from '@/data/services';

interface AppContentProps {
  onReturnHome?: () => void;
}

export default function AppContent({ onReturnHome }: AppContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'search' | 'profile' | 'media' | 'community' | 'mergers' | 'moderator'>('search');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { user } = useAuth();

  // Check if user is moderator
  const isModerator = user?.email === 'work@hazlijohar.com';

  const renderContent = () => {
    switch (currentView) {
      case 'profile':
        return <Profile />;
      case 'media':
        return <Media />;
      case 'community':
        return <Community />;
      case 'mergers':
        return <Mergers />;
      case 'moderator':
        return <ModeratorDashboard />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 md:gap-8">
            <aside className="space-y-4">
              <ServiceFilter
                services={services}
                selectedServices={selectedServices}
                onChange={setSelectedServices}
              />
              <CountryFilter
                selectedCountry={selectedCountry}
                selectedRegion={selectedRegion}
                onSelectCountry={setSelectedCountry}
                onSelectRegion={setSelectedRegion}
              />
            </aside>

            <div className="space-y-4">
              <AccountantList
                searchQuery={searchQuery}
                selectedServices={selectedServices}
                selectedCountry={selectedCountry}
                selectedRegion={selectedRegion}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isModerator={isModerator}
        isAuthenticated={!!user}
        onReturnHome={onReturnHome}
      />
      
      <main className="container mx-auto px-4 py-6 md:py-8">
        {renderContent()}
      </main>
    </div>
  );
}