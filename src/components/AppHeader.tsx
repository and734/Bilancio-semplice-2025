import React from 'react';
import { Wallet } from 'lucide-react'; // Changed icon to Wallet

const AppHeader = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 flex items-center">
        <Wallet className="h-8 w-8 mr-3" />
        <h1 className="text-2xl font-bold tracking-tight">Bilancio Analyzer</h1>
      </div>
    </header>
  );
};

export default AppHeader;
