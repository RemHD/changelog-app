import { changelogService } from '@/services/changelogService'
import type { ChangelogInterface } from '@/utils/interfaces'
import { defineStore } from 'pinia'

export const useChangelogStore = defineStore('changelogs', {
  state: () => ({
    changelogs: [] as ChangelogInterface[],
    hiddenChangelogs: [] as ChangelogInterface[],
    currentChangelog: null as ChangelogInterface | null,
    searchQuery: ''
  }),

  getters: {
    filteredChangelogs: (state) => {
      const searchLower = state.searchQuery ? state.searchQuery.toLowerCase() : ''
      return state.changelogs.filter((changelog) => {
        return changelog.title ? changelog.title.toLowerCase().includes(searchLower): '' ||
               changelog.date ? changelog.date.includes(searchLower) : '' ||
               changelog.type ? changelog.date.toLowerCase().includes(searchLower) : ''
      })
    }
  },

  actions: {
    setSearchQuery(newQuery: string) {
      this.searchQuery = newQuery
    },

    async fetchChangelogs(lastChangelogId?: number) {
      try {
        const newChangelogs = await changelogService.getAllChangelogs(lastChangelogId)
        if (newChangelogs.length > 0) {
          this.changelogs.push(...newChangelogs)
        }
        return newChangelogs
      } catch (error) {
        console.error('Failed to fetch changelogs:', error)
        return []
      }
    },

    async fetchHiddenChangelogs() {
      try {
        this.hiddenChangelogs = await changelogService.getHiddenChangelogs()
      } catch (error) {
        console.error('Failed to fetch hidden changelogs:', error)
      }
    },

    async fetchChangelogById(changelogId: number) {
      try {
        this.currentChangelog = await changelogService.getChangelogById(changelogId)
      } catch (error) {
        console.error(`Failed to fetch changelog by ID ${changelogId}:`, error)
      }
    },

    async generateChangelog(changelogData: ChangelogInterface) {
      try {
        const newChangelog = await changelogService.createChangelog(changelogData)
        // newChangelog becomes a new array, and we create a new one with the ... operator
        this.changelogs.push(...[newChangelog])
        // this.changelogs.sort((a,b : ChangelogInterface) => b.id - a.id)
        console.log(this.changelogs.values)
        // Need to sort the this.changelogs ? Or check the filteredChangelogs
      } catch (error) {
        console.error('Failed to create changelog:', error)
      }
    },

    async modifyChangelog(changelogId: number, changelogData: ChangelogInterface) {
      try {
        const updatedChangelog = await changelogService.updateChangelog(changelogId, changelogData)
        const index = this.changelogs.findIndex((changelog) => changelog.id === changelogId)
        if (index !== -1) {
          this.changelogs.splice(index, 1, updatedChangelog)
        }
      } catch (error) {
        console.error('Failed to update changelog:', error)
      }
    },

    async removeChangelog(changelogId: number) {
      try {
        await changelogService.deleteChangelog(changelogId)
        this.changelogs = this.changelogs.filter((changelog) => changelog.id !== changelogId)
      } catch (error) {
        console.error('Failed to delete changelog:', error)
      }
    }
  }
})
