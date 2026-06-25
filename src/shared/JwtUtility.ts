import jwt from "jsonwebtoken";

export class JwtUtility {
  
  private static readonly EXPIRES_IN = "1d";


  private static readonly SECRET = (() => {
    if (!process.env.JWT_SECRET) {
      console.warn(" WARNING: JWT_SECRET is missing in environment variables. Falling back to the default secret.");
      return "goutam"; 
    }
    return process.env.JWT_SECRET;
  })();

  public static generateToken(payload: { userId: number; tenantId: number, roles: string[] }): string {
    return jwt.sign(payload, this.SECRET, { expiresIn: this.EXPIRES_IN });
  }

  public static verifyToken(token: string): any {
    return jwt.verify(token, this.SECRET);
  }
}