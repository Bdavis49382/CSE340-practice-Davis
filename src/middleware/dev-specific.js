export default function handleDev(req, res, next) {
    res.locals.devMode = process.env.MODE.includes('dev');
    res.locals.devMessage = "You are in Development mode.";
    res.locals.port = process.env.PORT || 3000;
    next();
}