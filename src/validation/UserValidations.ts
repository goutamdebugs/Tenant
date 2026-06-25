import { CreateUserDto } from "../dtos/user/CreateUserDto";

export class UserValidator {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  public static validateSignUp(data: CreateUserDto & { tenantId?: number }): void {
    const { name, email, password, tenantId } = data;

    // 1. Presence Validation
    if (!name || !email || !password || !tenantId) {
      throw new Error("Name, email, password, and tenantId are required");
    }

    // 2. Email Format Validation
    if (!this.EMAIL_REGEX.test(email)) {
      throw new Error("Invalid email format");
    }

    // 3. Password Strength Validation (Min 6 chars example)
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
  }
}