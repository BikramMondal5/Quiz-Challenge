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
        color: "from-orange-400 to-red-500",
    },
    {
        id: "festival-foods",
        title: "Festival Foods",
        icon: Utensils,
        description: "Bengali delicacies and traditions",
        color: "from-green-400 to-emerald-500",
    },
    {
        id: "bengali-culture",
        title: "Bengali Culture",
        icon: Music,
        description: "Art, music, and cultural heritage",
        color: "from-purple-400 to-pink-500",
    },
    {
        id: "puja-history",
        title: "History of Puja",
        icon: BookOpen,
        description: "Origins and evolution of Durga Puja",
        color: "from-blue-400 to-indigo-500",
    },
    {
        id: "puja-rituals",
        title: "Puja Rituals",
        icon: Flame,
        description: "Traditional ceremonies and practices",
        color: "from-red-400 to-rose-500",
    },
    {
        id: "pandal-art",
        title: "Pandal Art",
        icon: PaintBucket,
        description: "Famous themes and artistic creations",
        color: "from-amber-400 to-yellow-500",
    },
    {
        id: "mythology",
        title: "Durga Mythology",
        icon: MessageSquare,
        description: "Stories and legends of the goddess",
        color: "from-pink-400 to-rose-500",
    },
    {
        id: "puja-fashion",
        title: "Puja Fashion",
        icon: Scissors,
        description: "Traditional clothing and styles",
        color: "from-cyan-400 to-teal-500",
    },
    {
        id: "pandal-hopping",
        title: "Pandal Hopping",
        icon: MapPin,
        description: "Famous pandals and their specialties",
        color: "from-violet-400 to-indigo-500",
    },
    {
        id: "bhog-cuisine",
        title: "Bhog Cuisine",
        icon: UtensilsCrossed,
        description: "Sacred food offerings and recipes",
        color: "from-lime-400 to-green-500",
    },
    {
        id: "dhak-music",
        title: "Dhak & Music",
        icon: Music2,
        description: "Traditional instruments and songs",
        color: "from-fuchsia-400 to-purple-500",
    },
    {
        id: "puja-around-world",
        title: "Global Puja",
        icon: Globe,
        description: "Durga Puja celebrations worldwide",
        color: "from-sky-400 to-blue-500",
    },
];