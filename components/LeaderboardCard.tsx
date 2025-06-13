// Contains the Leaderboard card component
import { motion } from "framer-motion";
import { Trophy, Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LeaderboardEntry } from "../types";

interface LeaderboardCardProps {
  entries: LeaderboardEntry[];
  limit?: number;
  title?: string;
  icon?: React.ReactNode;
  showMessage?: boolean;
  className?: string;
  messageText?: string;
  showCurrentUserRank?: boolean;
  onNameClick?: (name: string) => void;
}

export function LeaderboardCard({
  entries,
  limit = 3,
  title = "Top Performers",
  icon = <Trophy className="h-5 w-5 text-yellow-300" />,
  showMessage = true,
  className = "",
  messageText = "Join our daily quiz challenge to get featured!",
  showCurrentUserRank = false,
  onNameClick
}: LeaderboardCardProps) {
  const displayEntries = entries.slice(0, limit);
  
  // Find the current user's entry and rank
  const currentUserEntry = entries.find(entry => entry.isCurrentUser);
  const currentUserRank = currentUserEntry ? 
    entries.findIndex(entry => entry.id === currentUserEntry.id) + 1 : null;
  
  // Check if current user is already in top entries
  const isUserInTop = currentUserEntry && displayEntries.some(entry => entry.id === currentUserEntry.id);
  
  return (
    <Card className={`bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl overflow-hidden ${className}`}>
      <CardHeader className="border-b border-white/10 pb-3">
        <CardTitle className="text-white text-center flex items-center justify-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {displayEntries.map((player, index) => (
            <motion.div 
              key={player.id || player.name} 
              className={`flex items-center gap-3 p-2.5 rounded-lg backdrop-filter backdrop-blur-sm border transition-all duration-200 ${
                player.isCurrentUser 
                ? "bg-yellow-500/20 border-yellow-500/40 hover:bg-yellow-500/30" 
                : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                  index === 0
                    ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-purple-900"
                    : index === 1
                      ? "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700"
                      : index === 2
                        ? "bg-gradient-to-r from-orange-400 to-amber-600 text-white"
                        : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                }`}
              >
                {index + 1}
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                <AvatarFallback>
                  {player.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-col">
                  <p 
                    className={`font-medium ${player.isCurrentUser ? "text-yellow-300 flex items-center gap-1" : "text-white"}`}
                    onClick={() => onNameClick && onNameClick(player.name)}
                    style={onNameClick ? {cursor: 'pointer'} : {}}
                  >
                    {player.name}
                    {player.isCurrentUser && <Star className="h-3 w-3 fill-yellow-300 text-yellow-300" />}
                  </p>
                  <div className="flex text-white/60 text-xs">
                    {player.date && <span>{player.date}</span>}
                    {player.category && <span className="ml-1">• {player.category}</span>}
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className={player.isCurrentUser ? "bg-yellow-300 text-purple-900" : "bg-white/20 text-white"}>
                {player.score}%
              </Badge>
            </motion.div>
          ))}
          
          {/* Show current user if not in top entries */}
          {showCurrentUserRank && currentUserEntry && !isUserInTop && currentUserRank && (
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-dashed border-white/20"></span>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-black/20 backdrop-blur-md px-3 text-xs text-white/60 rounded-full">Your Position</span>
              </div>
              
              <motion.div 
                className="flex items-center gap-3 p-2.5 rounded-lg bg-yellow-500/20 backdrop-filter backdrop-blur-sm border border-yellow-500/40 hover:bg-yellow-500/30 mt-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full font-bold bg-gradient-to-r from-yellow-500 to-amber-600 text-white">
                  {currentUserRank}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUserEntry.avatar || "/placeholder.svg"} alt={currentUserEntry.name} />
                  <AvatarFallback>
                    {currentUserEntry.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col">
                    <p className="text-yellow-300 font-medium flex items-center gap-1">
                      {currentUserEntry.name}
                      <Star className="h-3 w-3 fill-yellow-300 text-yellow-300" />
                    </p>
                    <div className="flex text-white/60 text-xs">
                      {currentUserEntry.date && <span>{currentUserEntry.date}</span>}
                      {currentUserEntry.category && <span className="ml-1">• {currentUserEntry.category}</span>}
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-yellow-300 text-purple-900">
                  {currentUserEntry.score}%
                </Badge>
              </motion.div>
            </div>
          )}
        </div>
        {showMessage && (
          <p className="text-blue-200 text-sm mt-4 text-center">
            {messageText}
          </p>
        )}
      </CardContent>
    </Card>
  );
}