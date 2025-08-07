<template>
  <div class="space-y-16">
    <div v-for="year in years" class="relative space-y-4 pt-14">
      <div
        class="absolute -z-1 top-0 opacity-10 font-black pointer-events-none text-24 line-height-24"
      >
        {{ year }}
      </div>
      <PostLink class="ml-8" v-for="post in grouped[year]" :key="post.url" :post="post" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import PostLink from '~/components/PostLink.vue'
import { Post } from '~/posts.data'

const { posts } = defineProps<{
  posts: Post[]
}>()

const { years, grouped } = computed(() => {
  const set = new Set<number>()
  const grouped = posts.reduce((acc, post) => {
    const year = dayjs(post.created).year()
    set.add(year)
    acc[year] ??= []
    acc[year].push(post)
    return acc
  }, {} as Record<number, Post[]>)
  return { years: Array.from(set).sort((a, b) => b - a), grouped }
}).value
</script>
