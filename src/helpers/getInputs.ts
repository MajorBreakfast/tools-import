import { z, ZodObject } from 'zod'
import * as core from '@actions/core'

const getInputs = <T extends ZodObject<any>>(schema: T): z.infer<T> => {
  return schema.parse(Object.fromEntries(Object.keys(schema.shape).map((key) => [key, core.getInput(key)])))
}

export default getInputs
