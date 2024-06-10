import { useState } from 'react';
import { useRouter } from 'next/router';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<'admin' | 'user'>('user');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const res = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, role }),
        });

        const data = await res.json();

        if (data.success) {
            localStorage.setItem('token', data.token);
            router.push('/');
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded">
                <h1 className="text-2xl mb-4">Register</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'admin' | 'user')}
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Register</button>
            </form>
        </div>
    );
};

export default Register;
