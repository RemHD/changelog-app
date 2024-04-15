import type { ChangelogInterface } from '@/utils/interfaces'
import axios from 'axios'

const baseUrl = 'http://localhost:3000'

export const changelogService = {
  async getAllChangelogs(lastChangelogId?: number) {
    try {
      let url = `${baseUrl}/changelogs`
      if (lastChangelogId) {
        url += `?lastId=${lastChangelogId}`
      }
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      console.error('Cannot retrieve all changelogs:', error)
      return []
    }
  },

  async getHiddenChangelogs() {
    try {
      const response = await axios.get(`${baseUrl}/changelogs?is_hidden=true`)
      return response.data
    } catch (error) {
      console.error('Cannot retrieve all hidden changelogs:', error)
    }
  },

  async getChangelogById(changelogId: number) {
    try {
      const response = await axios.get(`${baseUrl}/changelogs/${changelogId}`)
      return response.data
    } catch (error) {
      console.error('Cannot retrieve specific changelog:', error)
    }
  },

  async createChangelog(changelog: ChangelogInterface) {
    try {
      const response = await axios.post(`${baseUrl}/changelogs`, changelog)
      return response.data
    } catch (error) {
      console.error('Cannot create changelog:', error)
    }
  },

  async updateChangelog(changelogId: number, changelogData: ChangelogInterface) {
    try {
      const response = await axios.put(`${baseUrl}/changelogs/${changelogId}`, changelogData)
      return response.data
    } catch (error) {
      console.error('Cannot update changelog:', error)
    }
  },

  async deleteChangelog(changelogId: number) {
    try {
      const response = await axios.delete(`${baseUrl}/changelogs/${changelogId}`)
      return response.status
    } catch (error) {
      console.error('Cannot delete changelog:', error)
    }
  }
}
