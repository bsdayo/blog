import type { Post } from '~/posts.data'
import { useData } from 'vitepress'

export function usePost() {
  const { page, frontmatter } = useData()
  return computed(() => {
    const slug = /^posts\/(.*)\/.*$/m.exec(page.value.relativePath)?.[1]
    if (!slug) return undefined
    return {
      title: page.value.title,
      slug,
      frontmatter: frontmatter.value,
      tags: frontmatter.value.tags || [],
      created: frontmatter.value.created ? Date.parse(frontmatter.value.created) : Date.now(),
    } satisfies Post
  })
}
