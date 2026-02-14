import typescript from '@rollup/plugin-typescript';

export default {
    input: 'lib/index.ts',
    output: [
        {
            file: 'dist/browser-image-compression.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'auto',
        },
        {
            file: 'dist/browser-image-compression.mjs',
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        typescript({
            tsconfig: './tsconfig.json',
            declaration: true,
            declarationDir: './dist',
        }),
    ],
};
