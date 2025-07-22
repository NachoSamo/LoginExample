const jwt = require('jsonwebtoken');


exports.routeProtected = (req, res, next) => {
    const tokenHeader = req.header('Authorization');

    if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
        return res.status(401).json({msg:'Token does not exists'})
    };
    
    const token = tokenHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.user
        next();

    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};