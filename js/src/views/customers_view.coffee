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
    # 'click button.all': -> @fetching()
    'click button.all': 'fetchAll'
    'click button.sort-id': 'sortId'
    'click button.sort-name': 'sortName'#-> debugger; @sortName()
    'keyup input.search-field': 'search'

  search: (e) ->
    # if e.which is 13
    console.log("BEFORE ANYTHING", @collection)
    # @fetching(-> console.log("yo"));
    @fetching()
    searchQuery = @$el.find('input').val()
    filteredArray = _.filter(
      @collection.models
      (person) ->
        return person.attributes.name.match(new RegExp(searchQuery, 'i'))
    )
    console.log("BEFORE COLLECTION FILTERED", @collection)
    @collection.reset filteredArray
    @refreshList()
    console.log("COLLECTION FILTERED", @collection)

  initialize: ->
    @collection.on('reset', -> console.log("reset"))
    @collection.on('change', -> console.log("change"))
    # @collection.on
    # NOTHING RIGHT NOW

  render: ->
    @$el.html @template
    @addAll()

  refreshList: (collection) ->
    @$el.find('.results').empty()
    @addAll()

  fetchAll: ->
    @fetching(@refreshList.bind(this))
    # _.bind(@fetching, this, @render)()

  updateAll: ->
    @fetching()

  fetching: (callback) ->
    console.log("fetching", @collection)
    # console.log("collection", @collection)
    @collection.fetch
      success: (collection, response, options) =>
        callback() if callback
        # @refreshList()
        # _.bind(callback, this)() if callback
        console.log("inside")

      # error: _.bind(
      #   (collection, response, options) ->
      #     console.log "ERROR: COLLECITON", collection
      #     console.log "ERROR: RESPONSE", response
      #     console.log "ERROR: OPTIONS", options
      #   this
      # )
    # return "O"

  sortId: ->
    console.log("SORT COLLECTION", @collection)
    @sortAttr "id"

  sortName: ->
    console.log("SORT COLLECTION", @collection)
    @sortAttr "name"

  sortAttr: (attr) ->
    if @sortType is attr
      reverseCollection = @collection.toJSON()
      # console.log("REVERSE COLLECTION", reverseCollection);
      reverseCollection.reverse()
      @collection.reset reverseCollection
    else
      orderedCollection = @collection.sortBy attr
      # console.log("ORDRED COLLECTION", orderedCollection);
      @collection.reset orderedCollection
      @sortType = attr
    @refreshList()

  addAll: ->
    @collection.forEach @addOne, this

  addOne: (customer) ->
    customerView = new CustomerView { model: customer }
    customerView.render()
    @$el.find('.results').append customerView.el
