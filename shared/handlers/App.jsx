var React = require('react');
var Router = require('react-router');

var AppHandler = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function () {
    var name = this.context.router.getCurrentPath();
    return (
      <div className="content">
        <Router.RouteHandler key={name} {...this.props} />
      </div>
    );
  }

});

module.exports = AppHandler;