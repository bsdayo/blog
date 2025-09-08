import fs from 'node:fs'
import fsp from 'node:fs/promises'
import cp from 'node:child_process'
import { input } from '@inquirer/prompts'
import dayjs from 'dayjs'

async function main() {
  const slug = await input({ message: 'Enter slug' })
  const created = dayjs().format('YYYY-MM-DD HH:mm:ss Z')
  const content = `---\ntitle: \ntags: []\ncategory: \ncreated: ${created}\n---\n\n`

  const year = dayjs().year()
  const dir = `posts/${year}/${slug}`

  if (fs.existsSync(dir)) {
    console.error(`Post with slug "${slug}" already exists.`)
    process.exit(1)
  }

  await fsp.mkdir(dir, { recursive: true })
  await fsp.writeFile(`${dir}/index.md`, content, { encoding: 'utf-8' })

  cp.execSync(`code ${dir}/index.md`)
}

main()
