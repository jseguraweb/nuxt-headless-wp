<template>
  <section class="text-gray-600 body-font">
    <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
      <div class="text-center lg:w-2/3 w-full">
        <h1 class="title-font mb-10 sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          {{ post.title }}
        </h1>
        <img v-if="post.image" class="lg:w-2/6 md:w-3/6 w-5/6 my-10 mx-auto object-cover object-center rounded"
          alt="hero" :src="post.image">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="mb-8 leading-relaxed" v-html="post.content"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PostSlug',
  async asyncData({ store, params }) {
    await store.dispatch('posts/getPost', params.slug)
  },
  computed: {
    post() {
      return (this.$store.state.posts).post
    },
  },
};
</script>