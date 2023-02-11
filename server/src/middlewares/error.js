export const handleError = (error, req, res, nex) => {
    res.json({
        error: error.message
    })
} 