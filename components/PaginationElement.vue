<template>
  <nav v-if="pageInfo.hasNextPage" aria-label="Navigation element">
    <ul class="inline-flex -space-x-px">
      <NuxtLink :to="{ query: { after: pageInfo.endCursor } }">
        <span
          class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</span>
      </NuxtLink>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "PaginationElement",
  props: {
    pageInfo: {
      type: Object,
      default: {}
    }
  }
}
</script>