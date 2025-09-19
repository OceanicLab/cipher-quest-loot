import { ConnectButton } from '@rainbow-me/rainbowkit';
import dungeonLogo from "@/assets/dungeon-logo.png";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={dungeonLogo} 
            alt="Cipher Quest Loot" 
            className="w-10 h-10 animate-pulse-glow"
          />
          <h1 className="text-xl font-bold text-treasure">
            Cipher Quest Loot
          </h1>
        </div>
        
        <ConnectButton />
      </div>
    </header>
  );
};

export default Header;