<template>
  <Header />

  <div class="my-16 mx-auto px-4 max-w-[calc(65ch+16px)] typography">
    <h1 v-if="post">{{ page.title }}</h1>
    <div v-if="post" class="-mt-2 pb-2 opacity-50 flex gap-2 text-sm [&_*[class*=i-]]:mr-1">
      <div v-if="post.created">
        <span class="i-lucide-calendar" />{{ dayjs(post.created).format('YYYY-MM-DD') }}
      </div>
      <div v-if="post.tags.length > 0" class="flex gap-2">
        ·
        <a v-for="tag in post.tags" :key="tag" :href="withBase('/tags/' + tag)">
          <span class="i-lucide-tag" />{{ tag }}
        </a>
      </div>
    </div>

    <Content class="content" />

    <div class="mt-8" v-if="post">
      <Giscus :key="page.relativePath" v-bind="theme.giscus" :theme="isDark ? 'dark' : 'light'" />
    </div>

    <Footer class="mt-8" />
  </div>

  <BackToTopButton class="fixed bottom-8 right-8" />
</template>

<script lang="ts" setup>
import mediumZoom from 'medium-zoom'
import { withBase } from 'vitepress'
import dayjs from 'dayjs'
import Giscus from '@giscus/vue'
import type { ThemeConfig } from '~/.vitepress/theme'

const { page, frontmatter, theme, isDark } = useData<ThemeConfig>()
const post = usePost()

watch(
  () => page.value,
  async () => {
    if (!globalThis.window || !globalThis.document) return
    await nextTick()

    // Medium Zoom
    mediumZoom('.content img', {
      background: 'rgba(0, 0, 0, 0.5)',
    })
  },
  { immediate: true }
)
</script>

<style>
body {
  /* text-zinc-700 */
  color: var(--colors-zinc-700) /* text-zinc-700 */;
}

.dark body {
  color: var(--colors-zinc-200) /* text-zinc-200 */;
  background-color: var(--colors-zinc-900) /* bg-zinc-900 */;
}

.animejs-onscroll-debug {
  z-index: 999 !important;
}

.medium-zoom-overlay,
.medium-zoom-image--opened {
  z-index: 999;
}
</style>
