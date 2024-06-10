import { useState } from 'react';

const NotificationPopup = ({ message }: { message: string }) => {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="fixed top-16 right-4 bg-white p-4 shadow-lg rounded">
            <div className="flex justify-between items-center">
                <p>{message}</p>
                <button onClick={() => setIsOpen(false)} className="text-red-500 ml-4">X</button>
            </div>
        </div>
    );
};

export default NotificationPopup;
