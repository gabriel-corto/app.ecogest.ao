import * as z from 'zod'

const nifRegex = /^\d{10}$/
const biRegex = /^\d{9}[A-Z]{2}\d{3}$/
const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/

export const signInSchema = z.object({
  email: z.string().regex(emailRegex, 'Email inválido'),
  password: z.string(),
})

export type SignInForm = z.infer<typeof signInSchema>

export const signUpSchema = z.object({
  nif: z.string().refine(val => biRegex.test(val) || nifRegex.test(val), {
    message: 'Informe um BI ou NIF válido',
  }),
  name: z.string().min(3, 'Nome inválido'),
  email: z.string().regex(emailRegex, 'Email inválido'),
  password: z.string().min(6, 'Palavra-passe inválida'),
})

export type SignUpForm = z.infer<typeof signUpSchema>
