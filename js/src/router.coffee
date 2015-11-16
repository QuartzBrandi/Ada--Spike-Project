window.Router = new (Backbone.Router.extend
  routes:
    "": "index"

  initialize: ->
    @customers = new Customers()
    @customersView = new CustomersView({collection: @customers})
    @customersView.render()
    $('#customers').html(@customersView.el)

    @movies = new Movies()
    @moviesView = new MoviesView({collection: @movies})
    @moviesView.render()
    $('#movies').html(@moviesView.el)

  start: ->
    Backbone.history.start
      pushState: yes

  index: ->
    # STUFF HAPPENS
)
