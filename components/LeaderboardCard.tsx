// Contains the Leaderboard card component
import { motion } from "framer-motion";
import { Trophy, Globe, User, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LeaderboardEntry } from "../types";
import { useRef, useState, useEffect } from "react";
import { getCombinedLeaderboardData } from "../data/leaderboard";
import { useToast } from "@/components/ui/use-toast";

interface LeaderboardCardProps {
  entries: LeaderboardEntry[];
  limit?: number;
  title?: string;
  icon?: React.ReactNode;
  showMessage?: boolean;
  className?: string;
  messageText?: string;
  maxHeight?: string;
  scrollable?: boolean;
}

export function LeaderboardCard({
  entries: initialEntries,
  limit = 10,
  title = "Top Performers",
  icon = <Trophy className="h-5 w-5 text-yellow-300" />,
  showMessage = true,
  className = "",
  messageText = "Top 10 scorers of the week get featured on our Pujo Wall! 🏆",
  maxHeight = "300px",
  scrollable = true
}: LeaderboardCardProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { toast } = useToast();

  // Use useEffect to set isClient to true when component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't use initialEntries directly in state initialization to avoid hydration mismatch
  useEffect(() => {
    setEntries(initialEntries);
  }, [initialEntries]);

  // Fetch combined (cloud + local) leaderboard data on mount and when tab changes
  useEffect(() => {
    async function fetchData() {
      if (activeTab === "local" || !isClient) {
        // For local tab, we don't need to fetch from cloud
        return;
      }
      
      setIsLoading(true);
      try {
        const combinedData = await getCombinedLeaderboardData();
        
        // Add flags to identify local vs cloud entries
        const flaggedEntries = combinedData.map(entry => {
          // Check if this entry exists in the initial entries (local)
          const isLocal = initialEntries.some(local => local.name === entry.name);
          return { ...entry, isLocal };
        });
        
        setEntries(flaggedEntries);
        setLastUpdated(new Date());
      } catch (error) {
        console.error("Error loading combined leaderboard:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    if ((activeTab === "all" || activeTab === "cloud") && isClient) {
      fetchData();
    } else if (isClient) {
      setEntries(initialEntries);
    }
  }, [activeTab, initialEntries, isClient]);
  
  // Filter entries based on active tab
  const filteredEntries = entries.filter(entry => {
    if (activeTab === "all") return true;
    if (activeTab === "local") return initialEntries.some(local => local.name === entry.name);
    if (activeTab === "cloud") return !entry.isLocal;
    return true;
  }).slice(0, limit);
  
  // Handle manual refresh of cloud data
  const handleRefreshCloud = async () => {
    if (!isClient) return;
    
    setIsLoading(true);
    try {
      // Force refresh by clearing the cache timestamp
      localStorage.setItem("last_cloud_fetch_time", "0");
      
      const combinedData = await getCombinedLeaderboardData();
      const flaggedEntries = combinedData.map(entry => {
        const isLocal = initialEntries.some(local => local.name === entry.name);
        return { ...entry, isLocal };
      });
      setEntries(flaggedEntries);
      setLastUpdated(new Date());
      
      // Show toast notification on successful refresh
      toast({
        title: "Leaderboard refreshed",
        description: "The latest global scores have been loaded.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error refreshing leaderboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Format the last updated time
  const getLastUpdatedText = () => {
    if (!lastUpdated) return "Not yet updated";
    
    // If less than a minute ago
    const diffMs = Date.now() - lastUpdated.getTime();
    if (diffMs < 60000) return "Just now";
    
    // If less than an hour
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    
    // Otherwise show time
    return lastUpdated.toLocaleTimeString();
  };

  // Only render actual content on the client to avoid hydration issues
  const renderAvatarFallback = (name: string) => {
    if (!isClient) {
      // Return empty fallback during server side rendering
      return "";
    }
    
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className={`bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl overflow-hidden ${className}`}>
      <CardHeader className="border-b border-white/10 pb-3">
        <CardTitle className="text-white text-center flex items-center justify-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b border-white/10 px-4 pb-1 pt-1">
          <TabsList className="bg-white/10 backdrop-blur-md">
            <TabsTrigger value="all" className="data-[state=active]:bg-white/20">
              <Globe className="h-4 w-4 mr-1" /> All
            </TabsTrigger>
            <TabsTrigger value="cloud" className="data-[state=active]:bg-white/20">
              <Globe className="h-4 w-4 mr-1" /> Global
            </TabsTrigger>
            <TabsTrigger value="local" className="data-[state=active]:bg-white/20">
              <User className="h-4 w-4 mr-1" /> Local
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="p-0 m-0">
          <CardContent className={`pt-4 ${scrollable ? 'p-0' : ''}`}>
            {isLoading ? (
              <div className="flex items-center justify-center py-10">
                <RefreshCw className="h-8 w-8 text-white/70 animate-spin" />
              </div>
            ) : (
              <div 
                ref={scrollContainerRef}
                className={`space-y-3 ${
                  scrollable 
                    ? `max-h-[${maxHeight}] overflow-y-auto pr-2 pl-4 py-4 custom-scrollbar` 
                    : ''
                }`}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#4ade80 rgba(255,255,255,0.1)',
                  maxHeight: scrollable ? maxHeight : 'auto' 
                }}
              >
                {filteredEntries.length > 0 ? (
                  filteredEntries.map((player, index) => (
                    <motion.div 
                      key={`${player.name}-${index}`}
                      className={`flex items-center gap-3 p-2.5 rounded-lg ${
                        player.isLocal ? 'bg-white/10' : 'bg-white/5'
                      } backdrop-filter backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-200`}
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
                      <Avatar className="h-8 w-8 relative">
                        <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                        <AvatarFallback>
                          {isClient ? renderAvatarFallback(player.name) : ""}
                        </AvatarFallback>
                        {player.isLocal && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                        )}
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
                  ))
                ) : (
                  <div className="text-center py-8 text-white/70">
                    No leaderboard entries found
                  </div>
                )}
              </div>
            )}
            {showMessage && (
              <p className="text-blue-200 text-sm mt-2 mb-3 text-center">
                {messageText}
              </p>
            )}
          </CardContent>
        </TabsContent>
        
        <TabsContent value="cloud" className="p-0 m-0">
          <CardContent className={`pt-4 ${scrollable ? 'p-0' : ''}`}>
            {isLoading ? (
              <div className="flex items-center justify-center py-10">
                <RefreshCw className="h-8 w-8 text-white/70 animate-spin" />
              </div>
            ) : (
              <div 
                className={`space-y-3 ${
                  scrollable 
                    ? `max-h-[${maxHeight}] overflow-y-auto pr-2 pl-4 py-4 custom-scrollbar` 
                    : ''
                }`}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#4ade80 rgba(255,255,255,0.1)',
                  maxHeight: scrollable ? maxHeight : 'auto' 
                }}
              >
                {filteredEntries.length > 0 ? (
                  filteredEntries.map((player, index) => (
                    <motion.div 
                      key={`${player.name}-${index}-cloud`}
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
                          {isClient ? renderAvatarFallback(player.name) : ""}
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
                  ))
                ) : (
                  <div className="text-center py-8 text-white/70">
                    No global entries found
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </TabsContent>
        
        <TabsContent value="local" className="p-0 m-0">
          <CardContent className={`pt-4 ${scrollable ? 'p-0' : ''}`}>
            <div 
              className={`space-y-3 ${
                scrollable 
                  ? `max-h-[${maxHeight}] overflow-y-auto pr-2 pl-4 py-4 custom-scrollbar` 
                  : ''
              }`}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#4ade80 rgba(255,255,255,0.1)',
                maxHeight: scrollable ? maxHeight : 'auto' 
              }}
            >
              {filteredEntries.length > 0 ? (
                filteredEntries.map((player, index) => (
                  <motion.div 
                    key={`${player.name}-${index}-local`}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-white/10 backdrop-filter backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-200"
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
                        {isClient ? renderAvatarFallback(player.name) : ""}
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
                ))
              ) : (
                <div className="text-center py-8 text-white/70">
                  No local entries found
                </div>
              )}
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
      
      <CardFooter className="border-t border-white/10 pt-3 pb-3 flex flex-col justify-center items-center space-y-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleRefreshCloud}
          disabled={isLoading}
          className="text-white/70 hover:text-white hover:bg-white/10"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? "Refreshing..." : "Refresh Leaderboard"}
        </Button>
        
        {lastUpdated && (
          <div className="text-xs text-white/50">
            Last updated: {getLastUpdatedText()}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}