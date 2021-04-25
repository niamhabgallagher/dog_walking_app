export interface User {
    forename: string;
    surname: string;
    email: string;
    password: string;
    confirmPass?: string;
    token?: string;
    documentId?: string;
    // dogs?: any[];
}