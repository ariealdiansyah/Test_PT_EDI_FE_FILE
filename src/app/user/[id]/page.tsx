"use client";
import { useEffect, useState } from 'react';
import { DataItem } from '@/component/type';
import Link from 'next/link';

export async function generateStaticParams() {
    const posts = await fetch('http://localhost:8090/user').then((res) => res.json())

    return posts.map((post: { user_id: any; }) => ({
        id: post.user_id,
    }))
}

export default function UserDetail({ params }: { params: { id: string } }) {
    const [item, setItem] = useState<DataItem | null>(null);
    const [itemId, setItemId] = useState<any>(null);

    useEffect(() => {
        setItemId(params.id)
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8090/user/${itemId}`);
                if (!response.ok) {
                    throw new Error('Data not found');
                }

                const data: DataItem = await response.json();
                setItem(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [itemId]);

    if (!item) {
        // Loading state or data not found handling
        return <section className="bg-global-image flex min-h-screen flex-col items-center justify-center p-24 w-full">
            <div>Loading...</div>
        </section>;
    }

    return (
        <section className="bg-global-image flex min-h-screen flex-col items-center justify-center p-24 w-full">
            <div className="p-4">
                <h1 className="text-3xl font-bold mb-4">User Details</h1>
                <div>
                    <p>
                        <strong>Username:</strong> {item.username}
                    </p>
                    <p>
                        <strong>Fullname:</strong> {item.name}
                    </p>
                    <p>
                        <strong>Status:</strong> {item.status}
                    </p>
                </div>
                <Link href="/">
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        Back to Data View
                    </a>
                </Link>
            </div>
        </section>

    );
};