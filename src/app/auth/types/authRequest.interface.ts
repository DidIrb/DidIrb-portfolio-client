export interface RegisterRequestInterface {
    userData: {
        email: string
        password: string
        username: string
    }
}

export interface SigninRequestInterface {
    userData: {
        username: string
        password: string
    }
}