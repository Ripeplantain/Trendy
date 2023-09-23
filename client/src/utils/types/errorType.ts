

interface ServerError {
    code: string
    message: string
    name: string
    response: {
        data: {
            detail: string
        }
    }
    status: number
}

interface AuthError {
    code: string
    message: string
    name: string
    response: {
        data: {
            error: string
        }
    }
    status: number
}


export type { ServerError, AuthError }