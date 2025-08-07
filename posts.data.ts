import { createContentLoader } from 'vitepress'

export interface Post {
  slug: string
  title: string
  frontmatter: Record<string, any>
  tags: string[]
  created: number
}

declare const data: Post[]
export { data }

export default createContentLoader<Post[]>('posts/*/*.md', {
  includeSrc: true,
  transform(data) {
    return data
      .map((d) => {
        return {
          slug: d.url.split('/')[2],
          title: d.frontmatter.title || d.url,
          frontmatter: d.frontmatter,
          tags: d.frontmatter.tags || [],
          created: d.frontmatter.created ? Date.parse(d.frontmatter.created) : Date.now(),
        }
      })
      .sort((a, b) => b.created - a.created)
  },
})
