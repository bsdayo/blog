<template>
  <h1>{{ page.title }}</h1>
  <div class="-mt-2 pb-2 opacity-50 text-sm [&_span[class*=i-]]:mr-1 space-x-3">
    <span>
      <span class="i-lucide-calendar" />{{
        dayjs(frontmatter.created || Date.now()).format('YYYY-MM-DD')
      }}
    </span>

    <span v-if="frontmatter.note"><span class="i-lucide-notebook" />速记</span>

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

  <Content class="content" />

  <hr />

  <Giscus :key="page.relativePath" v-bind="theme.giscus" :theme="isDark ? 'dark' : 'light'" />
</template>

<script lang="ts" setup>
import { withBase } from 'vitepress'
import dayjs from 'dayjs'
import Giscus from '@giscus/vue'
import type { ThemeConfig } from '~/.vitepress/theme'
import { getCategoryName } from '~/utils/names'

const { page, frontmatter, theme, isDark } = useData<ThemeConfig>()
</script>
