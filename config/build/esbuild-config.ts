import {BuildOptions} from 'esbuild'
import path from 'path'
import {CleanPlugin} from './plugins/CleanPlugin';
import {HTMLPlugin} from "./plugins/HTMLPlugin";
import {postcssModules, sassPlugin} from 'esbuild-sass-plugin';
import autoprefixer from 'autoprefixer';
const copyStaticFiles = require('esbuild-copy-static-files')
const postcssPresetEnv = require('postcss-preset-env')

const postcss = require('esbuild-postcss');

const mode = process.env.MODE || 'development';

const isDev = mode === 'development';
const isProd = mode === 'production';

function resolveRoot(...segments: string[]) {
    return path.resolve(__dirname, '..', '..', ...segments)
}

const config: BuildOptions = {
    outdir: resolveRoot('build'),
    entryPoints: [resolveRoot('src', 'index.jsx')],
    entryNames: '[dir]/bundle.[name]-[hash]',
    assetNames: "[dir]/[name]",
    allowOverwrite: true,
    bundle: true,
    tsconfig: resolveRoot('tsconfig.json'),
    minify: isProd,
    sourcemap: isDev,
    metafile: true,
    loader: {
        '.png': 'file',
        '.svg': 'file',
        '.jpg': 'file',
    },
    plugins: [
        CleanPlugin,
        HTMLPlugin({
            title: 'App',
            cssPath:['./common.css']
        }),
        sassPlugin(
            {
                transform: postcssModules({
                    resolve: (source) => {
                        const {css} = postcss([autoprefixer,postcssPresetEnv({stage: 1})]).process(source);
                        return css;
                    }
                }),
                cssImports: true,
            }
        ),
        copyStaticFiles({
            src: resolveRoot('src', 'assets'),
            dest: resolveRoot('build', 'assets'),
            dereference: true,
            errorOnExist: false,
            preserveTimestamps: true,
            recursive: true,
        }),
        copyStaticFiles({
            src: resolveRoot('src', 'index.css'),
            dest: resolveRoot('build', 'common.css'),
            dereference: true,
            errorOnExist: false,
            preserveTimestamps: true,
            recursive: true,
        })
    ],
}

export default config;

