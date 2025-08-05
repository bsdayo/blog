<template>
  <NavigationBar />

  <div class="py-16 mx-auto px-4 max-w-[calc(65ch-16px)]">
    <Content class="max-w-none prose dark:prose-invert prose-zinc" />
  </div>
</template>

<script lang="ts" setup>
import NavigationBar from '~/components/NavigationBar.vue'
</script>

<style>
.dark body {
  background-color: var(--colors-zinc-900) /* bg-zinc-900 */;
}
</style>
