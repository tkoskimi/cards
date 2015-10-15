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
        plugins: 'vendor/bin',
        php: 'dev/src/cards',
        reports: 'docs/reports',
        doc: 'docs'
    };

    grunt.initConfig( {
        directories: directoryConfig,

        phpcs: {
            application: {
                src: [
                    '<%= directories.php %>/**/*.php',
                    '!<%= directories.php %>/bootstrap/cache/**',
                    '!<%= directories.php %>/vendor/**',
                    '!<%= directories.php %>/database/**'
                ]
            },
            options: {
                bin: '<%= directories.plugins %>/phpcs',
                standard: 'PSR1'
            }
        },

        phplint: {
            options: {
                swapPath: '/tmp'
            },
            good: [
                '<%= directories.php %>/**/*.php',
                '!<%= directories.php %>/vendor/**/*.php'
            ]
        },

        phpunit: {
            classes: {
                dir: '<%= directories.php %>/tests'
            },
            options: {
                bin: '<%= directories.plugins %>/phpunit',
                bootstrap: '<%= directories.php %>/bootstrap/autoload.php',
                staticBackup: false,
                colors: true,
                noGlobalsBackup: false
            }
        },

        phpmd: {
            application: {
                dir: '<%= directories.php %>'
            },
            options: {
                bin: '<%= directories.plugins %>/phpmd',
                rulesets: 'codesize,unusedcode,naming',
                suffixes: 'php',
                exclude:
                    '*/<%= directories.php %>/bootstrap/cache' + ',' + 
                    '*/<%= directories.php %>/database' + ',' +
                    '*/<%= directories.php %>/vendor',
                reportFile:
                    '<%= directories.reports %>/phpmd/<%= grunt.template.today("isoDateTime") %>.xml'
            }
        },

        phpdocumentor: {
            dist: {
                bin: '<%= directories.plugins %>/phpdoc.php',
                directory: '<%= directories.php %>',
                target: '<%= directories.doc %>/api',
                ignore: [
                    '<%= directories.php %>/bootstrap/cache/*',
                    '<%= directories.php %>/database/*',
                    '<%= directories.php %>/vendor/*'
                ]
            }
        },

        mkdir: {
            phpmd: {
                options: {
                    create: [ '<%= directories.reports %>/phpmd' ]
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
        }

    } );

    grunt.loadNpmTasks( 'grunt-shell' );
    grunt.loadNpmTasks( 'grunt-phpcs' );
    grunt.loadNpmTasks( 'grunt-phplint' );
    grunt.loadNpmTasks( 'grunt-phpunit' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-phpcpd' );
    grunt.loadNpmTasks( 'grunt-phpmd' );
    grunt.loadNpmTasks( 'grunt-mkdir' );

    grunt.registerTask( 'phpdocs', [ 'phpdocumentor' ] );
    grunt.registerTask( 'mkdir-phpmd', [ 'mkdir:phpmd', 'phpmd' ] );
    grunt.registerTask( 'default', [ 'phpcs', 'phplint:good', 'phpunit', 'mkdir-phpmd' ] );
};