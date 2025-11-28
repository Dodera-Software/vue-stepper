import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
    plugins: [vue()],
    root: resolve(__dirname, 'dev'),
    css: {
        postcss: {
            plugins: [
                (await import('tailwindcss')).default,
                (await import('autoprefixer')).default,
            ],
        },
    },
    server: {
        port: 3000,
        open: true,
    },
})
