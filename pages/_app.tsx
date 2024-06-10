import '/styles/globals.css';
import type {AppProps} from 'next/app';
import {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import NotificationPopup from '../components/NotificationPopup';

function MyApp({Component, pageProps}: AppProps) {
    const [newMessage, setNewMessage] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        const token = localStorage.getItem('token');
        if (token) {
            getLoggedUser(token).then(user => {
                setUser(user)
                const ws = new WebSocket('ws://localhost:5000');
                ws.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.type === 'newMessage' && data.userId == user._id) {
                        setNewMessage(data.message);
                    }
                };
                return () => ws.close();
            })
        }
    }, []);


    async function getLoggedUser(token: string) {
        const response = await fetch('http://localhost:5000/api/users/logged-user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            return response.json();
        } else {
            console.error('Failed to fetch user data');
            return null;
        }

    }

    return (
        <div>
            <Navbar loggedUser={user}/>
            <Component {...pageProps} />
            {newMessage && <NotificationPopup message={newMessage}/>}
        </div>
    );
}

export default MyApp;
