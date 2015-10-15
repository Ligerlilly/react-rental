var Rental = React.createClass({
  onDelete: function() {
   if(confirm("Are you sure?")) {
     this.props.handleDelete(this.props);
   }
  },
  update: function(data){
    this.props.update(data);
  },
  render: function() {
    return (
      <div className='rental col-sm-3'>
        <h3 className='rentalCity'>
          City: {this.props.city}
        </h3>
        {this.props.children}
        <a className='btn btn-danger' onClick={this.onDelete}>delete</a>
        <ShowUpdateForm id={this.props.id}/>
        <UpdateRentalForm data={this.props} id={this.props.id} update={this.update}/>

     </div>
    );
  }
});
