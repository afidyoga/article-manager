import ArticleDetailClient from '@/components/article-detail-client'
 export default function ArticleDetailPage({ params }:{ params:{ id:string } }){ return <ArticleDetailClient id={params.id}/> }
