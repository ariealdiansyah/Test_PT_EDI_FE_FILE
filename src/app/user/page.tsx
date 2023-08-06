"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DataItem } from '@/component/type';
import { TrashIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/solid'

export default function User() {
    const [data, setData] = useState<DataItem[]>([]);

    const handleDeleteItem = async (data: DataItem) => {
        try {
            const response = await fetch(`http://localhost:8090/user/`, {
                method: 'DELETE',
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                console.error('Error deleting item:', response.statusText);
                return;
            }

            setData((prevData) => prevData.filter((x) => x.user_id !== data.user_id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    useEffect(() => {
        // setData([{ id: 1, username: 'Aldi', password: '', name: '17', status: '' }])
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:8090/user`);
                if (!res.ok) {
                    throw new Error('Cannot Get Data')
                }
                const data: DataItem[] = await res.json()
                setData(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData()

        console.log(data)
    }, []);


    return (
        <section className="bg-global-image flex min-h-screen flex-col items-center justify-center p-24 w-full">
            <div className="bg-white p-4 rounded shadow-md w-full">
                <Link href="/user/add">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                        Add Item
                    </button>
                </Link>
                {data && data.length > 0 ? <table className="w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Username</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.user_id} className="cursor-pointer">
                                <td className="border px-4 py-2">{item.name} || {item.user_id}</td>
                                <td className="border px-4 py-2">{item.username}</td>
                                <td className="border px-4 py-2">{item.status}</td>
                                <td className="flex no-wrap border px-4 py-2">
                                    <Link href={`/user/${item.user_id}`} key={item.user_id}>
                                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4'>
                                            <EyeIcon className='h-5 w-5 text-primary-400 ' fill='currentColor' stroke='currentColor' />
                                        </button>
                                    </Link>
                                    <Link href={`/user/update/${item.user_id}`} key={item.user_id}>
                                        <button className='bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4'>
                                            <PencilIcon className='h-5 w-5 text-primary-400 ' fill='currentColor' stroke='currentColor' />
                                        </button>
                                    </Link>
                                    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={() => handleDeleteItem(item)}>
                                        <TrashIcon className='h-5 w-5 text-warning-400' fill='currentColor' stroke='currentColor' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> : <span>Data Tidak Ada</span>}
            </div>
        </section>
    );
}