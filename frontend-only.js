#!/usr/bin/env node

// Script to run only the frontend using Vite
import { createServer } from 'vite'

const server = await createServer({
  configFile: './vite.config.ts',
  server: {
    host: '0.0.0.0',
    port: 5000
  }
})

await server.listen()
console.log('Frontend-only Vite server running on http://localhost:5000')