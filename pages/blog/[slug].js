import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'
import matter from 'gray-matter'
import { marked } from 'marked'
import Layout from '@/components/Layout'
import CategoryLabel from '@/components/CategoryLabel'

export default function PostPage({
  frontmatter: { title, category, date, cover_image, author, author_image },
  content,
  slug,
}) {
  return (
    <Layout title={`${title} | DevSpace`}>
      <Link href='/blog'>
        <a className='px-10'>Go Back</a>
      </Link>
      <div className='w-full px-10 py-6 bg-white rounded-lg shadow-md'>
        <div className='flex justify-between items-center'>
          <h1 className='text-5xl mb-7'>{title}</h1>
          <CategoryLabel>{category}</CategoryLabel>
        </div>

        <div className='relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh]'>
          <Image
            src={cover_image}
            alt=''
            layout='fill'
            objectFit='cover'
            className='rounded'
          />
        </div>

        <div className='flex justify-between items-center bg-gray-100 p-2 my-8'>
          <div className='flex items-center space-x-4'>
            <Image
              src={author_image}
              alt=''
              width={40}
              height={40}
              className='object-cover rounded-full hidden sm:block'
            />
            <h4>{author}</h4>
          </div>

          <div className='mr-4'>{date}</div>
        </div>

        <div className='markdown-body mt-2'>
          <div
            dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
          ></div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map(filesname => ({
    params: {
      slug: filesname.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8',
  )

  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  }
}
