    
import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'
import image from 'rollup-plugin-image';
import postcss from 'rollup-plugin-postcss'
import svg from 'rollup-plugin-svg'

//const cssExportMap = {}

const config = {
    input: 'src/index.js',
    external: ['react'],
    plugins: [
        postcss(),
        babel({
            exclude: "node_modules/**"
        }),
        uglify(),
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