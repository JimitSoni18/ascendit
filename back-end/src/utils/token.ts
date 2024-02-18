import jwt, { JwtPayload } from "jsonwebtoken";

export interface IParsedToken extends JwtPayload {
	_id: string;
	iat: number;
	exp: number;
}

export function validateAndGetId(token: string): IParsedToken {
	return jwt.verify(token, process.env.JWT_SECRET) as IParsedToken;
}
