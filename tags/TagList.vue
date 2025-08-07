<template>
  <div class="flex gap-4">
    <a v-for="(count, tag) in tags" :href="withBase(`/tags/${tag}`)">
      {{ tag }}
      <span class="text-xs">{{ count }}</span>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { data } from '~/posts.data'
import { withBase } from 'vitepress'

const tags = data
  .flatMap((post) => post.tags)
  .reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1
    return acc
  }, {} as Record<string, number>)
</script>
