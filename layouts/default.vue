<template>
  <div class="container mx-auto">
    <TheHeader :menuItems="menuItems"></TheHeader>
    <Nuxt />
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';

export default {
  name: "DefaultLayout",
  components: { TheHeader },
  async fetch() {
    await this.$store.dispatch('menus/getMainMenu', 'main')
  },
  computed: {
    menuItems() {
      return (this.$store.state.menus).mainMenuItems
    },
  },
};
</script>