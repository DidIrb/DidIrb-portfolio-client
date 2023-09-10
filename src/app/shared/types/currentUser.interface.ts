export interface CurrentUserInterface {
    username: string;
    email: string;
    bio: string | null;
    image: string | null;
    // Tokens
    accessToken: string;
    refreshToken: string;
}