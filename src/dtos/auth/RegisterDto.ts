export interface RegisterDto {

    // Tenant

    companyName: string;
    companyDisplayName: string;

    // User

    firstName: string;
    lastName: string;

    username: string;

    email: string;

    password: string;

    roleId:number;
}