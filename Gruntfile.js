// Gruntfile

var path_prefix = '';

var global = {
  less:{
    src: 'dev/less/**/*.less',
    dist: path_prefix+'dist/css/main.css'
  },
  scripts: {
    src: 'dev/scripts/**/*.js',
    dist: path_prefix+'dist/js'
  },
  html: {
    src: '',
    dist: path_prefix+'dist/'
  },
  bower: {
    dist: path_prefix+'dist/js/lib',
    includes: [
      'angular',
      'angular-animate',
      'angular-aria',
      'angular-material',
      'angular-route',
      'angular-material-icons'
    ],
    dependencies: {
      'angular-material': ['angular', 'angular-animate', 'angular-aria'],
      'angular-animate': 'angular',
      'angular-aria': 'angular',
      'angular-route': 'angular',
      'angular-material-icons': 'angular'
    }
  }
};

module.exports = function(grunt){
  
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    config: global,
    pkg : grunt.file.readJSON('package.json'),
    // bower contact
    bower_concat : {
      production: {
        dest : '<%=config.bower.dist%>/lib.js',
        include: global.bower.includes,
        dependencies: global.bower.dependencies
      }
    },
    // less
    less: {
      production: {
        options: {
          paths: [global.less.src],
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
            new (require('less-plugin-clean-css'))({})
          ]          
        },
        files: {
          '<%=config.less.dist%>' : global.less.src
        }
      }
    },
    // copy 
    copy: {
      // fonts: {
      //   files: [ 
      //     // copy fonts
      //      {expand: true, cwd: 'bower_components/bootstrap-material-design/fonts/', src: ['**'], dest: 'dist/fonts/'}
      //   ],
      // }
      images: {
        files: [ 
          // copy images
           {expand: true, cwd: 'dev/images/', src: ['**'], dest: 'dist/images/'}
        ],
      }      
    },    
    // concat js
    concat : {
      options:{ 
        separator: ';'        
      },
      views: {
        src: ["dev/views/**/*.js"],
        dest: 'tmp/views.js'
      },
      temp: {
        src: ["<%=config.scripts.src%>"],
        dest: 'tmp/scripts.js'        
      },
      dist: {
        options: {
          // Replace all 'use strict' statements in the code with a single one at the top
          banner: "(function(){'use strict';\n",
          process: function(src, filepath) {
            return '// Source: ' + filepath + '\n' +
              src.replace(/(^|\n)[ \t]*(\(function\(\){'use strict'|\(function\(\){"use strict");?\s*/g, '$1');
          },
          footer: '}()); // ############### End of App'          
        },
        src: ["tmp/scripts.js", "tmp/views.js"],
        dest: '<%=config.scripts.dist%>/<%=pkg.name%>.js'
      }
    },
    // minify uglify
    uglify: {
      options: {
        report: 'min',
        mangle: false,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%=config.scripts.dist%>/<%=pkg.name%>.js': ['<%= concat.dist.dest %>'],
          '<%=path_prefix%>dist/js/lib/lib.min.js': '<%= bower_concat.production.dest %>' // <-- bower_concat
        }
      }
    },    
    // html compressor
    htmlcompressor: {
      compile: {
        files: [{
          expand: true,
          cwd: 'dev/',
          src: ['**/*.html'],
          dest: '<%=config.html.dist%>'
        }],
        options: {
          type: 'html',
          preserveServerScript: true
        }
      }
    },    
    // server
    connect : {
      server: {
        options: {
          port: 9001,
          base: 'dist',
          //keepalive: true,
          open: true
        }
      }
    },
    // watch
    watch : {
      src: {
        options: { livereload: true },
        files: ['Gruntfile.js', global.scripts.src, 'dev/**/*.html', global.less.src, 'dev/views/**/*.js'],
        tasks: ['live']
      }
    }      
  });

  grunt.registerTask('server', 'Server App', ['connect:server', 'watch']);
  grunt.registerTask('live', 'Watch Changes', ['concat', 'htmlcompressor']);
  grunt.registerTask('build', 'Build App', ['bower_concat', 'less', 'concat', 'htmlcompressor', 'copy']);
};