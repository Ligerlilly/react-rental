var Rental = React.createClass({
  onDelete: function() {
   if(confirm("Are you sure?")) {
     this.props.handleDelete(this.props);
   }
  },
  render: function() {
    return (
      <div className='rental col-sm-3'>
        <h3 className='rentalCity'>
          City: {this.props.city}
        </h3>
        {this.props.children}
        <a className='btn btn-danger' onClick={this.onDelete}>delete</a>
        <ShowUpdateForm />

     </div>
    );
  }
});
module.exports = Rental;
