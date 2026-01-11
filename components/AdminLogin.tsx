import React, { useState } from 'react';

interface AdminLoginProps {
    onSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Check password against environment variable
        const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'ssj18';

        if (password === correctPassword) {
            // Store authentication in session
            sessionStorage.setItem('adminAuthenticated', 'true');
            onSuccess();
        } else {
            setError('Incorrect password');
            setPassword('');
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 w-full max-w-md border border-gray-100 dark:border-slate-700">
                {/* Lock Icon */}
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fa-solid fa-lock text-3xl text-green-600 dark:text-green-400"></i>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-black text-center text-gray-900 dark:text-white mb-2">
                    Admin Dashboard
                </h2>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-8">
                    Enter password to access order management
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 dark:border-slate-600 rounded-xl outline-none focus:border-green-500 dark:focus:border-green-400 transition-all bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400"
                                autoFocus
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                        {error && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                                <i className="fa-solid fa-circle-exclamation"></i>
                                {error}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || password.length === 0}
                        className={`w-full py-3 rounded-xl font-black text-white transition-all ${isLoading || password.length === 0
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700 active:scale-95'
                            }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Verifying...
                            </span>
                        ) : (
                            'ACCESS DASHBOARD'
                        )}
                    </button>
                </form>

                {/* Info */}
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl">
                    <p className="text-xs text-blue-800 dark:text-blue-300 flex items-start gap-2">
                        <i className="fa-solid fa-circle-info mt-0.5"></i>
                        <span>This dashboard is for authorized staff only. Contact admin if you need access.</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
