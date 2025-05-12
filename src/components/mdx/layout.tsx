'use client'
import { format } from 'date-fns'
import { useScroll } from 'motion/react'
import Link from 'next/link'
import { useRef } from 'react'
import type { Frontmatter } from '~/app/posts/_data'

export default function Layout({ children, frontmatter }: { children: React.ReactNode; frontmatter: Frontmatter }) {
  const { title, duration, date } = frontmatter

  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    container: containerRef,
  })

  return (
    <div className='relative flex min-h-0 flex-1 flex-col'>
      <m.div className='bg-primary fixed inset-x-0 top-0 z-10 h-0.5 origin-left' style={{ scaleX: scrollYProgress }} />

      {/* <DotPattern width={30} height={30} /> */}

      <div className='relative flex-1 overflow-y-scroll' ref={containerRef}>
        <main className='mx-auto max-w-screen-lg px-6 py-10'>
          <article>
            <h1 className='mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100'>{title}</h1>
            <p className='mt-2 text-gray-600'>
              <span>{format(new Date(date), 'MMM-dd, yyyy')}</span>
              {' · '}
              <span>{duration}</span>
            </p>
            {children}
          </article>
          <footer>
            <span className='font-bold opacity-50'>&gt; </span>
            <Link href='/posts' className='font-mono opacity-50 hover:opacity-75'>
              cd ..
            </Link>
          </footer>
        </main>
      </div>
    </div>
  )
}
