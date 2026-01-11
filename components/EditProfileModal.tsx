import React, { useState, useRef } from 'react';
import { auth, db, storage } from '../firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface EditProfileModalProps {
    user: any;
    onClose: () => void;
    onSave: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, onClose, onSave }) => {
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber?.replace('+91', '') || '');
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [previewImage, setPreviewImage] = useState(user?.photoURL || '');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please select an image file');
                return;
            }
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size must be less than 5MB');
                return;
            }
            setError('');
            setSelectedFile(file);
            // Show preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        if (!displayName.trim()) {
            setError('Display name is required');
            return;
        }

        if (phoneNumber && phoneNumber.length !== 10) {
            setError('Phone number must be 10 digits');
            return;
        }

        setLoading(true);
        setError('');

        try {
            let photoURL = user?.photoURL;

            // Upload photo if selected
            if (selectedFile && auth.currentUser) {
                setUploading(true);
                const storageRef = ref(storage, `profile_photos/${auth.currentUser.uid}/profile.jpg`);
                await uploadBytes(storageRef, selectedFile);
                photoURL = await getDownloadURL(storageRef);
                setUploading(false);
            }

            // Update Auth Profile
            if (auth.currentUser) {
                const updates: any = { displayName: displayName.trim() };
                if (photoURL) updates.photoURL = photoURL;

                await updateProfile(auth.currentUser, updates);

                // Update Firestore User Document
                await setDoc(doc(db, 'users', auth.currentUser.uid), {
                    displayName: displayName.trim(),
                    email: user.email,
                    phoneNumber: phoneNumber ? `+91${phoneNumber}` : null,
                    photoURL: photoURL || null,
                    updatedAt: new Date().toISOString()
                }, { merge: true });

                setLoading(false);
                onSave();
                onClose();
                // Reload page to reflect changes
                window.location.reload();
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile. Please try again.");
            setLoading(false);
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose}></div>
            <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-3xl p-6 relative z-10 shadow-2xl animate-popIn">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white">Edit Profile</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your personal details</p>
                </div>

                {/* Profile Photo Upload */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-100 dark:border-green-900">
                            <img
                                src={previewImage || "https://ui-avatars.com/api/?name=" + encodeURIComponent(displayName || "User") + "&background=22c55e&color=fff"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="absolute bottom-0 right-0 w-8 h-8 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors disabled:opacity-50"
                        >
                            {uploading ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <i className="fa-solid fa-camera text-xs"></i>
                            )}
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Click camera icon to change photo</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            {error}
                        </p>
                    </div>
                )}

                <div className="space-y-4">
                    {/* Display Name */}
                    <div>
                        <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Display Name</label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-3 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-xl font-bold text-gray-600 dark:text-gray-400">+91</span>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                    setPhoneNumber(value);
                                }}
                                className="flex-1 px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl font-semibold text-gray-800 dark:text-white focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all"
                                placeholder="10-digit number"
                                maxLength={10}
                            />
                        </div>
                        {phoneNumber && phoneNumber.length < 10 && (
                            <p className="text-xs text-orange-500 mt-1">Phone number must be 10 digits</p>
                        )}
                    </div>

                    {/* Email (Read Only) */}
                    <div>
                        <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Email</label>
                        <div className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-xl font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed">
                            {user?.email || 'No email'}
                            <span className="text-[10px] ml-2 opacity-60">(Read Only)</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 py-3 rounded-xl font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={loading || uploading}
                        className="flex-1 py-3 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading || uploading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                {uploading ? 'Uploading...' : 'Saving...'}
                            </>
                        ) : (
                            <>
                                <i className="fa-solid fa-check"></i>
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
