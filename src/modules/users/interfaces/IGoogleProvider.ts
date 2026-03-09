export interface IGoogleProvider {
    verifyToken(idToken: string): Promise<{
        email: string;
        name: string;
        email_verified: boolean;
        picture?: string  | null;
    }>;
}
