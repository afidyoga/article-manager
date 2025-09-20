'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function Navbar(){
  const router = useRouter();
  function logout(){
    if(typeof window !== 'undefined'){ localStorage.removeItem('token'); localStorage.removeItem('user'); }
    router.push('/login');
  }
  return (
    <nav className="w-full bg-white shadow p-4 mb-6">
      <div className="container flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">Article Manager</Link>
        <div className="flex items-center gap-4">
          <Link href="/article" className="text-gray-700">Articles</Link>
          <Link href="/admin/article" className="text-gray-700">Admin</Link>
          <button onClick={logout} className="text-sm text-red-600">Logout</button>
        </div>
      </div>
    </nav>
  )
}
