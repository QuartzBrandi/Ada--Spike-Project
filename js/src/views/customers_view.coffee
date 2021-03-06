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
    <div><input type="text" class="form-control search-field" placeholder="Search for..."></div>\
    <div class="results"></div>'
  )

  events:
    'click button.all': 'fetchAll'
    'click button.sort-id': 'sortId'
    'click button.sort-name': 'sortName'
    'keyup input.search-field': 'search'

  search: ->
    @fetching =>
      searchQuery = @$el.find('input').val()
      filteredArray = @collection.models.filter(
        (person) ->
          return person.attributes.name.match(new RegExp(searchQuery, 'i'))
      )
      @collection.reset filteredArray
      @renderList()

  initialize: ->
    # NOTHING RIGHT NOW

  render: ->
    @$el.html @template
    @addAll()

  renderList: ->
    @$el.find('.results').empty()
    @addAll()

  fetchAll: ->
    @fetching(@renderList.bind(this))

  fetching: (callback) ->
    @collection.fetch
      success: (collection, response, options) =>
        callback() if callback
      error: (collection, response, options) =>
        console.log "ERROR: COLLECITON", collection
        console.log "ERROR: RESPONSE", response
        console.log "ERROR: OPTIONS", options

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
    @renderList()

  addAll: ->
    @collection.forEach @addOne, this

  addOne: (customer) ->
    customerView = new CustomerView { model: customer }
    customerView.render()
    @$el.find('.results').append customerView.el
