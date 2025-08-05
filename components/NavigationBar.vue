<template>
  <nav
    class="sticky top-0 z-100 mx-auto container h-16 flex justify-end items-center px-8 gap-8 bg-body text-body *:text-hoverable"
  >
    <a :href="withBase('/')">首页</a>
    <button class="i-lucide-sun dark:i-lucide-moon cursor-pointer" @click="isDark = !isDark" />
  </nav>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
import { useThemedData } from '~/composables/data'

const { isDark } = useThemedData()
</script>
