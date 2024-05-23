import { z } from 'zod'

export const ZodLoginResponse = z.object({
    type: z.string(),
    user: z.object({
        name: z.string(),
        username: z.string()
    })
})

export const ZodAuthenticatedResponse = z.object({
    type: z.string(),
    authenticated: z
        .boolean()
        .describe(
            'true if the user is actually authenticated, and must contain a user object, if false, the user object may not be present and the user is not authenticated.'
        )
        .readonly()
        .catch(false),
    user: z.object({
        name: z.string(),
        username: z.string()
    })
})
