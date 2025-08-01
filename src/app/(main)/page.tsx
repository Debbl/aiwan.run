import Image from 'next/image'
import Link from 'next/link'
import BackgroundStage from '~/app/_components/background-stage'
import {
  ai,
  biliShortLink,
  bubbleWrap,
  car,
  codeDiff,
  emoji,
  gameOfLife,
  minesweeper,
  peppa,
  rm,
  tictactoe,
  tools,
  v,
} from '~/logos'
import type { StaticImageData } from 'next/image'
import type { IconType } from '~/components/icons'

type Projects = Record<
  string,
  {
    'name': string
    'url': string
    'desc': string
    'data-umami-event': string
    'content': {
      'name': string
      'data-umami-event': string
      'link': string
      'favicon': string | StaticImageData
      'desc': string
    }[]
  }
>

const projects: Projects = {
  Game: {
    'name': 'Game',
    'url': 'https://game.aiwan.run/',
    'desc': 'some games',
    'data-umami-event': 'click-game-link',
    'content': [
      {
        'name': 'Minesweeper',
        'data-umami-event': 'click-minesweeper-link',
        'link': 'https://game.aiwan.run/minesweeper/',
        'favicon': minesweeper,
        'desc': 'A minesweeper game use react.',
      },
      {
        'name': 'Tic tac toe',
        'data-umami-event': 'click-tic-tac-toe-link',
        'link': 'https://game.aiwan.run/tictactoe/',
        'favicon': tictactoe,
        'desc': 'A Tic-tac-toe game use solid.js.',
      },
      {
        'name': 'Game of Life',
        'data-umami-event': 'click-game-of-life-link',
        'link': 'https://game.aiwan.run/game-of-life/',
        'favicon': gameOfLife,
        'desc': 'A Game-of-Life game use react',
      },
      {
        'name': 'Bubble Wrap',
        'data-umami-event': 'click-bubble-wrap-link',
        'link': 'https://game.aiwan.run/bubble-wrap/',
        'favicon': bubbleWrap,
        'desc': 'A Bubble Wrap game use react',
      },
      {
        'name': 'Self driving car',
        'data-umami-event': 'click-self-driving-car-link',
        'link': 'https://car.aiwan.run',
        'favicon': car,
        'desc': 'A self driving car game with neural network.',
      },
    ],
  },
  Tools: {
    'name': 'Tools',
    'url': 'https://tools.aiwan.run/',
    'desc': 'some tools',
    'data-umami-event': 'click-tools-link',
    'content': [
      {
        'name': 'Tools',
        'data-umami-event': 'click-tools-link',
        'link': 'https://tools.aiwan.run/',
        'favicon': tools,
        'desc': 'A tool collection.',
      },
      {
        'name': 'Code Diff',
        'data-umami-event': 'click-code-diff-link',
        'link': 'https://tools.aiwan.run/code-diff/',
        'favicon': codeDiff,
        'desc': 'A code diff tool.',
      },
      {
        'name': 'Bilibili ShortLink Converter',
        'data-umami-event': 'click-bilibili-short-link-converter-link',
        'link': 'https://bili-shortlink.vercel.app/',
        'favicon': biliShortLink,
        'desc': 'Bilibili shortLink converter.',
      },
      {
        'name': 'Peppa Pig Quotes',
        'data-umami-event': 'click-peppa-pig-quotes-link',
        'link': 'https://peppa.aiwan.run',
        'favicon': peppa,
        'desc': 'A tool for leaning English by Peppa Pig.',
      },
    ],
  },
  Toys: {
    'name': 'Toys',
    'url': '/',
    'desc': 'some toys',
    'data-umami-event': 'click-toys-link',
    'content': [
      {
        'name': 'Ai',
        'data-umami-event': 'click-ai-link',
        'link': 'https://ai.aiwan.run/',
        'favicon': ai,
        'desc': 'A free client first AI apps.',
      },
      {
        'name': 'V',
        'data-umami-event': 'click-v-link',
        'link': 'https://v.aiwan.run/',
        'favicon': v,
        'desc': 'some visualization',
      },
      {
        'name': 'Emoji Kitchen',
        'data-umami-event': 'click-emoji-kitchen-link',
        'link': 'https://emoji.aiwan.run/',
        'favicon': emoji,
        'desc': 'A emoji kitchen.',
      },
      {
        'name': 'Reader Markdown',
        'data-umami-event': 'click-reader-markdown-link',
        'link': 'https://rm.aiwan.run/',
        'favicon': rm,
        'desc': 'A markdown reader by web.',
      },
    ],
  },
}

const FindMeLinks: {
  'url': string
  'name': string
  'data-umami-event': string
  'icon': IconType
}[] = [
  {
    'url': 'https://github.com/Debbl/',
    'name': 'Github',
    'data-umami-event': 'click-github-link',
    'icon': (props) => <Icon.LuGithub {...props} />,
  },
  {
    'url': 'https://space.bilibili.com/174865648/',
    'name': '哔哩哔哩',
    'data-umami-event': 'click-bilibili-link',
    'icon': (props) => <Icon.RiBilibiliLine {...props} />,
  },
  {
    'url': 'mailto:me@aiwan.run',
    'name': 'Email',
    'data-umami-event': 'click-email-link',
    'icon': (props) => <Icon.MdiOutlineEmail {...props} />,
  },
]

export default function Home() {
  return (
    <>
      <BackgroundStage />

      <main className='relative pb-10'>
        <div className='flex flex-col items-center'>
          <div className='mt-20'>
            <Icon.MAvatar
              whileHover={{
                rotate: 0,
              }}
              animate={{
                rotate: 360,
                transition: {
                  delay: 0.5,
                  duration: 1,
                  type: 'spring',
                },
              }}
              transition={{
                type: 'spring',
                duration: 0.8,
              }}
              className='size-12 cursor-pointer rounded-full'
            />
            <span className='sr-only'>Avatar</span>
          </div>
          <h1 className='text-2xl font-bold'>Brendan Dash</h1>
          <p className='px-4 text-sm text-gray-600'>
            Hi, I'm Brendan Dash. You can find some toys, games, and other
            projects here that I've created.
          </p>
          <div>
            <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-12'>
              {Object.entries(projects).map(([_, project]) => (
                <div key={project.name}>
                  <h2 className='hover:text-primary cursor-pointer text-lg font-bold text-black transition-colors'>
                    {project.name}
                  </h2>
                  <div className='text-sm text-gray-600'>{project.desc}</div>

                  <ul className='mt-2'>
                    {project.content.map((item) => (
                      <li className='my-3' key={item.name}>
                        <Link
                          href={item.link}
                          className='hover:text-primary text-sm transition-colors'
                          target='_blank'
                          data-umami-event={item['data-umami-event']}
                        >
                          <div className='flex items-center gap-x-3'>
                            <div>
                              <Image
                                alt={item.name}
                                src={item.favicon ?? ''}
                                width={16}
                                height={16}
                                className='dark:bg-foreground mr-1 inline-block size-4 dark:rounded'
                              />
                            </div>
                            <div>
                              <h3>{item.name}</h3>
                              <p className='text-xs'>{item.desc}</p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className='mt-6 sm:mt-10'>
              <h3 className='text-lg font-bold'>Find Me</h3>
              <div className='mt-4 flex items-center gap-x-4'>
                {FindMeLinks.map((i) => (
                  <Link
                    key={i.name}
                    href={i.url}
                    data-umami-event={i['data-umami-event']}
                    className='hover:border-primary inline-flex items-center gap-x-1 border-b px-2 transition-colors'
                  >
                    <i.icon className='size-5' />
                    <span>{i.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
