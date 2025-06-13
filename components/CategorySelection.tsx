// Contains the Category selection screen
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuizCategory } from "../types";
import { screenVariants } from "../utils/animations";

interface CategorySelectionProps {
    categories: QuizCategory[];
    onSelectCategory: (categoryId: string) => void;
    onGoBack: () => void;
    onQuickPlay: () => void;
}

export function CategorySelection({
    categories,
    onSelectCategory,
    onGoBack,
    onQuickPlay
}: CategorySelectionProps) {
    return (
        <motion.div
            className="min-h-screen bg-white py-16"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={screenVariants}
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-purple-900 mb-4">Choose Your Challenge</h2>
                    <p className="text-lg text-purple-700">Select a category to test your knowledge</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {categories.map((category, index) => {
                        const IconComponent = category.icon
                        return (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card
                                    className="cursor-pointer transform hover:scale-105 transition-all duration-200 h-full bg-white border-0 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.12)]"
                                    onClick={() => onSelectCategory(category.id)}
                                >
                                    <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                                        <div
                                            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-transform duration-300 shadow-[0_6px_10px_rgba(0,0,0,0.15)]"
                                            style={{backgroundColor: getCategoryColor(category.id)}}
                                        >
                                            <IconComponent className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold mb-2" style={{color: getCategoryTextColor(category.id)}}>{category.title}</h3>
                                        <p className="text-sm text-gray-500" style={{color: getCategoryTextColor(category.id, true)}}>{category.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>

                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Button onClick={onQuickPlay} className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-xl text-lg shadow-lg">
                        Mixed Questions
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={onGoBack}
                        className="ml-2 text-purple-600 hover:text-purple-700 hover:bg-purple-100"
                    >
                        Go Back
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
}

// Helper functions to match the exact colors from the screenshot
function getCategoryColor(categoryId: string): string {
    switch (categoryId) {
        case "durga-trivia":
            return "#f46a36"; // Orange
        case "festival-foods":
            return "#24d770"; // Green
        case "bengali-culture":
            return "#c265e7"; // Purple
        case "puja-history":
            return "#4086f4"; // Blue
        case "puja-rituals":
            return "#f15f5f"; // Red
        case "pandal-art":
            return "#fcc236"; // Yellow
        case "mythology":
            return "#f15b9f"; // Pink
        case "puja-fashion":
            return "#00c2c2"; // Teal
        case "pandal-hopping":
            return "#9271e8"; // Light purple
        case "bhog-cuisine":
            return "#4eca65"; // Light green
        case "dhak-music":
            return "#c265e7"; // Purple (music note)
        case "puja-around-world":
            return "#41a0f8"; // Light blue
        default:
            return "#f46a36"; // Default orange
    }
}

function getCategoryTextColor(categoryId: string, isDescription: boolean = false): string {
    // For title color
    if (!isDescription) {
        switch (categoryId) {
            case "durga-trivia":
                return "#6939c6"; // Purple
            case "festival-foods":
                return "#a83280"; // Pink/purple
            case "bengali-culture":
                return "#6939c6"; // Purple
            case "puja-history":
                return "#6939c6"; // Purple
            case "puja-rituals":
                return "#6939c6"; // Purple
            case "pandal-art":
                return "#a83280"; // Pink/purple
            case "mythology":
                return "#6939c6"; // Purple
            case "puja-fashion":
                return "#a83280"; // Pink/purple
            case "pandal-hopping":
                return "#6939c6"; // Purple
            case "bhog-cuisine":
                return "#a83280"; // Pink/purple
            case "dhak-music":
                return "#6939c6"; // Purple
            case "puja-around-world":
                return "#a83280"; // Pink/purple
            default:
                return "#6939c6"; // Default purple
        }
    }
    // For description color
    else {
        switch (categoryId) {
            case "durga-trivia":
                return "#a689dc"; // Light purple
            case "festival-foods":
                return "#e54b99"; // Light pink
            case "bengali-culture":
                return "#a689dc"; // Light purple
            case "puja-history":
                return "#a689dc"; // Light purple
            case "puja-rituals":
                return "#a689dc"; // Light purple
            case "pandal-art":
                return "#e54b99"; // Light pink
            case "mythology":
                return "#a689dc"; // Light purple
            case "puja-fashion":
                return "#e54b99"; // Light pink
            case "pandal-hopping":
                return "#a689dc"; // Light purple
            case "bhog-cuisine":
                return "#e54b99"; // Light pink
            case "dhak-music":
                return "#a689dc"; // Light purple
            case "puja-around-world":
                return "#e54b99"; // Light pink
            default:
                return "#a689dc"; // Default light purple
        }
    }
}