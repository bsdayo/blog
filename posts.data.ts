import { createContentLoader } from 'vitepress'

export interface Post {
  slug: string
  title: string
  frontmatter: Record<string, any>
  tags: string[]
  category?: string
  created: number
}

declare const data: Post[]
export { data }

export default createContentLoader<Post[]>('posts/**/index.md', {
  transform(data) {
    return data
      .filter((d) => d.url !== '/posts/')
      .map((d) => {
        const urlParts = d.url.split('/')
        return {
          slug: urlParts[urlParts.length - 2],
          title: d.frontmatter.title || d.url,
          frontmatter: d.frontmatter,
          tags: d.frontmatter.tags || [],
          category: d.frontmatter.category,
          created: d.frontmatter.created ? Date.parse(d.frontmatter.created) : Date.now(),
        }
      })
      .sort((a, b) => b.created - a.created)
  },
})
