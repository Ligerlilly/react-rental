var ShowUpdateForm = React.createClass({
  onClick: function() {
    $("#" + this.props.id).show();
    $("#" + this.props.id + "showUpdateForm").hide();
  },
  render: function() {
    return (
      <button className='showUpdateForm btn btn-primary' onClick={this.onClick}>Update Rental</button>
    );
  }
});
