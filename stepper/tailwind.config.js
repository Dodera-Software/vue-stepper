/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './*.vue',
        './dev/**/*.{vue,js,ts}',
    ],
    darkMode: 'class', // Use class-based dark mode (.dark class on html/body)
    theme: {
        extend: {},
    },
    plugins: [],
}
