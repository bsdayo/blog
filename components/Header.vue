<template>
  <header class="sticky top-0 z-100 h-16 px-4 text-body bg-glass">
    <div
      class="absolute inset-0 pointer-events-none h-200% w-full backdrop-glass mask-[linear-gradient(to_bottom,black_0%_50%,transparent_50%_100%)]"
    />
    <div
      class="absolute inset-0 pointer-events-none size-full translate-y-full bg-glass-edge backdrop-glass-edge mask-[linear-gradient(to_bottom,black_0,black_1px,transparent_1px)]"
    />

    <nav class="relative h-full max-w-4xl mx-auto grid grid-cols-[64px_1fr_64px] items-center">
      <a :href="withBase('/')">
        <img
          class="size-10 rounded-full"
          src="https://avatars.githubusercontent.com/bsdayo"
          alt="Avatar"
        />
      </a>
      <div class="flex items-center justify-center relative">
        <div class="post-heading absolute left-0 w-full opacity-0">
          <div v-if="post" class="text-caption text-xs mb-px">{{ post.slug }}</div>
          <div class="font-semibold">{{ page.title }}</div>
        </div>

        <div class="nav-links flex gap-8 items-center *:hoverable">
          <a :href="withBase('/posts/')">文章</a>
          <a :href="withBase('/tags/')">标签</a>
        </div>
      </div>
      <div class="flex justify-end">
        <button
          class="i-lucide-sun dark:i-lucide-moon cursor-pointer hoverable"
          @click="isDark = !isDark"
        />
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
      animate('.post-heading', {
        opacity: 0,
        translateY: 16,
        pointerEvents: 'none',
        ease: createSpring(),
      })
      animate('.nav-links', {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 200,
      })
    },
    onLeave() {
      animate('.post-heading', {
        opacity: 1,
        translateY: 0,
        pointerEvents: 'auto',
        ease: createSpring(),
      })
      animate('.nav-links', {
        opacity: 0,
        pointerEvents: 'none',
        duration: 200,
      })
    },
  })
})
</script>
