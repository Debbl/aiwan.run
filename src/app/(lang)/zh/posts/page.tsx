import { format } from 'date-fns'
import { Link } from 'next-view-transitions'
import { postsByCategory, source } from '~/lib/source'
import BackgroundStage from '../../../_components/background-stage'

function Item({
  url,
  title,
  date,
  duration,
  className,
  children,
}: {
  url: string
  title: string
  date: Date
  duration: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <li
      className={cn(
        'hover:text-primary dark:hover:text-primary flex flex-col items-center gap-1 text-gray-900 md:flex-row dark:text-gray-50',
        className,
      )}
      data-umami-event={`click-posts-${url}`}
    >
      {children}
      <Link
        className='flex items-center opacity-60 hover:opacity-100'
        href={url}
        key={url}
      >
        <span>{title}</span>
        <span className='ml-0 flex items-center text-xs text-gray-500 md:ml-4'>
          {format(date, 'MMM-dd, yyyy')}
          {' · '}
          {duration}
        </span>
      </Link>
    </li>
  )
}

export default async function Page() {
  return (
    <>
      <BackgroundStage />

      <main className='relative flex-1 overflow-y-scroll'>
        <div className='flex min-h-full w-full items-center justify-center'>
          <div className='flex w-fit flex-col items-start justify-center gap-y-8 py-8'>
            {postsByCategory.map((category) => (
              <div key={category.title}>
                <h2 className='text-3xl font-bold'>{category.title}</h2>
                <ul className='mt-4 flex flex-col gap-y-2'>
                  {category.posts.map((post) => {
                    const zhPage = source.getPage(post.slugs, 'zh')

                    if (!zhPage) return null

                    return (
                      <Item
                        key={zhPage?.url}
                        url={zhPage?.url}
                        title={zhPage?.data.title}
                        date={zhPage?.data.date}
                        duration={zhPage?.data.duration}
                      />
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
