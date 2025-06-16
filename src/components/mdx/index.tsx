import { cn } from '~/lib/utils'
import { Code } from './code'
import { HeadingLink } from './heading-link'
import { Image } from './image'
import { Link } from './link'
import { Pre } from './pre'
import type { MDXComponents } from 'mdx/types'

export function getMDXComponents(): MDXComponents {
  return {
    h2: (props) => <HeadingLink tag='h2' {...props} />,
    h3: (props) => <HeadingLink tag='h3' {...props} />,
    h4: (props) => <HeadingLink tag='h4' {...props} />,
    h5: (props) => <HeadingLink tag='h5' {...props} />,
    h6: (props) => <HeadingLink tag='h6' {...props} />,
    ul: (props) => <ul className='mt-6 ml-6 list-disc first:mt-0' {...props} />,
    ol: (props) => (
      <ol className='mt-6 ml-6 list-decimal first:mt-0' {...props} />
    ),
    li: (props) => <li className='my-2' {...props} />,
    blockquote: (props) => (
      <blockquote
        className={cn(
          'mt-6 border-l-2 pl-6 italic',
          'border-l-2 pl-6 first:mt-0',
        )}
        {...props}
      />
    ),
    hr: (props) => <hr {...props} />,
    a: Link,
    p: (props) => <p className='mt-6 leading-normal first:mt-0' {...props} />,
    Image,
    Pre,
    code: Code,
  }
}
