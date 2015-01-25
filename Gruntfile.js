var pkgjson = require('./bower.json');

var config = {
    pkg: pkgjson,
    app: 'src',
    dist: 'dist'
};

module.exports = function(grunt) {
    grunt.initConfig({
        config: config,
        pkg: config.pkg,
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/reveal.js',
                    src: 'css/reveal.css',
                    dest: '<%= config.dist %>'
                }, {
                    expand: true,
                    cwd: 'bower_components/reveal.js/lib',
                    src: 'css/zenburn.css',
                    dest: '<%= config.dist %>'
                }, {
                    expand: true,
                    cwd: 'bower_components/reveal.js/',
                    src: 'css/print/*.css',
                    dest: '<%= config.dist %>'
                }, {
                    expand: true,
                    cwd: 'bower_components/reveal.js/',
                    src: 'lib/font/source-sans-pro/*',
                    dest: '<%= config.dist %>'
                }, {
                    expand: true,
                    cwd: 'bower_components/reveal.js/lib',
                    src: 'js/*.js',
                    dest: '<%= config.dist %>'
                }, {
                    expand: true,
                    cwd: 'bower_components/reveal.js/plugin/zoom-js',
                    src: 'zoom.js',
                    dest: '<%= config.dist %>/js'
                }, {
                    expand: true,
                    cwd: 'bower_components/reveal.js/plugin/highlight',
                    src: 'highlight.js',
                    dest: '<%= config.dist %>/js'
                }, {
                    expand: true,
                    cwd: 'bower_components/reveal.js/plugin/markdown',
                    src: '*.js',
                    dest: '<%= config.dist %>/js'
                }, {
                    expand: true,
                    cwd: 'bower_components/reveal.js',
                    src: 'css/theme/*.css',
                    dest: '<%= config.dist %>'
                }, {
                    expand: true,
                    cwd: 'bower_components/reveal.js',
                    src: 'js/reveal.js',
                    dest: '<%= config.dist %>'
                }, {
                    expand: true,
                    cwd: 'src/',
                    src: 'index.html',
                    dest: '<%= config.dist %>'
                }]
            }
        }/*, uglify: {
        }*/
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [
        'copy'/*,
        'uglify'*/
    ]);
}
