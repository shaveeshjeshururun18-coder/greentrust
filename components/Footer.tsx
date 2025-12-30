import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-green-50/50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-20 pt-10">
            {/* Social Icons (Floating Center) */}
            {/* Social Icons (Floating Center) - HIDDEN ON MOBILE */}
            <div className="hidden md:block relative">
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

            <div className="max-w-[1920px] mx-auto px-10 pt-16 pb-20 border-b border-slate-100 dark:border-slate-800/50">
                <div className="flex flex-col gap-4">
                    <h2 className="text-[3.5rem] md:text-[5.5rem] font-black text-slate-500/80 dark:text-slate-400/80 leading-[0.9] md:leading-[0.8] tracking-tighter select-none">
                        Get Fresh<br />Groceries!
                    </h2>
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-bold text-sm tracking-tight mt-2">
                        Trusted by Families <span className="text-red-500 mx-1">❤️</span> delivered all over Tamil Nadu
                    </div>
                </div>
            </div>

            <div className="max-w-[1920px] mx-auto px-10 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-sm text-slate-600 dark:text-slate-400">
                    {/* Column 1: Brand - VISIBLE ON MOBILE */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <i className="fa-solid fa-leaf text-3xl text-green-600"></i>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">Green<span className="text-green-600">Trust</span></h2>
                        </div>
                        <p className="leading-relaxed mb-6">
                            Green Trust is Chennai's best food and grocery store. With over 200 handpicked products in the catalogue, you will find everything you are looking for.
                        </p>
                    </div>

                    {/* Column 2: Quick Links - HIDDEN ON MOBILE */}
                    <div className="hidden md:block">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Quick Links</h3>
                        <ul className="space-y-4 font-medium">
                            <li><a href="#" className="hover:text-green-600 transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-green-600 transition-colors">BasketBuddy (AI Help)</a></li>
                            <li><a href="#" className="hover:text-green-600 transition-colors">Our Story</a></li>
                            <li><a href="#" className="hover:text-green-600 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-green-600 transition-colors">About</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Us - HIDDEN ON MOBILE */}
                    <div className="hidden md:block">
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

                    {/* Column 4: Policies - HIDDEN ON MOBILE */}
                    <div className="hidden md:block">
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
                <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-medium text-center md:text-left">
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
