import React, { useState, useEffect, useRef } from 'react';

interface DraggableProps {
    children: React.ReactNode;
    initialPosition?: { x: number; y: number };
    className?: string;
}

const Draggable: React.FC<DraggableProps> = ({ children, initialPosition = { x: 0, y: 0 }, className = '' }) => {
    const [position, setPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        // Prevent default to stop scrolling while dragging, but allow click events to pass through if not moving
        // e.preventDefault(); // Don't prevent default immediately to allow clicks

        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

        setIsDragging(true);
        setDragStart({
            x: clientX - position.x,
            y: clientY - position.y
        });
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent | TouchEvent) => {
            if (!isDragging) return;

            e.preventDefault(); // Prevent scrolling while dragging

            const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

            setPosition({
                x: clientX - dragStart.x,
                y: clientY - dragStart.y
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove, { passive: false });
            window.addEventListener('touchmove', handleMouseMove, { passive: false });
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchend', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging, dragStart]);

    return (
        <div
            ref={ref}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                cursor: isDragging ? 'grabbing' : 'grab',
                touchAction: 'none', // Crucial for touch dragging
                position: 'fixed', // Should be fixed relative to viewport usually for floating items
                zIndex: 100
            }}
            className={className}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            {children}
        </div>
    );
};

export default Draggable;
