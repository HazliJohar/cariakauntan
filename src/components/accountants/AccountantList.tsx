import { useState } from 'react';
import { AccountantCard } from './AccountantCard';
import ContactDialog from '../ContactDialog';
import RatingDialog from '../ratings/RatingDialog';
import { accountants } from '@/data/accountants';
import type { Accountant } from '@/data/accountants';

interface AccountantListProps {
  searchQuery: string;
  selectedServices: string[];
  selectedCountry: string | null;
  selectedRegion: string | null;
}

export function AccountantList({ 
  searchQuery, 
  selectedServices,
  selectedCountry,
  selectedRegion 
}: AccountantListProps) {
  const [selectedAccountant, setSelectedAccountant] = useState<Accountant | null>(null);
  const [showRatingDialog, setShowRatingDialog] = useState(false);

  const filteredAccountants = accountants.filter(accountant => {
    // Search query filter
    const matchesSearch = accountant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      accountant.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Services filter
    const matchesServices = selectedServices.length === 0 || 
      selectedServices.some(service => accountant.services.includes(service));
    
    // Location filter
    let matchesLocation = true;
    if (selectedCountry === 'MY') {
      if (selectedRegion) {
        // If region is selected, check for specific region match
        matchesLocation = accountant.location.toLowerCase().includes(selectedRegion.toLowerCase());
      } else {
        // If only Malaysia is selected without region, show all Malaysian accountants
        matchesLocation = accountant.location.toLowerCase().includes('malaysia') ||
          ['kuala lumpur', 'selangor', 'penang', 'johor', 'perak'].some(
            region => accountant.location.toLowerCase().includes(region.toLowerCase())
          );
      }
    } else if (selectedCountry) {
      // For other countries, match country name
      const countryName = {
        'SG': 'singapore',
        'ID': 'indonesia',
        'TH': 'thailand',
        'VN': 'vietnam',
        'PH': 'philippines'
      }[selectedCountry];
      matchesLocation = accountant.location.toLowerCase().includes(countryName || '');
    }
    
    return matchesSearch && matchesServices && matchesLocation;
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {filteredAccountants.map((accountant) => (
          <AccountantCard
            key={accountant.id}
            accountant={accountant}
            onContact={() => setSelectedAccountant(accountant)}
            onRate={() => {
              setSelectedAccountant(accountant);
              setShowRatingDialog(true);
            }}
          />
        ))}

        {filteredAccountants.length === 0 && (
          <div className="text-center py-12 bg-muted/50 rounded-lg">
            <p className="text-muted-foreground">
              No accountants found matching your criteria
            </p>
          </div>
        )}
      </div>

      {selectedAccountant && !showRatingDialog && (
        <ContactDialog
          isOpen={true}
          onClose={() => setSelectedAccountant(null)}
          accountant={selectedAccountant}
        />
      )}

      {selectedAccountant && showRatingDialog && (
        <RatingDialog
          isOpen={true}
          onClose={() => {
            setSelectedAccountant(null);
            setShowRatingDialog(false);
          }}
          providerId={selectedAccountant.id}
          providerName={selectedAccountant.name}
        />
      )}
    </>
  );
}