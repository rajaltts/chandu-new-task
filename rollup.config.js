import babel from 'rollup-plugin-babel'
import image from 'rollup-plugin-image';
import postcss from 'rollup-plugin-postcss'
import svgr from '@svgr/rollup'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH;

const umd = {
    format: 'umd',
    name: 'ngecat-reactcomponents',
    file: "dist/ngecat-reactcomponents.min.js",
    globals: {
        react: "React"
    }
}

const esm = {
    format: 'esm',
    name: 'ngecat-reactcomponents',
    file: "dist/ngecat-reactcomponents.min.js",
    sourceMap: true,
    globals: {
        react: "React"
    }
}

const config = {
    input: 'src/index.js',
    external: ['react'],
    cache: true,
    watch: {
        chokidar: true,
        clearScreen: true,
        include: ['src/**'],
        exclude: ['node_modules/**', 'src/__tests__', '**/*.test.js', 'dist'],
    },
    plugins: [
        postcss(),
        babel({
            exclude: "node_modules/**"
        }),
        terser(),
        image(),
        svgr()
    ],
    output: production ? umd : esm
}
export default config