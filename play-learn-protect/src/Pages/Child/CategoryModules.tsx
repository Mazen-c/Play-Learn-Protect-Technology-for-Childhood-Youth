import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalculator, FaFlask, FaLanguage, FaLaptopCode, FaStar, FaArrowRight } from 'react-icons/fa';

// Fix for React 19 / react-icons TS2786 error
const CalculatorIcon = FaCalculator as React.ElementType;
const FlaskIcon = FaFlask as React.ElementType;
const LanguageIcon = FaLanguage as React.ElementType;
const LaptopCodeIcon = FaLaptopCode as React.ElementType;
const StarIcon = FaStar as React.ElementType;
const ArrowRightIcon = FaArrowRight as React.ElementType;

const categories = [
    {
        id: 'math',
        title: 'Math',
        icon: CalculatorIcon,
        color: 'bg-blue-500',
        description: 'Learn numbers, algebra, and geometry.',
        modules: [
            { id: 'm1', title: 'Counting Fun', difficulty: 'Easy', stars: 1 },
            { id: 'm2', title: 'Basic Addition', difficulty: 'Medium', stars: 2 },
            { id: 'm3', title: 'Geometry Shapes', difficulty: 'Hard', stars: 3 },
        ]
    },
    {
        id: 'science',
        title: 'Science',
        icon: FlaskIcon,
        color: 'bg-green-500',
        description: 'Explore nature, physics, and chemistry.',
        modules: [
            { id: 's1', title: 'Solar System', difficulty: 'Easy', stars: 1 },
            { id: 's2', title: 'Plants Life', difficulty: 'Medium', stars: 2 },
        ]
    },
    {
        id: 'language',
        title: 'Language',
        icon: LanguageIcon,
        color: 'bg-yellow-500',
        description: 'Reading, writing, and grammar skills.',
        modules: [
            { id: 'l1', title: 'Alphabet', difficulty: 'Easy', stars: 1 },
            { id: 'l2', title: 'Sentence Building', difficulty: 'Medium', stars: 2 },
        ]
    },
    {
        id: 'coding',
        title: 'Coding',
        icon: LaptopCodeIcon,
        color: 'bg-purple-500',
        description: 'Start your programming journey.',
        modules: [
            { id: 'c1', title: 'Logic Loops', difficulty: 'Medium', stars: 2 },
            { id: 'c2', title: 'Bug Fixer', difficulty: 'Hard', stars: 3 },
        ]
    },
];

const CategoryModules: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
                        Pick a Subject
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Start your learning adventure today!
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className={`${category.color} p-6 flex items-center justify-between`}>
                                <div className="flex items-center space-x-4">
                                    <category.icon className="text-white text-4xl" />
                                    <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                                </div>
                                <div className="bg-white/20 p-2 rounded-full">
                                    <StarIcon className="text-yellow-300 text-xl" />
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-gray-600 dark:text-gray-300 mb-6">{category.description}</p>

                                <div className="space-y-4">
                                    {category.modules.map((module) => (
                                        <div
                                            key={module.id}
                                            onClick={() => navigate(`/child/modules/${category.id}/${module.id}`)}
                                            className="group flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-indigo-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                                        >
                                            <div>
                                                <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                                    {module.title}
                                                </h3>
                                                <span className={`text-xs px-2 py-1 rounded-full ${module.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                                    module.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                    {module.difficulty}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="flex">
                                                    {[...Array(3)].map((_, i) => (
                                                        <StarIcon
                                                            key={i}
                                                            className={`text-sm ${i < module.stars ? 'text-yellow-400' : 'text-gray-300'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <ArrowRightIcon className="text-gray-400 group-hover:text-indigo-500" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryModules;
