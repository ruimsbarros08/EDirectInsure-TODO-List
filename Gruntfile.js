module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    express: {
      options: {
        script: './src/server/app.js',
      },
      dev: {}
    },
    watch: {
      express: {
        files: ['./src/server/**/*.js'],
        tasks: ['express:dev'],
        options: {
          spawn: false,
        }
      }
    }
  });

  grunt.registerTask('server', ['express:dev', 'watch'])
};
