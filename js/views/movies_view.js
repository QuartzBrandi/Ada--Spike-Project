window.MoviesView = Backbone.View.extend({
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
  ),

  events: {
    'click button.all': 'fetchAll',
    'click button.sort-title': 'sortTitle',
    'click button.sort-inventory': 'sortInventory',
    'click button.sort-release-date': 'sortReleaseDate'
  },

  initialize: function() {
    this.sortType;
  },

  render: function() {
    this.$el.html(this.template);
    this.addAll();
  },

  fetchAll: function() {
    this.collection.fetch({
      success: _.bind(function(collection, response, options) {
        this.render();
      }, this),
      error: _.bind(function(collection, response, options) {
        console.log("ERROR: COLLECITON", collection);
        console.log("ERROR: RESPONSE", response);
        console.log("ERROR: OPTIONS", options);
      }, this)
    });
  },

  sortTitle: function() {
    if (this.sortType == "title") {
      var reverseCollection = this.collection.toJSON();
      reverseCollection.reverse();
      this.collection.reset(reverseCollection);
    } else {
      var orderedCollection = this.collection.sortBy('title');
      this.collection.reset(orderedCollection);
      this.sortType = "title";
    }
    this.render();
  },

  sortInventory: function() {
    if (this.sortType == "inventory") {
      var reverseCollection = this.collection.toJSON();
      reverseCollection.reverse();
      this.collection.reset(reverseCollection);
    } else {
      var orderedCollection = this.collection.sortBy('inventory');
      this.collection.reset(orderedCollection);
      this.sortType = "inventory";
    }
    this.render();
  },

  sortReleaseDate: function() {
    console.log("SORTING");
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
