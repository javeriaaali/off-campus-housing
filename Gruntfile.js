module.exports = function(grunt) {

  var globalConfig = {
    themeDir: 'themes/off-campus-housing'
  };

  // Project configuration.
  grunt.initConfig({

    globalConfig: globalConfig,
    pkg: grunt.file.readJSON('package.json'),
    
    //compile the sass

    sass: {
      dist: { 
        files: {
          '<%=globalConfig.themeDir %>/css/master.css' : '<%=globalConfig.themeDir %>/scss/master.scss'
        },                  // Target
        options: {              // Target options
          style: 'expanded',
//          sourcemap: 'auto',
          loadPath: ['division-project/scss', 'division-project/bower_components/foundation/scss/']
        }
      }
    },

    //concat all the files into the build folder

    concat: {
      js:{
        src: ['division-project/bower_components/jquery/jquery.js',
          'division-project/bower_components/jquery.equalheights/jquery.equalheights.js',
          'division-project/bower_components/fitvids/jquery.fitvids.js',
          'division-project/bower_components/flexslider/jquery.flexslider.js',
          'division-project/bower_components/blazy/blazy.js',
          'division-bar/js/division-bar.js',
          'division-project/js/*.js',
          '<%=globalConfig.themeDir %>/vendor/visible/jquery.visible.js',
          '<%=globalConfig.themeDir %>/js/*.js' ],
        dest: '<%=globalConfig.themeDir %>/build/build.src.js'
      }
    },

    //minify those concated files
    //toggle mangle to leave variable names intact

    uglify: {
      options: {
        mangle: true
      },
      my_target:{
        files:{
        '<%=globalConfig.themeDir %>/build/build.js': ['<%=globalConfig.themeDir %>/build/build.src.js'],
        }
      }
    },
    watch: {
      scripts: {
        files: ['<%=globalConfig.themeDir %>/js/*.js', '<%=globalConfig.themeDir %>/js/**/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: true,
        }
      },
      css: {
        files: ['<%=globalConfig.themeDir %>/scss/*.scss', '<%=globalConfig.themeDir %>/scss/**/*.scss', 'division-project/scss/*.scss','division-project/scss/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: true,
        }
      }
    },

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-watch');

  // Default task(s).
  // Note: order of tasks is very important
  grunt.registerTask('default', ['sass', 'concat', 'uglify', 'watch']);

};
