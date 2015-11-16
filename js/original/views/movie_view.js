window.MovieView = Backbone.View.extend({
  className: "movie",
  template: _.template(
"<h3><%= title %></h3>\
Inventory: <%= inventory %><br>\
Release Date: <%= release_date %><br>\
<p><%= description %></p>"
  ),
  render: function() {
    this.$el.html(this.template(this.model.attributes));
  }
});
