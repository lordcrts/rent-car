export interface Login {
    username?:string;
    password?:string;
    client_id?:string;
    grant_type?:string;
    access_token?: string;
    expires_in?: number;
    token_type?: string;
    scope?: string;
    refresh_token?: string;
    first_name?:string;
    email?:string;
    idToken?:string;
}