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
      scriptsOwl: {
        src: 'src/scripts/owl.carousel.min.js',
        dest: 'dist/scripts/owl.carousel.min.js'
      },
      cthVersionScrollReveal: {
        src: 'src/scripts/CTH-VERSION-scrollReveal.js',
        dest: 'dist/scripts/CTH-VERSION-scrollReveal.js'
      },
      cthVersionBootstrap: {
        src: 'src/scripts/CTH-VERSION-bootstrap.js',
        dest: 'dist/scripts/CTH-VERSION-bootstrap.js'
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
      },
      styles: {
        expand: true,
        flatten: true,
        src: 'src/styles/**/*',
        dest: 'dist/styles'
      }  
    },

    bowercopy: {
      platform: {
        src: 'platform/platform.js',
        dest: 'dist/vendor/platform.js'
      },
      // for safari
      platformMap: {
        src: 'platform/platform.js.map',
        dest: 'dist/vendor/platform.js.map'
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
      coreTooltip: {
        src: 'core-tooltip/**/*',
        dest: 'dist/vendor/core-tooltip'
      },
      coreCollapse: {
        src: 'core-collapse/**/*',
        dest: 'dist/vendor/core-collapse'
      },
      coreOverlay: {
        src: 'core-overlay/**/*',
        dest: 'dist/vendor/core-overlay'
      },
      coreTransitionforOverlay: {
        src: 'core-transition/**/*',
        dest: 'dist/vendor/core-transition'
      },
      coreMetaforOverlay: {
        src: 'core-meta/**/*',
        dest: 'dist/vendor/core-meta'
      },
      firebaseElement: {
        src: 'firebase-element/**/*',
        dest: 'dist/vendor/firebase-element'
      },
      jquery: {
        src: 'jquery/dist/*',
        dest: 'dist/vendor/jquery'
      },
      jqueryEasingPlugin: {
        src: 'jquery.easing/js/jquery.easing.min.js',
        dest: 'dist/vendor/jquery.easing.min.js'
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
      css: {
        files: ['src/**/*.css'],
        tasks: ['copy:styles', 'vulcanize']  
      },
      scripts: {
        files: ['src/scripts/**/*.js'],
        tasks: ['jshint']
      },
      assets: {
        files: ['src/images/**/*', 'src/fonts/**/*', 'src/styles/**/*'],
        tasks: ['copy:images', 'copy:fonts', 'copy:styles']
      },
      options: {
        livereload: true  
      }
    }
  });

  grunt.registerTask('build', ['clean:build', 'jshint', 'copy', 'bowercopy', 'vulcanize']);
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
