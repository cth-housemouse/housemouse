module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      html: {
        expand: true,
        cwd: 'src',
        src: '**/*.{html,css}',
        dest: 'dist/'
      },
      scripts: {
        src: 'src/scripts/housemouse.js',
        dest: 'dist/scripts/housemouse.js'
      },
      fonts: {
        expand: true,
        flatten: true,
        src: 'src/fonts/**/*',
        dest: 'dist/fonts'
      },
      images: {
        expand: true,
        flatten: true,
        src: 'src/images/**/*',
        dest: 'dist/images'
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
      firebase: {
        src: 'firebase/firebase.js',
        dest: 'dist/vendor/firebase.js'
      },
      firebaseSimpleLogin: {
        src: 'firebase-simple-login/firebase-simple-login.js',
        dest: 'dist/vendor/firebase-simple-login.js'
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
    express: {
      dev: {
        options: {
          script: 'server.js'
        }
      }
    },
    jshint: {
      all: ['src/scripts/housemouse.js']
    },
    'gh-pages': {
      production: {
        options: {
          base: 'dist'
        },
        src: ['**']
      }
    },
    watch: {
      html: {
        files: ['src/**/*.html'],
        tasks: ['copy']  
      },
      scripts: {
        files: ['src/scripts/**/*.js'],
        tasks: ['jshint']
      },
      assets: {
        files: ['src/images/**/*', 'src/fonts/**/*'],
        tasks: ['copy']
      },
      options: {
        livereload: true
      },
    }
  });

  grunt.registerTask('build', ['jshint', 'copy', 'bowercopy']);
  grunt.registerTask('default', ['build', 'express', 'watch']);
  grunt.registerTask('deploy', ['build', 'gh-pages']);

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-vulcanize');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-gh-pages');
}
