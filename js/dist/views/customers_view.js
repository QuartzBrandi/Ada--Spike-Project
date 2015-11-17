// Generated by CoffeeScript 1.10.0
(function() {
  window.CustomersView = Backbone.View.extend({
    template: _.template('<button type="button" class="btn btn-primary btn-lg all"><h2>Customers</h2></button> <div class="btn-group" role="group" aria-label="button group"><a href="" class="btn btn-default disabled" role="button">Sort:</a><button type="button" class="btn btn-default sort-id">ID</button><button type="button" class="btn btn-default sort-name">Name</button></div><div><input type="text" class="form-control search-field" placeholder="Search for..."></div><div class="results"></div>'),
    events: {
      'click button.all': 'fetchAll',
      'click button.sort-id': 'sortId',
      'click button.sort-name': 'sortName',
      'keyup input.search-field': 'search'
    },
    search: function(e) {
      console.log("WHY");
      return this.fetching((function(_this) {
        return function() {
          var filteredArray, searchQuery;
          searchQuery = _this.$el.find('input').val();
          filteredArray = _.filter(_this.collection.models, function(person) {
            return person.attributes.name.match(new RegExp(searchQuery, 'i'));
          });
          console.log("BEFORE COLLECTION FILTERED", _this.collection);
          _this.collection.reset(filteredArray);
          _this.refreshList();
          return console.log("COLLECTION FILTERED", _this.collection);
        };
      })(this));
    },
    initialize: function() {
      this.collection.on('reset', function() {
        return console.log("reset");
      });
      return this.collection.on('change', function() {
        return console.log("change");
      });
    },
    render: function() {
      this.$el.html(this.template);
      return this.addAll();
    },
    refreshList: function(collection) {
      this.$el.find('.results').empty();
      return this.addAll();
    },
    fetchAll: function() {
      return this.fetching(this.refreshList.bind(this));
    },
    updateAll: function() {
      return this.fetching();
    },
    fetching: function(callback) {
      console.log("thing");
      console.log("collection", this.collection);
      return this.collection.fetch({
        success: (function(_this) {
          return function(collection, response, options) {
            if (callback) {
              return callback();
            }
          };
        })(this)
      });
    },
    sortId: function() {
      console.log("SORT COLLECTION", this.collection);
      return this.sortAttr("id");
    },
    sortName: function() {
      console.log("SORT COLLECTION", this.collection);
      return this.sortAttr("name");
    },
    sortAttr: function(attr) {
      var orderedCollection, reverseCollection;
      if (this.sortType === attr) {
        reverseCollection = this.collection.toJSON();
        reverseCollection.reverse();
        this.collection.reset(reverseCollection);
      } else {
        orderedCollection = this.collection.sortBy(attr);
        this.collection.reset(orderedCollection);
        this.sortType = attr;
      }
      return this.refreshList();
    },
    addAll: function() {
      return this.collection.forEach(this.addOne, this);
    },
    addOne: function(customer) {
      var customerView;
      customerView = new CustomerView({
        model: customer
      });
      customerView.render();
      return this.$el.find('.results').append(customerView.el);
    }
  });

}).call(this);
