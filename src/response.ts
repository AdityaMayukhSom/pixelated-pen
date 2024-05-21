import { z } from 'zod'

export const ZodLoginResponse = z.object({
    type: z.string(),
    user: z.object({
        name: z.string(),
        username: z.string()
    })
})
