module.exports = function( grunt ) {

  grunt.initConfig({

    uglify : {
      options : {
        mangle : false
      },

      my_target : {
        files : {
          'assets/js/main.js' : [ 'bower_components/angular/angular.min.js',
                                  'bower_components/angular-route/angular-route.min.js',
                                  'bower_components/PACE/pace.js',
                                  'local_components/js/app.js',
                                  'local_components/js/config.js',
                                  'local_components/js/home.controller.js',
                                  'local_components/js/fornecedor.controller.js',
                                  'local_components/js/notas.controller.js',
                                  'local_components/js/notas.super.loja.controller.js',
                                  'local_components/js/ui-bootstrap-tpls-0.6.0.js',
                                  'local_components/js/jquery-2.2.3.min.js',
                                  'local_components/js/jquery.mask.min.js',
                                  'local_components/js/tether.min.js',
                                  'local_components/js/bootstrap.min.js',
                                  'local_components/js/mdb.min.js',
                                  'local_components/js/custom.js']
        }
      }
    }, // uglify

    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'assets/css/main.css': ['local_components/css/style.css',
              'local_components/css/bootstrap.min.css',
              'local_components/css/mdb.min.css',
              'bower_components/font-awesome/css/font-awesome.min.css',
              'bower_components/roboto-fontface/css/roboto/roboto-fontface.css',
              'bower_components/PACE/themes/white/pace-theme-flash.css']
        }
      }
    },

    watch : {
      dist : {
        files : [
          'assets/_js/**/*',
          'assets/_css/**/*'
        ],

        tasks : [ 'uglify', 'cssmin' ]
      }
    } // watch

  });


  // Plugins do Grunt
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks( 'grunt-contrib-watch' );

  // Tarefas que serão executadas
  grunt.registerTask( 'default', [ 'uglify', 'cssmin' ] );

  // Tarefa para Watch
  grunt.registerTask( 'w', [ 'watch' ] );

};
