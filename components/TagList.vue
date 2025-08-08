<template>
  <div class="space-x-4">
    <a v-for="[tag, count] in tags" :href="withBase(`/tags/${tag}`)">
      {{ tag }}
      <span class="text-xs">{{ count }}</span>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { withBase } from 'vitepress'
import { Post } from '~/posts.data'

const { posts } = defineProps<{
  posts: Post[]
}>()

const tags = Object.entries(
  posts
    .flatMap((post) => post.tags)
    .reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1
      return acc
    }, {} as Record<string, number>)
).sort((a, b) => a[0].localeCompare(b[0]))
</script>
