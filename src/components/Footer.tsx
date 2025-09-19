import { Flame, Binary } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur">
      <div className="container mx-auto px-4 py-12">
        {/* Flickering Torches */}
        <div className="flex justify-center gap-12 mb-8">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="animate-flicker" 
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              <Flame className="w-8 h-8 text-torch glow-torch" />
            </div>
          ))}
        </div>

        {/* Encrypted Flames Effect */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-torch/20 to-encrypted/20 rounded-full border border-torch/30">
            <Binary className="w-5 h-5 text-encrypted animate-pulse" />
            <span className="text-sm font-mono text-encrypted">
              01100110 01101000 01100101
            </span>
            <Flame className="w-5 h-5 text-torch animate-flicker" />
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold text-treasure mb-4">Cipher Quest Loot</h3>
            <p className="text-muted-foreground text-sm">
              Decentralized gaming platform powered by Fully Homomorphic Encryption technology.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-encrypted mb-4">Technology</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Fully Homomorphic Encryption</li>
              <li>• Web3 Wallet Integration</li>
              <li>• Smart Contract Gaming</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-mystical mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Discord Community</li>
              <li>• Quest Guides</li>
              <li>• Developer Documentation</li>
            </ul>
          </div>
        </div>

        {/* Binary Code Stream */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="text-center">
            <div className="overflow-hidden h-6 mb-4">
              <div className="animate-binary-scroll text-xs font-mono text-encrypted/50 leading-6">
                1011010001011010100101101010010110101001011010100101101010010110101001
                0110101001011010100101101010010110101001011010100101101010010110101001
                1010100101101010010110101001011010100101101010010110101001011010100101
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2024 Cipher Quest Loot. All quests are cryptographically secured with FHE.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;