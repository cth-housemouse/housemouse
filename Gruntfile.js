module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      build: {
        src: ['dist/']
      },
      deploy: {
        src: ['dist/elements', 'dist/index-raw.html', 'dist/vulcanized.html']
      }
    },
    copy: {
      config: {
        expand: true,
        cwd: 'src',
        src: 'CNAME',
        dest: 'dist/'
      },
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
      scripts: {
        src: 'src/scripts/owl.carousel.min.js',
        dest: 'dist/scripts/owl.carousel.min.js'
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
    bowercopy: {
      platform: {
        src: 'platform/platform.js',
        dest: 'dist/vendor/platform.js'
      },
      firebase: {
        src: 'firebase/firebase.js',
        dest: 'dist/vendor/firebase.js'
      },
      scrollreveal: {
        src: 'scrollReveal.js/scrollReveal.js',
        dest: 'dist/scripts/scrollreveal.js'
      },
      firebaseSimpleLogin: {
        src: 'firebase-simple-login/firebase-simple-login.js',
        dest: 'dist/vendor/firebase-simple-login.js'
      },
      polymer: {
        src: 'polymer/**/*',
        dest: 'dist/vendor/polymer'
      },
      coreTooltip: {
        src: 'core-tooltip/**/*',
        dest: 'dist/vendor/core-tooltip'
      },
      firebaseElement: {
        src: 'firebase-element/**/*',
        dest: 'dist/vendor/firebase-element'
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
    vulcanize: {
      files: {
        src: 'dist/index-raw.html',
        dest: 'dist/index.html'
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
          base: 'dist',
          branch: 'master',
          repo: 'git@github.com:cth-housemouse/cth-housemouse.github.io.git'
        },
        src: ['**']
      }
    },
    watch: {
      html: {
        files: ['src/**/*.html'],
        tasks: ['copy:html', 'vulcanize']  
      },
      scripts: {
        files: ['src/scripts/**/*.js'],
        tasks: ['jshint']
      },
      assets: {
        files: ['src/images/**/*', 'src/fonts/**/*'],
        tasks: ['copy:images', 'copy:fonts']
      },
      options: {
        livereload: true
      },
    }
  });

  grunt.registerTask('build', ['clean:build', 'jshint', 'copy', 'bowercopy', 'vulcanize', 'clean:deploy']);
  grunt.registerTask('default', ['build', 'express', 'watch']);
  grunt.registerTask('deploy', ['build', 'gh-pages']);

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-vulcanize');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-gh-pages');
}
