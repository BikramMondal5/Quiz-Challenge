import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserCircle, Trophy } from "lucide-react";

interface NamePromptProps {
  onSubmitName: (name: string) => void;
  isOpen: boolean;
}

export function NamePrompt({ onSubmitName, isOpen }: NamePromptProps) {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card className="w-[90%] max-w-md bg-white border-0 shadow-xl rounded-xl">
        <CardHeader className="text-center bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-xl">
          <CardTitle className="text-xl text-purple-900 flex items-center justify-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Join the Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 pb-2">
          <p className="text-gray-600 mb-4 text-center">
            Enter your name to add your score to the leaderboard!
          </p>
          <div className="flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-purple-400" />
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-purple-200 focus-visible:ring-purple-500"
              maxLength={30}
              autoFocus
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-2 pb-4">
          <Button
            variant="ghost"
            onClick={() => onSubmitName("")}
            className="text-gray-500"
          >
            Skip
          </Button>
          <Button
            onClick={() => onSubmitName(name)}
            disabled={!name.trim()}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold"
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}