import { oxlint } from '@debbl/oxc-config'
import { defineConfig } from 'oxlint'

// Injected as globals by `unplugin-auto-import` (see `auto-imports.d.ts`), so
// oxlint has no import to resolve them to. Kept in sync with that file.
const autoImports = [
  'Activity',
  'Fragment',
  'Icon',
  'Link',
  'Suspense',
  'cache',
  'cacheSignal',
  'cn',
  'createContext',
  'createRef',
  'forwardRef',
  'lazy',
  'm',
  'memo',
  'startTransition',
  'use',
  'useActionState',
  'useCallback',
  'useContext',
  'useDebugValue',
  'useDeferredValue',
  'useEffect',
  'useEffectEvent',
  'useId',
  'useImperativeHandle',
  'useInsertionEffect',
  'useLayoutEffect',
  'useMemo',
  'useOptimistic',
  'useReducer',
  'useRef',
  'useState',
  'useSyncExternalStore',
  'useTransition',
]

export default defineConfig({
  extends: [oxlint({ react: true, next: true, a11y: true })],
  globals: Object.fromEntries(autoImports.map((name) => [name, 'readonly'])),
  ignorePatterns: [
    // Prose, not code - the ESLint config excluded these too.
    'content/**/*.md',
    'content/**/*.mdx',
  ],
  overrides: [
    {
      // Vendored from magicui.design. This component scatters meteors with
      // `Math.random()` per page load, which is the effect being asked for -
      // deriving it during render is the whole point, and seeding it
      // deterministically would freeze the shower into one fixed layout.
      // Scoped to this file: the rest of magicui does not need the exemption.
      files: ['src/components/magicui/meteors.tsx'],
      rules: {
        'react/purity': 'off',
      },
    },
  ],
})
