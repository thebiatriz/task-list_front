export class AuthUser {
    constructor(
        public id: number,
        public name: string
    ) { }
}

export class AuthResponse {
    constructor(
        public sucess: string,
        public message: string,
        public user: AuthUser,
        public token: string,
    ) { }
}

export class AuthRequest {
    constructor(
        public email: string,
        public password: string,
    ) { }
}