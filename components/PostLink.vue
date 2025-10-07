<template>
  <li class="relative hoverable">
    <a
      class="border-none flex justify-between sm:justify-start gap-4 items-center"
      :href="withBase(`/posts/${post.slug}/`)"
    >
      <span>{{ post.title }}</span>
      <span class="text-sm text-caption">
        {{ dayjs(post.created).format('MM-DD') }}
      </span>
    </a>
  </li>
</template>

<script lang="ts" setup>
import { Post } from '~/posts.data'
import { withBase } from 'vitepress'
import dayjs from 'dayjs'

defineProps<{
  post: Post
}>()
</script>
