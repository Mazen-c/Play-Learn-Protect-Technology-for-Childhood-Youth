import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaClock, FaHeart } from 'react-icons/fa';
import ProgressBar from '../../Components/ProgressBar';

// Fix for React 19 / react-icons TS2786 error
const ClockIcon = FaClock as React.ElementType;
const CheckCircleIcon = FaCheckCircle as React.ElementType;
const TimesCircleIcon = FaTimesCircle as React.ElementType;

// Mock Data for Activities
const activities = {
    // MATH MODULES
    'm1': {
        title: 'Counting Fun',
        questions: [
            { id: 1, text: 'How many apples are there? 🍎🍎🍎', options: ['2', '3', '4'], correct: '3', difficulty: 'Easy', feedback: 'Count them: 1, 2, 3! There are 3 apples.' },
            { id: 2, text: 'Count the stars: ⭐⭐⭐⭐⭐', options: ['4', '5', '6'], correct: '5', difficulty: 'Easy', feedback: 'Great! There are 5 stars shining bright!' },
            { id: 3, text: 'What comes after 7?', options: ['6', '8', '9'], correct: '8', difficulty: 'Easy', feedback: 'The number 8 comes right after 7 in counting!' },
            { id: 4, text: 'How many fingers on one hand?', options: ['4', '5', '6'], correct: '5', difficulty: 'Easy', feedback: 'Each hand has 5 fingers: thumb, index, middle, ring, and pinky!' },
        ]
    },
    'm2': {
        title: 'Basic Addition',
        questions: [
            { id: 1, text: '2 + 2 = ?', options: ['3', '4', '5'], correct: '4', difficulty: 'Easy', feedback: 'When you add 2 and 2 together, you get 4!' },
            { id: 2, text: '5 + 3 = ?', options: ['7', '8', '9'], correct: '8', difficulty: 'Medium', feedback: 'Start at 5 and count up 3 more: 6, 7, 8!' },
            { id: 3, text: '10 + 15 = ?', options: ['20', '25', '30'], correct: '25', difficulty: 'Medium', feedback: '10 plus 15 equals 25. Think of it as 10 + 10 + 5!' },
            { id: 4, text: '12 + 8 = ?', options: ['18', '20', '22'], correct: '20', difficulty: 'Medium', feedback: '12 + 8 = 20. You can also think of it as 10 + 10!' },
        ]
    },
    'm3': {
        title: 'Geometry Shapes',
        questions: [
            { id: 1, text: 'How many sides does a triangle have?', options: ['2', '3', '4'], correct: '3', difficulty: 'Easy', feedback: 'A triangle has 3 sides. "Tri" means three!' },
            { id: 2, text: 'Which shape is round?', options: ['Square', 'Circle', 'Triangle'], correct: 'Circle', difficulty: 'Easy', feedback: 'A circle is perfectly round with no corners!' },
            { id: 3, text: 'How many corners does a rectangle have?', options: ['3', '4', '5'], correct: '4', difficulty: 'Medium', feedback: 'A rectangle has 4 corners, just like a square!' },
            { id: 4, text: 'A cube has how many faces?', options: ['4', '6', '8'], correct: '6', difficulty: 'Hard', feedback: 'A cube has 6 faces: top, bottom, front, back, left, and right!' },
        ]
    },

    // SCIENCE MODULES
    's1': {
        title: 'Solar System',
        questions: [
            { id: 1, text: 'What is the closest star to Earth?', options: ['Moon', 'Sun', 'Mars'], correct: 'Sun', difficulty: 'Easy', feedback: 'The Sun is our closest star! It gives us light and warmth.' },
            { id: 2, text: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter'], correct: 'Mars', difficulty: 'Easy', feedback: 'Mars looks red because of rust-like iron oxide on its surface!' },
            { id: 3, text: 'How many planets are in our solar system?', options: ['7', '8', '9'], correct: '8', difficulty: 'Medium', feedback: 'There are 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune!' },
            { id: 4, text: 'What is the largest planet?', options: ['Earth', 'Saturn', 'Jupiter'], correct: 'Jupiter', difficulty: 'Medium', feedback: 'Jupiter is the biggest planet - it\'s so large that over 1,000 Earths could fit inside it!' },
        ]
    },
    's2': {
        title: 'Plants Life',
        questions: [
            { id: 1, text: 'What do plants need to grow?', options: ['Only water', 'Sunlight and water', 'Only soil'], correct: 'Sunlight and water', difficulty: 'Easy', feedback: 'Plants need sunlight, water, air, and nutrients from soil to grow healthy and strong!' },
            { id: 2, text: 'What part of the plant grows underground?', options: ['Leaf', 'Root', 'Flower'], correct: 'Root', difficulty: 'Easy', feedback: 'Roots grow underground and help the plant drink water and stay in place!' },
            { id: 3, text: 'What process do plants use to make food?', options: ['Respiration', 'Photosynthesis', 'Digestion'], correct: 'Photosynthesis', difficulty: 'Medium', feedback: 'Photosynthesis is how plants use sunlight to make their own food from water and air!' },
            { id: 4, text: 'What gas do plants produce?', options: ['Carbon dioxide', 'Oxygen', 'Nitrogen'], correct: 'Oxygen', difficulty: 'Medium', feedback: 'Plants produce oxygen that we breathe! They take in carbon dioxide and give us fresh air.' },
        ]
    },

    // LANGUAGE MODULES
    'l1': {
        title: 'Alphabet',
        questions: [
            { id: 1, text: 'What is the first letter of the alphabet?', options: ['B', 'A', 'C'], correct: 'A', difficulty: 'Easy', feedback: 'A is the very first letter! The alphabet starts with A and ends with Z.' },
            { id: 2, text: 'Which letter comes after M?', options: ['L', 'N', 'O'], correct: 'N', difficulty: 'Easy', feedback: 'N comes right after M! Remember: L-M-N-O-P!' },
            { id: 3, text: 'How many letters are in the alphabet?', options: ['24', '26', '28'], correct: '26', difficulty: 'Medium', feedback: 'There are 26 letters in the English alphabet, from A to Z!' },
            { id: 4, text: 'Which of these is a vowel?', options: ['B', 'E', 'T'], correct: 'E', difficulty: 'Easy', feedback: 'E is a vowel! The vowels are A, E, I, O, and U!' },
        ]
    },
    'l2': {
        title: 'Sentence Building',
        questions: [
            { id: 1, text: 'What comes at the end of a sentence?', options: ['Comma', 'Period', 'Question mark only'], correct: 'Period', difficulty: 'Easy', feedback: 'A period (.) marks the end of a sentence. Question marks (?) and exclamation points (!) can too!' },
            { id: 2, text: 'Which word is a noun?', options: ['Run', 'Cat', 'Happy'], correct: 'Cat', difficulty: 'Medium', feedback: 'Cat is a noun - it\'s a person, place, or thing! Run is a verb and Happy is an adjective.' },
            { id: 3, text: 'Complete: "The dog ___ running."', options: ['is', 'are', 'am'], correct: 'is', difficulty: 'Medium', feedback: '"Is" is correct because we use "is" with singular subjects like "the dog"!' },
            { id: 4, text: 'Which sentence is correct?', options: ['i like pizza', 'I like pizza.', 'i Like Pizza'], correct: 'I like pizza.', difficulty: 'Hard', feedback: 'Sentences start with a capital letter and end with a period. "I" is always capitalized!' },
        ]
    },

    // CODING MODULES
    'c1': {
        title: 'Logic Loops',
        questions: [
            { id: 1, text: 'What does a loop do in programming?', options: ['Stops code', 'Repeats code', 'Deletes code'], correct: 'Repeats code', difficulty: 'Easy', feedback: 'A loop repeats code multiple times, like doing the same action over and over!' },
            { id: 2, text: 'If you want to count from 1 to 5, what would you use?', options: ['A loop', 'A variable', 'A function'], correct: 'A loop', difficulty: 'Medium', feedback: 'A loop is perfect for counting! It can repeat the counting action 5 times.' },
            { id: 3, text: 'What happens in an infinite loop?', options: ['Code runs once', 'Code never stops', 'Code breaks'], correct: 'Code never stops', difficulty: 'Medium', feedback: 'An infinite loop keeps running forever because it has no stopping condition!' },
            { id: 4, text: 'Which loop runs at least once?', options: ['while loop', 'do-while loop', 'for loop'], correct: 'do-while loop', difficulty: 'Hard', feedback: 'A do-while loop always runs at least once before checking its condition!' },
        ]
    },
    'c2': {
        title: 'Bug Fixer',
        questions: [
            { id: 1, text: 'What is a bug in programming?', options: ['An insect', 'An error', 'A feature'], correct: 'An error', difficulty: 'Easy', feedback: 'A bug is an error or mistake in code that makes it not work correctly!' },
            { id: 2, text: 'What tool helps find bugs?', options: ['Compiler', 'Debugger', 'Browser'], correct: 'Debugger', difficulty: 'Medium', feedback: 'A debugger is a special tool that helps programmers find and fix bugs in their code!' },
            { id: 3, text: 'What does "syntax error" mean?', options: ['Wrong grammar in code', 'Slow code', 'Missing file'], correct: 'Wrong grammar in code', difficulty: 'Medium', feedback: 'A syntax error means the code has wrong grammar - like a spelling mistake in programming!' },
            { id: 4, text: 'What is the first step in debugging?', options: ['Delete all code', 'Identify the problem', 'Restart computer'], correct: 'Identify the problem', difficulty: 'Hard', feedback: 'First, you need to find and understand what the problem is before you can fix it!' },
        ]
    }
};

const ModuleActivity: React.FC = () => {
    const { category, moduleId } = useParams();
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isActive, setIsActive] = useState(true);
    const [difficultyLevel, setDifficultyLevel] = useState('Easy');

    // Get activity data with fallback
    const activityData = activities[moduleId as keyof typeof activities] || {
        title: 'Learning Module',
        questions: [
            { id: 1, text: 'Ready to learn?', options: ['Yes!', 'Let\'s go!', 'I\'m ready!'], correct: 'Yes!', difficulty: 'Easy' },
            { id: 2, text: 'Are you excited?', options: ['Very!', 'Yes!', 'Absolutely!'], correct: 'Very!', difficulty: 'Easy' },
        ]
    };
    const currentQuestion = activityData.questions[currentQuestionIndex];

    // Timer Effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleAnswer(''); // Time's up
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const handleAnswer = (option: string) => {
        setIsActive(false);
        setSelectedAnswer(option);
        const isCorrect = option === currentQuestion.correct;

        if (isCorrect) {
            setScore(score + 10);
            setShowFeedback('correct');
            // Adaptive Difficulty: Increase if correct
            if (difficultyLevel === 'Easy') setDifficultyLevel('Medium');
            else if (difficultyLevel === 'Medium') setDifficultyLevel('Hard');
        } else {
            setShowFeedback('wrong');
            // Adaptive Difficulty: Decrease if wrong
            if (difficultyLevel === 'Hard') setDifficultyLevel('Medium');
            else if (difficultyLevel === 'Medium') setDifficultyLevel('Easy');
        }

        // Delay before next question - increased to 2.5 seconds so feedback is visible
        setTimeout(() => {
            setShowFeedback(null);
            setSelectedAnswer(null);
            if (currentQuestionIndex < activityData.questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setTimeLeft(30); // Reset timer
                setIsActive(true);
            } else {
                finishModule();
            }
        }, 2500);
    };

    const finishModule = () => {
        navigate(`/child/modules/${category}/${moduleId}/complete`, {
            state: {
                score: score + (showFeedback === 'correct' ? 10 : 0), // Add last question score if needed, but handled in state update
                totalQs: activityData.questions.length,
                maxScore: activityData.questions.length * 10
            }
        });
    };

    const progress = ((currentQuestionIndex) / activityData.questions.length) * 100;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 dark:bg-gray-900 p-4 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden z-10">

                {/* Header */}
                <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">{activityData.title}</h2>
                        <span className="text-indigo-200 text-sm">Difficulty: {difficultyLevel}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-indigo-700 px-4 py-2 rounded-full">
                        <ClockIcon />
                        <span className={`font-mono font-bold ${timeLeft < 10 ? 'text-red-300' : 'text-white'}`}>
                            00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                        </span>
                    </div>
                </div>

                {/* Progress Bar (Using MUI one wrapped or native styled) */}
                <div className="px-6 pt-6">
                    {/* Reusing the MUI component but maybe it needs specific styling context, let's just use a custom simple one for strict tailwind control requested or wrap it */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
                        <div
                            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Question {currentQuestionIndex + 1} of {activityData.questions.length}</span>
                        <span>Score: {score}</span>
                    </div>
                </div>

                {/* Question Area */}
                <div className="p-8 text-center min-h-[300px] flex flex-col justify-center">
                    <AnimatePresence mode='wait'>
                        {!showFeedback ? (
                            <motion.div
                                key="question"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                            >
                                <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
                                    {currentQuestion.text}
                                </h3>

                                <div className="grid grid-cols-1 gap-4">
                                    {currentQuestion.options.map((option, idx) => {
                                        const isSelected = selectedAnswer === option;
                                        const isCorrect = option === currentQuestion.correct;
                                        const showCorrect = selectedAnswer && isSelected && isCorrect;
                                        const showWrong = selectedAnswer && isSelected && !isCorrect;

                                        return (
                                            <motion.button
                                                key={idx}
                                                whileHover={{ scale: selectedAnswer ? 1 : 1.02, backgroundColor: selectedAnswer ? undefined : '#EEF2FF' }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => !selectedAnswer && handleAnswer(option)}
                                                disabled={!!selectedAnswer}
                                                className={`p-4 rounded-xl border-2 text-xl font-semibold transition-all ${showCorrect
                                                    ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:border-green-500 dark:text-green-300'
                                                    : showWrong
                                                        ? 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:border-red-500 dark:text-red-300'
                                                        : 'border-indigo-100 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-indigo-500 bg-white dark:bg-gray-700'
                                                    } ${selectedAnswer ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                            >
                                                {option}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="feedback"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex flex-col items-center justify-center p-6"
                            >
                                {showFeedback === 'correct' ? (
                                    <>
                                        <CheckCircleIcon className="text-green-500 text-4xl mb-2" />
                                        <h3 className="text-xl font-bold text-green-600">Correct!</h3>
                                        <p className="text-sm text-gray-500 mb-2">+10 Points</p>
                                        <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                                💡 {currentQuestion.feedback || 'Great job!'}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <TimesCircleIcon className="text-red-500 text-4xl mb-2" />
                                        <h3 className="text-xl font-bold text-red-600">Try Again!</h3>
                                        <p className="text-sm text-gray-500 mb-2">Correct answer: {currentQuestion.correct}</p>
                                        <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                                💡 {currentQuestion.feedback || 'Keep learning!'}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ModuleActivity;
