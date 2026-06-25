export interface CreateUserDto {
  tenantId: number;
  name: string;
  surname?: string;
  email: string;
  password: string;
  createdBy?: number;
}