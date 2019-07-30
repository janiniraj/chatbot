export class Credential {
    constructor (
        public email: string,
        public password: string,
        public status: string,
        public user_name: string
    ){}
}

export class UserCredential {
    constructor (
        public email: string,
        public password: string,
        public status: string
    ){}
}