'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { applicationService } from '@/lib/services/applicationService'
import { Application, ApplicationStatus } from '@/types'

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<ApplicationStatus | 'all'>('all')
    const router = useRouter()

    useEffect(() => {
        fetchApplications()
    }, [])

    async function fetchApplications() {
        setLoading(true)
        const data = await applicationService.getAll()
        setApplications(Array.isArray(data?.data) ? data.data : [])
        setLoading(false)
    }

    async function handleDelete(id: string) {
        await applicationService.delete(id)
        fetchApplications()
    }

    async function handleStatusChange(id: string, status: string) {
        await applicationService.updateStatus(id, status)
        fetchApplications()
    }

    const filtered = filter === 'all'
        ? applications
        : applications.filter(a => a.status === filter)

    const filters: { label: string; value: ApplicationStatus | 'all' }[] = [
        { label: 'All', value: 'all' },
        { label: 'Applied', value: 'applied' },
        { label: 'Interview', value: 'interview' },
        { label: 'Offer', value: 'offer' },
        { label: 'Rejected', value: 'rejected' },
    ]

    return (
        <div className="max-w-5xl mx-auto px-6 py-8">
  
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Applications</h1>
                    <p className="text-sm text-gray-500 mt-1">{applications.length} total applications</p>
                </div>
                <button
                    onClick={() => router.push('/add')}
                    className="flex items-center gap-1.5 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-gray-700 transition-all"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Job
                </button>
            </div>

      
            <div className="flex gap-2 mb-6 flex-wrap">
                {filters.map((f) => (
                    <button
                        key={f.value}
                        onClick={() => setFilter(f.value)}
                        className={`px-4 py-1.5 text-sm rounded-xl font-medium transition-all ${filter === f.value
                                ? 'bg-gray-900 text-white'
                                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

        
            {loading ? (
                <div className="py-16 text-center text-sm text-gray-400">Loading...</div>
            ) : filtered.length === 0 ? (
                <div className="py-16 text-center">
                    <p className="text-sm text-gray-400">No applications found!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filtered.map((app) => (
                        <div
                            key={app.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4"
                        >
                            <div className="flex items-start justify-between">
                              
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <p className="text-sm font-semibold text-gray-900">{app.company}</p>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${app.status === 'applied' ? 'bg-yellow-50 text-yellow-700' :
                                                app.status === 'interview' ? 'bg-purple-50 text-purple-700' :
                                                    app.status === 'offer' ? 'bg-green-50 text-green-700' :
                                                        'bg-red-50 text-red-700'
                                            }`}>
                                            {app.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">{app.role}</p>
                                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                                        {app.source && (
                                            <span className="text-xs text-gray-400">📌 {app.source}</span>
                                        )}
                                        {app.salary && (
                                            <span className="text-xs text-gray-400">💰 {app.salary}</span>
                                        )}
                                        {app.jobUrl && (<a

                                            href={app.jobUrl as string}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-blue-500 hover:text-blue-700 transition-colors">

                                            🔗 View Job
                                        </a>
                                        )}
                                    </div>
                                    {app.notes && (
                                        <p className="text-xs text-gray-400 mt-2">{app.notes}</p>
                                    )}
                                </div>

                             
                                <div className="flex items-center gap-2 ml-4 shrink-0">
                                 
                                    <select
                                        value={app.status}
                                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                        className="text-xs border border-gray-200 rounded-lg mr-4 px-2 py-1.5 outline-none focus:ring-2 focus:ring-gray-900 bg-white text-gray-700"
                                    >
                                        <option value="applied">Applied</option>
                                        <option value="interview">Interview</option>
                                        <option value="offer">Offer</option>
                                        <option value="rejected">Rejected</option>
                                    </select>

                                    <button
                                        onClick={() => router.push(`/add?id=${app.id}`)}
                                        className="text-gray-400 hover:text-blue-600 transition-colors p-1.5 rounded-lg hover:bg-blue-50"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(app.id)}
                                        className="text-gray-400 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}