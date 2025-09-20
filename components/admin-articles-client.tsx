'use client'
import React, { useEffect, useState } from 'react'
import api from '@/lib/api'
import fetchWithFallback from '@/lib/fetchWithFallback'
import { ArticleTable } from './article-table'

export default function AdminArticlesClient(){
  const [items, setItems] = useState<any[]>([])
  useEffect(()=>{ fetchData() }, [])
  async function fetchData(){
    try{
      const res = await api.get('/articles')
      setItems(res.data.data || res.data)
    }catch(e){
      setItems(await fetchWithFallback('/articles'))
    }
  }
  return <ArticleTable articles={items} />
}
