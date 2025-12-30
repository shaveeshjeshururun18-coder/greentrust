import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

interface EditProfileModalProps {
    user: any;
    onClose: () => void;
    onSave: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onClose, onSave }) => {
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!displayName.trim()) return;
        setLoading(true);

        try {
            // Update Auth Profile
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: displayName
                });

                // Update Firestore User Document
                await setDoc(doc(db, 'users', auth.currentUser.uid), {
                    displayName: displayName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    updatedAt: new Date().toISOString()
                }, { merge: true });

                setLoading(false);
                onSave();
                onClose();
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose}></div>
            <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 relative z-10 shadow-2xl animate-popIn">
                <div className="text-center mb-6">
                    <h2 className="text-xl font-black text-gray-900">Edit Profile</h2>
                    <p className="text-sm text-gray-400">Update your personal details</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Display Name</label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-800 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Contact Info</label>
                        <div className="w-full px-4 py-3 bg-gray-100 border border-transparent rounded-xl font-medium text-gray-500 cursor-not-allowed">
                            {user?.phoneNumber || user?.email || 'No contact info'}
                            <span className="text-[10px] ml-2 opacity-60">(Read Only)</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3.5 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 py-3.5 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
