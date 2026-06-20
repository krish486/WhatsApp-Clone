const zodValidatorMiddleware = () => {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                errors: err.errors
            })
        }
    }
}


module.exports = zodValidatorMiddleware