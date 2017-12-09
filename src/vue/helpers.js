function requireAll (type) {
  let requireContext
  switch (type) {
    case 'page':
      requireContext = require.context('@/_pages', true, /^\.\/.*\.vue$/)
      break
    case 'include':
      requireContext = require.context('@/_includes', true, /^\.\/.*\.vue$/)
      break
    case 'layout':
      requireContext = require.context('@/_layouts', true, /^\.\/.*\.vue$/)
      break
  }

  return requireContext.keys().map(key => {
    const comp = requireContext(key).default
    const match = key.match('^\\.((.*?)([^/]*?))(index)?.vue$')
    console.log(match)
    return {
      component: comp,
      path: match[1],
      name: match[3]
    }
  })
}

const pages = requireAll('page')
const includes = requireAll('include')
const layouts = requireAll('layout')

export {
  pages,
  includes,
  layouts
}
