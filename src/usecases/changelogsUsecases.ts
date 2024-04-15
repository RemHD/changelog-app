import { useChangelogStore } from '@/stores/changelogsStore'
import type { ChangelogInterface } from '@/utils/interfaces'

export default class ChanlogsUsecases {
  private store = useChangelogStore()

  async createChangelog(changelogData: ChangelogInterface) {
    const newChangelog = changelogData
    await this.store.generateChangelog(newChangelog)
    return newChangelog
  }

  async updateChangelog(changelogId: number, changelogData: ChangelogInterface) {
    return await this.store.modifyChangelog(changelogId, changelogData)
  }

  async deleteChangelog(changelogId: number) {
    await this.store.removeChangelog(changelogId)
  }
}
