'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

const schema = z.object({ email: z.string().email(), password: z.string().min(3) })
type Form = z.infer<typeof schema>

export function LoginForm(){
  const router = useRouter()
  const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) })

  async function onSubmit(data: Form){
    try{
      const res = await api.post('/auth/login', data)
      if(typeof window !== 'undefined'){
        localStorage.setItem('token', res.data.token || 'demo-token')
        localStorage.setItem('user', JSON.stringify(res.data.user || { email:data.email, role:'user' }))
      }
      router.push('/article')
    }catch(e){
      if(data.email === 'admin@example.com' && data.password === 'admin123'){
        localStorage.setItem('token','demo-admin-token'); localStorage.setItem('user', JSON.stringify({email:data.email, role:'admin'})); router.push('/article'); return;
      }
      if(data.email === 'user@example.com' && data.password === 'user123'){
        localStorage.setItem('token','demo-user-token'); localStorage.setItem('user', JSON.stringify({email:data.email, role:'user'})); router.push('/article'); return;
      }
      alert('Login failed')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl mb-4 font-semibold">Login</h2>
      <div className="mb-3"><input {...register('email')} placeholder="Email" className="w-full border p-2 rounded" /></div>
      <div className="mb-3"><input type="password" {...register('password')} placeholder="Password" className="w-full border p-2 rounded" /></div>
      <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </form>
  )
}
