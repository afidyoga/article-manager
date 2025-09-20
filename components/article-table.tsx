'use client'
export function ArticleTable({ articles }:{ articles:any[] }){
  return (
    <table className="w-full bg-white rounded shadow">
      <thead><tr className="bg-gray-100"><th className="p-2">ID</th><th className="p-2">Title</th><th className="p-2">Category</th><th className="p-2">Date</th><th className="p-2">Actions</th></tr></thead>
      <tbody>{articles.map(a=> <tr key={a.id} className="border-t"><td className="p-2">{a.id}</td><td className="p-2">{a.title}</td><td className="p-2">{a.category?.name || a.category}</td><td className="p-2">{a.created_at}</td><td className="p-2">Edit | Delete</td></tr>)}</tbody>
    </table>
  )
}
