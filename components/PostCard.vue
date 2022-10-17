<template>
  <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
      <img v-if="post.image" class="rounded-t-lg" :src="post.image" alt="" />
    </a>
    <div class="p-5">
      <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <NuxtLink :to="post.slug">
            {{ post.title }}
          </NuxtLink>
        </h5>
      </a>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="mb-3 font-normal text-gray-700 dark:text-gray-400" v-html="post.excerpt"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      default: {}
    }
  },
};
</script>

<style lang="scss" scoped>

</style>