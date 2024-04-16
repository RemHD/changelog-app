<template>
  <button
    data-modal-target="create-changelog-modal"
    data-modal-toggle="create-changelog-modal"
    type="button"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="16"
      height="16"
    >
      <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
    </svg>
    Create changelog
  </button>
  <!-- Main modal -->
  <div
    id="create-changelog-modal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Create changelog</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="create-changelog-modal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-4">
          <form id="create-changelog-form" @submit.prevent="onSubmit">
            <div class="mb-4">
              <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >Title</label
              >
              <input
                v-model="title"
                type="text"
                id="title"
                name="title"
                required
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              <ErrorMessage id="title-error" name="title" class="text-red-500">{{
                errors.title
              }}</ErrorMessage>
            </div>
            <div class="mb-4">
              <label for="type" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >Type</label
              >
              <select
                v-model="type"
                id="type"
                name="type"
                required
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="FEAT">Feature</option>
                <option value="BUG">Bugfix</option>
              </select>
              <ErrorMessage id="type-error" name="type" class="text-red-500">{{
                errors.type
              }}</ErrorMessage>
            </div>
            <div class="mb-4">
              <label
                for="app_name"
                class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >App Name</label
              >
              <input
                v-model="app_name"
                type="text"
                id="app_name"
                name="app_name"
                required
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              <ErrorMessage id="app_name-error" name="app_name" class="text-red-500">{{
                errors.app_name
              }}</ErrorMessage>
            </div>
            <div class="mb-4">
              <label for="date" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >Date</label
              >
              <input
                v-model="date"
                type="date"
                id="date"
                name="date"
                required
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              <ErrorMessage id="date-error" name="date" class="text-red-500">{{
                errors.date
              }}</ErrorMessage>
            </div>
            <div class="mb-4">
              <label
                for="content"
                class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >Content</label
              >
              <textarea
                v-model="content"
                id="content"
                name="content"
                rows="4"
                required
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              ></textarea>
              <ErrorMessage id="content-error" name="content" class="text-red-500">{{
                errors.content
              }}</ErrorMessage>
            </div>
            <!-- Modal footer -->
            <div
              class="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
            >
              <button
                data-modal-hide="create-changelog-modal"
                data-submit="submit"
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create
              </button>
              <button
                data-modal-hide="create-changelog-modal"
                type="button"
                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ChangelogInterface } from '@/utils/interfaces'
import ChangelogsUsecases from '../usecases/changelogsUsecases'
import * as yup from 'yup'
import { ErrorMessage, useForm } from 'vee-validate'

const changelogUseCase = new ChangelogsUsecases()

// yup field validation
const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    title: yup.string().min(3, 'must be at least 3 characters long').required(),
    app_name: yup.string().min(3, 'must be at least 3 characters long'),
    content: yup.string(),
    type: yup.string().required(),
    date: yup.string().required() // Change date format
  })
})

// Form fields
const [title] = defineField('title')
const [app_name] = defineField('app_name')
const [type] = defineField('type')
const [date] = defineField('date')
const [content] = defineField('content')

const createChangelog = async (formData: ChangelogInterface) => {
  try {
    const newChangelog = await changelogUseCase.createChangelog(formData)
    if (newChangelog) {
      // NOT SO SURE ABOUT changelogStore.changelogs.push(newChangelog)
      // changelogStore.fetchChangelogs(newChangelog.id)

    }
  } catch (error) {
    console.error('Error while creating new changelog :', error)
  }
}

const emit = defineEmits(['create-changelog'])

const onSubmit = handleSubmit(async (values) => {
  const validData: ChangelogInterface = {
    title: values.title,
    type: values.type,
    date: values.date,
    content: values.content,
    app_name: values.app_name
  }

  await createChangelog(validData)
  emit('create-changelog', validData)
})
</script>
