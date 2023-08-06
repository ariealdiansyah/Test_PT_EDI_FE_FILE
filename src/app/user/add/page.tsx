"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { DataItem } from '@/component/type';
import Select from 'react-select';

export default function AddItemModal() {
    const router = useRouter();
    const [formData, setFormData] = useState<DataItem>({
        user_id: '',
        username: '',
        password: '',
        name: '',
        status: null,
    });

    const statusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
    ];

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleStatusChange = (selectedOption: any) => {
        setFormData((prevData) => ({ ...prevData, status: selectedOption }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8090/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                // Handle error response here
                console.error('Error adding data:', response.statusText);
                return;
            }

            // Data successfully added
            router.push('/user');
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    return (
        <section className="bg-global-image flex min-h-screen flex-col items-center justify-center p-24 w-full">
            <div className="p-4">
                <h1 className="text-3xl font-bold mb-4">Add Data</h1>
                <form onSubmit={handleFormSubmit} className="mb-4">
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2">
                            Username:
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleFormChange}
                            className="border rounded px-4 py-2 w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleFormChange}
                            className="border rounded px-4 py-2 w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="fullName" className="block mb-2">
                            Full Name:
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.name}
                            onChange={handleFormChange}
                            className="border rounded px-4 py-2 w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="status" className="block mb-2">
                            Status:
                        </label>
                        <Select
                            name="status"
                            value={formData.status}
                            options={statusOptions}
                            onChange={handleStatusChange}
                            className="w-full"
                            classNamePrefix="react-select"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
}