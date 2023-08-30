// vite.config.js
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

export default defineConfig({
    base: './',
    plugins: [react()],
    server: {
        host: '127.0.0.1',
        port: 3000,
        proxy: {
            '/og_resources': 'https://pavletto.github.io'
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './'),
        },
    },
})