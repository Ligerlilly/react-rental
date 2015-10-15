var ShowUpdateForm = React.createClass({
  onClick: function() {

    $(".rentalUpdateForm").show();
    $(".showUpdateForm").hide();
  },
  render: function() {
    return (
      <button className='showUpdateForm btn btn-primary' onClick={this.onClick}>Update Rental</button>
    );
  }
});
