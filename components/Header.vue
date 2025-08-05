<template>
  <header class="sticky top-0 z-100 h-16 px-4 text-body bg-white/80 dark:bg-zinc-900/80">
    <div class="backdrop" />
    <div class="backdrop-edge" />

    <nav class="relative h-full container mx-auto flex justify-between">
      <div class="flex items-center gap-4">
        <img class="block size-10 rounded-full" src="https://avatars.githubusercontent.com/bsdayo" alt="Avatar">
        <div>
          <div class="text-caption text-xs mb-px">分类</div>
          <div class="font-semibold">{{ page.title }}</div>
        </div>
      </div>
      <div class="flex gap-4 items-center *:text-hoverable">
        <a :href="withBase('/')">首页</a>
        <button class="i-lucide-sun dark:i-lucide-moon cursor-pointer" @click="isDark = !isDark" />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
import { useThemedData } from '~/composables/data'

const { page, frontmatter, isDark } = useThemedData()
</script>

<style scoped>
.backdrop {
  position: absolute;
  inset: 0;
  height: 200%;
  width: 100%;
  backdrop-filter: blur(32px);
  mask-image: linear-gradient(to bottom, black 0% 50%, transparent 50% 100%);
  pointer-events: none;
}

.backdrop-edge {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  transform: translateY(100%);
  background: hsl(0deg 0% 100% / 0.1);
  backdrop-filter: blur(16px) brightness(90%);
  pointer-events: none;
  mask-image: linear-gradient(to bottom, black 0, black 1px, transparent 1px);
}

.dark .backdrop-edge {
  backdrop-filter: blur(16px) brightness(110%);
}
</style>
