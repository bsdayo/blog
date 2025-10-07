<template>
  <h1>{{ page.title }}</h1>
  <div class="-mt-2 pb-2 opacity-50 text-sm [&_span[class*=i-]]:mr-1 space-x-3">
    <span>
      <span class="i-lucide-calendar" />
      {{ dayjs(frontmatter.created || Date.now()).format('YYYY-MM-DD') }}
    </span>

    <span v-if="frontmatter.category">
      <a :href="withBase('/categories/' + frontmatter.category)">
        <span class="i-lucide-shapes" />{{ getCategoryName(frontmatter.category) }}
      </a>
    </span>

    <span v-if="frontmatter.tags && frontmatter.tags.length > 0" class="space-x-2">
      <a v-for="tag in frontmatter.tags" :key="tag" :href="withBase('/tags/' + tag)">
        <span class="i-lucide-tag" />{{ tag }}
      </a>
    </span>
  </div>

  <div class="custom-block summary" v-if="slug && summaries[slug]">
    <p class="custom-block-title">AI 生成的摘要</p>
    <p>{{ summaries[slug] }}</p>
  </div>

  <Content class="content" />

  <hr />

  <Giscus
    v-if="!page.isNotFound"
    :key="page.relativePath"
    v-bind="theme.giscus"
    :theme="isDark ? 'dark' : 'light'"
  />
</template>

<script lang="ts" setup>
import { withBase } from 'vitepress'
import dayjs from 'dayjs'
import Giscus from '@giscus/vue'
import type { ThemeConfig } from '~/.vitepress/theme'
import { getCategoryName } from '~/utils/names'
import summaries from '../summaries.json'

const { page, frontmatter, theme, isDark } = useData<ThemeConfig>()

const slug = computed(() => {
  if (!page.value.relativePath.includes('posts/')) return null
  const parts = page.value.relativePath.split('/')
  return parts[parts.length - 2] as keyof typeof summaries
})
</script>
