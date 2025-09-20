import Link from 'next/link'
export default function ArticleCard({ id, title, excerpt, category, created_at, date }){
  return (
    <div className="border rounded-xl p-4 bg-white">
      <div className="text-sm text-blue-600 font-medium">{category?.name || category}</div>
      <h3 className="text-lg font-bold mt-2"><Link href={`/article/${id}`}>{title}</Link></h3>
      <p className="text-sm text-gray-600 mt-2">{excerpt}</p>
      <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
        <span>{created_at || date}</span>
        <Link href={`/article/${id}`} className="text-blue-600 hover:underline">Read more →</Link>
      </div>
    </div>
  )
}
