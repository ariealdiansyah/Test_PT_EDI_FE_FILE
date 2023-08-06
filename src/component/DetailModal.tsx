// DetailModal.tsx
import React from 'react';
import { DataItem } from '@/component/type';

interface DetailModalProps {
    item: DataItem;
    onClose: () => void;
}

export default function DetailModal({ item, onClose }: DetailModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-lg font-bold mb-2">{item.name}</h2>
                <p>Age: {item.age}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}
