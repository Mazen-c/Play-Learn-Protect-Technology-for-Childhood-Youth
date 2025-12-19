import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaYoutube, FaFileAlt, FaChalkboardTeacher, FaUserGraduate, FaUserFriends, FaArrowLeft } from 'react-icons/fa';
import { useTheme } from '../../Components/Context/ThemeContext';

interface Tutorial {
    id: string;
    title: string;
    category: 'General' | 'Children' | 'Parents' | 'Teachers';
    type: 'Video' | 'Article';
    duration?: string;
    description: string;
    link?: string; // In a real app, this might lead to a video player or article view
}

const tutorialsData: Tutorial[] = [
    {
        id: '1',
        title: 'Getting Started with Play-Learn-Protect',
        category: 'General',
        type: 'Video',
        duration: '5 min',
        description: 'A quick tour of the main features and how to navigate the platform.',
    },
    {
        id: '2',
        title: 'How to Complete Modules',
        category: 'Children',
        type: 'Video',
        duration: '3 min',
        description: 'Learn how to find modules, play games, and earn points!',
    },
    {
        id: '3',
        title: 'Safety Guidelines for Parents',
        category: 'Parents',
        type: 'Article',
        duration: '10 min read',
        description: 'Essential digital safety tips and how to monitor your child\'s progress.',
    },
    {
        id: '4',
        title: 'Creating Assignments for Class',
        category: 'Teachers',
        type: 'Video',
        duration: '8 min',
        description: 'Step-by-step guide to creating and assigning tasks to your students.',
    },
    {
        id: '5',
        title: 'Understanding the Leaderboard',
        category: 'Children',
        type: 'Article',
        duration: '2 min read',
        description: 'How points are calculated and how to climb the ranks.',
    },
];

const TutorialsPage: React.FC = () => {
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const filteredTutorials = selectedCategory === 'All'
        ? tutorialsData
        : tutorialsData.filter(t => t.category === selectedCategory);

    const categories = ['All', 'General', 'Children', 'Parents', 'Teachers'];

    const getCategoryIcon = (cat: string) => {
        let Icon;
        switch (cat) {
            case 'Children': Icon = FaUserGraduate as any; break;
            case 'Parents': Icon = FaUserFriends as any; break;
            case 'Teachers': Icon = FaChalkboardTeacher as any; break;
            default: Icon = FaBook as any; break;
        }
        return <Icon />;
    };

    const bgClass = isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900';
    const cardBgClass = isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:bg-gray-50';
    const activeTabClass = isDark ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white';
    const inactiveTabClass = isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300';

    // Cast static icons
    const BackIcon = FaArrowLeft as any;
    const HeaderIcon = FaBook as any;
    const VideoIcon = FaYoutube as any;
    const ArticleIcon = FaFileAlt as any;

    return (
        <div className={`min-h-screen p-6 md:p-12 ${bgClass}`}>
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-200/20 transition-colors">
                        <BackIcon className="text-xl" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <HeaderIcon className="text-blue-500" />
                            Tutorials & Guides
                        </h1>
                        <p className="opacity-70 mt-1">Learn how to make the most of Play-Learn-Protect</p>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2 rounded-full font-medium transition-all ${selectedCategory === cat ? activeTabClass : inactiveTabClass}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTutorials.map((tutorial) => (
                        <div
                            key={tutorial.id}
                            className={`p-6 rounded-2xl border transition-all cursor-pointer shadow-sm hover:shadow-md ${cardBgClass}`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide 
                                    ${tutorial.category === 'Children' ? 'bg-green-100 text-green-700' :
                                        tutorial.category === 'Teachers' ? 'bg-purple-100 text-purple-700' :
                                            tutorial.category === 'Parents' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'}`}>
                                    {tutorial.category}
                                </span>
                                {tutorial.type === 'Video' ? <VideoIcon className="text-red-500 text-2xl" /> : <ArticleIcon className="text-blue-400 text-2xl" />}
                            </div>

                            <h3 className="text-xl font-bold mb-2 line-clamp-2 h-14">{tutorial.title}</h3>
                            <p className="opacity-70 text-sm mb-4 line-clamp-3 h-10">{tutorial.description}</p>

                            <div className="flex items-center gap-2 text-sm font-medium opacity-60">
                                {tutorial.type === 'Video' ? 'Video' : 'Article'} • {tutorial.duration}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredTutorials.length === 0 && (
                    <div className="text-center py-20 opacity-50">
                        <p className="text-xl">No tutorials found for this category yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TutorialsPage;
