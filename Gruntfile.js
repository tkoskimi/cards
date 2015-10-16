// @see https://www.npmjs.com/package/grunt-phpcs
// @see https://www.npmjs.com/package/grunt-phplint
// @see https://www.npmjs.com/package/grunt-phpunit
// @see http://mariehogebrandt.se/articles/using-grunt-php-quality-assurance-tools/

module.exports = function( grunt ) {

    //require( 'time-grunt' )(grunt);
    //require( 'load-grunt-tasks' )(grunt);
    grunt.loadTasks( 'tasks' );

    var directoryConfig = {
        basedir: '~/project/cards/',
        build: 'build',
        plugins: 'vendor/bin',
        php: 'dev/src/cards',
        reports: 'docs/reports',
        doc: 'docs'
    };

    grunt.initConfig( {
        phpcs: {
            options: {
                bin: '<%= directories.plugins %>/phpcs',
                standard: 'PSR1'
            },
            application: {
                src: [
                    '<%= directories.php %>/**/*.php',
                    '!<%= directories.php %>/bootstrap/cache/**',
                    '!<%= directories.php %>/database/**',
                    '!<%= directories.php %>/vendor/**'
                ]
            }
        },

        phplint: {
            options: {
                swapPath: '/tmp'
            },
            good: [
                '<%= directories.php %>/**/*.php',
                '!<%= directories.php %>/bootstrap/cache/**',
                '!<%= directories.php %>/database/**',
                '!<%= directories.php %>/vendor/**'
            ]
        },

        phpunit: {
            options: {
                bin: '<%= directories.plugins %>/phpunit',
                bootstrap: '<%= directories.php %>/bootstrap/autoload.php',
                staticBackup: false,
                colors: true,
                noGlobalsBackup: false
            },
            classes: {
                dir: '<%= directories.php %>/tests'
            }
        },

        phpmd: {
            options: {
                bin: '<%= directories.plugins %>/php/phpmd',
                rulesets: 'codesize,unusedcode,naming',
                suffixes: 'php',
                exclude:
                    '*/<%= directories.php %>/bootstrap/cache' + ',' + 
                    '*/<%= directories.php %>/database' + ',' +
                    '*/<%= directories.php %>/vendor',
                reportFile:
                    '<%= directories.reports %>/phpmd/<%= grunt.template.today("isoDateTime") %>.xml'
            },
            application: {
                dir: '<%= directories.php %>'
            }
        },

        phpdocumentor: {
            dist: {
                bin: '<%= directories.plugins %>/phpdoc.php',
                directory: '<%= directories.php %>',
                target: '<%= directories.doc %>/api/php',
                ignore: [
                    '<%= directories.php %>/bootstrap/cache/*',
                    '<%= directories.php %>/database/*',
                    '<%= directories.php %>/vendor/*'
                ]
            }
        },

        clean: {
            build: [ '<%= directories.build %>' ]
        },

        copy: {
            build: {
                files: [ { expand: true, src: [ 'dev/**' ], dest: '<%= directories.build %>' } ]
            }
        },

        mkdir: {
            phpmd: {
                options: {
                    create: [ '<%= directories.reports %>/php/phpmd' ]
                }
            }
        },

        shell: {
            options: {
                stderr: false
            },
            target: {
                command: 'ls'
            }
        },

        directories: directoryConfig
    } );

    grunt.loadNpmTasks( 'grunt-shell' );
    grunt.loadNpmTasks( 'grunt-phpcs' );
    grunt.loadNpmTasks( 'grunt-phplint' );
    grunt.loadNpmTasks( 'grunt-phpunit' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-phpcpd' );
    grunt.loadNpmTasks( 'grunt-phpmd' );
    grunt.loadNpmTasks( 'grunt-mkdir' );

    grunt.registerTask( 'phpdocs', [ 'phpdocumentor' ] );
    grunt.registerTask( 'mkdir-phpmd', [ 'mkdir:phpmd', 'phpmd' ] );
    grunt.registerTask( 'test', [ 'phpunit' ] );

    grunt.registerTask( 'build',
        [ 'phpcs', 'phplint:good', 'mkdir-phpmd', 'test', 'clean:build', 'copy:build' ] );

    grunt.registerTask( 'default', [ 'build' ] );

};