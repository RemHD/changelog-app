import { changelogService } from '@/services/changelogService'
import type { ChangelogInterface } from '@/utils/interfaces'
import { defineStore } from 'pinia'

export const useChangelogStore = defineStore('changelogs', {
  state: () => ({
    changelogs: [] as ChangelogInterface[],
    hiddenChangelogs: [] as ChangelogInterface[],
    currentChangelog: null as ChangelogInterface | null
  }),

  actions: {
    async fetchChangelogs(lastChangelogId?: number): Promise<ChangelogInterface[]> {
      try {
        const newChangelogs = await changelogService.getAllChangelogs(lastChangelogId)
        const uniqueChangelogs = newChangelogs.filter(
          (newChangelog: ChangelogInterface) =>
            !this.changelogs.find((existingChangelog) => existingChangelog.id === newChangelog.id)
        )

        if (uniqueChangelogs.length > 0) {
          this.changelogs.push(...uniqueChangelogs)
        }

        return uniqueChangelogs
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
        this.changelogs.push(newChangelog)
        console.log('changelog added to the store')
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
