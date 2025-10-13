import { getCollection, type CollectionEntry } from 'astro:content'

export async function getPosts() {
  const posts = await getCollection('posts')
  return posts.sort((a, b) => {
    return b.data.created.getTime() - a.data.created.getTime()
  })
}

export function getTags(posts: CollectionEntry<'posts'>[]) {
  const tags = Object.entries(
    posts
      .flatMap((post) => post.data.tags)
      .reduce(
        (acc, tag) => {
          acc[tag] = (acc[tag] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      ),
  ).sort((a, b) => a[0].localeCompare(b[0]))
  return tags
}

export function getCategories(posts: CollectionEntry<'posts'>[]) {
  const categories = Object.entries(
    posts.reduce(
      (acc, post) => {
        if (!post.data.category) return acc
        acc[post.data.category] = (acc[post.data.category] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ),
  ).sort((a, b) => a[0].localeCompare(b[0]))
  return categories
}
