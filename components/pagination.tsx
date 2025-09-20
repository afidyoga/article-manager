'use client'
export function Pagination({ page, totalPages, onChange }:{ page:number, totalPages:number, onChange:(p:number)=>void }){
  return (
    <div className="flex items-center gap-2 mt-4">
      <button disabled={page<=1} onClick={()=>onChange(page-1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
      <span>{page} / {totalPages}</span>
      <button disabled={page>=totalPages} onClick={()=>onChange(page+1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
    </div>
  )
}
