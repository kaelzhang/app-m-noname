module.exports = function (grunt) {
    grunt.initConfig({
        pkg : grunt.file.readJSON("package.json"),

        tpl2mod: {
            html: {
            options: {
                prefix:"module.exports= ",
                suffix:";"
            },
                files: [{
                    expand:true,
                    cwd:"js",
                    src:["**/*.html"],
                    dest:"js",
                    ext:'.html.js'
                }]
            }
        },

        less: {
            development: {
                files: {
                  "css/style.css": "less/style.less"
                }
            }
        },
        watch: {
            styles: {
                files: '**/*.less',
                tasks: ['less']
            },
            html: {
                files: 'js/modules/**/*.html',
                tasks: ['tpl2mod']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-tpl2mod');


    grunt.registerTask('default', ['less']);
};
