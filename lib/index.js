'use strict'

const os = require('os')
const path = require('path')
const util = require('util')

const debug = util.debuglog('metalsmith-paths')
const defaults = {
  property: 'path',
  directoryIndex: false,
  hrefIndex: false,
  parseWindows: true
}

/**
 * @param {Object} options
 * @return {Function}
 */
module.exports = function (options) {
  options = Object.assign({}, defaults, options)

  return function (files, metalsmith, done) {
    setImmediate(done)

    Object.keys(files).forEach((file) => {
      debug('process file: %s', file)

      // Assign to new file, to not alter the object key
      let toParse = file

      if (options.parseWindows && os.platform() === 'win32') {
        const driveRegex = /^[a-z]:\\{0,2}/i
        toParse = file.replace(driveRegex, '/').replace(/\\{1,2}/g, '/')
        debug(toParse)
      }

      if (path.parse) {
        debug('[node >= 0.11.15] using path.parse')

        files[file][options.property] = path.parse(toParse)
      } else {
        // add file path info
        let extname = path.extname(toParse)

        files[file][options.property] = {
          base: path.basename(toParse),
          dir: path.dirname(toParse).split(path.sep).join('/'),
          ext: extname,
          name: path.basename(toParse, extname)
        }
        debug(files[file][options.property])
      }

      // In some versions of node/path, 'dir' at root may be either '.' or empty
      // Normalize this property to be empty
      if (files[file][options.property].dir === '.') {
        files[file][options.property].dir = ''
      }

      // generate href based on whether the file already has a leading slash or not
      let href = files[file][options.property].dir.startsWith('/') ? '' : '/'

      if (files[file][options.property].dir && files[file][options.property].dir !== '.') {
        href += files[file][options.property].dir + '/'
      }

      const dhref = href

      if (!options.directoryIndex || path.basename(toParse) !== options.directoryIndex) {
        href += path.basename(toParse)
      }

      files[file][options.property].href = href
      files[file][options.property].dhref = dhref
    })
    debug(files)
  }
}
