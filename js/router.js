window.Router = new (Backbone.Router.extend({
  routes: {
    "": "index"
  },

  initialize: function() {
    // this.customers = new Customers();
    // this.customers.fetch({
    //   success: function(collection, response, options) {
    //     console.log(collection);
    //   },
    //   error: function(collection, response, options) {
    //     console.log(collection);
    //   }
    // });
    // this.customersView = new CustomersView({collection: this.customers});
    // this.customersView.render();
    // $('#customers').html(this.customersView.el);

    this.movies = new Movies();
    console.log("STUFF")

    console.log("STUFF2")
    this.moviesView = new MoviesView({collection: this.movies});
    console.log("STUFF3")
    this.moviesView.render();
    console.log("STUFF4")
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
