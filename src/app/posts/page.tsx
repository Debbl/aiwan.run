import { format } from 'date-fns'
import Link from '~/components/Link'
import BackgroundStage from '../_components/BackgroundStage'
import { getPosts } from './_data'

export default async function Page() {
  const { posts } = await getPosts()

  const postsByCategory = [
    {
      title: 'Blog',
      posts: posts.filter((p) => p.category === 'blog'),
    },
    {
      title: 'TIL',
      posts: posts.filter((p) => p.category === 'TIL'),
    },
  ]

  return (
    <>
      <BackgroundStage />

      <main className='relative flex-1 overflow-y-scroll'>
        <div className='flex min-h-full w-full items-center justify-center'>
          <div className='flex w-fit flex-col items-start justify-center gap-y-8 py-8'>
            {postsByCategory.map((category) => (
              <div key={category.title} title={category.title}>
                <h2 className='text-3xl font-bold'>{category.title}</h2>
                <ul className='mt-4 flex flex-col gap-y-2'>
                  {category.posts.map((post) => (
                    <Link className='opacity-60 hover:opacity-100' href={post.slug} key={post.slug}>
                      <li
                        className='hover:text-primary dark:hover:text-primary flex flex-col text-gray-900 md:flex-row dark:text-gray-50'
                        data-umami-event={`click-posts-${post.slug}`}
                      >
                        <span>{post.title}</span>
                        <span className='ml-0 flex items-center text-xs text-gray-500 md:ml-4'>
                          {format(post.date, 'MMM-dd, yyyy')}
                          {' · '}
                          {post.duration}
                        </span>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
