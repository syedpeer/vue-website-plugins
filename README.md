# vue-website-plugins

This package aims at simplifying static site coding with vuejs. It helps VueJS developers coding static sites without the use of static site generators, in few steps. It also allows integrators to put in place static websites with simple html and css components, and then adding reactivity without use of jquery.

## installation

### standard

npm i --save-dev vue-website-plugins

### simpler

If you launch a new project, you can use the [vue-website-template](https://github.com/code-forefront/vue-website-template) that is a vue webpack template embedding vue-website-plugins

## how to use

### follow a simple convention

Code your static pages in a `_pages` directory, your layouts in a `_layouts` directory and some includes such as header in a `_includes` directory, all under under `src`. These directories must exist.

The includes and layouts will simply automatically be registered as components, the pages tree will be used to generate the corresponding static pages.

To do that, simply follow the two others steps.

### use vue plugin

In a VueJS/webpack project, in the `main.js`, use the plugin as follow :

```javascript
import Vue from 'vue'
import router from './router'
import plugin from 'vue-website-plugins/vue'

Vue.use(plugin, {router})
```
Where `router` is your vue-router instance, in history mode. No need to register your static pages over there, just register your special routes that do not correspond to the above convention.

### use webpack plugin

In `webpack.prod.conf.js` first call 

```javascript
const PrerenderSpaPlugin = require('vue-website-plugins/webpack')
```

It's called PrerenderSpaPlugin because it's a simple overload of the [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin). You can use it as is. Of course, here again, no need to specify any route corresponding to your static pages.

Lastly add the plugin as follow :

```javascript
new PrerenderSpaPlugin(
  // Absolute path to compiled SPA
  path.join(__dirname, '../dist'),
  // List of routes to prerender
  []
)
```

## simple example

```text
src
 - main.js
 L _pages
  L index.vue
  L contact
   L index.vue
 L _includes
  L my-header.vue
 L _layouts
  L main-layout.vue
```

### src/_pages/index.vue

```html
<template>
  <main-layout>
    <div class="my-content">
      my content
    </div>
  </main-layout>
</template>

<style>
  .my-content {
    padding: 20px;
  }
</style>

```

### src/_pages/contact/index.vue

```html
<template>
  <main-layout>
    <div @click="sendIt">
      contact
    </div>
  </main-layout>
</template>
<script>
  export default {
    methods: {
      sendIt () {
        console.log('this sends a message')
      }
    }
  }
</script>
```

### src/_layouts/main-layout

```html
<template>
  <div>
    <my-header></my-header>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
```

### src/_includes/my-header

```html
<template>
  <div>menu</div>
</template>
```

### main.js

You can basically instanciate Vue the following way :

```javascript
new Vue({
  el: '#app',
  router,
  template: '<router-view id="app"/>'
})
```

## contributing

You can build the sources with `npm run build` locally and use it with `npm link`
