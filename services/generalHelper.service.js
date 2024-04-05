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

module.exports = {
    ReS, sendError
}