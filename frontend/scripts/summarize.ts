import { readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import OpenAI from 'openai'
import pangu from 'pangu'
import fg from 'fast-glob'

async function main() {
  const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY,
  })

  const summariesFile = path.join(import.meta.dirname, '../posts/summaries.json')
  const postsGlob = path.join(import.meta.dirname, '../posts/**/*.{md,mdx}')

  const summaries = existsSync(summariesFile)
    ? JSON.parse(await readFile(summariesFile, { encoding: 'utf-8' }))
    : {}

  const mdPaths = await fg.async(postsGlob)

  for (const path of mdPaths) {
    const content = await readFile(path, { encoding: 'utf-8' })
    const match = /^slug:\s(.+)$/m.exec(content)
    const slug = match?.[1]?.trim()

    // Skip if summary already exists
    if (!slug || summaries[slug]) continue

    console.log('Summarizing post', slug)

    // Get summary from DeepSeek V3
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            '你需要为以下文章作出一段简短的纯文本摘要，不要在输出中包含任何的 Markdown 格式。',
        },
        { role: 'user', content },
      ],
      model: 'deepseek-chat',
    })

    // Save summary
    const summary = pangu.spacingText(completion.choices[0].message.content || '')
    summaries[slug] = summary
    await writeFile(summariesFile, JSON.stringify(summaries, null, 2), { encoding: 'utf-8' })
  }
}

main()
