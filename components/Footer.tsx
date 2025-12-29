import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="hidden md:block bg-green-50/50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20 pt-10">
            {/* Brand Promise Section (Live it up replacement) */}
            <div className="bg-slate-100 dark:bg-slate-800/50 py-16 px-6 mb-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-slate-300 dark:text-slate-700 tracking-tighter mb-4 leading-tight">
                        Fresh Groceries,<br />Delivered Daily
                    </h1>
                    <p className="text-lg md:text-xl font-bold text-slate-400 dark:text-slate-500 flex items-center justify-center gap-2 mb-10">
                        Delivered with <i className="fa-solid fa-heart text-red-500 animate-pulse"></i> in Tamil Nadu
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {/* Primary Button */}
                        <button className="bg-green-600 hover:bg-green-700 text-white text-lg font-black px-8 py-4 rounded-2xl shadow-xl shadow-green-200 hover:-translate-y-1 transition-all flex items-center gap-3">
                            <span>Shop Fresh Now</span>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>

                        {/* Secondary Button */}
                        <button className="bg-white dark:bg-slate-800 text-slate-700 dark:text-white border-2 border-slate-200 dark:border-slate-700 text-lg font-bold px-8 py-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 hover:-translate-y-1 transition-all">
                            Browse Categories
                        </button>
                    </div>
                </div>
            </div>

            {/* Social Icons (Floating Center) - Adjusted position relative to new section */}
            <div className="relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-16 flex gap-4">
                    <a href="#" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-green-600/20">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-green-600/20">
                        <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="#" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-green-600/20">
                        <i className="fa-brands fa-youtube"></i>
                    </a>
                    <a href="#" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-green-600/20">
                        <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                </div>
            </div>

            <div className="max-w-[1920px] mx-auto px-10 pb-10">
                <div className="grid grid-cols-4 gap-12 text-sm text-slate-600 dark:text-slate-400">
                    {/* Column 1: Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <i className="fa-solid fa-leaf text-3xl text-green-600"></i>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">Green<span className="text-green-600">Trust</span></h2>
                        </div>
                        <p className="leading-relaxed mb-6">
                            Green Trust is Chennai's best food and grocery store. With over 200 handpicked products in the catalogue, you will find everything you are looking for.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Quick Links</h3>
                        <ul className="space-y-4 font-medium">
                            <li><a href="#" className="hover:text-green-600 transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-green-600 transition-colors">BasketBuddy (AI Help)</a></li>
                            <li><a href="#" className="hover:text-green-600 transition-colors">Our Story</a></li>
                            <li><a href="#" className="hover:text-green-600 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-green-600 transition-colors">About</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Us */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                <div>
                                    Green Trust, T Nagar,<br />
                                    Chennai,<br />
                                    Tamilnadu - 600017
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="fa-regular fa-envelope text-green-600"></i>
                                <a href="mailto:info@greentrust.com" className="hover:text-green-600">info@greentrust.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="fa-solid fa-phone text-green-600"></i>
                                <span>9091600916</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="fa-brands fa-whatsapp text-green-600"></i>
                                <span>9091600916</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Policies */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Policies</h3>
                        <ul className="space-y-4 font-medium">
                            <li><a href="#" className="hover:text-green-600 transition-colors">Shipping Policy</a></li>
                            <li><a href="#" className="hover:text-green-600 transition-colors">Terms and conditions</a></li>
                            <li><a href="#" className="hover:text-green-600 transition-colors">Refund Policy</a></li>
                            <li><a href="#" className="hover:text-green-600 transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-green-600 text-white py-4 px-10">
                <div className="max-w-[1920px] mx-auto flex items-center justify-between">
                    <p className="text-xs font-medium">
                        Copyright © 2025 Green Trust All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        <button className="bg-black text-white px-4 py-1.5 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform">
                            <i className="fa-brands fa-google-play text-lg"></i>
                            <div className="text-left">
                                <div className="text-[8px] uppercase leading-none opacity-80">Get it on</div>
                                <div className="text-xs font-bold leading-none">Google Play</div>
                            </div>
                        </button>
                        <button className="bg-black text-white px-4 py-1.5 rounded-lg flex items-center gap-2 hover:scale-105 transition-transform">
                            <i className="fa-brands fa-apple text-xl"></i>
                            <div className="text-left">
                                <div className="text-[8px] uppercase leading-none opacity-80">Download on the</div>
                                <div className="text-xs font-bold leading-none">App Store</div>
                            </div>
                        </button>
                    </div>

                    <p className="text-xs font-medium opacity-80">
                        Powered by S.Shaveesh Jeshurun SSJ
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
