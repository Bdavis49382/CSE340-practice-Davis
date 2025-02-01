
export function injectScripts(req, res, next) {
    res.locals.scripts = [];

    if (res.locals.devMode) {
        res.locals.scripts.push(`
                <script>
                    const ws = new WebSocket(\`ws://\${location.hostname}:${parseInt(res.locals.port)+ 1}\`);
                    ws.onclose = () => {
                        setTimeout(() => location.reload(), 2000);
                    };
                </script>
            `);
    }
        
    next();
}

export function injectStyles(req, res, next) {
    res.locals.styles = [];
    res.locals.styles.push('<link rel="stylesheet" href="/css/main.css" />')

    next();
}