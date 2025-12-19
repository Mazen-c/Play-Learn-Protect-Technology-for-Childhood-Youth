import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTrophy, FaRedo, FaArrowRight, FaHome } from 'react-icons/fa';

// Fix for React 19 / react-icons TS2786 error
const TrophyIcon = FaTrophy as React.ElementType;
const ArrowRightIcon = FaArrowRight as React.ElementType;
const RedoIcon = FaRedo as React.ElementType;
const HomeIcon = FaHome as React.ElementType;

const CompletionCelebration: React.FC = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const score = state?.score || 0;
    const maxScore = state?.maxScore || 100;

    const percentage = Math.round((score / maxScore) * 100);

    // Confetti effect simulation components could be added here

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-blue-500"></div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="inline-block p-6 rounded-full bg-yellow-100 mb-6 relative">
                        <TrophyIcon className="text-6xl text-yellow-500" />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-4 border-dashed border-yellow-300 rounded-full"
                        />
                    </div>

                    <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                        {percentage >= 80 ? 'Master!' : percentage >= 50 ? 'Great Job!' : 'Keep Going!'}
                    </h1>
                    <p className="text-gray-500 mb-8">You completed the module successfully.</p>

                    <div className="bg-gray-100 rounded-xl p-6 mb-8">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-gray-600 font-medium">Total Score</span>
                            <span className="text-3xl font-bold text-indigo-600">{score}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-3 rounded-full ${percentage >= 80 ? 'bg-green-500' : 'bg-indigo-500'}`}
                            />
                        </div>
                        <div className="mt-2 text-right text-xs text-gray-400">
                            {percentage}% Accuracy
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => navigate('/child/modules')}
                            className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-colors"
                        >
                            <ArrowRightIcon />
                            <span>Next Module</span>
                        </button>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center justify-center space-x-2 bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold transition-colors"
                            >
                                <RedoIcon />
                                <span>Retry</span>
                            </button>
                            <button
                                onClick={() => navigate('/child/dashboard')}
                                className="flex items-center justify-center space-x-2 bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold transition-colors"
                            >
                                <HomeIcon />
                                <span>Home</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CompletionCelebration;
