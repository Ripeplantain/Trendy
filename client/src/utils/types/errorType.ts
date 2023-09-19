

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


export type { ServerError }