<template>
  <div v-for="year in years">
    <h2>{{ year }}</h2>
    <ul>
      <PostLink v-for="post in grouped[year]" :key="post.slug" :post="post" />
    </ul>
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
