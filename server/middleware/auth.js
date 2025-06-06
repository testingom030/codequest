import jwt from "jsonwebtoken"

const auth=(req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No authentication token provided" });
        }
        let decodedata = jwt.verify(token, process.env.JWT_SECRET);
        req.userid = decodedata?.id;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ message: "Authentication failed", error: error.message });
    }
}
export default auth;