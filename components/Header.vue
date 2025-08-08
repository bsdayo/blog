<template>
  <header class="sticky top-0 z-100 h-16 px-4 text-body bg-glass">
    <div
      class="absolute inset-0 pointer-events-none h-200% w-full backdrop-glass mask-[linear-gradient(to_bottom,black_0%_50%,transparent_50%_100%)]"
    />
    <div
      class="absolute inset-0 pointer-events-none size-full translate-y-full bg-glass-edge backdrop-glass-edge mask-[linear-gradient(to_bottom,black_0,black_1px,transparent_1px)]"
    />

    <nav class="relative h-full max-w-4xl mx-auto grid grid-cols-[64px_1fr] items-center">
      <a :href="withBase('/')">
        <img
          class="size-10 rounded-full"
          src="https://avatars.githubusercontent.com/bsdayo"
          alt="Avatar"
        />
      </a>

      <div class="relative flex justify-end items-center">
        <div class="header-heading absolute left-0 w-full opacity-0">
          <div v-if="post" class="text-caption text-xs mb-px">{{ post.slug }}</div>
          <div class="font-semibold">{{ page.title }}</div>
        </div>

        <div class="header-buttons space-x-6 *:hoverable [&>a[data-active=true]]:opacity-100">
          <a :href="withBase('/posts/')" :data-active="page.relativePath.startsWith('posts/')">
            <span class="sm:hidden i-lucide-newspaper" />
            <span class="hidden sm:inline">文章</span>
          </a>
          <a :href="withBase('/about/')" :data-active="page.relativePath.startsWith('about/')">
            <span class="sm:hidden i-lucide-info" />
            <span class="hidden sm:inline">关于</span>
          </a>
          <button
            class="i-lucide-sun dark:i-lucide-moon cursor-pointer hoverable"
            @click="isDark = !isDark"
          />
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { animate, createSpring } from 'animejs'
import { withBase } from 'vitepress'

const { page, isDark } = useData()
const post = usePost()

onMounted(() => {
  onTitleScrolled({
    onEnter() {
      animate('.header-heading', {
        opacity: 0,
        translateY: 16,
        pointerEvents: 'none',
        ease: createSpring(),
      })
      animate('.header-buttons', {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 200,
      })
    },
    onLeave() {
      animate('.header-heading', {
        opacity: 1,
        translateY: 0,
        pointerEvents: 'auto',
        ease: createSpring(),
      })
      animate('.header-buttons', {
        opacity: 0,
        pointerEvents: 'none',
        duration: 200,
      })
    },
  })
})
</script>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}
</style>
