window.Router = new (Backbone.Router.extend({
  routes: {
    "": "index"
  },

  initialize: function() {
    this.customers = new Customers();
    this.customersView = new CustomersView({collection: this.customers});
    this.customersView.render();
    $('#customers').html(this.customersView.el);

    this.movies = new Movies();
    this.moviesView = new MoviesView({collection: this.movies});
    this.moviesView.render();
    $('#movies').html(this.moviesView.el);
  },

  start: function() {
    Backbone.history.start({
      pushState: true
    })
  },

  index: function() {
    // STUFF
  }
}));
