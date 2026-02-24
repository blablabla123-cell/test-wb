export function errorsMiddleware(error: any, req: any, res: any, next: any) {

    console.error("Express error:", error);
    console.error("Express error stack:", error.stack);
    console.error("Request path:", req.path);
    console.error("Request method:", req.method);

    // Don"t send error response if headers already sent
    if (res.headersSent) {
        return next(error);
    }

    // Check if this is an API request (starts with /api/)
    if (req.path && req.path.startsWith("/api/")) {
        // Return JSON error for API routes
        return res.status(500).json({
            success: false,
            error: error.message || "Внутренняя ошибка сервера",
            errorCode: error.code || "INTERNAL_SERVER_ERROR"
        });
    }

    // Return HTML error for web routes
    res.status(500).render("error", {
        errorMessage: "Внутренняя ошибка сервера"
    });
}