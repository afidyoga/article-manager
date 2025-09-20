'use client'
import React, { useEffect, useState } from 'react'
import api from '@/lib/api'
import fetchWithFallback from '@/lib/fetchWithFallback'
import ArticleCard from './ui/article-card'

export default function ArticleDetailClient({ id }:{ id:string }){
  const [article, setArticle] = useState<any>(null)
  const [others, setOthers] = useState<any[]>([])

  useEffect(()=>{ fetchData() }, [id])

  async function fetchData(){
    try{
      const res = await api.get(`/articles/${id}`)
      setArticle(res.data)
      if(res.data?.category?.id){
        const same = await api.get('/articles', { params:{ category: res.data.category.id } })
        setOthers((same.data.data || same.data).filter((a:any)=>a.id !== res.data.id).slice(0,3))
      }
    }catch(e){
      const data = await fetchWithFallback('/articles')
      const found = data.find((a:any)=>String(a.id)===String(id))
      setArticle(found)
      setOthers(data.filter((a:any)=>a.category_id === found?.category_id && a.id !== found.id).slice(0,3))
    }
  }

  if(!article) return <div>Loading...</div>
  return (
    <div className="space-y-6">
      <article className="bg-white p-6 rounded-xl">
        <div className="text-sm text-blue-600">{article.category?.name}</div>
        <h1 className="text-2xl font-bold">{article.title}</h1>
        <div className="mt-4 text-gray-700">{article.content}</div>
      </article>
      <section>
        <h3 className="font-semibold mb-3">Other articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {others.map(o=> <ArticleCard key={o.id} {...o} />)}
        </div>
      </section>
    </div>
  )
}
