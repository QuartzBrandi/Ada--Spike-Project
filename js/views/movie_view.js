window.MovieView = Backbone.View.extend({
  className: "movie",
  template: _.template(
    "<h3><%= title %></h3><span><%= inventory %></span>\
    <p><%= description %></p>"
  ),
  render: function() {
    this.$el.html(this.template(this.model.attributes));
  }
});
