import { ZodError } from 'zod'

const catchZodError = <T, E>(fn: () => T, onError: (errorSummary: string) => E) => {
  try {
    return fn()
  } catch (error) {
    if (error instanceof ZodError) {
      return onError(error.errors.map((error) => `- ${error.path.join('.')}: ${error.message}`).join('\n'))
    }
    throw error
  }
}

export default catchZodError
