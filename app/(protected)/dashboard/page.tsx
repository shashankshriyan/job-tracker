'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { applicationService } from '@/lib/services/applicationService'
import { Application } from '@/types'

export default function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
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

  const stats = {
    total: applications.length,
    applied: applications.filter(a => a.status === 'applied').length,
    interview: applications.filter(a => a.status === 'interview').length,
    offer: applications.filter(a => a.status === 'offer').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  }

  const statCards = [
    { label: 'Total Applied', value: stats.total, color: 'bg-blue-50 text-blue-700' },
    { label: 'In Progress', value: stats.applied, color: 'bg-yellow-50 text-yellow-700' },
    { label: 'Interviews', value: stats.interview, color: 'bg-purple-50 text-purple-700' },
    { label: 'Offers', value: stats.offer, color: 'bg-green-50 text-green-700' },
    { label: 'Rejected', value: stats.rejected, color: 'bg-red-50 text-red-700' },
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
    
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Track your job applications</p>
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

      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-2xl p-4 text-center`}>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-xs font-medium mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

    
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Recent Applications</h2>
          <button
            onClick={() => router.push('/applications')}
            className="text-xs text-gray-500 hover:text-gray-900 transition-colors"
          >
            View all →
          </button>
        </div>

        {loading ? (
          <div className="py-16 text-center text-sm text-gray-400">Loading...</div>
        ) : applications.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-400 mb-4">No applications yet!</p>
            <button
              onClick={() => router.push('/add')}
              className="bg-gray-900 text-white text-sm px-4 py-2 rounded-xl hover:bg-gray-700 transition-all"
            >
              Add your first job
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {applications.slice(0, 5).map((app) => (
              <li key={app.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{app.company}</p>
                  <p className="text-xs text-gray-500">{app.role}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    app.status === 'applied' ? 'bg-yellow-50 text-yellow-700' :
                    app.status === 'interview' ? 'bg-purple-50 text-purple-700' :
                    app.status === 'offer' ? 'bg-green-50 text-green-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {app.status}
                  </span>
                  {app.jobUrl && (
                    <a href={app.jobUrl as string} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}