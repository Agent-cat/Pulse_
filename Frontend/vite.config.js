import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Fast Refresh for better DX
      fastRefresh: true,
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Only compress files larger than 10kb
      deleteOriginFile: false,
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false,
    }),
  ],
  assetsInclude: ['**/*.JPG', '**/*.webp', '**/*.avif'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Animation libraries
          'animations': ['framer-motion', 'gsap', '@gsap/react'],
          // 3D libraries (lazy loaded)
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          // UI utilities
          'ui-vendor': ['swiper', 'axios', 'clsx', 'react-use'],
          // Icons
          'icons': ['lucide-react'],
        },
        // Optimize chunk names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 1000,
    // Enable minification with optimized settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2, // Multiple passes for better compression
      },
      mangle: {
        safari10: true, // Fix Safari 10 bugs
      },
      format: {
        comments: false, // Remove all comments
      },
    },
    // Optimize CSS
    cssCodeSplit: true,
    cssMinify: true,
    // Enable source maps only for production debugging (disable for faster builds)
    sourcemap: false,
    // Improve tree-shaking
    reportCompressedSize: false, // Faster builds
    // Target modern browsers for smaller bundles
    target: 'es2020',
  },
  // Optimize deps
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'framer-motion', 
      'gsap',
      'react-router-dom',
      'axios',
      'clsx'
    ],
    exclude: ['@react-three/fiber', '@react-three/drei'], // Lazy load heavy deps
    esbuildOptions: {
      target: 'es2020',
      supported: {
        'top-level-await': true,
      },
    },
  },
  // Performance optimizations
  server: {
    hmr: {
      overlay: false,
    },
    // Enable compression in dev
    middlewareMode: false,
  },
  // Preview server optimizations
  preview: {
    port: 5173,
    strictPort: false,
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
  // Resolve optimizations
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
