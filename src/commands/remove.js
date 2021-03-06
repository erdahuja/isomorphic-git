import path from 'path'

import { GitIndexManager } from '../managers'
import { FileSystem } from '../models'

/**
 * Remove a file from the git index (aka staging area)
 *
 * Note that this does NOT delete the file in the working directory.
 *
 * @link https://isomorphic-git.github.io/docs/remove.html
 */
export async function remove ({
  dir,
  gitdir = path.join(dir, '.git'),
  fs: _fs,
  filepath
}) {
  try {
    const fs = new FileSystem(_fs)
    await GitIndexManager.acquire(
      { fs, filepath: `${gitdir}/index` },
      async function (index) {
        index.delete({ filepath })
      }
    )
    // TODO: return oid?
  } catch (err) {
    err.caller = 'git.remove'
    throw err
  }
}
