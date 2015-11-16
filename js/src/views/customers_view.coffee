window.CustomersView = Backbone.View.extend
  template: _.template(
    '<button type="button" class="btn btn-primary btn-lg all">\
    <h2>Customers</h2>\
    </button> \
    <div class="btn-group" role="group" aria-label="button group">\
    <a href="" class="btn btn-default disabled" role="button">Sort:</a>\
    <button type="button" class="btn btn-default sort-id">ID</button>\
    <button type="button" class="btn btn-default sort-name">Name</button>\
    </div>\
    <div><input type="text" class="form-control" placeholder="Search for..."></div>\
    <div class="results"></div>'
  )

  events:
    'click button.all': 'fetchAll'
    'click button.sort-id': 'sortId'
    'click button.sort-name': 'sortName'
    'keyup input': 'search'

  search: (e) ->
    # if e.which is 13
    @updateAll()
    searchQuery = @$el.find('input').val()
    filteredCollection = _.filter(
      @collection.models
      (person) ->
        return person.attributes.name.match(new RegExp(searchQuery, 'i'))
      this
    )
    @collection.reset filteredCollection
    @refreshList()

  initialize: ->
    # NOTHING RIGHT NOW

  render: ->
    @$el.html @template
    @addAll()

  refreshList: (collection) ->
    @$el.find('.results').empty()
    @addAll()

  fetchAll: ->
    _.bind(@fetching, this, @render)()

  updateAll: ->
    @fetching()

  fetching: (callback) ->
    @collection.fetch
      success: _.bind(
        (collection, response, options) ->
          _.bind(callback, this)() if callback
        this
      )
      error: _.bind(
        (collection, response, options) ->
          console.log "ERROR: COLLECITON", collection
          console.log "ERROR: RESPONSE", response
          console.log "ERROR: OPTIONS", options
        this
      )

  sortId: ->
    @sortAttr "id"

  sortName: ->
    @sortAttr "name"

  sortAttr: (attr) ->
    if @sortType is attr
      reverseCollection = @collection.toJSON()
      reverseCollection.reverse()
      @collection.reset reverseCollection
    else
      orderedCollection = @collection.sortBy attr
      @collection.reset orderedCollection
      @sortType = attr
    @refreshList()

  addAll: ->
    @collection.forEach @addOne, this

  addOne: (customer) ->
    customerView = new CustomerView { model: customer }
    customerView.render()
    @$el.find('.results').append customerView.el
