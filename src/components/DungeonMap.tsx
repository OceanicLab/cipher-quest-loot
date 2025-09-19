import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock, Unlock, Coins, Gem, Crown } from "lucide-react";
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { useToast } from "@/hooks/use-toast";

interface TreasureNode {
  id: string;
  x: number;
  y: number;
  type: 'common' | 'rare' | 'legendary';
  encrypted: boolean;
  value: string;
}

const treasureNodes: TreasureNode[] = [
  { id: '1', x: 20, y: 30, type: 'common', encrypted: true, value: '??? Gold' },
  { id: '2', x: 45, y: 20, type: 'rare', encrypted: true, value: '??? Gems' },
  { id: '3', x: 70, y: 45, type: 'legendary', encrypted: true, value: '??? Crown' },
  { id: '4', x: 30, y: 70, type: 'common', encrypted: true, value: '??? Coins' },
  { id: '5', x: 80, y: 25, type: 'rare', encrypted: true, value: '??? Artifact' },
  { id: '6', x: 60, y: 80, type: 'legendary', encrypted: true, value: '??? Relic' },
];

const DungeonMap = () => {
  const [nodes, setNodes] = useState<TreasureNode[]>(treasureNodes);
  const [questProgress, setQuestProgress] = useState(0);
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { toast } = useToast();

  const handleNodeClick = async (nodeId: string) => {
    if (questProgress < 100 || !isConnected) return;
    
    try {
      // Simulate claiming loot from smart contract
      await writeContract({
        address: '0x...', // Contract address would be set here
        abi: [], // Contract ABI would be imported here
        functionName: 'claimLoot',
        args: [parseInt(nodeId)]
      });
      
      setNodes(prev => prev.map(node => 
        node.id === nodeId 
          ? { 
              ...node, 
              encrypted: false,
              value: node.type === 'legendary' ? '1000 Gold' : 
                     node.type === 'rare' ? '500 Gold' : '250 Gold'
            }
          : node
      ));
      
      toast({
        title: "Loot Claimed!",
        description: "Successfully claimed encrypted treasure.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to claim loot. Please try again.",
        variant: "destructive",
      });
    }
  };

  const startQuest = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to start a quest.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Simulate quest progress with smart contract interaction
      const interval = setInterval(() => {
        setQuestProgress(prev => {
          const next = prev + 10;
          if (next >= 100) {
            clearInterval(interval);
            return 100;
          }
          return next;
        });
      }, 500);
    } catch (error) {
      toast({
        title: "Quest Error",
        description: "Failed to start quest. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getTreasureIcon = (type: string) => {
    switch (type) {
      case 'legendary': return <Crown className="w-4 h-4" />;
      case 'rare': return <Gem className="w-4 h-4" />;
      default: return <Coins className="w-4 h-4" />;
    }
  };

  const getNodeColor = (type: string, encrypted: boolean) => {
    if (encrypted) return 'bg-encrypted glow-encrypted';
    
    switch (type) {
      case 'legendary': return 'bg-mystical';
      case 'rare': return 'bg-treasure glow-treasure';
      default: return 'bg-treasure/70';
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-treasure mb-4">
            Dungeon Map
          </h2>
          <p className="text-muted-foreground text-lg">
            Click on treasure nodes after completing the quest to reveal encrypted rewards
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Quest Progress */}
          <Card className="mb-8 p-6 bg-card/50 backdrop-blur">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-treasure">Quest Progress</h3>
              <span className="text-encrypted">{questProgress}%</span>
            </div>
            <div className="w-full bg-stone rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-treasure glow-treasure transition-all duration-500"
                style={{ width: `${questProgress}%` }}
              />
            </div>
            <div className="mt-4">
              {questProgress < 100 ? (
                <Button 
                  variant="encrypted"
                  onClick={startQuest}
                  disabled={questProgress > 0}
                >
                  {questProgress > 0 ? 'Quest in Progress...' : 'Start Quest'}
                </Button>
              ) : (
                <p className="text-treasure font-semibold">
                  ✨ Quest Complete! Treasure nodes are now unlocked!
                </p>
              )}
            </div>
          </Card>

          {/* Dungeon Map */}
          <Card className="p-8 bg-gradient-to-br from-shadow to-stone/20 border-stone relative overflow-hidden min-h-[500px]">
            {/* Map Grid Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full" 
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}
              />
            </div>

            {/* Treasure Nodes */}
            {nodes.map((node) => (
              <button
                key={node.id}
                onClick={() => handleNodeClick(node.id)}
                disabled={questProgress < 100 && node.encrypted}
                className={`
                  absolute w-12 h-12 rounded-full flex items-center justify-center
                  transition-all duration-300 hover:scale-110 animate-treasure-float
                  ${getNodeColor(node.type, node.encrypted)}
                  ${questProgress >= 100 ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
                `}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  animationDelay: `${parseInt(node.id) * 0.5}s`
                }}
              >
                {node.encrypted ? (
                  <Lock className="w-5 h-5 text-shadow" />
                ) : (
                  getTreasureIcon(node.type)
                )}
              </button>
            ))}

            {/* Map Legend */}
            <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur rounded-lg p-4">
              <h4 className="text-sm font-semibold text-treasure mb-2">Legend</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <Lock className="w-3 h-3 text-encrypted" />
                  <span>Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coins className="w-3 h-3 text-treasure" />
                  <span>Common</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gem className="w-3 h-3 text-treasure" />
                  <span>Rare</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="w-3 h-3 text-mystical" />
                  <span>Legendary</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Decrypted Rewards */}
          {nodes.some(node => !node.encrypted) && (
            <Card className="mt-8 p-6 bg-card/50 backdrop-blur">
              <h3 className="text-xl font-semibold text-treasure mb-4">Decrypted Rewards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {nodes.filter(node => !node.encrypted).map(node => (
                  <div 
                    key={node.id}
                    className="flex items-center gap-3 p-3 bg-treasure/10 rounded-lg border border-treasure/20"
                  >
                    {getTreasureIcon(node.type)}
                    <span className="text-treasure">{node.value}</span>
                    <Unlock className="w-4 h-4 text-encrypted ml-auto" />
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default DungeonMap;