import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ message: "No authentication token provided" });
        }

        const decodedata = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decodedata?.id && !decodedata?.email) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        req.userId = decodedata.id;
        req.userEmail = decodedata.email;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }
        return res.status(401).json({ message: "Authentication failed", error: error.message });
    }
}
export default auth;