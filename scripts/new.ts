import { program } from 'commander'
import dayjs from 'dayjs'
import fs from 'node:fs'
import cp from 'node:child_process'

program.argument('<slug>', 'Post slug to create').parse()

const created = dayjs().format('YYYY-MM-DD HH:mm:ss Z')
const content = `---\ntitle: \ntags: []\ncategory: \ncreated: ${created}\n---\n\n`
const slug = program.args[0]

const year = dayjs().year()
const dir = `posts/${year}/${slug}`

if (fs.existsSync(dir)) {
  console.error(`Post with slug "${slug}" already exists.`)
  process.exit(1)
}

fs.mkdirSync(dir, { recursive: true })
fs.writeFileSync(`${dir}/index.md`, content, { encoding: 'utf-8' })

cp.execSync(`code ${dir}/index.md`)
