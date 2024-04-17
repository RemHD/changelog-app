import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'

export const useTranslations = defineStore('translations', () => {
  const i18n = useI18n() // Use the composable to get the i18n instance

  const getTranslatedString = (key: string) => {
    return i18n.t(key) // Access translations using the instance's t function
  }

  return { getTranslatedString }
})
