import { resolve } from 'path'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { HeadlessUiResolver } from 'unplugin-vue-components/resolvers'
import SvgLoader from 'vite-svg-loader'

export default () => ({
  publicDir: 'fake_dir_so_nothing_gets_copied',
  build: {
    manifest: true,
    outDir: resolve(__dirname, '../public'),
    rollupOptions: {
      input: './main.ts',
    },
  },
  plugins: [
    Vue(),

    AutoImport({
      imports: [
        'vue',
        {
          '@inertiajs/inertia': ['Inertia'],
          '@inertiajs/inertia-vue3': ['usePage', 'useForm'],
          '@vueuse/core': ['throttledWatch'],
        },
      ],
      dts: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: ['components'],
      dts: true,
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
        HeadlessUiResolver(),
        (name) => {
          // where `name` is always CapitalCase
          if (['Head', 'Link'].includes(name))
            return { importName: name, path: '@inertiajs/inertia-vue3' }
        },
      ],
    }),

    // https://github.com/antfu/unplugin-icons
    Icons(),

    // https://github.com/jpkleemans/vite-svg-loader
    SvgLoader(),
  ],
  resolve: {
    alias: {
      '@': resolve('./'),
    },
  },
})
