'use client'
import Link from 'next/link'
export function Sidebar(){
  return (
    <aside className="w-64 bg-white shadow p-4 h-screen">
      <h3 className="font-bold mb-4">Admin Panel</h3>
      <ul className="space-y-2">
        <li><Link href="/admin/article">Articles</Link></li>
        <li><Link href="/admin/category">Categories</Link></li>
      </ul>
    </aside>
  )
}
