// DataView.tsx
import React, { useState } from 'react';
import { DataItem } from '@/component/type';
import DetailModal from '@/component/DetailModal';

interface DataViewProps {
    data: DataItem[];
}

const DataView: React.FC<DataViewProps> = ({ data }) => {
    const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);

    const handleColumnClick = (item: DataItem) => {
        setSelectedItem(item);
    };

    const handleModalClose = () => {
        setSelectedItem(null);
    };

    return (
        <div className="p-4">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Age</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} onClick={() => handleColumnClick(item)} className="cursor-pointer">
                            <td className="border px-4 py-2">{item.name}</td>
                            <td className="border px-4 py-2">{item.age}</td>
                            <td className="border px-4 py-2">
                                <button className="text-blue-500 hover:text-blue-700">Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedItem && <DetailModal item={selectedItem} onClose={handleModalClose} />}
        </div>
    );
};

export default DataView;
