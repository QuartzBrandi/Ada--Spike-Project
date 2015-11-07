window.MoviesView = Backbone.View.extend({
  template: _.template('<h4>YOYO</h4>'),

  events: {
    "click": "fetching"
  },

  initialize: function() {

  },

  render: function() {
    this.$el.html(this.template);
    this.addAll();
  },

  fetching: function() {
    console.log("GOT HERE");
    this.collection.fetch({
      // dataType: "jsonp",
      success: function(collection, response, options) {
        console.log("SUCCESS", collection);
      },
      error: function(collection, response, options) {
        console.log("ERROR", collection);
        console.log("RESPONSE ERROR", response);
        console.log("OPTIONS ERROR", options);
      }
    });
  },

  addAll: function() {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(movie) {
    movieView = new MovieView({model: movie});
    movieView.render();
    this.$el.append(movieView.el);
  }
});
