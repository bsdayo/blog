<template>
  <li class="relative hoverable">
    <a class="border-none flex gap-4 items-center" :href="withBase(`/posts/${post.slug}/`)">
      <span>{{ post.title }}</span>
      <span class="text-sm text-caption">
        {{ dayjs(post.created).format('MM-DD') }}
      </span>
      <span v-if="post.note" class="text-sm bg-zinc-500/10 rounded opacity-50 px-6px py-3px">
        速记
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
