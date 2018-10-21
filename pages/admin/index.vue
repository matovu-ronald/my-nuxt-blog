<template>
  <div class="admin-page">
    <section class="new-post">
      <appButton @click="$router.push('/admin/new-post')">Create Post</appButton>
    </section>
    <section class="existing-posts">
      <h1>Existiing Posts</h1>
      <PostList is-admin :posts="loadedPosts" />
    </section>
  </div>
</template>

<script>
    export default {
      layout: 'admin',
      name: "index",
      computed: {
        loadedPosts() {
          return this.$store.getters.loadedPosts;
        }
      }
    }
</script>

<style scoped>
  .admin-page {
    padding: 20px;
  }

  .new-post {
    text-align: center;
    border-bottom: 2px solid #ccc;
    padding-bottom: 10px;
  }

  .existing-posts h1 {
    text-align: center;
  }
</style>
