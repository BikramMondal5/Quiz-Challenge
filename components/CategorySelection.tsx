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
            className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 py-16"
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
                                    className="cursor-pointer transform hover:scale-105 transition-all duration-200 hover:shadow-xl h-full border-transparent backdrop-blur-sm bg-white/80 hover:bg-white/90 shadow-lg"
                                    onClick={() => onSelectCategory(category.id)}
                                >
                                    <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                                        <div
                                            className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color || 'from-purple-400 to-indigo-500'} flex items-center justify-center`}
                                        >
                                            <IconComponent className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-purple-900 mb-2">{category.title}</h3>
                                        <p className="text-sm text-purple-600">{category.description}</p>
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
                    <Button onClick={onQuickPlay} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-8 rounded-xl backdrop-blur-sm bg-opacity-90 shadow-lg hover:shadow-purple-500/30">
                        Mixed Questions
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={onGoBack}
                        className="ml-2 text-purple-600 hover:text-purple-700 hover:bg-purple-100 backdrop-blur-sm"
                    >
                        Go Back
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
}