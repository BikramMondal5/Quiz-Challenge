// Contains the quiz categories data
import {
    Crown,
    Music,
    BookOpen,
    Utensils,
    Flame,
    PaintBucket,
    MessageSquare,
    Scissors,
    MapPin,
    UtensilsCrossed,
    Music2,
    Globe
} from "lucide-react";
import { QuizCategory } from "../types";

export const quizCategories: QuizCategory[] = [
    {
        id: "durga-trivia",
        title: "Durga Trivia",
        icon: Crown,
        description: "Test your knowledge about Maa Durga",
        color: "from-red-500 to-rose-400",
    },
    {
        id: "festival-foods",
        title: "Festival Foods",
        icon: Utensils,
        description: "Bengali delicacies and traditions",
        color: "from-green-500 to-emerald-400",
    },
    {
        id: "bengali-culture",
        title: "Bengali Culture",
        icon: Music,
        description: "Art, music, and cultural heritage",
        color: "from-purple-500 to-violet-400",
    },
    {
        id: "puja-history",
        title: "History of Puja",
        icon: BookOpen,
        description: "Origins and evolution of Durga Puja",
        color: "from-blue-500 to-indigo-400",
    },
    {
        id: "puja-rituals",
        title: "Puja Rituals",
        icon: Flame,
        description: "Traditional ceremonies and practices",
        color: "from-red-400 to-orange-300",
    },
    {
        id: "pandal-art",
        title: "Pandal Art",
        icon: PaintBucket,
        description: "Famous themes and artistic creations",
        color: "from-yellow-500 to-amber-400",
    },
    {
        id: "mythology",
        title: "Durga Mythology",
        icon: MessageSquare,
        description: "Stories and legends of the goddess",
        color: "from-pink-600 to-rose-500",
    },
    {
        id: "puja-fashion",
        title: "Puja Fashion",
        icon: Scissors,
        description: "Traditional clothing and styles",
        color: "from-teal-500 to-cyan-400",
    },
    {
        id: "pandal-hopping",
        title: "Pandal Hopping",
        icon: MapPin,
        description: "Famous pandals and their specialties",
        color: "from-indigo-500 to-violet-400",
    },
    {
        id: "bhog-cuisine",
        title: "Bhog Cuisine",
        icon: UtensilsCrossed,
        description: "Sacred food offerings and recipes",
        color: "from-lime-500 to-green-400",
    },
    {
        id: "dhak-music",
        title: "Dhak & Music",
        icon: Music2,
        description: "Traditional instruments and songs",
        color: "from-fuchsia-500 to-pink-400",
    },
    {
        id: "puja-around-world",
        title: "Global Puja",
        icon: Globe,
        description: "Durga Puja celebrations worldwide",
        color: "from-sky-500 to-blue-400",
    },
]