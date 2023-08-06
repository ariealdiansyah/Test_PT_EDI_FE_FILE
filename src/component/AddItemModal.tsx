"use client";
import { useState } from 'react';
import { DataItem } from '@/component/type';

interface AddItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddItem: (item: DataItem) => void;
}

export default function AddItemModal({ isOpen, onClose, onAddItem }: AddItemModalProps) {
    const [formData, setFormData] = useState<DataItem>({
        id: 0,
        name: '',
        age: 0,
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newItem: DataItem = { ...formData, id: Date.now() };
        onAddItem(newItem);
        setFormData({ id: 0, name: '', age: 0 });
        onClose();
    };

    return isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-lg font-bold mb-2">Add New Item</h2>
                <form onSubmit={handleFormSubmit} className="mb-4">
                    <label className="block mb-2">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="border rounded px-4 py-2 mb-2"
                    />
                    <label className="block mb-2">Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleFormChange}
                        className="border rounded px-4 py-2 mb-2"
                    />
                    {/* <label className="block mb-2">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="border rounded px-4 py-2 mb-2"
                    /> */}
                    {/* <label className="block mb-2">Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleFormChange}
                        className="border rounded px-4 py-2 mb-2"
                    /> */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Add Item
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="ml-2 bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : null;
}
