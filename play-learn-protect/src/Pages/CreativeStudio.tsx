import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/Context/AuthContext';
import { useProjects } from '../Components/Context/ProjectsContext';
import { useAlerts } from '../Components/Alerts/AlertsContext';

// --- Inline SVG Icons to replace phosphor-react ---
// These are simplified SVG equivalents to avoid adding new dependencies.

const PaintBrush = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}>
        <path d="M222.14,70.39l-19.46-24.1A32.06,32.06,0,0,0,177.82,36h0a32.06,32.06,0,0,0-24.86,10.29L35,164.24a8,8,0,0,0,0,11.31l32.25,32.25a8,8,0,0,0,5.65,2.35,7.84,7.84,0,0,0,5.66-2.35L194.39,92.05h0l.49-.49A32.14,32.14,0,0,0,222.14,70.39ZM87.31,196.69,46.31,155.69,152.94,49.06a16.09,16.09,0,0,1,22.63,0l17.5,21.68L87.31,176.5Zm122.9-97.77L199.39,110,89,220.31c-.32.32-.61.67-.92,1L99.31,232.6a8,8,0,0,0,11.31,0L221.54,121.6A16.08,16.08,0,0,1,210.21,98.92Z"></path>
    </svg>
);

const ArrowUUpLeft = ({ size = 24, weight = "regular" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
        <path d="M224,136a80.09,80.09,0,0,1-80,80H88a8,8,0,0,1,0-16h56a64,64,0,0,0,0-128H75.31l26.35,26.34a8,8,0,0,1-11.32,11.32l-40-40a8,8,0,0,1,0-11.32l40-40a8,8,0,0,1,11.32,11.32L75.31,56H144A80.09,80.09,0,0,1,224,136Z"></path>
    </svg>
);

const ArrowUUpRight = ({ size = 24, weight = "regular" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
        <path d="M219.31,106.34l-40-40a8,8,0,0,0-11.32,11.32L194.69,104H112a64,64,0,0,0,0,128h56a8,8,0,0,0,0-16H112a48,48,0,0,1,0-96h82.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,219.31,106.34Z"></path>
    </svg>
);

const FloppyDisk = ({ size = 24 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
        <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208ZM168,168a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"></path>
    </svg>
);

const ShareNetwork = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256" className={className}>
        <path d="M176,160a23.94,23.94,0,0,0-15.6,5.77l-49-27.42a24.68,24.68,0,0,0,0-20.7l49-27.42A24.16,24.16,0,1,0,152,72a24,24,0,0,0,1.4,8.1L104.4,107.52a24,24,0,1,0,0,41l49,27.42A24.11,24.11,0,1,0,176,160Z"></path>
    </svg>
);

const Shapes = ({ size = 24 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
        <path d="M224,104a8,8,0,0,1-16,0V64H168a8,8,0,0,1,0-16h40a8,8,0,0,1,8,8ZM112,56h32a8,8,0,0,0,0-16H112a8,8,0,0,0,0,16ZM48,88H32a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H152a8,8,0,0,0,8-8v-6.91l40,40A15.86,15.86,0,0,0,211.31,254l16-16A16,16,0,0,0,224,211.31L189.25,176.6a79.4,79.4,0,0,0,10.6-5.8,8,8,0,0,0-9.69-12.8,64.24,64.24,0,0,1-44.57,18H144V96a8,8,0,0,0-8-8H48ZM40,208V104H128V208Zm176,32L176,200l24-24,40,40Z"></path>
    </svg>
);

const TextT = ({ size = 24 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
        <path d="M208,56H136V192a8,8,0,0,1-16,0V56H48a8,8,0,0,1,0-16H208a8,8,0,0,1,0,16Z"></path>
    </svg>
);

const Lock = ({ size = 24 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
        <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm-80,84a12,12,0,1,1,12-12A12,12,0,0,1,128,164Zm32-84H96V56a32,32,0,0,1,64,0Z"></path>
    </svg>
);

const Plus = ({ size = 24 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
        <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
    </svg>
);

const X = ({ size = 24 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
        <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.32,61.66,205.66a8,8,0,0,1-11.32-11.32L116.68,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.68,194.34,50.34a8,8,0,0,1,11.32,11.32L139.32,128Z"></path>
    </svg>
);

const House = ({ size = 24, weight = "regular" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256">
        <path d="M213.38,118.62,133.38,42.47a8,8,0,0,0-10.76,0L42.62,118.62A8,8,0,0,0,48,132.31H56v83.69a16,16,0,0,0,16,16h48V176a8,8,0,0,1,8-8h0a8,8,0,0,1,8,8v56h48a16,16,0,0,0,16-16V132.31h8a8,8,0,0,0,5.38-13.69ZM184,216H152V176a24,24,0,0,0-48,0v40H72V132.31L128,79l56,53.33Z"></path>
    </svg>
);

// --- Mock Data based on SRS REQ-CRE-1 ---
interface Project {
    id: number;
    title: string;
    type: string;
    date: string;
    points: number;
    status: "Draft" | "Submitted";
}

interface Teacher {
    id: number;
    name: string;
}

const MOCK_PROJECTS: Project[] = [
    { id: 1, title: "My Physics Tower", type: "Structure", date: "2025-12-10", points: 50, status: "Draft" },
    { id: 2, title: "The Hungry Caterpillar", type: "Story", date: "2025-12-12", points: 120, status: "Submitted" },
];

const MOCK_TEACHERS: Teacher[] = [
    { id: 1, name: "Ms. Sarah (Science)" },
    { id: 2, name: "Mr. Ahmed (Math)" },
];

// --- Components ---

// 1. Project List Page
// 1. Project List Page
const ProjectList: React.FC<{ projects: Project[], onEdit: (p: Project) => void, onCreate: () => void, onDelete: (id: string) => void }> = ({ projects, onEdit, onCreate, onDelete }) => {
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-indigo-600 font-comic">My Creative Studio</h1>
                <button
                    onClick={onCreate}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl font-bold text-xl flex items-center gap-2 shadow-lg transform transition hover:scale-105"
                >
                    <Plus size={32} /> New Project
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-3xl p-6 shadow-xl border-4 border-yellow-200 relative overflow-hidden">
                        {project.status === 'Submitted' && (
                            <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-xl text-xs font-bold">
                                Submitted
                            </div>
                        )}
                        <button
                            onClick={() => onDelete(String(project.id))}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
                            title="Delete project"
                        >
                            <X size={16} />
                        </button>
                        <div className="h-32 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-400">
                            {/* Thumbnail Placeholder */}
                            <Shapes size={48} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{project.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{project.date} • {project.points} pts</p>
                        <button
                            onClick={() => onEdit(project)}
                            className="w-full bg-indigo-100 text-indigo-700 py-2 rounded-xl font-bold hover:bg-indigo-200"
                        >
                            Open Project
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// 2. Share Modal (REQ-CRE-1: Share with Teacher)
const ShareModal: React.FC<{ isOpen: boolean, onClose: () => void, onShare: (t: Teacher) => void }> = ({ isOpen, onClose, onShare }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full border-4 border-indigo-400 shadow-2xl animate-bounce-in">
                <h2 className="text-2xl font-bold text-indigo-800 mb-4">Share with Teacher?</h2>
                <p className="text-gray-600 mb-6">Pick a teacher to send your amazing work to!</p>

                <div className="space-y-3 mb-6">
                    {MOCK_TEACHERS.map((teacher) => (
                        <button
                            key={teacher.id}
                            onClick={() => onShare(teacher)}
                            className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition flex justify-between items-center group"
                        >
                            <span className="font-bold text-gray-700 group-hover:text-indigo-700">{teacher.name}</span>
                            <ShareNetwork size={24} className="text-gray-400 group-hover:text-indigo-600" />
                        </button>
                    ))}
                </div>

                <button
                    onClick={onClose}
                    className="w-full py-3 text-gray-500 font-bold hover:bg-gray-100 rounded-xl"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

// Helper Component for Tools
const ToolButton = ({ icon, label, active, locked }: { icon: React.ReactNode, label: string, active?: boolean, locked?: boolean }) => (
    <button
        className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-all ${active
            ? 'bg-indigo-100 text-indigo-600 ring-4 ring-indigo-200'
            : 'text-gray-400 hover:bg-gray-50'
            } ${locked ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        {icon}
        <span className="text-[10px] font-bold mt-1">{label}</span>
    </button>
);

// 3. Creative Workspace (Canvas & Toolbar)
const CreativeWorkspace: React.FC<{ project: Project | null, onSave: () => void, onBack: () => void }> = ({ project, onSave, onBack }) => {
    const [showShareModal, setShowShareModal] = useState(false);
    const [projectTitle, setProjectTitle] = useState(project?.title || "New Masterpiece");
    const [showNavMenu, setShowNavMenu] = useState(false);
    const { saveProject } = useProjects();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { triggerAlert } = useAlerts();

    // Mock handling for sharing
    const handleShare = (teacher: Teacher) => {
        alert(`Project sent to ${teacher.name}! You earned 20 Creativity Points!`); // Gamification feedback
        handleSave();
    };

    const handleSave = () => {
        if (user?.email) {
            saveProject({
                id: String(project?.id || Date.now()),
                title: projectTitle,
                type: (project?.type as "Structure" | "Story" | "Drawing" | "Animation") || "Drawing",
                userEmail: user.email,
                date: new Date().toISOString().split('T')[0],
                points: project?.points || 50,
                status: "Draft",
                content: "canvas-content" // In real app, serialize actual canvas
            });
            alert("Project saved successfully!");
        }
        onSave();
    };

    return (
        <div className="h-screen flex flex-col bg-blue-50 dark:bg-slate-900">
            {/* Top Navigation Bar */}
            <div className="h-16 bg-white dark:bg-slate-800 border-b-4 border-indigo-200 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button 
                            onClick={() => setShowNavMenu(!showNavMenu)} 
                            className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition"
                        >
                            <House size={28} weight="bold" />
                        </button>
                        {showNavMenu && (
                            <div className="absolute top-12 left-0 bg-white rounded-lg shadow-xl border-2 border-indigo-200 z-50 min-w-48">
                                <button 
                                    onClick={() => {
                                        navigate('/');
                                        setShowNavMenu(false);
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-indigo-50 font-bold text-gray-700 rounded-t-lg"
                                >
                                    📊 Dashboard
                                </button>
                                {user?.role === 'child' && (
                                    <>
                                        <button 
                                            onClick={() => {
                                                navigate('/child/assignments');
                                                setShowNavMenu(false);
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-indigo-50 font-bold text-gray-700"
                                        >
                                            📝 Assignments
                                        </button>
                                        <button 
                                            onClick={() => {
                                                navigate('/child/challenges');
                                                setShowNavMenu(false);
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-indigo-50 font-bold text-gray-700"
                                        >
                                            🏆 Challenges
                                        </button>
                                    </>
                                )}
                                {user?.role === 'educator' && (
                                    <>
                                        <button 
                                            onClick={() => {
                                                navigate('/teacher');
                                                setShowNavMenu(false);
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-indigo-50 font-bold text-gray-700"
                                        >
                                            👨‍🏫 Teacher Dashboard
                                        </button>
                                        <button 
                                            onClick={() => {
                                                navigate('/teacher/assignments');
                                                setShowNavMenu(false);
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-indigo-50 font-bold text-gray-700"
                                        >
                                            📋 Assignments
                                        </button>
                                    </>
                                )}
                                <button 
                                    onClick={() => {
                                        navigate('/game');
                                        setShowNavMenu(false);
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-indigo-50 font-bold text-gray-700"
                                >
                                    🎮 Game
                                </button>
                                <button 
                                    onClick={() => {
                                        onBack();
                                        setShowNavMenu(false);
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-indigo-50 font-bold text-gray-700 rounded-b-lg border-t border-gray-200"
                                >
                                    ⬅️ Back to Projects
                                </button>
                            </div>
                        )}
                    </div>
                    <input
                        type="text"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        className="text-2xl font-bold text-indigo-800 dark:text-indigo-300 bg-transparent border-none focus:ring-0 font-comic"
                    />
                </div>

                <div className="flex gap-3">
                    <button 
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-yellow-900 dark:text-yellow-200 rounded-full font-bold shadow-sm hover:bg-yellow-300 dark:bg-yellow-600 transition"
                    >
                        <FloppyDisk size={20} /> Save
                    </button>
                    <button
                        onClick={() => {
                            // Gate sharing behind a serious alert acknowledgment
                            const key = "plp_creative_share_privacy_ack";
                            const alreadyAcked = sessionStorage.getItem(key) === "1";
                            if (alreadyAcked) {
                                setShowShareModal(true);
                            } else {
                                triggerAlert({
                                    severity: "serious",
                                    title: "Before you share",
                                    message: "Make sure your project doesn't include names, addresses, or other personal info.",
                                    onAcknowledge: () => {
                                        sessionStorage.setItem(key, "1");
                                        setShowShareModal(true);
                                    },
                                });
                            }
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-full font-bold shadow-sm hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-500 transition"
                    >
                        <ShareNetwork size={20} /> Share
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Toolbar (Tools) */}
                <div className="w-24 bg-white dark:bg-slate-800 border-r-4 border-indigo-200 flex flex-col items-center py-6 gap-4 shadow-inner z-10">
                    <ToolButton icon={<PaintBrush size={32} />} label="Draw" active />
                    <ToolButton icon={<Shapes size={32} />} label="Shapes" />
                    <ToolButton icon={<TextT size={32} />} label="Text" />
                    <div className="w-16 h-1 bg-gray-200 rounded-full my-2"></div>
                    {/* Locked Tools (Curriculum Integration REQ-CRE-1) */}
                    <ToolButton icon={<Lock size={32} />} label="Gravity" locked />
                    <ToolButton icon={<Lock size={32} />} label="Circuits" locked />
                </div>

                {/* Center Canvas */}
                <div className="flex-1 bg-gray-100 dark:bg-slate-700 relative p-8 overflow-auto flex items-center justify-center">
                    <div className="bg-white dark:bg-slate-800 w-full h-full shadow-2xl rounded-xl border border-gray-300 dark:border-slate-600 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-slate-400 select-none pointer-events-none">
                            <h2 className="text-4xl font-bold opacity-20">Canvas Area</h2>
                        </div>
                        {/* Mock Content */}
                        {project?.type === 'Structure' && (
                            <div className="absolute top-1/3 left-1/4 w-32 h-64 bg-red-400 rounded-lg border-4 border-black opacity-80 rotate-3"></div>
                        )}
                    </div>

                    {/* Floating Action Toolbar (Undo/Redo) */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 px-6 py-3 rounded-full shadow-xl flex gap-6 border-2 border-indigo-100">
                        <button className="text-gray-600 hover:text-indigo-600 hover:scale-110 transition">
                            <ArrowUUpLeft size={28} weight="bold" />
                        </button>
                        <button className="text-gray-600 hover:text-indigo-600 hover:scale-110 transition">
                            <ArrowUUpRight size={28} weight="bold" />
                        </button>
                    </div>
                </div>

                {/* Right Sidebar (Properties/Layers - Simplified for Kids) */}
                <div className="w-64 bg-white dark:bg-slate-800 border-l-4 border-indigo-200 p-4">
                    <h3 className="font-bold text-gray-700 dark:text-slate-100 mb-4">Stickers & Parts</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-yellow-100 dark:bg-yellow-900/20 p-2 rounded-lg cursor-grab active:cursor-grabbing hover:bg-yellow-200">⭐ Star</div>
                        <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg cursor-grab active:cursor-grabbing hover:bg-green-200">🌳 Tree</div>
                        <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg cursor-grab active:cursor-grabbing hover:bg-blue-200">🚙 Car</div>
                    </div>
                </div>
            </div>

            <ShareModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                onShare={handleShare}
            />
        </div>
    );
};

// --- Main App Controller ---
const CreativeStudio = () => {
    const [view, setView] = useState<'list' | 'studio'>('list'); // 'list' or 'studio'
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const { triggerAlert } = useAlerts();
    const { user } = useAuth();
    const { getUserProjects, deleteProject } = useProjects();

    // Get user's projects or use mock data if no user email
    const userProjects = user?.email ? getUserProjects(user.email) : MOCK_PROJECTS;

    const handleEdit = (project: Project) => {
        setCurrentProject(project as any);
        setView('studio');
    };

    const handleCreate = () => {
        setCurrentProject(null);
        setView('studio');
    };

    const handleSave = () => {
        setView('list');
    };

    const handleDelete = (projectId: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            deleteProject(projectId);
        }
    };

    useEffect(() => {
        if (view !== 'studio') return;
        const key = 'plp_creative_studio_minor_tip_shown';
        if (!sessionStorage.getItem(key)) {
            triggerAlert({
                severity: 'minor',
                title: 'Sharing Reminder',
                message: "Ask an adult before sharing your project with others.",
            });
            sessionStorage.setItem(key, '1');
        }
    }, [view, triggerAlert]);

    return (
        <div className="min-h-screen font-sans bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-100">
            {view === 'list' ? (
                <ProjectList
                    projects={userProjects as Project[]}
                    onEdit={handleEdit}
                    onCreate={handleCreate}
                    onDelete={handleDelete}
                />
            ) : (
                <CreativeWorkspace
                    project={currentProject}
                    onSave={handleSave}
                    onBack={() => setView('list')}
                />
            )}
        </div>
    );
};

export default CreativeStudio;
