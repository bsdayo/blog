<template>
  <p class="space-x-3">
    <span class="i-lucide-shapes" />
    <a v-for="[category, count] in categories" :href="withBase(`/categories/${category}`)">
      {{ getCategoryName(category) }}
      <span class="text-xs">{{ count }}</span>
    </a>
  </p>
</template>

<script lang="ts" setup>
import { withBase } from 'vitepress'
import { Post } from '~/posts.data'
import { getCategoryName } from '~/utils/names'

const { posts } = defineProps<{
  posts: Post[]
}>()

const categories = Object.entries(
  posts.reduce((acc, post) => {
    if (!post.category) return acc
    acc[post.category] = (acc[post.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)
).sort((a, b) => a[0].localeCompare(b[0]))
</script>
