# vue-website-plugins

This package aims at simplifying static site coding in vuejs. It helps VueJS developers coding static site without use of static site generator, in one step. It also allows integrators to put in place static websites with simple httml and css components, and then adding reactivity without use of jquery.

## installation

npm i --save vue-website-template

## how to use

### follow a simple convetion

Code your static pages in a `_pages` directory, your layouts in a `_layouts` directory and some includes such as header in a `_includes` directory, all under under `src`. These directories must exist.

The includes and layouts will simply automatically be registered as components, the pages tree will be used to generate corresponding static pages.

To do that, simply follow the two others steps.

### use vue plugin

In a VueJS/webpack project, in the `main.js`, use the plugin as follow :

```
import Vue from 'vue'
import router from './router'
import plugin from 'vue-website-plugins/vue'

Vue.use(plugin, {router})
```
Where `router` is your vue-router instance. No need to register your static pages over there, juste register your special routes that do not correspond to the above convention.

### use webpack plugin

In `webpack.prod.conf.js` first call 

```
const PrerenderSpaPlugin = require('vue-website-plugins/webpack')
```

It's called PrerenderSpaPlugin because it's a simple overload of the prerender-spa-plugin. You can use it as is. Of course, here again, no need to specify any route corresponding to your static pages.

## simple exemple

```
-- src
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

```
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

```
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

```
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

```
<template>
  <div>menu</div>
</template>
```

## contributing

You can build the sources with `npm run build` locally and use it with `npm link`
