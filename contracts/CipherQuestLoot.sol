// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@fhevm/lib/Reencrypt.sol";
import "@fhevm/lib/Fhe.sol";

contract CipherQuestLoot {
    using Fhe for euint32;
    using Fhe for ebool;
    
    struct Quest {
        euint32 questId;
        euint32 rewardAmount;
        euint32 difficulty;
        euint32 participantCount;
        ebool isActive;
        ebool isCompleted;
        string title;
        string description;
        address creator;
        uint256 startTime;
        uint256 endTime;
        uint256 creationTime;
    }
    
    struct Loot {
        euint32 lootId;
        euint32 value;
        euint32 rarity;
        ebool isClaimed;
        string name;
        string description;
        address owner;
        uint256 timestamp;
    }
    
    struct Player {
        euint32 reputation;
        euint32 totalQuests;
        euint32 completedQuests;
        euint32 totalLoot;
        ebool isActive;
        address wallet;
        string name;
    }
    
    mapping(uint256 => Quest) public quests;
    mapping(uint256 => Loot) public loots;
    mapping(address => Player) public players;
    mapping(address => euint32[]) public playerLoots;
    mapping(uint256 => address[]) public questParticipants;
    
    uint256 public questCounter;
    uint256 public lootCounter;
    address public owner;
    address public verifier;
    
    event QuestCreated(uint256 indexed questId, address indexed creator, string title);
    event QuestCompleted(uint256 indexed questId, address indexed player);
    event LootClaimed(uint256 indexed lootId, address indexed player);
    event PlayerRegistered(address indexed player, string name);
    event ReputationUpdated(address indexed player, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function registerPlayer(string memory _name) public {
        require(players[msg.sender].wallet == address(0), "Player already registered");
        
        players[msg.sender] = Player({
            reputation: Fhe.asEuint32(0),
            totalQuests: Fhe.asEuint32(0),
            completedQuests: Fhe.asEuint32(0),
            totalLoot: Fhe.asEuint32(0),
            isActive: Fhe.asEbool(true),
            wallet: msg.sender,
            name: _name
        });
        
        emit PlayerRegistered(msg.sender, _name);
    }
    
    function createQuest(
        string memory _title,
        string memory _description,
        euint32 _rewardAmount,
        euint32 _difficulty,
        uint256 _duration
    ) public payable returns (uint256) {
        require(bytes(_title).length > 0, "Quest title cannot be empty");
        require(_duration > 0, "Duration must be positive");
        require(msg.value > 0, "Quest must have reward");
        
        uint256 questId = questCounter++;
        
        quests[questId] = Quest({
            questId: Fhe.asEuint32(questId),
            rewardAmount: _rewardAmount,
            difficulty: _difficulty,
            participantCount: Fhe.asEuint32(0),
            isActive: Fhe.asEbool(true),
            isCompleted: Fhe.asEbool(false),
            title: _title,
            description: _description,
            creator: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration,
            creationTime: block.timestamp
        });
        
        emit QuestCreated(questId, msg.sender, _title);
        return questId;
    }
    
    function joinQuest(uint256 questId) public {
        require(quests[questId].creator != address(0), "Quest does not exist");
        require(Fhe.decrypt(quests[questId].isActive), "Quest is not active");
        require(block.timestamp <= quests[questId].endTime, "Quest has ended");
        require(players[msg.sender].wallet != address(0), "Player not registered");
        
        questParticipants[questId].push(msg.sender);
        quests[questId].participantCount = quests[questId].participantCount + Fhe.asEuint32(1);
        players[msg.sender].totalQuests = players[msg.sender].totalQuests + Fhe.asEuint32(1);
    }
    
    function completeQuest(uint256 questId) public {
        require(quests[questId].creator != address(0), "Quest does not exist");
        require(Fhe.decrypt(quests[questId].isActive), "Quest is not active");
        require(block.timestamp <= quests[questId].endTime, "Quest has ended");
        
        // Check if player participated in quest
        bool isParticipant = false;
        for (uint i = 0; i < questParticipants[questId].length; i++) {
            if (questParticipants[questId][i] == msg.sender) {
                isParticipant = true;
                break;
            }
        }
        require(isParticipant, "Player did not join this quest");
        
        // Mark quest as completed
        quests[questId].isCompleted = Fhe.asEbool(true);
        quests[questId].isActive = Fhe.asEbool(false);
        
        // Update player stats
        players[msg.sender].completedQuests = players[msg.sender].completedQuests + Fhe.asEuint32(1);
        players[msg.sender].reputation = players[msg.sender].reputation + quests[questId].difficulty;
        
        // Create loot for player
        uint256 lootId = lootCounter++;
        loots[lootId] = Loot({
            lootId: Fhe.asEuint32(lootId),
            value: quests[questId].rewardAmount,
            rarity: quests[questId].difficulty,
            isClaimed: Fhe.asEbool(false),
            name: string(abi.encodePacked("Quest Reward: ", quests[questId].title)),
            description: "Reward for completing quest",
            owner: msg.sender,
            timestamp: block.timestamp
        });
        
        playerLoots[msg.sender].push(Fhe.asEuint32(lootId));
        players[msg.sender].totalLoot = players[msg.sender].totalLoot + quests[questId].rewardAmount;
        
        emit QuestCompleted(questId, msg.sender);
        emit LootClaimed(lootId, msg.sender);
    }
    
    function claimLoot(uint256 lootId) public {
        require(loots[lootId].owner == msg.sender, "Not the owner of this loot");
        require(Fhe.decrypt(loots[lootId].isClaimed) == false, "Loot already claimed");
        
        loots[lootId].isClaimed = Fhe.asEbool(true);
        
        // Transfer reward to player
        uint256 rewardAmount = Fhe.decrypt(loots[lootId].value);
        payable(msg.sender).transfer(rewardAmount);
        
        emit LootClaimed(lootId, msg.sender);
    }
    
    function updateReputation(address player, euint32 newReputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(players[player].wallet != address(0), "Player not registered");
        
        players[player].reputation = newReputation;
        emit ReputationUpdated(player, Fhe.decrypt(newReputation));
    }
    
    function getQuestInfo(uint256 questId) public view returns (
        string memory title,
        string memory description,
        uint32 rewardAmount,
        uint32 difficulty,
        uint32 participantCount,
        bool isActive,
        bool isCompleted,
        address creator,
        uint256 startTime,
        uint256 endTime
    ) {
        Quest storage quest = quests[questId];
        return (
            quest.title,
            quest.description,
            Fhe.decrypt(quest.rewardAmount),
            Fhe.decrypt(quest.difficulty),
            Fhe.decrypt(quest.participantCount),
            Fhe.decrypt(quest.isActive),
            Fhe.decrypt(quest.isCompleted),
            quest.creator,
            quest.startTime,
            quest.endTime
        );
    }
    
    function getPlayerInfo(address player) public view returns (
        string memory name,
        uint32 reputation,
        uint32 totalQuests,
        uint32 completedQuests,
        uint32 totalLoot,
        bool isActive
    ) {
        Player storage playerData = players[player];
        return (
            playerData.name,
            Fhe.decrypt(playerData.reputation),
            Fhe.decrypt(playerData.totalQuests),
            Fhe.decrypt(playerData.completedQuests),
            Fhe.decrypt(playerData.totalLoot),
            Fhe.decrypt(playerData.isActive)
        );
    }
    
    function getLootInfo(uint256 lootId) public view returns (
        string memory name,
        string memory description,
        uint32 value,
        uint32 rarity,
        bool isClaimed,
        address owner,
        uint256 timestamp
    ) {
        Loot storage loot = loots[lootId];
        return (
            loot.name,
            loot.description,
            Fhe.decrypt(loot.value),
            Fhe.decrypt(loot.rarity),
            Fhe.decrypt(loot.isClaimed),
            loot.owner,
            loot.timestamp
        );
    }
    
    function getPlayerLoots(address player) public view returns (uint256[] memory) {
        uint256[] memory lootIds = new uint256[](playerLoots[player].length);
        for (uint i = 0; i < playerLoots[player].length; i++) {
            lootIds[i] = Fhe.decrypt(playerLoots[player][i]);
        }
        return lootIds;
    }
    
    function withdrawQuestFunds(uint256 questId) public {
        require(quests[questId].creator == msg.sender, "Only quest creator can withdraw");
        require(Fhe.decrypt(quests[questId].isCompleted), "Quest must be completed");
        require(block.timestamp > quests[questId].endTime, "Quest must be ended");
        
        // Calculate remaining funds
        uint256 totalReward = Fhe.decrypt(quests[questId].rewardAmount);
        uint256 participantCount = Fhe.decrypt(quests[questId].participantCount);
        uint256 distributedReward = totalReward * participantCount;
        uint256 remainingFunds = address(this).balance - distributedReward;
        
        if (remainingFunds > 0) {
            payable(msg.sender).transfer(remainingFunds);
        }
    }
}
