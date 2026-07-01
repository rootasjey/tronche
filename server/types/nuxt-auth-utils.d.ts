declare module '#auth-utils' {
  interface User {
    id: number
    email: string
    name: string
    role: 'user' | 'admin'
    is_active: boolean
    email_verified: boolean
    created_at: string
  }
}

export {}
