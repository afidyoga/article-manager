'use client'
export function CategoryTable({ categories }:{ categories:any[] }){
  return (
    <table className="w-full bg-white rounded shadow">
      <thead><tr className="bg-gray-100"><th className="p-2">ID</th><th className="p-2">Name</th><th className="p-2">Actions</th></tr></thead>
      <tbody>{categories.map(c=> <tr key={c.id} className="border-t"><td className="p-2">{c.id}</td><td className="p-2">{c.name}</td><td className="p-2">Edit | Delete</td></tr>)}</tbody>
    </table>
  )
}
