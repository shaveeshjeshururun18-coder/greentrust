import React, { useState } from 'react';

interface SupportViewProps {
    onBack: () => void;
}

const SupportView: React.FC<SupportViewProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'support' | 'feedback'>('support');
    const [feedback, setFeedback] = useState({ name: '', email: '', message: '', rating: 0 });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            alert("Thank you for your feedback! We've received your message and will get back to you shortly.");
            setFeedback({ name: '', email: '', message: '', rating: 0 });
        }, 1500);
    };

    const FAQS = [
        { q: "How do I track my order?", a: "You can track your order in real-time by visiting the 'Orders' section in your account profile." },
        { q: "What is the refund policy?", a: "We offer a 'no-questions-asked' refund policy for any quality issues reported within 24 hours of delivery." },
        { q: "Do you deliver to my area?", a: "We currently serve select areas in Chennai. You can check availability by entering your pincode in the location picker." },
        { q: "How can I contact customer support?", a: "You can reach us via email support@greentrust.in or call us at +91 95002 45626 between 9 AM - 6 PM." }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 animate-fadeIn">
            {/* Desktop Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-90"
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Help & Support</h1>
            </header>

            <main className="max-w-6xl mx-auto p-6 lg:p-10">

                {/* Desktop Layout: Split View */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* Left Column: Contact & FAQ */}
                    <div className="space-y-8">
                        {/* Hero Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl shadow-green-500/5 border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full -translate-y-32 translate-x-16"></div>
                            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-4 relative z-10">How can we help you?</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm relative z-10">We are here to ensure you have the best experience fetching fresh organic produce.</p>

                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                <a href="tel:+919500245626" className="flex flex-col items-center justify-center p-6 bg-green-50 dark:bg-green-900/10 rounded-3xl border border-green-100 dark:border-green-800 hover:scale-[1.02] transition-transform cursor-pointer group">
                                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-green-600 text-xl shadow-lg mb-3 group-hover:scale-110 transition-transform">
                                        <i className="fa-solid fa-phone"></i>
                                    </div>
                                    <span className="font-bold text-slate-700 dark:text-slate-200">Call Us</span>
                                </a>
                                <a href="mailto:support@greentrust.in" className="flex flex-col items-center justify-center p-6 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-800 hover:scale-[1.02] transition-transform cursor-pointer group">
                                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-blue-600 text-xl shadow-lg mb-3 group-hover:scale-110 transition-transform">
                                        <i className="fa-solid fa-envelope"></i>
                                    </div>
                                    <span className="font-bold text-slate-700 dark:text-slate-200">Email Us</span>
                                </a>
                            </div>
                        </div>

                        {/* FAQs */}
                        <div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 px-2">Frequently Asked Questions</h3>
                            <div className="space-y-4">
                                {FAQS.map((faq, idx) => (
                                    <details key={idx} className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden open:shadow-lg transition-all">
                                        <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                            <span className="font-bold text-slate-700 dark:text-slate-200">{faq.q}</span>
                                            <span className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full text-slate-400 group-open:text-green-600 group-open:rotate-180 transition-all">
                                                <i className="fa-solid fa-chevron-down"></i>
                                            </span>
                                        </summary>
                                        <div className="px-6 pb-6 pt-0 text-slate-500 dark:text-slate-400 leading-relaxed text-sm animate-fadeIn">
                                            {faq.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Feedback Form */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/50 border border-slate-100 dark:border-slate-800 h-fit sticky top-24">
                        <div className="mb-8">
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-wider mb-3 inline-block">Feedback</span>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Send us a Message</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Have a suggestion or complaint? We'd love to hear from you.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    value={feedback.name}
                                    onChange={e => setFeedback({ ...feedback, name: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-4 font-bold text-slate-700 dark:text-white outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={feedback.email}
                                    onChange={e => setFeedback({ ...feedback, email: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-4 font-bold text-slate-700 dark:text-white outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={feedback.message}
                                    onChange={e => setFeedback({ ...feedback, message: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-4 font-bold text-slate-700 dark:text-white outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all resize-none"
                                    placeholder="How can we improve?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Feedback
                                        <i className="fa-solid fa-paper-plane"></i>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default SupportView;
