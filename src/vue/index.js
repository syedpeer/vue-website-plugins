import { includes, layouts, pages } from './helpers'

export default {
  install (_Vue, { router }) {
    const components = [...includes, ...layouts]

    components.forEach(comp => {
      _Vue.component(comp.name, comp.component)
    })
    router.addRoutes(pages)
  }
}