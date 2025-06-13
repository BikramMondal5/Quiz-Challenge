// Contains the Leaderboard card component
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
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
  maxHeight?: string; // Added maxHeight prop
  scrollable?: boolean; // Added scrollable prop
}

export function LeaderboardCard({
  entries,
  limit = 10, // Changed default from 3 to 10
  title = "Top Performers",
  icon = <Trophy className="h-5 w-5 text-yellow-300" />,
  showMessage = true,
  className = "",
  messageText = "Join our daily quiz challenge to get featured!",
  maxHeight = "420px", // Default max height
  scrollable = true // Default to scrollable
}: LeaderboardCardProps) {
  const displayEntries = entries.slice(0, limit);

  return (
    <Card className={`bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl overflow-hidden ${className}`}>
      <CardHeader className="border-b border-white/10 pb-3">
        <CardTitle className="text-white text-center flex items-center justify-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={`pt-4 ${scrollable ? 'p-0' : ''}`}>
        <div 
          className={`space-y-3 ${
            scrollable 
              ? 'max-h-[420px] overflow-y-auto pr-2 pl-4 py-4 custom-scrollbar' 
              : ''
          }`}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#4ade80 rgba(255,255,255,0.1)'
          }}
        >
          {displayEntries.map((player, index) => (
            <motion.div 
              key={player.name} 
              className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 backdrop-filter backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-200"
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
                  <p className="text-white font-medium">{player.name}</p>
                  {player.date && <p className="text-white/60 text-xs">{player.date}</p>}
                </div>
              </div>
              <Badge variant="secondary" className="bg-yellow-300 text-purple-900">
                {player.score}%
              </Badge>
            </motion.div>
          ))}
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