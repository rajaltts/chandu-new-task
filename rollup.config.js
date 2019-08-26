    
import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'
import image from 'rollup-plugin-image';
import postcss from 'rollup-plugin-postcss'
import postcssModules from 'postcss-modules'

//const cssExportMap = {}

const config = {
    input: 'src/index.js',
    external: ['react'],
    plugins: [
        postcss({
            extract:true,
            plugins: []
        }),
        babel({
            exclude: "node_modules/**"
        }),
        uglify(),
        image()
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