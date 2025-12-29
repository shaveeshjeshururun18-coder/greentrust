import React, { useState, useEffect } from 'react';

interface FilterOption {
    id: string;
    label: string;
    count?: number; // Optional count
}

interface FilterSection {
    id: string;
    label: string;
    options: FilterOption[];
}

interface MobileFilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    sections: FilterSection[];
    selectedFilters: { [sectionId: string]: string[] }; // Map section ID to array of selected option IDs
    onApply: (selected: { [sectionId: string]: string[] }) => void;
    onClear: () => void;
}

const MobileFilterModal: React.FC<MobileFilterModalProps> = ({
    isOpen,
    onClose,
    sections,
    selectedFilters,
    onApply,
    onClear
}) => {
    const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id);
    const [tempSelected, setTempSelected] = useState(selectedFilters);

    // Sync when opening
    useEffect(() => {
        if (isOpen) {
            setTempSelected(selectedFilters);
            setActiveSectionId(sections[0]?.id);
        }
    }, [isOpen, selectedFilters, sections]);

    if (!isOpen) return null;

    const handleToggleOption = (sectionId: string, optionId: string) => {
        setTempSelected(prev => {
            const currentSectionSelected = prev[sectionId] || [];
            const isSelected = currentSectionSelected.includes(optionId);

            let newSectionSelected;
            if (isSelected) {
                newSectionSelected = currentSectionSelected.filter(id => id !== optionId);
            } else {
                newSectionSelected = [...currentSectionSelected, optionId];
            }

            return {
                ...prev,
                [sectionId]: newSectionSelected
            };
        });
    };

    const activeSection = sections.find(s => s.id === activeSectionId);

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center md:hidden">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose}></div>

            {/* Modal Content */}
            <div className="relative w-full h-[80vh] bg-white rounded-t-3xl flex flex-col overflow-hidden animate-slideUpModal shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-black text-gray-800 tracking-tight">Filters</h2>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Body: Split View */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Left Sidebar: Sections */}
                    <div className="w-1/3 bg-gray-50 border-r border-gray-100 overflow-y-auto no-scrollbar">
                        {sections.map(section => {
                            const count = tempSelected[section.id]?.length || 0;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSectionId(section.id)}
                                    className={`w-full text-left px-4 py-5 text-xs font-bold uppercase tracking-wider transition-all relative
                    ${activeSectionId === section.id ? 'bg-white text-green-700' : 'text-gray-400 hover:bg-gray-100'}`}
                                >
                                    {activeSectionId === section.id && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-600"></div>
                                    )}
                                    {section.label}
                                    {count > 0 && (
                                        <span className="ml-2 bg-green-600 text-white text-[9px] px-1.5 py-0.5 rounded-full">{count}</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Content: Options */}
                    <div className="flex-1 bg-white overflow-y-auto p-6">
                        {activeSection ? (
                            <div className="space-y-4">
                                {activeSection.options.map(option => {
                                    const isChecked = tempSelected[activeSectionId]?.includes(option.id);
                                    return (
                                        <label key={option.id} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${isChecked ? 'bg-green-600 border-green-600' : 'border-gray-300 group-hover:border-green-400'}`}>
                                                {isChecked && <i className="fa-solid fa-check text-white text-xs"></i>}
                                            </div>
                                            <span className={`text-sm font-bold ${isChecked ? 'text-gray-900' : 'text-gray-500'}`}>
                                                {option.label} {option.count !== undefined && <span className="text-gray-300 font-medium">({option.count})</span>}
                                            </span>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={!!isChecked}
                                                onChange={() => handleToggleOption(activeSectionId, option.id)}
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-300 text-sm font-bold uppercase tracking-wider">Select a category</div>
                        )}
                    </div>
                </div>

                {/* Footer: Actions */}
                <div className="px-6 py-4 border-t border-gray-100 grid grid-cols-2 gap-4 bg-white z-10">
                    <button
                        onClick={onClear}
                        className="w-full py-3 rounded-xl border-2 border-slate-200 text-slate-500 font-black text-sm uppercase tracking-wide hover:border-slate-300 transition-colors"
                    >
                        Clear Filter
                    </button>
                    <button
                        onClick={() => onApply(tempSelected)}
                        className="w-full py-3 rounded-xl bg-green-600 text-white font-black text-sm uppercase tracking-wide shadow-lg shadow-green-200 active:scale-95 transition-all"
                    >
                        Apply
                    </button>
                </div>

            </div>
        </div>
    );
};

export default MobileFilterModal;
