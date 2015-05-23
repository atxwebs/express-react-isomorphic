var React = require('react');
var DocumentTitle = require('react-document-title');

var user = require('_server/services/user');

var HomeHandler = React.createClass({
  statics: {
    fetchData: function (params, query) {
      return {
        'user.list': user.list(),
      };
    }
  },
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function() {
    return (
      <DocumentTitle title='Home'>
        <div>
          <h1>Home page</h1>
        </div>
      </DocumentTitle>
    );
  }

});

module.exports = HomeHandler;