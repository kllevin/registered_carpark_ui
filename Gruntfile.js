module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      build: {
        command:[
          'curl http://localhost:4000/registration/registration-3 > static/registration/registration-3.html',
          'curl http://localhost:4000/registration/registration-2 > static/registration/registration-2.html'
        ].join('&&')
      },
      smart: {
        command: function(path) {
          return 'curl http://localhost:4000/' + path + ' > static/' + path + '.html';
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');

  // Default task(s).
  grunt.registerTask('default', ['shell:build']);

};