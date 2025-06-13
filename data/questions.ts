// Contains all the quiz questions data
import { QuizQuestion } from "../types";

export const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        question: "How many days does Durga Puja traditionally last?",
        options: ["3 days", "5 days", "7 days", "10 days"],
        correct: 1,
        category: "durga-trivia",
        explanation: "Durga Puja is traditionally celebrated over five days: Shashthi, Saptami, Ashtami, Navami, and Vijayadashami (Dashami)."
    },
    {
        id: 2,
        question: "What is the traditional sweet offered to Maa Durga?",
        options: ["Rasgulla", "Sandesh", "Kheer", "All of the above"],
        correct: 3,
        category: "festival-foods",
        explanation: "All these sweets are traditionally offered during Durga Puja as bhog and prasad."
    },
    {
        id: 3,
        question: "Which day is known as 'Mahalaya'?",
        options: ["Start of Durga Puja", "End of Pitru Paksha", "Invocation of Maa Durga", "All of the above"],
        correct: 3,
        category: "puja-history",
        explanation: "Mahalaya marks the end of Pitru Paksha, the beginning of Devi Paksha, and includes the invocation of Goddess Durga."
    },
    {
        id: 4,
        question: "What instrument is traditionally played during Durga Puja?",
        options: ["Dhol", "Tabla", "Harmonium", "Flute"],
        correct: 0,
        category: "bengali-culture",
        explanation: "Dhol, a cylindrical drum, is an essential instrument played during Durga Puja celebrations."
    },
    {
        id: 5,
        question: "On which day is 'Sindoor Khela' celebrated?",
        options: ["Saptami", "Ashtami", "Navami", "Dashami"],
        correct: 3,
        category: "durga-trivia",
        explanation: "Sindoor Khela is celebrated on Vijayadashami (Dashami), the last day of Durga Puja before the idol immersion."
    },
    {
        id: 6,
        question: "Which river is traditionally used for the immersion of Durga idols in Kolkata?",
        options: ["Ganga", "Yamuna", "Brahmaputra", "Hoogly"],
        correct: 3,
        category: "puja-history",
        explanation: "In Kolkata, the Durga idols are traditionally immersed in the Hoogly River, which is a distributary of the Ganga."
    },
    {
        id: 7,
        question: "What is 'Dhunuchi Naach'?",
        options: ["A folk dance", "A ritual dance with incense burners", "A classical dance form", "A prayer ceremony"],
        correct: 1,
        category: "bengali-culture",
        explanation: "Dhunuchi Naach is a ritual dance performed with incense burners (dhunuchi) during the evening aarti of Durga Puja."
    },
    {
        id: 8,
        question: "Which Bengali sweet is shaped like a conch shell?",
        options: ["Sandesh", "Pantua", "Shankha Sandesh", "Rasmalai"],
        correct: 2,
        category: "festival-foods",
        explanation: "Shankha Sandesh is a Bengali sweet shaped like a conch shell (shankha), which is considered auspicious."
    },
    {
        id: 9,
        question: "What is the significance of 'Kumari Puja' during Durga Puja?",
        options: ["Worshipping young girls", "A special ritual for unmarried women", "Worship of a pre-pubescent girl as a form of Goddess Durga", "A ritual for the prosperity of daughters"],
        correct: 2,
        category: "durga-trivia",
        explanation: "In Kumari Puja, a pre-pubescent girl is worshipped as an embodiment of the divine feminine energy (Shakti) of Goddess Durga."
    },
    {
        id: 10,
        question: "Which famous poet wrote 'Mahishasura Mardini', a script for a radio program about Durga Puja?",
        options: ["Rabindranath Tagore", "Kazi Nazrul Islam", "Sarat Chandra Chattopadhyay", "Bankim Chandra Chatterjee"],
        correct: 0,
        category: "bengali-culture",
        explanation: "The radio program 'Mahishasura Mardini' was scripted by Rabindranath Tagore and is traditionally broadcast on Mahalaya."
    },
    {
        id: 11,
        question: "What is the primary color associated with the attire of Maa Durga during Durga Puja?",
        options: ["Red", "Blue", "Green", "Yellow"],
        correct: 0,
        category: "puja-rituals",
        explanation: "Maa Durga is traditionally adorned in a red saree, symbolizing power and purity, during Durga Puja."
    },
    {
        id: 12,
        question: "Which dance form is performed by Maa Durga in traditional depictions?",
        options: ["Bharatanatyam", "Kathak", "Odissi", "Manipuri"],
        correct: 1,
        category: "bengali-culture",
        explanation: "Maa Durga is often depicted performing the Kathak dance, which involves intricate footwork and spins."
    },
    {
        id: 13,
        question: "What does the 'Trishul' (trident) of Maa Durga symbolize?",
        options: ["Wealth", "Power", "Knowledge", "Peace"],
        correct: 1,
        category: "puja-history",
        explanation: "The 'Trishul' or trident symbolizes the power of Maa Durga to destroy evil and protect the innocent."
    },
    {
        id: 14,
        question: "Which festival involves the ritual of 'Bodhon' or invoking the goddess into the idol?",
        options: ["Durga Puja", "Kali Puja", "Lakshmi Puja", "Saraswati Puja"],
        correct: 0,
        category: "puja-rituals",
        explanation: "'Bodhon' is a ritual performed during Durga Puja to invite the goddess into the idol, marking the beginning of the festivities."
    },
    {
        id: 15,
        question: "What is the significance of the 'Shodoshopachar' ritual in Durga Puja?",
        options: ["Offering 16 types of items to the goddess", "A dance performed 16 times", "16 days of fasting", "16 beats of the drum"],
        correct: 0,
        category: "puja-rituals",
        explanation: "'Shodoshopachar' refers to the 16 types of ritualistic offerings made to Goddess Durga during the puja."
    },
    {
        id: 16,
        question: "Which item is NOT typically offered to Maa Durga as 'bhog'?",
        options: ["Fruits", "Sweets", "Meat", "Rice"],
        correct: 2,
        category: "festival-foods",
        explanation: "Meat is generally not offered to Maa Durga as 'bhog'. The offerings usually include vegetarian items like fruits, sweets, and rice."
    },
    {
        id: 17,
        question: "What is the traditional form of worship offered to Maa Durga called?",
        options: ["Aarti", "Bhajan", "Sankirtan", "Homa"],
        correct: 0,
        category: "puja-rituals",
        explanation: "The 'Aarti' is a form of worship where light from wicks soaked in ghee or oil is offered to Maa Durga while singing her praises."
    },
    {
        id: 18,
        question: "Which of these is a popular folk song sung during Durga Puja in Bengal?",
        options: ["Rabindra Sangeet", "Nazrul Geeti", "Baul Song", "All of the above"],
        correct: 3,
        category: "bengali-culture",
        explanation: "Various folk songs, including Rabindra Sangeet, Nazrul Geeti, and Baul songs, are sung during Durga Puja in Bengal."
    },
    {
        id: 19,
        question: "What does the 'Chandi Path' involve during Durga Puja?",
        options: ["Recitation of scriptures", "Chanting of mantras", "Offering of flowers", "All of the above"],
        correct: 3,
        category: "puja-history",
        explanation: "'Chandi Path' involves the recitation of the 'Chandi' scripture, chanting of mantras, and offering of flowers to Maa Durga."
    },
    {
        id: 20,
        question: "Which of the following is a major theme in Durga Puja pandals?",
        options: ["Historical events", "Mythological stories", "Social issues", "All of the above"],
        correct: 3,
        category: "pandal-art",
        explanation: "Durga Puja pandals often depict themes from historical events, mythological stories, and social issues, showcasing artistic creativity."
    },
    {
        id: 21,
        question: "What is the significance of the 'Durgotsav' festival?",
        options: ["Celebration of spring", "Harvest festival", "Victory of good over evil", "New Year celebration"],
        correct: 2,
        category: "puja-history",
        explanation: "'Durgotsav' celebrates the victory of Goddess Durga over the buffalo demon Mahishasura, symbolizing the triumph of good over evil."
    },
    {
        id: 22,
        question: "Which of these is a traditional game played during Durga Puja in Bengal?",
        options: ["Kabaddi", "Kho Kho", "Ludo", "All of the above"],
        correct: 3,
        category: "bengali-culture",
        explanation: "Traditional games like Kabaddi, Kho Kho, and Ludo are played during Durga Puja, especially in rural Bengal."
    },
    {
        id: 23,
        question: "What does the 'Sindoor Khela' ritual involve?",
        options: ["Playing with vermillion", "Offering sweets", "Dancing around the fire", "Singing devotional songs"],
        correct: 0,
        category: "puja-rituals",
        explanation: "'Sindoor Khela' involves married women playing with vermillion (sindoor) and then applying it to each other as a blessing."
    },
    {
        id: 24,
        question: "Which of these is NOT a type of Durga idol commonly used in Bengal?",
        options: ["Clay idol", "Wooden idol", "Metal idol", "Plastic idol"],
        correct: 3,
        category: "puja-history",
        explanation: "Plastic idols are not traditionally used for Durga Puja in Bengal. Idols are typically made of clay, wood, or metal."
    },
    {
        id: 25,
        question: "What is the role of the 'Bengaluru Namma Metro' during Durga Puja?",
        options: ["Transporting idols", "Providing free rides to devotees", "Decorating the city", "Sponsoring the puja"],
        correct: 1,
        category: "puja-history",
        explanation: "During Durga Puja, Bengaluru Namma Metro often provides free rides to devotees to promote eco-friendly transportation."
    },
    {
        id: 26,
        question: "Which of these is a popular Durga Puja theme in recent years?",
        options: ["Space and astronomy", "Underwater world", "Historical monuments", "All of the above"],
        correct: 3,
        category: "pandal-art",
        explanation: "Recent Durga Puja themes have included space and astronomy, underwater worlds, and historical monuments, reflecting contemporary interests."
    },
    {
        id: 27,
        question: "What is the significance of the 'Maha Ashtami' day during Durga Puja?",
        options: ["Worship of the goddess's weapons", "The day of the idol immersion", "Celebration of Durga's victory", "All-night vigil and prayers"],
        correct: 3,
        category: "puja-history",
        explanation: "Maha Ashtami is significant for the worship of Goddess Durga's weapons, the performance of the Sandhi Puja, and an all-night vigil and prayers."
    },
    {
        id: 28,
        question: "Which of these is a traditional sweet from Bengal, often made during Durga Puja?",
        options: ["Gulab Jamun", "Rasgulla", "Kaju Katli", "Peda"],
        correct: 1,
        category: "festival-foods",
        explanation: "Rasgulla, a spongy and syrupy sweet, is a traditional Bengali sweet made from ball-shaped dumplings of chhena and semolina dough."
    },
    {
        id: 29,
        question: "What is the 'Nabanna' festival, often celebrated around the same time as Durga Puja?",
        options: ["Harvest festival", "New Year celebration", "Worship of the sun god", "Festival of lights"],
        correct: 0,
        category: "puja-history",
        explanation: "'Nabanna' is a harvest festival in Bengal, celebrating the season's first rice and new agricultural produce, often coinciding with Durga Puja."
    },
    {
        id: 30,
        question: "Which of these is a common offering to Maa Durga during the Navaratri festival?",
        options: ["Non-vegetarian food", "Alcohol", "Fruits and sweets", "Cigarettes"],
        correct: 2,
        category: "puja-rituals",
        explanation: "During Navaratri, devotees offer fruits, sweets, and other vegetarian items to Maa Durga as a sign of respect and devotion."
    },
    {
        id: 31,
        question: "What is the significance of the 'Bijoya Dashami' celebration?",
        options: ["Victory of good over evil", "Harvest festival", "New Year celebration", "Worship of ancestors"],
        correct: 0,
        category: "puja-history",
        explanation: "'Bijoya Dashami' marks the victory of Goddess Durga over the buffalo demon Mahishasura, symbolizing the triumph of good over evil."
    },
    {
        id: 32,
        question: "Which of these is a popular snack during Durga Puja in Bengal?",
        options: ["Samosa", "Pakora", "Chakli", "All of the above"],
        correct: 3,
        category: "festival-foods",
        explanation: "Snacks like Samosa, Pakora, and Chakli are popular during Durga Puja in Bengal, enjoyed for their taste and crunch."
    },
    {
        id: 34,
        question: "Which of these is NOT a traditional item used in Durga Puja rituals?",
        options: ["Kalash (pot)", "Diya (lamp)", "Chakra (wheel)", "Cross"],
        correct: 3,
        category: "puja-rituals",
        explanation: "A 'Cross' is not a traditional item used in Durga Puja rituals. Items like Kalash, Diya, and Chakra are commonly used."
    },
    {
        id: 35,
        question: "What is the role of 'Dhak' in Durga Puja?",
        options: ["A type of sweet", "A musical drum", "A dance form", "A prayer chant"],
        correct: 1,
        category: "bengali-culture",
        explanation: "'Dhak' is a traditional musical drum played during Durga Puja, especially during the procession of the goddess's idol."
    },
    {
        id: 37,
        question: "What is the significance of the 'Chokkhu Daan' ritual?",
        options: ["Offering of fish", "Opening of the goddess's eyes", "Donation to the poor", "Planting of trees"],
        correct: 1,
        category: "puja-rituals",
        explanation: "'Chokkhu Daan' is the ritual of opening the eyes of the Durga idol, symbolizing the goddess's awakening and arrival in the mortal world."
    },
    {
        id: 38,
        question: "Which of these is a popular beverage during Durga Puja in Bengal?",
        options: ["Lassi", "Chai", "Coffee", "All of the above"],
        correct: 3,
        category: "festival-foods",
        explanation: "Beverages like Lassi, Chai, and Coffee are popular during Durga Puja in Bengal, enjoyed for their refreshing and energizing qualities."
    },
    {
        id: 39,
        question: "What is the 'Sandhi Puja' performed during Durga Puja?",
        options: ["Worship at the junction of two rivers", "The final offering to the goddess", "A dance drama", "A type of sweet"],
        correct: 1,
        category: "puja-rituals",
        explanation: "'Sandhi Puja' is performed at the juncture of Ashtami and Navami during Durga Puja, marking the end of the auspicious Durga Puja period."
    },
    {
        id: 41,
        question: "What is the name of the goddess who is believed to be Durga's daughter?",
        options: ["Lakshmi", "Saraswati", "Kali", "All of the above"],
        correct: 3,
        category: "mythology",
        explanation: "According to mythology, Goddesses Lakshmi, Saraswati, and Kali are all considered daughters of Maa Durga."
    },
    {
        id: 42,
        question: "Which pandal in Kolkata holds the record for being the tallest Durga Puja pandal?",
        options: ["Deshapriya Park", "College Square", "Salt Lake FD Block", "Mohammad Ali Park"],
        correct: 0,
        category: "pandal-hopping",
        explanation: "Deshapriya Park created the tallest Durga idol and pandal in 2015, which was over 80 feet tall and entered the record books."
    },
    {
        id: 43,
        question: "What traditional saree is worn by Bengali women during Durga Puja?",
        options: ["Baluchari", "Tant", "Garad", "All of the above"],
        correct: 3,
        category: "puja-fashion",
        explanation: "Bengali women traditionally wear various sarees including Baluchari (with mythological scenes), Tant (handwoven cotton), and Garad (white with red border) during different days of Durga Puja."
    },
    {
        id: 44,
        question: "Which of these is a traditional musical performance during Durga Puja evenings?",
        options: ["Rabindra Sangeet Concert", "Dhak Competition", "Agomoni Gaan", "All of the above"],
        correct: 3,
        category: "dhak-music",
        explanation: "During Durga Puja evenings, cultural programs include Rabindra Sangeet concerts, Dhak competitions, and Agomoni Gaan (welcoming songs for the goddess)."
    },
    {
        id: 45,
        question: "What is 'Bhog Arati'?",
        options: ["Offering of food to the goddess", "Evening prayer", "The final ritual before immersion", "Morning prayer"],
        correct: 0,
        category: "bhog-cuisine",
        explanation: "Bhog Arati is the ritual of offering food to the goddess, after which the food becomes prasad and is distributed among devotees."
    },
    {
        id: 46,
        question: "Which of these countries has the largest Durga Puja celebration outside India?",
        options: ["United States", "United Kingdom", "Bangladesh", "Australia"],
        correct: 2,
        category: "puja-around-world",
        explanation: "Bangladesh hosts the largest Durga Puja celebration outside India, with over 30,000 pandals across the country."
    },
    {
        id: 47,
        question: "Which animal serves as the mount (vahana) of Goddess Durga?",
        options: ["Elephant", "Peacock", "Lion/Tiger", "Bull"],
        correct: 2,
        category: "durga-trivia",
        explanation: "Goddess Durga is typically depicted riding a lion or tiger, symbolizing power and dominion over the wild."
    },
    {
        id: 48,
        question: "In the Durga myth, who was the demon king she was sent to defeat?",
        options: ["Ravana", "Mahishasura", "Kansa", "Bhasmasura"],
        correct: 1,
        category: "mythology",
        explanation: "Durga was created specifically to defeat the buffalo demon Mahishasura, who could not be defeated by male gods."
    },
    {
        id: 49,
        question: "What is typically served as part of 'Maha Ashtami Bhog'?",
        options: ["Pulao and Mutton Curry", "Khichuri and Labra", "Luchi and Alur Dum", "Biryani"],
        correct: 1,
        category: "bhog-cuisine",
        explanation: "Khichuri (a rice and lentil preparation) and Labra (mixed vegetable curry) are the traditional offerings during Maha Ashtami Bhog."
    },
    {
        id: 50,
        question: "What is 'Pushpanjali' in the context of Durga Puja?",
        options: ["A flower market", "Offering of flowers to the goddess", "A flower decoration competition", "A type of floral pattern"],
        correct: 1,
        category: "puja-rituals",
        explanation: "Pushpanjali is the ritualistic offering of flowers to Goddess Durga, usually performed three times a day during the festival."
    },
    {
        id: 51,
        question: "What unique feature characterizes pandals in Kumartuli area of Kolkata?",
        options: ["Technology themes", "Traditional clay artisans", "Political messages", "Environmental consciousness"],
        correct: 1,
        category: "pandal-hopping",
        explanation: "Kumartuli is famous for its traditional clay artisans who create the Durga idols. The pandals in this area often showcase this heritage craft."
    },
    {
        id: 53,
        question: "What is 'Dhunachi' used for during Durga Puja?",
        options: ["Cooking bhog", "Burning incense", "Carrying water", "Playing music"],
        correct: 1,
        category: "dhak-music",
        explanation: "Dhunachi is an earthen pot used for burning incense (usually coconut husks and camphor) during the Aarti ceremony."
    },
    {
        id: 54,
        question: "Which of these textiles is traditionally NOT worn during Durga Puja celebrations?",
        options: ["Kantha", "Jamdani", "Pashmina", "Dhakai"],
        correct: 2,
        category: "puja-fashion",
        explanation: "Pashmina, a fine wool textile from Kashmir, is not traditionally associated with Bengali Durga Puja clothing, unlike Kantha, Jamdani, and Dhakai."
    },
    {
        id: 56,
        question: "Which dessert is traditionally made with 'nolen gur' during the Durga Puja season?",
        options: ["Rasogolla", "Sandesh", "Pantua", "All of the above"],
        correct: 3,
        category: "festival-foods",
        explanation: "Nolen gur (date palm jaggery) is a seasonal delicacy used in various Bengali sweets during Durga Puja, including Rasogolla, Sandesh, and Pantua."
    },
    {
        id: 57,
        question: "What is 'Dashabhuja' referring to in the context of Durga iconography?",
        options: ["Ten eyes", "Ten weapons", "Ten arms", "Ten forms"],
        correct: 2,
        category: "durga-trivia",
        explanation: "Dashabhuja refers to the ten arms of Goddess Durga, each holding a different weapon or item symbolizing various aspects of her power."
    },
    {
        id: 58,
        question: "In which city is the famous 'Kashi Bose Lane' Durga Puja held?",
        options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
        correct: 3,
        category: "pandal-hopping",
        explanation: "Kashi Bose Lane Durga Puja is one of the oldest and most famous community pujas in North Kolkata, known for its traditional rituals and cultural programs."
    },
    {
        id: 59,
        question: "What material is traditionally used to make the framework of Durga idols in Bengal?",
        options: ["Wood", "Straw", "Bamboo", "Metal"],
        correct: 2,
        category: "pandal-art",
        explanation: "Bamboo is traditionally used to create the framework of Durga idols in Bengal, which is then covered with straw and clay to form the shape."
    },
    {
        id: 60,
        question: "Which goddess is depicted on Durga's right side in traditional Durga Puja idols?",
        options: ["Lakshmi", "Saraswati", "Kali", "Manasa"],
        correct: 0,
        category: "mythology",
        explanation: "In traditional Bengali Durga Puja idols, Goddess Lakshmi (symbolizing wealth) is depicted on Durga's right side."
    },
    {
        id: 62,
        question: "What is 'Anando Mela' during Durga Puja?",
        options: ["Cultural program", "Food fair", "Drama competition", "Traditional dance"],
        correct: 1,
        category: "festival-foods",
        explanation: "Anando Mela is a food fair organized during Durga Puja where community members sell homemade delicacies to raise funds for the celebrations."
    },
    {
        id: 63,
        question: "Which country's Durga Puja celebration has been recognized by UNESCO as an Intangible Cultural Heritage?",
        options: ["India", "Bangladesh", "Nepal", "Malaysia"],
        correct: 0,
        category: "puja-around-world",
        explanation: "In 2021, UNESCO inscribed Durga Puja in Kolkata, India on the Representative List of the Intangible Cultural Heritage of Humanity."
    },
    {
        id: 64,
        question: "Which Bengali artist is known for revolutionizing the art of Durga idol-making in the early 20th century?",
        options: ["Nandalal Bose", "Jamini Roy", "Abanindranath Tagore", "Ramkinkar Baij"],
        correct: 0,
        category: "pandal-art",
        explanation: "Nandalal Bose, a pioneer of modern Indian art, introduced significant artistic innovations in Durga idol-making, moving away from traditional styles."
    },
    {
        id: 66,
        question: "Which instrument accompanies the Dhak during traditional Durga Puja performances?",
        options: ["Sitar", "Kashor", "Tabla", "Flute"],
        correct: 1,
        category: "dhak-music",
        explanation: "Kashor (a type of gong) typically accompanies the Dhak in traditional Durga Puja musical performances."
    },
    {
        id: 67,
        question: "What special ingredient is used in the preparation of 'Bhog Khichuri' for Durga Puja?",
        options: ["Gobindobhog rice", "Basmati rice", "Brown rice", "Jasmine rice"],
        correct: 0,
        category: "bhog-cuisine",
        explanation: "Gobindobhog, an aromatic short-grain rice variety from Bengal, is traditionally used in preparing bhog khichuri for Durga Puja."
    },
    {
        id: 68,
        question: "Which famous designer has incorporated traditional Durga Puja elements into their international fashion collection?",
        options: ["Manish Malhotra", "Sabyasachi Mukherjee", "Ritu Kumar", "Rohit Bal"],
        correct: 1,
        category: "puja-fashion",
        explanation: "Sabyasachi Mukherjee has famously incorporated traditional Bengali Durga Puja elements and aesthetics into his international fashion collections."
    },
    {
        id: 69,
        question: "What is 'Dhak Badan' referring to?",
        options: ["A type of sweet", "A special pandal design", "The act of playing the Dhak", "A festival prayer"],
        correct: 2,
        category: "dhak-music",
        explanation: "'Dhak Badan' refers to the special techniques and style of playing the dhak during Durga Puja celebrations."
    },
    {
        id: 70,
        question: "Which of these cities hosts the 'Mini Bengal' Durga Puja celebration?",
        options: ["Delhi", "Mumbai", "Bangalore", "Chennai"],
        correct: 0,
        category: "puja-around-world",
        explanation: "Delhi hosts the famous 'Mini Bengal' Durga Puja celebration, particularly in CR Park, which is known as 'Little Bengal' within the capital."
    },
    {
        id: 71,
        question: "What is 'Kumari Puja' in the context of Durga Puja celebrations?",
        options: ["Worship of young unmarried girls", "A special ritual for women", "Worship of a pre-pubescent girl as an embodiment of Durga", "A prayer for future daughters"],
        correct: 2,
        category: "durga-trivia",
        explanation: "Kumari Puja involves the worship of a pre-pubescent girl as a living embodiment of Goddess Durga, a tradition popularized by Swami Vivekananda."
    },
    {
        id: 72,
        question: "Which pandal in Kolkata is known for its traditional 'ekchala' style Durga idol?",
        options: ["Bagbazar Sarbojanin", "Mohammad Ali Park", "College Square", "Santosh Mitra Square"],
        correct: 0,
        category: "pandal-hopping",
        explanation: "Bagbazar Sarbojanin Durga Puja is famous for maintaining the traditional 'ekchala' style (where all deities are under one frame) Durga idol."
    },
    {
        id: 73,
        question: "What is the significance of using 'sholar saaj' in Durga Puja decorations?",
        options: ["It's eco-friendly", "It represents purity", "It's a traditional heritage craft", "All of the above"],
        correct: 3,
        category: "pandal-art",
        explanation: "Sholar saaj (decorative items made from the Indian cork plant) is eco-friendly, represents purity with its white color, and is a traditional heritage craft of Bengal."
    },
    {
        id: 74,
        question: "According to mythology, why does Durga arrive riding a lion?",
        options: ["To show her royalty", "To symbolize her power over nature", "Because she was gifted the lion by Himalaya", "To represent her fearlessness"],
        correct: 3,
        category: "mythology",
        explanation: "Durga rides a lion to symbolize her fearlessness and absolute power, with the lion representing untamed nature that she controls."
    },
    {
        id: 75,
        question: "Who is believed to accompany Goddess Durga when she visits Earth?",
        options: ["Lord Shiva", "Her children", "Her sisters", "Her army"],
        correct: 1,
        category: "durga-trivia",
        explanation: "According to tradition, Goddess Durga visits Earth with her children - Lakshmi, Saraswati, Ganesha, and Kartikeya."
    },
    {
        id: 77,
        question: "Which of these is a traditional Bengali dessert served on Bijoya Dashami?",
        options: ["Patishapta", "Mihidana", "Narkel Naru", "All of the above"],
        correct: 3,
        category: "festival-foods",
        explanation: "Patishapta (crepes with coconut filling), Mihidana (sweet fried batter), and Narkel Naru (coconut laddus) are all traditionally served during Bijoya Dashami."
    },
    {
        id: 78,
        question: "Which Hindu text narrates the story of Durga's victory over Mahishasura in detail?",
        options: ["Ramayana", "Devi Mahatmya", "Bhagavad Gita", "Vishnu Purana"],
        correct: 1,
        category: "mythology",
        explanation: "Devi Mahatmya (or Durga Saptashati) narrates in detail the story of Goddess Durga's creation and her victory over the buffalo demon Mahishasura."
    },
    {
        id: 79,
        question: "Which district in West Bengal is known for its bamboo crafted Durga idols?",
        options: ["Howrah", "Malda", "Midnapore", "Bankura"],
        correct: 2,
        category: "pandal-art",
        explanation: "Midnapore district in West Bengal is renowned for its unique bamboo-crafted Durga idols, a traditional art form passed down through generations."
    },
    {
        id: 80,
        question: "What does the 'Daaker Saaj' in Durga Puja decoration refer to?",
        options: ["Flowers used for decoration", "Ornaments made of silver foil", "Decorations made from jute", "Clay ornaments"],
        correct: 1,
        category: "puja-fashion",
        explanation: "'Daaker Saaj' refers to the ornaments made from silver foil/zari that were historically imported through postal services (daak) for decorating Durga idols."
    },
    {
        id: 81,
        question: "Which of these is a special rice dish served during Durga Puja?",
        options: ["Pulao", "Ghee Bhat", "Basanti Pulao", "All of the above"],
        correct: 3,
        category: "bhog-cuisine",
        explanation: "All these rice dishes are served during Durga Puja - regular Pulao, Ghee Bhat (rice with clarified butter), and Basanti Pulao (sweet yellow rice)."
    },
    {
        id: 83,
        question: "In which year did UNESCO include Durga Puja in its Representative List of the Intangible Cultural Heritage of Humanity?",
        options: ["2019", "2020", "2021", "2022"],
        correct: 2,
        category: "puja-around-world",
        explanation: "In 2021, UNESCO officially included Durga Puja in Kolkata on its Representative List of the Intangible Cultural Heritage of Humanity."
    },
    {
        id: 84,
        question: "What are 'Agomoni songs' in the context of Durga Puja?",
        options: ["Songs that welcome the goddess", "Songs that narrate the Durga myth", "Songs that bid farewell to the goddess", "Songs for the dhak players"],
        correct: 0,
        category: "dhak-music",
        explanation: "'Agomoni songs' are traditional Bengali songs that welcome Goddess Durga to Earth and express joy at her arrival."
    },
    {
        id: 85,
        question: "Which of these is NOT a feature of a traditional 'ekchala' Durga idol?",
        options: ["All deities under one frame", "Durga with ten arms", "Dark/black color of the goddess", "Separate pedestals for each deity"],
        correct: 3,
        category: "durga-trivia",
        explanation: "In the traditional 'ekchala' style, all deities (Durga, Lakshmi, Saraswati, Ganesha, Kartikeya) are placed under one frame/backdrop on the same pedestal."
    },
    {
        id: 87,
        question: "What is the name of the famous Durga Puja pandal that recreated the Vatican City in Kolkata?",
        options: ["Salt Lake", "Santosh Mitra Square", "College Square", "Sreebhumi"],
        correct: 1,
        category: "pandal-hopping",
        explanation: "Santosh Mitra Square created a replica of Vatican City for their pandal, which drew massive crowds and media attention."
    },
    {
        id: 88,
        question: "Which of these is a traditional Bengali hairdo worn during Durga Puja celebrations?",
        options: ["Khopa", "Venni", "Ambada", "Jooda"],
        correct: 0,
        category: "puja-fashion",
        explanation: "'Khopa' is the traditional Bengali hairdo where the hair is tied in a bun, often adorned with flowers or ornaments during Durga Puja."
    },
    {
        id: 89,
        question: "Which dish is traditionally made with 'Chhana' during Durga Puja?",
        options: ["Malpua", "Sandesh", "Kheer", "Jalebi"],
        correct: 1,
        category: "bhog-cuisine",
        explanation: "Sandesh, a popular Bengali sweet, is traditionally made with 'Chhana' (cottage cheese) during Durga Puja and other festive occasions."
    },
    {
        id: 90,
        question: "Who is believed to be the husband of Goddess Durga?",
        options: ["Lord Vishnu", "Lord Shiva", "Lord Brahma", "She has no husband"],
        correct: 1,
        category: "mythology",
        explanation: "In Hindu mythology, Goddess Durga is considered to be a form of Goddess Parvati, who is the wife of Lord Shiva."
    },
    {
        id: 91,
        question: "What style of music is traditionally associated with the morning Aarti during Durga Puja?",
        options: ["Shyama Sangeet", "Kirtan", "Rabindra Sangeet", "Agomoni Gaan"],
        correct: 0,
        category: "dhak-music",
        explanation: "Shyama Sangeet, devotional songs dedicated to the goddess in her various forms, is traditionally sung during the morning Aarti of Durga Puja."
    },
    {
        id: 92,
        question: "Which of these countries does NOT have a significant Durga Puja celebration?",
        options: ["Australia", "Saudi Arabia", "Canada", "Germany"],
        correct: 1,
        category: "puja-around-world",
        explanation: "While Durga Puja is celebrated in many countries with Bengali diaspora including Australia, Canada, and Germany, it is not significantly celebrated in Saudi Arabia due to religious restrictions."
    },
    {
        id: 93,
        question: "What is 'Chandmala' in the context of Durga Puja decorations?",
        options: ["A type of flower arrangement", "A crown for the goddess", "Decorative lighting", "A necklace"],
        correct: 2,
        category: "pandal-art",
        explanation: "'Chandmala' refers to the decorative lighting arrangements used to adorn Durga Puja pandals and surrounding areas."
    },
    {
        id: 95,
        question: "What is the significance of 'Kash Phool' (Kans grass) in Durga Puja?",
        options: ["It's used to make the idol", "It signifies the arrival of autumn and the goddess", "It's offered as bhog", "It's used for decoration only"],
        correct: 1,
        category: "durga-trivia",
        explanation: "The blooming of white Kash Phool (Saccharum spontaneum) signifies the arrival of autumn in Bengal and heralds the coming of Goddess Durga."
    },
    {
        id: 96,
        question: "Which pandal theme raised environmental awareness by creating Durga idol from recycled materials?",
        options: ["Plastic-free Puja", "Green Durga", "Eco-friendly Mother", "All of the above"],
        correct: 3,
        category: "pandal-hopping",
        explanation: "Various pandals have adopted environmental themes like 'Plastic-free Puja,' 'Green Durga,' and 'Eco-friendly Mother,' creating idols from recycled and sustainable materials."
    },
    {
        id: 98,
        question: "Which of these is a famous contemporary Bengali designer known for Durga Puja fashion collections?",
        options: ["Sharbari Dutta", "Anamika Khanna", "Rohit Bal", "Tarun Tahiliani"],
        correct: 0,
        category: "puja-fashion",
        explanation: "Sharbari Dutta was a renowned Bengali designer famous for her distinctive Durga Puja fashion collections featuring traditional Bengali motifs and designs."
    },
    {
        id: 99,
        question: "Which traditional Bengali sweet is shaped like small tortoise?",
        options: ["Kachagolla", "Sandesh", "Ledikeni", "Pantua"],
        correct: 0,
        category: "festival-foods",
        explanation: "Kachagolla is a traditional Bengali sweet made from chhana (cottage cheese) and shaped like a small tortoise, often served during festivals like Durga Puja."
    },
    {
        id: 100,
        question: "In the Durga myth, from which demon did she rescue the gods?",
        options: ["Ravana", "Kansa", "Mahishasura", "Hiranyakashipu"],
        correct: 2,
        category: "mythology",
        explanation: "According to Hindu mythology, Goddess Durga rescued the gods from the tyranny of the buffalo demon Mahishasura, whom she eventually slayed."
    },
    {
        id: 102,
        question: "Which modernist painter famously redesigned the traditional Durga idol in 1993?",
        options: ["M.F. Husain", "Jamini Roy", "Jogen Chowdhury", "Bikash Bhattacharjee"],
        correct: 0,
        category: "pandal-art",
        explanation: "M.F. Husain, one of India's most controversial modern artists, famously redesigned the traditional Durga idol in 1993, creating a minimalist interpretation."
    },
    {
        id: 103,
        question: "What is 'Bhoger Khichudi' in the context of Durga Puja?",
        options: ["A type of rice and lentil dish offered to the goddess", "A special seat for the goddess", "A type of prayer", "A musical performance"],
        correct: 0,
        category: "bhog-cuisine",
        explanation: "'Bhoger Khichudi' is a consecrated dish of rice and lentils cooked with ghee and spices, offered to Goddess Durga and then distributed as prasad to devotees."
    },
    {
        id: 104,
        question: "Which city hosts the famous 'Probashi Bengalee Cultural Association' Durga Puja?",
        options: ["New York", "London", "Singapore", "Dubai"],
        correct: 0,
        category: "puja-around-world",
        explanation: "The 'Probashi Bengalee Cultural Association' organizes one of the oldest and largest Durga Puja celebrations in New York City."
    },
    {
        id: 105,
        question: "What is the traditional drum beat pattern called that announces the arrival of Goddess Durga?",
        options: ["Aagomon", "Paran", "Ustad", "Chaali"],
        correct: 0,
        category: "dhak-music",
        explanation: "'Aagomon' is the traditional drum beat pattern played on dhak to announce the arrival of Goddess Durga during the puja celebrations."
    },
    {
        id: 106,
        question: "Which organization holds the oldest community Durga Puja in Kolkata?",
        options: ["Bagbazar Sarbojanin", "Barisha Club", "Simla Byayam Samity", "Sovabazar Rajbari"],
        correct: 3,
        category: "pandal-hopping",
        explanation: "Sovabazar Rajbari hosts the oldest recorded community Durga Puja in Kolkata, started by Raja Nabakrishna Deb in 1757 to honor Lord Clive."
    },
    {
        id: 108,
        question: "Which deity is depicted on Durga's left side in traditional Durga Puja idols?",
        options: ["Lakshmi", "Saraswati", "Kali", "Ganesha"],
        correct: 1,
        category: "durga-trivia",
        explanation: "In traditional Bengali Durga Puja idols, Goddess Saraswati (symbolizing knowledge) is depicted on Durga's left side."
    },
    {
        id: 109,
        question: "What special ingredient is added to the clay used for making Durga idols?",
        options: ["Ganges soil", "Cow dung", "Turmeric paste", "All of the above"],
        correct: 0,
        category: "pandal-art",
        explanation: "Soil from the banks of the Ganges (particularly from outside brothels, considered sacred) is traditionally added to the clay used for making Durga idols."
    },
    {
        id: 110,
        question: "Which form of Durga is worshipped during Navaratri in Gujarat?",
        options: ["Durga Mahishasurmardini", "Durga Amba", "Durga Kali", "Durga Shakti"],
        correct: 1,
        category: "puja-around-world",
        explanation: "During Navaratri in Gujarat, Goddess Durga is worshipped in her form as Amba or Ambe Maa, with the Garba dance dedicated to her."
    },
    {
        id: 111,
        question: "Which of these is a traditional Bengali jewelry worn during Durga Puja?",
        options: ["Kundan", "Meenakari", "Shitalpati", "Jhumka"],
        correct: 2,
        category: "puja-fashion",
        explanation: "'Shitalpati' is a traditional Bengal jewelry typically worn during Durga Puja, named after the cool sensation it gives when worn against the skin."
    },
    {
        id: 114,
        question: "What vegetable preparation is traditionally part of 'Navami Bhog'?",
        options: ["Labra", "Dum Aloo", "Cholar Dal", "All of the above"],
        correct: 3,
        category: "bhog-cuisine",
        explanation: "Labra (mixed vegetable curry), Dum Aloo (spiced potatoes), and Cholar Dal (bengal gram lentil) are all traditionally part of the grand Navami Bhog offering."
    },
    {
        id: 115,
        question: "Which ancient text contains the 'Devi Suktam' hymns dedicated to Goddess Durga?",
        options: ["Rig Veda", "Yajur Veda", "Sama Veda", "Atharva Veda"],
        correct: 0,
        category: "mythology",
        explanation: "The 'Devi Suktam' hymns dedicated to the Divine Mother (later associated with Durga) are found in the Rig Veda, the oldest of the Vedic texts."
    },
    {
        id: 116,
        question: "What is the name of the special musical composition played during the evening aarti of Durga Puja?",
        options: ["Sandhya Aarti", "Shondha Arati", "Pradosh Gaan", "All of the above"],
        correct: 1,
        category: "dhak-music",
        explanation: "'Shondha Arati' is the special musical composition played during the evening worship, with specific dhak beats and melodies dedicated to Goddess Durga."
    },
    {
        id: 117,
        question: "Which pandal in Kolkata is known for its silver filigree work on the Durga idol?",
        options: ["Bagbazar", "Kumartuli Park", "College Square", "Sreebhumi"],
        correct: 1,
        category: "pandal-hopping",
        explanation: "Kumartuli Park Durga Puja is known for its exquisite silver filigree work (Roopar Protima) on the Durga idol, showcasing the traditional craftsmanship."
    },
    {
        id: 118,
        question: "What traditional garment do men wear during the Durga Puja processions?",
        options: ["Kurta-Pajama", "Dhoti-Punjabi", "Sherwani", "Lungi-Kurta"],
        correct: 1,
        category: "puja-fashion",
        explanation: "Men traditionally wear 'Dhoti-Punjabi' (dhoti with a traditional Bengali-style kurta) during Durga Puja processions, especially for the immersion ceremony."
    },
    {
        id: 120,
        question: "Which famous Bengali writer wrote extensively about Durga Puja celebrations in his works?",
        options: ["Bankim Chandra Chattopadhyay", "Rabindranath Tagore", "Sarat Chandra Chattopadhyay", "Bibhutibhushan Bandyopadhyay"],
        correct: 2,
        category: "bengali-culture",
        explanation: "Sarat Chandra Chattopadhyay wrote extensively about Durga Puja celebrations in Bengal in many of his novels and short stories, capturing the cultural and social aspects of the festival."
    },
    {
        id: 121,
        question: "What is the significance of 'Alpona' in Bengali festivals like Durga Puja?",
        options: ["A type of sweet", "A traditional floor art", "A ritual song", "A type of dress"],
        correct: 1,
        category: "bengali-culture",
        explanation: "'Alpona' is a traditional Bengali floor art made using rice paste, typically created during religious festivals like Durga Puja to welcome deities and create sacred space."
    },
    {
        id: 122,
        question: "Which flower is most commonly used in Bengali rituals during Durga Puja?",
        options: ["Rose", "Sunflower", "Marigold", "Lotus"],
        correct: 2,
        category: "bengali-culture",
        explanation: "Marigold flowers are widely used in Bengali rituals, especially during Durga Puja, for their vibrant color and auspicious symbolism."
    },
    {
        id: 123,
        question: "What is a common eco-friendly material used in modern Durga Puja pandal decorations?",
        options: ["Plastic", "Thermocol", "Jute", "Acrylic"],
        correct: 2,
        category: "pandal-art",
        explanation: "Jute is a popular eco-friendly material used in modern Durga Puja pandals to promote sustainability and traditional craftsmanship."
    },
    {
        id: 124,
        question: "What boon made Mahishasura invincible to gods, prompting the creation of Goddess Durga?",
        options: ["He could not be killed by any male", "He could not die during the day", "He was immortal", "Only Lord Vishnu could kill him"],
        correct: 0,
        category: "mythology",
        explanation: "Mahishasura received a boon that no man or god could kill him, leading to the creation of Goddess Durga who was neither male nor god, but a divine female warrior."
    },
    {
        id: 125,
        question: "Why does Goddess Durga have ten arms in mythological depictions?",
        options: ["To show her divine beauty", "To hold the gifts from the gods", "To perform multiple tasks", "To represent the ten directions"],
        correct: 1,
        category: "mythology",
        explanation: "Each of Durga's ten arms holds a weapon gifted by a different god, symbolizing the collective power of all divine forces in the fight against evil."
    },
    {
        id: 126,
        question: "Which color combination is most traditionally worn by Bengali women during Durga Puja?",
        options: ["Blue and green", "Black and gold", "Red and white", "Pink and silver"],
        correct: 2,
        category: "puja-fashion",
        explanation: "The red and white saree is the most iconic and traditional attire worn by Bengali women during Durga Puja, symbolizing purity and power."
    },
    {
        id: 127,
        question: "What accessory is commonly used to decorate hair buns (khopa) during Durga Puja?",
        options: ["Gold chains", "Feathers", "Fresh flowers", "Pearl clips"],
        correct: 2,
        category: "puja-fashion",
        explanation: "Fresh flowers, especially jasmine and marigold, are traditionally used to decorate the 'khopa' or hair bun during Durga Puja celebrations."
    },
    {
        id: 128,
        question: "Which time of day is most popular for pandal hopping in Kolkata during Durga Puja?",
        options: ["Morning", "Afternoon", "Evening", "Late night"],
        correct: 3,
        category: "pandal-hopping",
        explanation: "Late night is the most popular time for pandal hopping in Kolkata, when the crowds peak, lights dazzle, and cultural events take place."
    },
    {
        id: 129,
        question: "What is a unique feature of the Suruchi Sangha pandal in Kolkata?",
        options: ["It uses only natural materials", "It is themed on different Indian states each year", "It floats on water", "It is dedicated to tribal art"],
        correct: 1,
        category: "pandal-hopping",
        explanation: "Suruchi Sangha is famous for showcasing a different Indian state each year through its pandal design, promoting cultural unity."
    },
    {
        id: 130,
        question: "Which spice is commonly used in Bhoger Khichuri to give it a distinct aroma?",
        options: ["Cinnamon", "Cumin", "Bay leaf", "All of the above"],
        correct: 3,
        category: "bhog-cuisine",
        explanation: "Bhoger Khichuri is flavored with aromatic spices like bay leaf, cinnamon, and cumin to enhance its divine fragrance and taste."
    },
    {
        id: 131,
        question: "What is typically served as a dessert alongside Bhoger Khichuri during Durga Puja?",
        options: ["Chhanar Payesh", "Mihidana", "Rosogolla", "All of the above"],
        correct: 3,
        category: "bhog-cuisine",
        explanation: "All of these sweets—Chhanar Payesh, Mihidana, and Rosogolla—are commonly served as dessert alongside Bhoger Khichuri during Durga Puja."
    },
    {
        id: 132,
        question: "Which ingredient is avoided in traditional Bhog offerings to Maa Durga?",
        options: ["Onion", "Garlic", "Both onion and garlic", "Chili"],
        correct: 2,
        category: "bhog-cuisine",
        explanation: "Traditional Bhog is strictly vegetarian and 'satvik', avoiding both onion and garlic to maintain purity and sanctity."
    },
    {
        id: 133,
        question: "What is the primary material used to make the body of a traditional dhak?",
        options: ["Wood", "Metal", "Clay", "Plastic"],
        correct: 0,
        category: "dhak-music",
        explanation: "The body of a traditional dhak is made of wood, which is hollowed out and covered with animal hide to produce its resonant sound."
    },
    {
        id: 134,
        question: "Which rhythmic pattern on the dhak signals the beginning of 'Sandhi Puja'?",
        options: ["Aarti Taal", "Chandi Taal", "Mahasnan Beat", "Sandhi Beat"],
        correct: 3,
        category: "dhak-music",
        explanation: "The 'Sandhi Beat' is a special rhythmic pattern played on the dhak to mark the highly auspicious Sandhi Puja, transitioning from Ashtami to Navami."
    },
    {
        id: 135,
        question: "Which city in the United Kingdom hosts one of the largest Durga Puja celebrations?",
        options: ["Manchester", "Birmingham", "London", "Leeds"],
        correct: 2,
        category: "puja-around-world",
        explanation: "London hosts one of the largest Durga Puja celebrations in the UK, with grand pandals and cultural events by the Bengali diaspora."
    },
    {
        id: 136,
        question: "What unique challenge do organizers face while celebrating Durga Puja abroad?",
        options: ["Finding enough devotees", "Importing traditional materials", "Language barriers", "All of the above"],
        correct: 3,
        category: "puja-around-world",
        explanation: "Organizers abroad often face challenges such as sourcing traditional materials, gathering enough volunteers, and cultural communication gaps."
    },
    {
        id: 137,
        question: "Which Southeast Asian country has a growing Bengali community that organizes Durga Puja annually?",
        options: ["Thailand", "Singapore", "Vietnam", "Malaysia"],
        correct: 1,
        category: "puja-around-world",
        explanation: "Singapore has an active Bengali community that organizes Durga Puja each year with traditional rituals, bhog, and cultural festivities."
    }
];