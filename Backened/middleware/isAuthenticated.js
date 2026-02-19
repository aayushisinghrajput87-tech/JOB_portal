import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        console.log("isAuthenticated: attempting to authenticate user");
        // support token from cookie, Authorization header (Bearer), or query param (for testing)
        const token = req.cookies?.token ||
            (req.headers.authorization ? req.headers.authorization.split(" ")[1] : null) ||
            req.query?.token || null;

        if (!token) {
            console.warn("isAuthenticated: no token provided");
            return res.status(401).json({ message: "User not authenticated", success: false });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            console.error("isAuthenticated: token verification failed", err.message);
            return res.status(401).json({ message: "Invalid or expired token", success: false });
        }

        // support different token payload shapes
        req.id = decoded.userId || decoded.id || decoded._id;
        console.log("isAuthenticated: user authenticated with id", req.id);
        next();
    } catch (error) {
        console.error("isAuthenticated: unexpected error", error);
        return res.status(401).json({ message: "Authentication failed", success: false });
    }
}

export default isAuthenticated;