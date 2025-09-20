'use client'
import React, { useEffect, useState } from 'react'
import api from '@/lib/api'
import fetchWithFallback from '@/lib/fetchWithFallback'
import ArticleCard from './ui/article-card'
import useDebounce from '@/hooks/useDebounce'
import { Pagination } from './pagination'

export default function ArticleListClient(){
  const [q, setQ] = useState('')
  const debQ = useDebounce(q, 400)
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)

  useEffect(()=>{ fetchData() }, [debQ, page])

  async function fetchData(){
    try{
      const res = await api.get('/articles', { params: { q: debQ, page } })
      const data = res.data.data || res.data || []
      setItems(data)
      setTotalPages(res.data.meta?.last_page || 1)
    }catch(e){
      const data = await fetchWithFallback('/articles')
      setItems(data)
      setTotalPages(1)
    }
  }

  return (
    <div>
      <div className="mb-4 flex gap-3">
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search articles..." className="border p-2 rounded flex-1" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(a=> <ArticleCard key={a.id} {...a} />)}
      </div>
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  )
}
