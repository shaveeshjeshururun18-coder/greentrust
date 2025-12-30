import React from 'react';

interface DeveloperProps {
    onBack: () => void;
}

const DeveloperView: React.FC<DeveloperProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 animate-fadeIn">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-90"
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Developer Profile</h1>
            </header>

            <main className="max-w-2xl mx-auto p-6 pt-10">
                {/* Profile Card */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl shadow-green-500/5 border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -translate-y-16 translate-x-16"></div>

                    <div className="relative z-10">
                        <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-green-400 to-green-600 p-1.5 mx-auto mb-6 shadow-xl rotate-3 flex items-center justify-center">
                            <div className="w-full h-full rounded-[2.2rem] bg-white dark:bg-slate-800 flex items-center justify-center">
                                <span className="text-4xl font-black text-green-600 dark:text-green-400 tracking-tighter">SSJ</span>
                            </div>
                        </div>

                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">S. Shaveesh Jeshurun</h2>
                        <p className="text-green-600 dark:text-green-400 font-bold uppercase tracking-widest text-xs mb-6">Full Stack Developer & UI Designer</p>

                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            <span className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300">React Native</span>
                            <span className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300">TypeScript</span>
                            <span className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300">Firebase</span>
                            <span className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300">UX/UI</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <a href="https://ssjportfolio-one.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-95 text-xs lg:text-sm">
                                <i className="fa-solid fa-globe text-lg"></i>
                                Website
                            </a>
                            <a href="mailto:shaveeshjeshurun@gmail.com" className="flex items-center justify-center gap-2 py-4 bg-red-500 text-white rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-red-500/20 text-xs lg:text-sm">
                                <i className="fa-brands fa-google text-lg"></i>
                                Gmail
                            </a>
                            <a href="https://github.com/shaveeshjeshururun18-coder/greentrust" target="_blank" rel="noopener noreferrer" className="col-span-2 flex items-center justify-center gap-2 py-4 bg-[#24292e] dark:bg-[#161b22] text-white rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-gray-900/20">
                                <i className="fa-brands fa-github text-xl"></i>
                                View on GitHub
                            </a>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="mt-10 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">About the Project</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            Green Trust is a high-performance, mobile-first e-commerce application designed to deliver the freshest organic produce with a premium user experience. Built with a focus on speed, aesthetics, and user trust.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wide">React 18</span>
                            <span className="px-3 py-1 bg-sky-50 text-sky-600 rounded-lg text-[10px] font-bold uppercase tracking-wide">TailwindCSS</span>
                            <span className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-lg text-[10px] font-bold uppercase tracking-wide">Firebase v10</span>
                            <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-lg text-[10px] font-bold uppercase tracking-wide">Vite</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3">Mission</h3>
                        <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-100 dark:border-green-800/30">
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white shrink-0">
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <p className="text-sm font-bold text-green-700 dark:text-green-400 italic">"Providing purity through every delivery."</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DeveloperView;
