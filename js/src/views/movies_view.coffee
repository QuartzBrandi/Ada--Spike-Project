window.MoviesView = Backbone.View.extend
  template: _.template(
    '<button type="button" class="btn btn-primary btn-lg all">\
    <h2>Movies</h2>\
    </button> \
    <div class="btn-group" role="group" aria-label="button group">\
    <a href="" class="btn btn-default disabled" role="button">Sort:</a>\
    <button type="button" class="btn btn-default sort-title">Title</button>\
    <button type="button" class="btn btn-default sort-inventory">Inventory</button>\
    <button type="button" class="btn btn-default sort-release-date">Release Date</button>\
    </div>'
  )

  events:
    'click button.all': 'fetchAll'
    'click button.sort-title': 'sortTitle'
    'click button.sort-inventory': 'sortInventory'
    'click button.sort-release-date': 'sortReleaseDate'

  initialize: ->
    @sortType

  render: ->
    @$el.html(@template)
    @addAll

  fetchAll: ->
    @collection.fetch
      success: _.bind(
        (collection, response, options) ->
          @render()
        this
      )
      error: _.bind(
        (collection, response, options) ->
          console.log("ERROR: COLLECITON", collection);
          console.log("ERROR: RESPONSE", response);
          console.log("ERROR: OPTIONS", options);
        this
      )

  sortTitle: ->
    @sortAttr "title"

  sortInventory: ->
    @sortAttr "release_date"

  sortAttr: (attr) ->
    if @sortType is attr
      reverseCollection = @collection.toJSON()
      reverseCollection.reverse()
      @collection.reset(reverseCollection)
    else
      orderedCollection = @collection.sortBy(attr)
      @collection.reset(orderedCollection)
      @sortType = attr
    @render()

  addAll: ->
    @collection.forEach @addOne, this

  addOne: (movie) ->
    movieView = new MovieView {model: movie}
    movieView.render()
    @$el.append(movieView.el)
