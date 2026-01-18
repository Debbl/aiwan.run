// @ts-check
import { spawnSync } from 'node:child_process'
import { serwist } from '@serwist/next/config'

// Using `git rev-parse HEAD` might not the most efficient
// way of determining a revision. You may prefer to use
// the hashes of every extra file you precache.
const revision =
  spawnSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf-8' }).stdout ??
  crypto.randomUUID()

export default serwist({
  swSrc: 'src/app/sw.ts',
  swDest: 'out/sw.js',
  // If you want to precache any other page that is not
  // already detected by Serwist, add them here. Otherwise,
  // delete `revision`.
  additionalPrecacheEntries: [{ url: '/~offline', revision }],
})
