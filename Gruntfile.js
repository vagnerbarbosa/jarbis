module.exports = function( grunt ) {

  grunt.initConfig({

    uglify : {
      options : {
        mangle : false,
        report: 'gzip'
      },

      my_target : {
        files : {
          'assets/js/main.min.js' : [ 'bower_components/angular/angular.min.js',
                                  'bower_components/PACE/pace.js',
                                  'bower_components/tether/dist/js/tether.min.js',
                                  'bower_components/angular-route/angular-route.min.js',
                                  'bower_components/ng-focus-if/focusIf.min.js',
                                  'local_components/js/app.js',
                                  'local_components/js/config.js',
                                  'local_components/js/home.controller.js',
                                  'local_components/js/fornecedor.controller.js',
                                  'local_components/js/notas.controller.js',
                                  'local_components/js/notas.super.loja.controller.js',
                                  'local_components/js/jquery-2.2.3.min.js',
                                  'local_components/js/jquery.mask.min.js',
                                  'local_components/js/bootstrap.min.js',
                                  'local_components/js/mdb.min.js',
                                  'local_components/js/custom.js',
                                  'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js']
        }
      }
    }, // uglify

    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1,
        report: 'gzip'
      },
      target: {
        files: {
              'assets/css/main.min.css': ['local_components/css/style.css',
              'local_components/css/bootstrap.min.css',
              'local_components/css/mdb.min.css',
              'bower_components/font-awesome/css/font-awesome.min.css',
              'bower_components/PACE/themes/white/pace-theme-flash.css',
              'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css']
        }
      }
    },

imagemin: {
  options: {                       // Target options
        optimizationLevel: 7
      },                          // Task
  dynamic: {                         // Another target
    files: [{
      expand: true,                  // Enable dynamic expansion
      cwd: 'local_components/img/',                   // Src matches are relative to this path
      src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
      dest: 'assets/img/'                  // Destination path prefix
    }]
      }
    },

copy: {
  roboto: {
    files: [
      // includes files within path
      {
        expand: true,
        cwd: 'bower_components/roboto-fontface/fonts/Roboto/',
        src: ['**'],
        dest: 'assets/fonts/roboto/',
        flatten: true,
        filter: 'isFile'
      },

    ],
  },
  font_awesome: {
    files: [
      // includes files within path
      {
        expand: true,
        cwd: 'bower_components/font-awesome/fonts/',
        src: ['**'],
        dest: 'assets/fonts/',
        flatten: true,
        filter: 'isFile'
      },

    ],
  },
},

    watch : {
      options: {
          livereload: true
          },
      dist : {
        files : [
          'local_components/js/**/*',
          'local_components/css/**/*',
          'bower_components/roboto-fontface/fonts/Roboto/**/*',
          'local_components/img/**/*'
        ],

        tasks : [ 'uglify', 'cssmin', 'imagemin', 'copy' ]
      }
    } // watch

  });


  // Plugins do Grunt
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks( 'grunt-contrib-watch' );

  // Tarefas que serão executadas
  grunt.registerTask( 'default', [ 'uglify', 'cssmin', 'imagemin', 'copy', 'watch' ] );

  // Tarefa para Watch
  grunt.registerTask( 'w', [ 'watch' ] );

};
