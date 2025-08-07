<template>
  <a class="border-none hoverable flex gap-4 items-center" :href="withBase(`/posts/${post.slug}/`)">
    <span>{{ post.title }}</span>
    <span class="text-sm text-caption">
      {{ dayjs(post.created).format('MM-DD') }}
    </span>
  </a>
</template>

<script lang="ts" setup>
import { Post } from '~/posts.data'
import { withBase } from 'vitepress'
import dayjs from 'dayjs'

defineProps<{
  post: Post
}>()
</script>
