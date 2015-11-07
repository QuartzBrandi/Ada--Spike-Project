window.Movie = Backbone.Model.extend({
  urlRoot: "http://localhost:3000/movies/",
  parse: function(response) {
    response.description = response.overview;
    delete response.overview;
    return response;
  }
});
