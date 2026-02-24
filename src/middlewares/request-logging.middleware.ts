export function requestLoggingMiddleware(req: any, _: any, next: any) {
        console.log(`--------------------------------`);
        console.log(`${req.method} ${req.url}`);
        if(req.body) {
            console.log("Body:", req.body);
        }
        console.log(`--------------------------------`);
    next();
}