module.exports = {
    cms: {
        jsx: {
            watch: ["./node_modules/yavi/cms/public/jsx/*.jsx"],
            dest: "./node_modules/yavi/cms/public/js"
        },
        js: {
            watch: ["./node_modules/yavi/cms/public/js/**/*.js"],
            src: "./node_modules/yavi/cms/public/js/*.js",
            dest: "./node_modules/yavi/cms/public/main"
        }
    },
    project: {
        jsx: {
            watch: ["./*/(plugin|admin|theme)/*/public/jsx/**/*.jsx"]
        },
        js: {
            watch: ["./*/(plugin|admin|theme)/*/public/js/**/*.js"]
        },
        scss: {
            watch: ["*/(plugin|admin|theme)/*/public/scss/**/*.scss"]
        }
    },
    babel: {
        jsx: {
            "plugins": [
                ["transform-react-jsx"]
            ]
        },
        js: { presets: ['@babel/preset-env'] }
    },
    babels: {
        jsx: {
            "plugins": [
                ["transform-react-jsx", { "pragma": "Yavi.x" }]
            ]
        },
        js: { presets: ['@babel/preset-env'] }
    }
}