const jwt = require('jsonwebtoken');
const ReS = (res, status, message, data) => {
    const res_obj = {
        'status': status,
        'message': message,
        'data': data
    };
    res.status(status).json(res_obj);
};

const sendError = (res, status, message) => {
    res.status(status).json({ error: { status, message } });
};

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}
const verifyToken = (token) => {
    return jwt.decode(token)
}


module.exports = {
    ReS, sendError, generateOTP, generateToken, verifyToken
}