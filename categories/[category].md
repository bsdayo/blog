# {{ $params.title }}

<PostList :posts="$params.posts" />

<script setup lang="ts">
import PostList from '~/components/PostList.vue'
</script>
