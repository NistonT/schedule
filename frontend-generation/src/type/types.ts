import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
	user_id: string;
}
