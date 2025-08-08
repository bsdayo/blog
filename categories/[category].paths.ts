import { getCategoryName } from '../utils/names'
import loader, { type Post } from '../posts.data'

export default {
  async paths() {
    const posts = await loader.load()
    const categories = posts.reduce((acc, post) => {
      if (!post.category) return acc
      acc[post.category] ??= []
      acc[post.category].push(post)
      return acc
    }, {} as Record<string, Post[]>)
    return Object.entries(categories).map(([category, posts]) => ({
      params: { category, posts, title: `分类 - ${getCategoryName(category)}` },
    }))
  },
}
