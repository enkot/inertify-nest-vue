import { createApp, h } from 'vue'
import { InertiaProgress } from '@inertiajs/progress'
import { createInertiaApp } from '@inertiajs/inertia-vue3'

import Layout from '@/layouts/Main.vue'
import '@/styles/main.css'

InertiaProgress.init()

const asyncViews = () => {
  return import.meta.glob('./pages/**/*.vue')
}

createInertiaApp({
  title: (title) => `${title} - Inertify`,
  resolve: async (name) => {
    let page

    if (import.meta.env.DEV) {
      page = (await import(`./pages/${name}.vue`)).default
    } else {
      const importPage = asyncViews()[`./pages/${name}.vue`]
      page = await importPage().then((module) => module.default)
    }

    page.layout = page.layout || Layout

    return page
  },
  setup({ el, app, props, plugin }) {
    createApp({ render: () => h(app, props) })
      .use(plugin)
      .mount(el)
  },
})
