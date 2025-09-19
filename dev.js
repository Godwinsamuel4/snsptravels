#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 Starting SNSP Travel application...');

// Function to create colored output
const colorLog = (color, prefix, data) => {
  const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    reset: '\x1b[0m'
  };
  
  console.log(`${colors[color]}[${prefix}]${colors.reset} ${data}`);
};

// Start backend server
console.log('Starting backend server...');
const backend = spawn('tsx', ['src/index.ts'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'pipe',
  shell: true
});

backend.stdout.on('data', (data) => {
  colorLog('blue', 'BACKEND', data.toString().trim());
});

backend.stderr.on('data', (data) => {
  colorLog('red', 'BACKEND-ERR', data.toString().trim());
});

// Start frontend server
console.log('Starting frontend server...');
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'pipe',
  shell: true
});

frontend.stdout.on('data', (data) => {
  colorLog('green', 'FRONTEND', data.toString().trim());
});

frontend.stderr.on('data', (data) => {
  colorLog('yellow', 'FRONTEND-ERR', data.toString().trim());
});

// Handle process cleanup
const cleanup = () => {
  console.log('\n🛑 Shutting down servers...');
  backend.kill('SIGTERM');
  frontend.kill('SIGTERM');
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Handle child process exits
backend.on('exit', (code) => {
  colorLog('red', 'BACKEND', `Backend exited with code ${code}`);
});

frontend.on('exit', (code) => {
  colorLog('red', 'FRONTEND', `Frontend exited with code ${code}`);
});

console.log('📱 Frontend will be available at: http://localhost:5173');
console.log('🔧 Backend API will be available at: http://localhost:8080');
console.log('💡 Press Ctrl+C to stop both servers');