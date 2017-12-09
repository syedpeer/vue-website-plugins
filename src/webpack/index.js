const PrerenderSpaPlugin = require('prerender-spa-plugin')

module.exports = class VueWebsitePrerenderSPAPlugin extends PrerenderSpaPlugin {
  apply (compiler) {
    super.apply(compiler)
    compiler.plugin('emit', (compilation, next) => {
      // Explore each module within the chunk (built inputs):
      let paths = compilation.modules
      paths = paths.map(module => {
        // Explore each source file path that was included into the module:
        return module.fileDependencies
      })
      paths = paths.filter(files => files)
      paths = paths.reduce((acc, arr) => arr.concat(acc))
      paths = paths.map(p => {
        const matcher = p.match(/src\/_pages(.*?)(index)?.vue$/)
        return matcher && matcher[1]
      })
      paths = paths.filter(p => p)
      paths = paths.concat(this.paths)
      this.paths = paths.filter((value, index, self) => self.indexOf(value) === index)
      next()
    })
  }
}
