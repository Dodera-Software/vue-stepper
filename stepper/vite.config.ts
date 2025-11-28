import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
    plugins: [
        vue(),
        dts({
            insertTypesEntry: true,
            rollupTypes: true,
        }),
        cssInjectedByJsPlugin(),
    ],
    css: {
        postcss: {
            plugins: [
                (await import('tailwindcss')).default,
                (await import('autoprefixer')).default,
            ],
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'index.ts'),
            name: 'VueStepper',
            fileName: 'vue-stepper',
        },
        cssCodeSplit: false,
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
})
