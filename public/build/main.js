var Rental = React.createClass({displayName: "Rental",
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
      React.createElement("div", {className: "rental col-sm-3"}, 
        React.createElement("h3", {className: "rentalCity"}, 
          "City: ", this.props.city
        ), 
        this.props.children, 
        React.createElement("a", {className: "btn btn-danger", onClick: this.onDelete}, "delete"), 
        React.createElement(ShowUpdateForm, {id: this.props.id}), 
        React.createElement(UpdateRentalForm, {data: this.props, id: this.props.id, update: this.update})

     )
    );
  }
});

var RentalBox = React.createClass({displayName: "RentalBox",
  getInitialState: function() {
    return { data: [] };
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(data);
        this.setState({ data: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log( this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleRentalSubmit: function(rental) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: rental,
      cache: false,
      success: function(data) {
        console.log(data);
        this.setState({ data: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  delete: function(rental) {
    debugger;
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'DELETE',
      contentType: 'application/json',
      data:  JSON.stringify({city: rental.city, owner: rental.owner, bedrooms: rental.bedrooms, id: rental.id}),
      cache: false,
      success: function(data) {
        console.log(data);
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }.bind(this)

    });
  },
  update: function(data) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(data),
      cache: false,
      success: function(data) {
        console.log(data);
        this.setState({ data: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },


  render: function() {
    return(
      React.createElement("div", {className: "rentalBox"}, 
        React.createElement("h1", null, "Rentals"), 
        React.createElement("div", {className: "row form-button"}, 
          React.createElement(RentalForm, {onRentalSubmit: this.handleRentalSubmit}), 
          React.createElement(ShowForm, null)
        ), 
        React.createElement("div", {className: "row"}, 
          React.createElement(RentalList, {data: this.state.data, onHandleDelete: this.delete, update: this.update})
        )
      )
    );
  }
});

var RentalForm = React.createClass({displayName: "RentalForm",
  hideForm: function() {
    $('.rentalForm').hide();
    $('.showForm').show();

  },
  handleSubmit: function(e) {
    e.preventDefault();
    $(".rentalForm").hide();
    $(".showForm").show();
    var city = React.findDOMNode(this.refs.city).value.trim();
    var owner = React.findDOMNode(this.refs.owner).value.trim();
    var bedrooms = React.findDOMNode(this.refs.bedrooms).value.trim();
    if (!city || !owner || !bedrooms){
      return;
    }

    this.props.onRentalSubmit({ city: city, owner: owner, bedrooms: bedrooms });
    React.findDOMNode(this.refs.city).value = '';
    React.findDOMNode(this.refs.owner).value = '';
    React.findDOMNode(this.refs.bedrooms).value = '';
    return;
  },
  render: function() {
    return (
      React.createElement("form", {className: "rentalForm", onSubmit: this.handleSubmit}, 
        React.createElement("div", {className: "form-group"}, 
          React.createElement("label", null, "Enter City:"), 
          React.createElement("input", {type: "text", className: "form-control", placeholder: "Enter city", ref: "city", required: "required"})
        ), 
        React.createElement("div", {className: "form-group"}, 
          React.createElement("label", null, "Enter Owner:"), 
          React.createElement("input", {type: "text", className: "form-control", placeholder: "Enter owner", ref: "owner", required: "required"})
        ), 
        React.createElement("div", {className: "form-group"}, 
          React.createElement("label", null, "Enter Bedrooms:"), 
          React.createElement("input", {className: "form-control", type: "number", min: "1", max: "99", ref: "bedrooms", placeholder: "Enter bedrooms", required: "required"})
        ), 
        React.createElement("button", {className: "btn btn-danger", onClick: this.hideForm}, "Cancel"), 
        React.createElement("button", {type: "submit", value: "Post", className: "btn btn-success"}, "Post")

      )
    );
  }
});

var RentalList = React.createClass({displayName: "RentalList",

  handleDelete: function(data) {
    this.props.onHandleDelete(data);
    },
    update: function(data) {
      this.props.update(data);
    },
  render: function() {
    var rentalNodes = this.props.data.map(function(rental) {
      return (
        React.createElement(Rental, {city: rental.city, owner: rental.owner, bedrooms: rental.bedrooms, handleDelete: this.handleDelete, id: rental.id, update: this.update}, 
          React.createElement("p", null, "Owner: ", rental.owner), 
          React.createElement("p", null, "Number of bedrooms: ", rental.bedrooms)
        )
      );

    }.bind(this));

    return (
      React.createElement("div", {className: "RentalList"}, 
        rentalNodes
      )
    );
  }
});

var ShowForm = React.createClass({displayName: "ShowForm",
  onClick: function() {
    $(".rentalForm").show();
    $(".showForm").hide();
  },
  render: function() {
    return (
      React.createElement("button", {className: "showForm btn btn-primary", onClick: this.onClick}, "Add Rental")
    );
  }
});

var ShowUpdateForm = React.createClass({displayName: "ShowUpdateForm",
  onClick: function() {
    $("#" + this.props.id).show();
    $("#" + this.props.id + "showUpdateForm").hide();
  },
  render: function() {
    return (
      React.createElement("button", {className: "showUpdateForm btn btn-primary", onClick: this.onClick}, "Update Rental")
    );
  }
});

var UpdateRentalForm = React.createClass({displayName: "UpdateRentalForm",
  // getInitialState: function() {
  //   return { values: { city: this.props.data.city, onwer: this.props.data.owner, bedrooms: this.props.data.bedrooms } };
  // },
  handleSubmit: function(e) {
    e.preventDefault();
    var city = React.findDOMNode(this.refs.city).value.trim();
    var owner = React.findDOMNode(this.refs.owner).value.trim();
    var bedrooms = React.findDOMNode(this.refs.bedrooms).value.trim();
    this.setState({ values:
      {
        city: city !== '' ? city : this.props.data.city,
        owner: owner !== '' ? owner : this.props.data.owner,
        bedrooms: bedrooms !== '' ? bedrooms : this.props.data.bedrooms
      }
    });
    console.log(this.state.values);
    this.props.update({ city: city, owner: owner, bedrooms: bedrooms, id: this.props.id });

    React.findDOMNode(this.refs.city).value = '';
    React.findDOMNode(this.refs.owner).value = '';
    React.findDOMNode(this.refs.bedrooms).value = '';
    $('.rentalUpdateForm').hide();
    return;

  },
  hideForm: function() {
    $('.rentalUpdateForm').hide();
    $('.showUpdateForm').show();
  },
  render: function() {
    //var values = this.state.values;
    return (
      React.createElement("form", {className: "rentalUpdateForm", id: this.props.id, onSubmit: this.handleSubmit}, 
        React.createElement("div", {className: "form-group"}, 
          React.createElement("label", null, "Enter City:"), 
          React.createElement("input", {type: "text", className: "form-control", placeholder: "Enter city", ref: "city", placeholder: "Enter City:"})
        ), 
        React.createElement("div", {className: "form-group"}, 
          React.createElement("label", null, "Enter Owner:"), 
          React.createElement("input", {type: "text", className: "form-control", placeholder: "Enter owner", ref: "owner", placeholder: "Enter Owner:"})
        ), 
        React.createElement("div", {className: "form-group"}, 
          React.createElement("label", null, "Enter Bedrooms:"), 
          React.createElement("input", {className: "form-control", type: "number", min: "1", max: "99", ref: "bedrooms", placeholder: "Enter bedrooms", placeholder: "Enter Bedrooms:"})
        ), 
        React.createElement("button", {className: "btn btn-danger", onClick: this.hideForm}, "Cancel"), 
        React.createElement("button", {type: "submit", value: "Post", className: "btn btn-success"}, "Post")

      )
    );
  }
});

React.render(
  React.createElement(RentalBox, {url: "rentals.json"}), document.getElementById('content')
);
