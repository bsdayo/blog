<template>
  <Header />

  <div class="py-16 mx-auto px-4 max-w-[calc(65ch-16px)]">
    <Content class="max-w-none prose dark:prose-invert prose-zinc" />

    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
</script>

<style>
.dark body {
  background-color: var(--colors-zinc-900) /* bg-zinc-900 */;
}
</style>
