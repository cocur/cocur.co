module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /*
            SCULPIN
         */
        'sculpin-generate': {
            options: { bin: './vendor/bin/sculpin' },
            dev: { args: { env: 'dev' } },
            prod: { args: { env: 'prod' } }
        },

        /*
            STYLESHEETS
         */
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    sourcemap: true
                },
                files: {
                    'public_dev/css/master.css': 'source/_sass/master.scss'
                }
            },
            prod: {
                options: {
                    style: 'compressed',
                    sourcemap: false
                },
                files: {
                    'public_prod/css/master.css': 'source/_sass/master.scss'
                }
            }
        },
        cssmin: {
            dev: {
                files: {
                    'public_dev/css/master.css': ['public_dev/css/master.css']
                }
            },
            prod: {
                files: {
                    'public_prod/css/master.css': ['public_prod/css/master.css']
                }
            },
        },

        /*
            JAVASCRIPT
         */
        uglify: {
            prod: {
                files: {
                    'public_prod/js/master.min.js': [
                        // 'bower_components/jquery/dist/jquery.js',
                        'bower_components/instantclick/instantclick.js',
                        // 'bower_components/highlightjs/highlight.pack.js',
                        'bower_components/picturefill/dist/picturefill.js'
                    ]
                }
            },
            dev: {
                files: {
                    'public_dev/js/master.min.js': [
                        // 'bower_components/jquery/dist/jquery.js',
                        'bower_components/instantclick/instantclick.js',
                        // 'bower_components/highlightjs/highlight.pack.js',
                        'bower_components/picturefill/dist/picturefill.js'
                    ]
                }
            }
        },

        /*
            HTML
         */
        devcode: {
            options: {
                html: true,
                js: false,
                css: false,
                clean: true,
                dest: 'prod',
                block: {
                    open: 'devcode',
                    close: 'endcode'
                },
            },
            prod: {
                options: {
                    source: 'public_prod/',
                    dest: 'public_prod/',
                    env: 'prod'
                }
            }
        },

        /*
            CLEAN BUILT FILES
         */
        clean: {
            dev: ['./public_dev'],
            prod: ['./public_prod']
        },

        /*
            WATCH
         */
        watch: {
            all: {
                files: ['source/**/*.html', 'source/**/*.html.twig', 'source/**/*.md', 'source/fonts/*', 'source/img/**'],
                tasks: ['sculpin-generate:dev'],
                options: {
                    livereload: true,
                },
            },
            sass: {
                files: ['source/_sass/**'],
                tasks: ['sass:dev', 'cssmin:dev'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['source/js/*.js'],
                tasks: ['uglify:dev'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sculpin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-devcode');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-responsive-images');

    // Build tasks
    grunt.registerTask('build:dev', ['sculpin-generate:dev', 'sass:dev', 'uglify:dev', 'cssmin:dev']);
    grunt.registerTask('build:prod', [
        'sass:prod',
        'sculpin-generate:prod',
        'devcode:prod',
        'uglify:prod',
        'cssmin:prod'
    ]);
    grunt.registerTask('build', ['build:dev']);
};
