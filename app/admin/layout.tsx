import { Sidebar } from '@/components/sidebar'
 export default function AdminLayout({ children }:{ children: React.ReactNode }){ return (<div className="flex gap-6"><Sidebar /><div className="flex-1">{children}</div></div>) }
