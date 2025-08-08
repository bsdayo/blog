<template>
  <button
    class="back-to-top size-12 z-50 rounded-full bg-glass cursor-pointer flex justify-center items-center [&>span]:hoverable"
    @click="scrollToTop"
  >
    <div
      class="absolute inset-0 pointer-events-none backdrop-glass size-200% -translate-25% mask-[radial-gradient(circle_closest-side_at_center,black_0%_50%,transparent_50%_100%)]"
    />
    <div
      class="absolute inset-0 pointer-events-none backdrop-glass-edge size-200% -translate-25% mask-[radial-gradient(circle_closest-side_at_center,transparent_0%_50%,black_50%_calc(50%_+_1px),transparent_calc(50%_+_1px)_100%)]"
    />
    <span class="i-lucide-arrow-up" />
  </button>
</template>

<script setup lang="ts">
import { animate, createSpring } from 'animejs'

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  onTitleScrolled({
    onEnter() {
      animate('.back-to-top', {
        translateY: 80,
        pointerEvents: 'none',
        duration: 200,
      })
    },
    onLeave() {
      animate('.back-to-top', {
        translateY: 0,
        pointerEvents: 'auto',
        ease: createSpring(),
      })
    },
  })
})
</script>
