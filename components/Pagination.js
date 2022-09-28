import Link from 'next/link'

export default function Pagination({ currentPage, pageCount }) {
  const isFirst = currentPage === 1
  const isLast = currentPage === pageCount
  const prevPage = `/blog/page/${currentPage - 1}`
  const nextPage = `/blog/page/${currentPage + 1}`

  if (pageCount === 1) return <></>

  return (
    <div className='mt-6 px-10'>
      <ul className='flex pl-0 list-none my-2'>
        {!isFirst && (
          <Link href={prevPage}>
            <li className='relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer'>
              Prev
            </li>
          </Link>
        )}

        {Array.from({ length: pageCount }, (_, i) => (
          <Link key={i} href={`/blog/page/${i + 1}`}>
            <li className='relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer'>
              {i + 1}
            </li>
          </Link>
        ))}

        {!isLast && (
          <Link href={nextPage}>
            <li className='relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer'>
              Next
            </li>
          </Link>
        )}
      </ul>
    </div>
  )
}
