'use client'
import React, { useEffect, useState } from 'react'
import api from '@/lib/api'
import fetchWithFallback from '@/lib/fetchWithFallback'
import { CategoryTable } from './category-table'

export default function AdminCategoriesClient(){
  const [items, setItems] = useState<any[]>([])
  useEffect(()=>{ fetchData() }, [])
  async function fetchData(){
    try{
      const res = await api.get('/categories')
      setItems(res.data.data || res.data)
    }catch(e){
      setItems(await fetchWithFallback('/categories'))
    }
  }
  return <CategoryTable categories={items} />
}
