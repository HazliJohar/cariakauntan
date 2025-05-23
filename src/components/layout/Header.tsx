import { useState } from 'react';
import { Menu, Search, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from '../Logo';
import AuthButtons from '../auth/AuthButtons';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NavigationMenu } from './NavigationMenu';
import { MobileMenu } from './MobileMenu';
import AccountantMap from '../map/AccountantMap';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  isModerator: boolean;
  isAuthenticated: boolean;
  onReturnHome?: () => void;
}

export function Header({
  currentView,
  setCurrentView,
  searchQuery,
  onSearchChange,
  isModerator,
  isAuthenticated,
  onReturnHome
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0">
                <MobileMenu
                  currentView={currentView}
                  setCurrentView={(view) => {
                    setCurrentView(view);
                    setIsMobileMenuOpen(false);
                  }}
                  isModerator={isModerator}
                  isAuthenticated={isAuthenticated}
                  onReturnHome={onReturnHome}
                />
              </SheetContent>
            </Sheet>
            
            <div className="flex items-center gap-4">
              <Logo />
              {currentView === 'search' && (
                <div className="hidden md:block">
                  <AccountantMap />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {currentView === 'search' && onSearchChange && (
              <div className="relative hidden lg:block w-[250px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  className="pl-10"
                  placeholder="Search accountants..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            )}
            
            {onReturnHome && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onReturnHome}
                className="hidden md:flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Return Home
              </Button>
            )}

            <NavigationMenu
              currentView={currentView}
              setCurrentView={setCurrentView}
              isModerator={isModerator}
              isAuthenticated={isAuthenticated}
            />
            
            <AuthButtons />
          </div>
        </div>
      </div>
    </header>
  );
}