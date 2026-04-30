import { apiFetch } from '@/lib/api'
import { ApplicationInput } from '@/types'

export const applicationService = {
  async getAll() {
    const res = await apiFetch('/api/applications')
    return res?.json()
  },

  async create(data: ApplicationInput) {
    const res = await apiFetch('/api/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return res?.json()
  },

  async updateStatus(id: string, status: string) {
    const res = await apiFetch('/api/applications', {
      method: 'PATCH',
      body: JSON.stringify({ id, status }),
    })
    return res?.json()
  },

  async delete(id: string) {
    const res = await apiFetch('/api/applications', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    })
    return res?.json()
  },

  async getById(id: string) {
  const res = await apiFetch(`/api/applications/${id}`)
  return res?.json()
},

async update(id: string, data: ApplicationInput) {
  const res = await apiFetch('/api/applications', {
    method: 'PATCH',
    body: JSON.stringify({ id, ...data }),
  })
  return res?.json()
},
}

