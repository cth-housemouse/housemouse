module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      scripts: {
        src: 'src/scripts/housemouse.js',
        dest: 'dist/scripts/housemouse.js'
      },
      fonts: {
        expand: true,
        flatten: true,
        src: 'src/fonts/**/*',
        dest: 'dist/fonts'
      }
    },
    vulcanize: {
      files: {
        src: 'src/index.html',
        dest: 'dist/index.html'
      }
    },
    bowercopy: {
      platform: {
        src: 'platform/platform.js',
        dest: 'dist/vendor/platform.js'
      },
      polymer: {
        src: 'polymer/**/*',
        dest: 'dist/vendor/polymer'
      },
      jquery: {
        src: 'jquery/dist/jquery.js',
        dest: 'dist/vendor/jquery.js'
      },
      mockjson: {
        src: 'mockjson/js/jquery.mockjson.js',
        dest: 'dist/vendor/mockjson.js'
      }
    },
    watch: {
      html: {
        files: ['src/**/*.html'],
        tasks: ['vulcanize']  
      },
      options: {
        livereload: true
      },
    }
  });

  grunt.registerTask('default', ['copy', 'bowercopy', 'vulcanize']);

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-vulcanize');
  grunt.loadNpmTasks('grunt-contrib-watch');
}
