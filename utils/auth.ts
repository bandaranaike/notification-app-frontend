// utils/auth.ts
import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: string;
    name: string;
    email: string;
}

export const getUserFromToken = (token: string | undefined): JwtPayload | null => {
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        return decoded;
    } catch (error) {
        console.error('Invalid token', error);
        return null;
    }
};
