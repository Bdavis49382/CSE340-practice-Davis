const requestLogger = (req, res, next) => {
    const start = Date.now();
    const originalEnd = res.end;
    const originalRender = res.render;

    console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.url} - Started`);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Query:', req.query);
    console.log('Body:', req.body);

    // Track render calls
    res.render = function(...args) {
        console.log(`\nRender called with view: ${args[0]}`);
        console.log('Render options:', JSON.stringify(args[1], null, 2));
        return originalRender.apply(this, args);
    };

    // Track response completion
    res.end = function(...args) {
        const duration = Date.now() - start;
        console.log(`\nResponse ended:`);
        console.log(`Status: ${res.statusCode}`);
        console.log(`Duration: ${duration}ms`);
        console.log('Headers sent:', res.getHeaders());
        return originalEnd.apply(this, args);
    };

    console.log('\nMiddleware chain continuing...\n');
    next();
};

export default requestLogger;