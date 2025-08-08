<template>
  <Header />

  <div class="my-16 mx-auto px-4 max-w-[calc(65ch+16px)] typography">
    <PostLayout v-if="inPost" />
    <DefaultLayout v-else />
    <hr />
    <Footer class="mt-8" />
  </div>

  <BackToTopButton class="fixed bottom-8 right-8" />
</template>

<script lang="ts" setup>
import mediumZoom from 'medium-zoom'
import type { ThemeConfig } from '~/.vitepress/theme'
import DefaultLayout from '~/layouts/DefaultLayout.vue'
import PostLayout from '~/layouts/PostLayout.vue'

const { page } = useData<ThemeConfig>()
const inPost = computed(() => /^posts\/(.*)\/.*$/m.test(page.value.relativePath))

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
