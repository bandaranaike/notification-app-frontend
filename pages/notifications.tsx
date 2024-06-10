import { useEffect, useState } from 'react';
import NotificationPopup from '../components/NotificationPopup';

interface User {
    id: string;
    _id: string;
    role: string;
    username: string;
}

const Notifications = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>('');
    const [messageText, setMessageText] = useState<string>('');

    useEffect(() => {
        const fetchMessages = async () => {
            const res = await fetch('http://localhost:5000/api/users/messages', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await res.json();
            setMessages(data);
        };

        const fetchUsers = async () => {
            const res = await fetch('http://localhost:5000/api/users/all-users', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await res.json();
            setUsers(data);
        };

        fetchMessages();
        fetchUsers();
    }, []);

    useEffect(() => {

    }, []);

    const handleSendMessage = async () => {
        if (selectedUser && messageText) {
            await fetch('http://localhost:5000/api/users/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ userId: selectedUser, message: messageText }),
            });
            setMessageText('');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Notifications</h1>

            {messages.length > 0 ? (
                <ul>
                    {messages.map((message, index) => (
                        <li key={index} className="mb-2 p-2 border-b">{message}</li>
                    ))}
                </ul>
            ) : (
                <p>No messages available</p>
            )}

            <div className="mt-4">
                <h2 className="text-xl mb-2">Send a Message</h2>
                <select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    className="mb-2 p-2 border"
                >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.username}
                        </option>
                    ))}
                </select>
                <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="mb-2 p-2 border w-full"
                    placeholder="Enter your message"
                />
                <button
                    onClick={handleSendMessage}
                    className="p-2 bg-blue-500 text-white"
                >
                    Send Message
                </button>
            </div>
        </div>
    );
};

export default Notifications;
