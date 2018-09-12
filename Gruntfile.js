/* global module */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON(`package.json`),
        curl: {
            'src/colorNamer.js': `https://rawgit.com/lm-n/color-namer/master/lib/colorNamer.js`
        },
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: `;`
            },
            dist: {
                // the files to concatenate
                src: [`src/colorNamer.js`, `src/createHTMLstructure.js`, `src/_data.js`, `src/registry.js`, `src/interceptorHelperFunctions.js`, `src/baseInterceptor.js`, `src/entities/_baseEntity.js`, `src/entities/backgroundEntity.js`, `src/entities/fillEntity.js`, `src/entities/shapeEntity.js`, `src/entities/textEntity.js`, `src/entities/ellipseModeEntity.js`, `src/ntc.min.js`, `src/textInterceptor/*.js`, `src/gridInterceptor/*.js`, `src/soundInterceptor/*.js`],
                // the location of the resulting JS file
                dest: `dist/p5.accessibility.js`
            }
        },
        uglify: {
            options: {
                banner: `/*! p5.accessibility */\n`
            },
            dist: {
                files: {
                    'dist/p5.accessibility.min.js': [`<%= concat.dist.dest %>`]
                }
            }
        },
        watch: {
            files: [`<%= concat.dist.src %>`],
            tasks: [`concat`]
        },
        eslint: {
            source: {
                options: {
                    configFile: `./.eslintrc.js`
                },
                src: [`./src/**/*.js`]
            }
        },
        open: {
            testChrome: {
                path: `http://localhost:8000/test`,
                app: `Chrome`
            },
            testFirefox: {
                path: `http://localhost:8000/test`,
                app: `Firefox`
            },
            testSafari: {
                path: `http://localhost:8000/test`,
                app: `Safari`
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    livereload: 35727,
                    hostname: `*`
                }
            }
        }
    });

    grunt.loadNpmTasks(`grunt-contrib-uglify`);
    grunt.loadNpmTasks(`grunt-contrib-watch`);
    grunt.loadNpmTasks(`grunt-contrib-concat`);
    grunt.loadNpmTasks(`grunt-contrib-connect`);
    grunt.loadNpmTasks(`grunt-curl`);
    grunt.loadNpmTasks(`grunt-open`);

    grunt.registerTask(`default`, [`concat`]);
    grunt.registerTask(`serve`, [`connect:server:keepalive`]);
    grunt.registerTask(`run-tests`, [`serve`, `open`]);
};
