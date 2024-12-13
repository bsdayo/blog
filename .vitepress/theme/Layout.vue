<template>
  <Layout>
    <!-- <template #nav-bar-content-before>
      <span class="ml-4 relative flex h-3 w-3">
        <span class="animate-ping absolute h-full w-full rounded-full bg-green opacity-75" />
        <span class="h-full w-full rounded-full bg-green" />
      </span>
    </template> -->

    <template #doc-before v-if="currentPost">
      <div class="vp-doc">
        <h1>{{ currentPost.title }}</h1>
        <p class="mt-2 space-x-2">
          <Badge type="tip">{{ new Date(currentPost.create).toISOString().split('T')[0] }}</Badge>
          <Badge type="info" v-for="tag in currentPost.tags" :key="tag">{{ tag }}</Badge>
        </p>
      </div>
    </template>

    <template #doc-after v-if="page.frontmatter.comment ?? true">
      <div class="VPDoc vp-doc">
        <h2 id="giscus">评论</h2>
      </div>
      <Giscus
        id="giscus"
        :key="page.relativePath"
        v-bind="theme.giscus"
        :theme="isDark ? 'transparent_dark' : 'light'"
      />
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import { ref, nextTick, watch, onMounted } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Giscus from '@giscus/vue'
import mediumZoom from 'medium-zoom'
import { animate, stagger, spring } from 'motion'

import { data as posts } from '../posts.data'
import type { Post, ThemeConfig } from '.'
import { springScrollToElement } from './utils'

const { Layout } = DefaultTheme
const { page, theme, frontmatter, isDark } = useData<ThemeConfig>()

// Load fonts
onMounted(() =>
  import('webfontloader').then((webfont) =>
    webfont.load({
      google: {
        families: ['JetBrains Mono:400,500,600,700'],
      },
    })
  )
)

// Trigger on page change (immediate)
onMounted(() => {
  watch(
    () => page.value.relativePath,
    async () => {
      // Wait for the DOM to update
      await nextTick()

      // Random taglines
      const taglineElement = document.querySelector('.tagline')
      if (taglineElement)
        taglineElement.innerHTML =
          theme.value.taglines[Math.floor(Math.random() * theme.value.taglines.length)]

      // Animate home page elements
      if (frontmatter.value.layout === 'home') {
        const homeAnim = { type: spring, bounce: 0.5, duration: 0.5 }

        animate('.main .name', { opacity: 1, x: [-200, 0] }, { ...homeAnim })
        animate('.main .text', { opacity: 1, x: [200, 0] }, { ...homeAnim })
        animate('.main .tagline', { y: [50, 0] }, { ...homeAnim })
        animate('.main .action', { y: [50, 0] }, { ...homeAnim, delay: stagger(0.05) })
      }

      // Animate outline link scrolls
      document.querySelectorAll<HTMLLinkElement>('.outline-link').forEach((element) => {
        const id = decodeURIComponent(element.href.split('#')[1])
        console.log(id)
        element.onclick = () => {
          const target = document.getElementById(id)
          if (!target) return
          springScrollToElement(target)
        }
      })
    },
    { immediate: true }
  )
})

// Trigger on page change (not immediate)
onMounted(() => {
  watch(
    () => page.value.relativePath,
    async () => {
      animate('.VPContent', { opacity: [0, 1] }, { ease: 'easeInOut', duration: 0.2 })
    }
  )
})

// Current post
const currentPost = ref<Post | undefined>(undefined)
watch(
  () => page.value.relativePath,
  (newPath) => {
    // Find current post
    const postId = newPath.match(/posts\/(.*)\//)?.[1]
    currentPost.value = postId ? posts.find((post) => post.id === postId) : undefined
  },
  { immediate: true }
)

// Process markdown image
const mdImgSelector = '.vp-doc img'
onMounted(() => {
  watch(
    () => currentPost.value,
    async (post) => {
      if (!post) return
      await nextTick() // Wait for the DOM to update

      // Append alt text to images
      document.querySelectorAll(mdImgSelector).forEach((img) => {
        const alt = img.attributes.getNamedItem('alt')
        if (!alt) return

        const node = document.createElement('div')
        node.classList.add('img-alt')
        node.innerText = alt.value

        const parent = img.parentNode!
        if (parent.lastChild === img) parent.appendChild(node)
        else parent.insertBefore(node, img.nextSibling)
      })

      // Apply medium-zoom
      mediumZoom(mdImgSelector, {
        background: 'rgba(0, 0, 0, 0.5)',
      })
    },
    { immediate: true }
  )
})
</script>

<style lang="scss">
.post-header {
  margin-bottom: 64px;
}

.post-title {
  font-weight: 600;
  outline: none;
  line-height: 40px;
  font-size: 32px;
}
</style>
