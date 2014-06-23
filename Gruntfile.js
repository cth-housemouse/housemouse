module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      dist: {
        src: 'src/index.html',
        dest: 'dist/index.html'
      }
    },
    bowercopy: {
      platform: {
        src: 'platform/platform.js',
        dest: 'dist/vendor/platform.js'
      },
      jquery: {
        src: 'jquery/dist/jquery.js',
        dest: 'dist/vendor/jquery.js'
      },
      mockjson: {
        src: 'mockjson/js/jquery.mockjson.js',
        dest: 'dist/vendor/mockjson.js'

      }

    }
  });

  grunt.registerTask('default', ['copy', 'bowercopy']);

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bowercopy');
}
