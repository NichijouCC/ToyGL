import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import sourceMaps from "rollup-plugin-sourcemaps";
// import camelCase from 'lodash.camelcase'
import typescript from "rollup-plugin-typescript2";
import json from "rollup-plugin-json";
import glsl from 'rollup-plugin-glsl';

import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

export default {
    input: `examples/main.ts`,
    output: [
        { file: "distExamples/dome.js", name: "dome", format: "umd", sourcemap: true },
        // { file: pkg.module, format: 'es', sourcemap: true },
    ],
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: [],
    // watch: {
    //     include: "src/dome/**",
    // },
    plugins: [
        // Allow json resolution
        json(),
        // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
        commonjs(),
        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        resolve(),
        // glsl({
        //     include: ['src/shaders/**/*.glsl', 'src/shaders/*.glsl'],
        //     sourceMap: true,
        //     // compress: production
        // }),
        glsl({
            include: /.*(.glsl|.vs|.fs)$/,
            sourceMap: true,
            compress: false
        }),
        // Compile TypeScript files
        typescript({
            tsconfig: "examples/tsconfig.json",
            tsconfigOverride: { compilerOptions: { declaration: false } },
        }),
        // Resolve source maps to the original source
        sourceMaps(),
        serve({
            contentBase: "./", //启动文件夹;
            host: "localhost", //设置服务器;
            port: 8888, //端口号;
        }),
        livereload({
            watch: "distExamples/", //监听文件夹;
        }),
    ],
};
