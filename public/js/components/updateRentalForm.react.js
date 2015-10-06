var UpdateRentalForm = React.createClass({
  handleSubmit(e) {
    e.preventDefault();

  },
  hideForm: function() {
    $('.rentalUpdateForm').hide();
    $('.showUpdateForm').show();
  },
  render: function() {
    return (
      <form className='rentalUpdateForm' onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label>Enter City:</label>
          <input type='text' className='form-control' placeholder='Enter city' ref='city' />
        </div>
        <div className='form-group'>
          <label>Enter City:</label>
          <input type='text' className='form-control' placeholder='Enter owner'  ref='owner' />
        </div>
        <div className='form-group'>
          <label>Enter City:</label>
          <input type='text' className='form-control' placeholder='Enter bedrooms' ref='bedrooms' />
        </div>
        <button className='btn btn-danger' onClick={this.hideForm}>Cancel</button>
        <button type='submit' value='Post' className='btn btn-success'>Post</button>

      </form>
    );
  }
});
