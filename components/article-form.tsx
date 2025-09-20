'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import api from '@/lib/api'

const schema = z.object({
  title: z.string().min(3),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  category_id: z.number().int()
})

export function ArticleForm({ initial, onSuccess }:{ initial?:any, onSuccess?:(d:any)=>void }){
  const { register, handleSubmit, formState:{ errors, isSubmitting }, getValues } = useForm({
    resolver: zodResolver(schema as any),
    defaultValues: initial || { title:'', excerpt:'', content:'', category_id:1 }
  })
  const [previewHtml, setPreviewHtml] = React.useState<string|null>(null)
  const [showPreview, setShowPreview] = React.useState(false)

  async function onSubmit(data:any){
    try{
      const res = await api.post('/articles', data)
      onSuccess && onSuccess(res.data)
      alert('Saved')
    }catch(e:any){ alert('Failed') }
  }

  async function handlePreview(){
    const v = getValues()
    try{
      const res = await api.post('/articles/preview', v)
      setPreviewHtml(res.data.html || JSON.stringify(res.data))
    }catch(e){
      setPreviewHtml(`<h1>${v.title}</h1><p><em>${v.excerpt}</em></p><div>${v.content}</div>`)
    }
    setShowPreview(true)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div><label>Title</label><input {...register('title' as const)} className="w-full border p-2 rounded"/></div>
        <div><label>Excerpt</label><textarea {...register('excerpt' as const)} className="w-full border p-2 rounded"/></div>
        <div><label>Content</label><textarea {...register('content' as const)} rows={8} className="w-full border p-2 rounded"/></div>
        <div><label>Category ID</label><input type="number" {...register('category_id' as const, { valueAsNumber:true })} className="w-full border p-2 rounded"/></div>
        <div className="flex gap-2"><button type="button" onClick={handlePreview} className="px-3 py-2 border rounded">Preview</button><button type="submit" disabled={isSubmitting} className="px-3 py-2 bg-blue-600 text-white rounded">Save</button></div>
      </form>
      {showPreview && previewHtml && <div className="mt-4 border p-3 rounded bg-white"><h3 className="font-semibold">Preview</h3><div dangerouslySetInnerHTML={{ __html: previewHtml }} /><button onClick={()=>setShowPreview(false)} className="mt-2 px-3 py-1 border rounded">Close</button></div>}
    </div>
  )
}
