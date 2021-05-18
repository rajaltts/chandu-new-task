import babel from 'rollup-plugin-babel'
import image from 'rollup-plugin-image';
import postcss from 'rollup-plugin-postcss'
import svg from 'rollup-plugin-svg'
import {terser} from 'rollup-plugin-terser'

const config = {
    input: 'src/index.js',
    external: ['react'],
    plugins: [
        postcss(),
        babel({
            exclude: "node_modules/**"
        }),
        terser(),
        image(),
        svg()
    ],
    output: {
        format: 'umd',
        name: 'ngecat-reactcomponents',
        globals: {
            react: "React"
        }
    }
}
export default config