import { Button } from "@/components/ui/button";
import { Shield, Zap, Sword, Crown } from "lucide-react";
import { useAccount } from 'wagmi';
import dungeonHero from "@/assets/dungeon-hero.jpg";

const Hero = () => {
  const { isConnected } = useAccount();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${dungeonHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      </div>
      
      {/* Binary Animation Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="animate-binary-scroll text-encrypted/30 text-xs font-mono leading-relaxed whitespace-pre">
          {Array.from({ length: 50 }, (_, i) => 
            Array.from({ length: 100 }, () => Math.round(Math.random())).join('') + '\n'
          ).join('')}
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-treasure">Cipher Quest Loot</span>
          <br />
          <span className="text-encrypted">FHE Gaming Platform</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
          Embark on encrypted quests where loot remains hidden until completion. 
          Fully Homomorphic Encryption ensures secure and fair gameplay.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {isConnected ? (
            <>
              <Button 
                variant="treasure"
                size="lg" 
              >
                <Sword className="w-5 h-5 mr-2" />
                Start Quest
              </Button>
              
              <Button 
                variant="outline-encrypted"
                size="lg" 
              >
                <Crown className="w-5 h-5 mr-2" />
                View Loot
              </Button>
            </>
          ) : (
            <Button 
              variant="treasure"
              size="lg" 
            >
              <Shield className="w-5 h-5 mr-2" />
              Connect Wallet to Play
            </Button>
          )}
          
          <Button 
            variant="outline-encrypted"
            size="lg" 
          >
            <Zap className="w-5 h-5 mr-2" />
            Learn About FHE
          </Button>
        </div>
        
        {/* Floating Elements */}
        <div className="mt-16 flex justify-center gap-8">
          <div className="animate-treasure-float">
            <div className="w-3 h-3 bg-treasure rounded-full glow-treasure" />
          </div>
          <div className="animate-treasure-float" style={{ animationDelay: '1s' }}>
            <div className="w-2 h-2 bg-encrypted rounded-full glow-encrypted" />
          </div>
          <div className="animate-treasure-float" style={{ animationDelay: '2s' }}>
            <div className="w-4 h-4 bg-mystical rounded-full opacity-70" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;