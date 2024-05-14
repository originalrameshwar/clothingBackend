import jwt from 'jsonwebtoken';

export function generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '100d' });
}

// Middleware function to verify JWT token
export function verifyToken(req, res, next) {
    // console.log(req.header)
    // next();

    const token = req.cookies.token;
    if (token === undefined) {
        console.log("undefined token")
        response.send("undefined token")
    }

    // Check if token exists
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Missing token' });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
        }
        // Attach user ID to request object for further processing
        req.userId = decoded.userId;
        next();
    });
}

// Middleware function to authorize admin access
export function authorizeAdmin(req, res, next) {
    const userId = req.userId;

    // Check if user is admin
    // Assuming you have a User model with an 'isAdmin' field
    User.findById(userId)
        .then(user => {
            if (!user || !user.isAdmin) {
                return res.status(403).json({ success: false, message: 'Forbidden: Insufficient permissions' });
            }
            next(); // User is admin, continue to next middleware/route
        })
        .catch(err => {
            console.error('Error authorizing admin:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        });
}

// Middleware function to authorize user access to their own resource
export function authorizeUser(req, res, next) {
    const userId = req.userId;
    const resourceId = req.params.userId;

    // Check if user ID matches resource ID
    if (userId !== resourceId) {
        return res.status(403).json({ success: false, message: 'Forbidden: Insufficient permissions' });
    }
    next(); // User is authorized, continue to next middleware/route
}
