window.Movies = Backbone.Collection.extend({
  model: Movie,
  url: "http://localhost:3000/movies/"
});
