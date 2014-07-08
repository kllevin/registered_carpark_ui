module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    handlebars: {
      compile: {
        options: {
          namespace: "JST"
        },
        files: {
          "path/to/result.js": "path/to/source.hbs",
          "path/to/another.js": ["path/to/sources/*.hbs", "path/to/more/*.hbs"]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-handlebars');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};