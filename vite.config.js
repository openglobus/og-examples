// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

export default defineConfig({
    plugins: [react()],
    server: {
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