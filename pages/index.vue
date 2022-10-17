<template>
  <div class="container mx-auto">
    <Hero></Hero>
    <PostCard v-for="post in posts" :key="post.slug" :post="post"></PostCard>
    <PaginationElement :page-info="pageInfo"></PaginationElement>
  </div>
</template>

<script>
import Hero from '../components/HeroArea.vue';
import PaginationElement from '../components/PaginationElement.vue';
import PostCard from '../components/PostCard.vue';
const postsCount = 10;

export default {
  name: "IndexPage",
  components: { Hero, PaginationElement, PostCard },
  async asyncData({ store, query }) {
    await store.dispatch('posts/getPosts', {
      after: query.after,
      first: postsCount
    })
  },
  computed: {
    posts() {
      return (this.$store.state.posts).posts
    },
    pageInfo() {
      return (this.$store.state.posts).pageInfo
    }
  },
  watch: {
    async $route() {
      await this.$nuxt.refresh();
      window.scrollTo(0, 0);
    }
  },
}
</script>
