<template>
  <p class="space-x-3">
    <span class="i-lucide-tags" />
    <span class="inline-block" v-for="[tag, count] in tags">
      <a :href="withBase(`/tags/${tag}`)" class="">
        {{ tag }}
        <span class="text-xs">{{ count }}</span>
      </a>
    </span>
  </p>
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
