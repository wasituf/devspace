import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function handler(req, res) {
  let posts
  if (process.env.NODE_ENV === 'production') {
    // Fetch from cache
    posts = require('../../cache/data').posts
  } else {
    const files = fs.readdirSync(path.join('posts'))

    posts = files.map(filename => {
      const slug = filename.replace('.md', '')

      const markdownWithMeta = fs.readFileSync(
        path.join('posts', filename),
        'utf-8',
      )

      const { data: frontmatter } = matter(markdownWithMeta)

      return {
        slug,
        frontmatter,
      }
    })
  }

  const queryStrings = req.query.q.split(' ')

  let results = []

  queryStrings.forEach(word => {
    const matches = posts.filter(
      ({ frontmatter: { title, excerpt, category } }) =>
        title.toLowerCase().indexOf(word) != -1 ||
        excerpt.toLowerCase().indexOf(word) != -1 ||
        category.toLowerCase().indexOf(word) != -1,
    )

    results = results.concat(matches)
  })

  results = [...new Set(results)]

  res.status(200).json(JSON.stringify({ results }))
}
