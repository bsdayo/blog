import loader, { type Post } from '../posts.data'

export default {
  async paths() {
    const posts = await loader.load()
    const tags = posts.reduce((acc, post) => {
      if (!post.tags || post.tags.length === 0) return acc
      for (const tag of post.tags) {
        acc[tag] ??= []
        acc[tag].push(post)
      }
      return acc
    }, {} as Record<string, Post[]>)
    return Object.entries(tags).map(([tag, posts]) => ({
      params: { tag, posts, title: `标签 - ${tag}` },
    }))
  },
}
