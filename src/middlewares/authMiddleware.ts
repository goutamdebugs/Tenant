import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserFriendlyException } from "../dtos/common/UserFriendlyException";
import { JwtUtility } from "../shared/JwtUtility"; // Your JwtUtility import

export interface CustomJwtPayload extends JwtPayload {
    userId: number;
    tenantId: number;
    roles: string[];
}

export interface AuthRequest extends Request {
    user?: {
        userId: number;
        tenantId: number;
        roles: string[];
    };
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UserFriendlyException("Header is missing", 401);
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new UserFriendlyException("Token is missing", 401);
        }

        // Use your centralized JwtUtility to verify the token
        const decoded = JwtUtility.verifyToken(token) as CustomJwtPayload;

        if (!decoded || !decoded.userId || !decoded.tenantId) {
            throw new UserFriendlyException("Unauthorized user", 401);
        }

        req.user = {
            userId: decoded.userId,
            tenantId: decoded.tenantId,
            roles: decoded.roles || []
        };

        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            error: "Unauthorized: Invalid or missing token"
        });
        return;
    }
};