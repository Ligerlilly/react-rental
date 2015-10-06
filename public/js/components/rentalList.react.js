var RentalList = React.createClass({

  handleDelete: function(data) {
    this.props.onHandleDelete(data);
    },
  render: function() {
    var rentalNodes = this.props.data.map(function(rental) {
      return (
        <Rental city={rental.city} owner={rental.owner} bedrooms={rental.bedrooms} handleDelete={this.handleDelete}>
          <p>Owner: {rental.owner}</p>
          <p>Number of bedrooms: {rental.bedrooms}</p>


        </Rental>

      );

    }.bind(this));

    return (
      <div className='RentalList'>
        {rentalNodes}
      </div>
    );
  }
});
