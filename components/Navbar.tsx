import {useEffect, useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

const Navbar = ({loggedUser}: { loggedUser: User | null }) => {
    const [notifications, setNotifications] = useState<number>(0);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in
        if (loggedUser) {
            setUser(loggedUser)
            if (loggedUser.messages)
                setNotifications(loggedUser.messages.length)
        }

    }, [loggedUser]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    return (
        <nav className="flex justify-between p-4 bg-gray-800 text-white">
            <div className="text-lg font-bold">
                <Link href="/">Logo</Link>
            </div>
            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <span>{user.username}</span>
                        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
                    </>
                ) : (
                    <Link href="/login">Login</Link>
                )}
                <div className="relative">
                    <Link href="/notifications">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a7.002 7.002 0 00-5-6.708V4a3 3 0 10-6 0v.292A7.002 7.002 0 002 11v3.159c0 .538-.214 1.055-.595 1.438L0 17h5m10 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                        </svg>
                    </Link>
                    {notifications > 0 && (
                        <div
                            className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                            {notifications}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
