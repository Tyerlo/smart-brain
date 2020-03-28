import React, { Component } from "react";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      age: this.props.user.age,
      pet: this.props.user.pet,
      isProfileOpen: false
    };
  }
  onFormChange = event => {
    switch (event.target.name) {
      case "user-name":
        this.setState({ name: event.target.value });
        break;
      case "user-age":
        this.setState({ age: event.target.value });
        break;
      case "user-pet":
        this.setState({ pet: event.target.value });
        break;
      default:
        return;
    }
  };

  onProfileChange = data => {
    fetch(`http://localhost:3000/profile/${this.props.user.id}`, {
      method: "post",
      headers: { 
      "Content-type": "application/json" ,
      "Authorization": window.sessionStorage.getItem("token") 
    },
      body: JSON.stringify({ formInput: data })
    })
      .then(resp => {
        if(resp.status === 200 || resp.status === 304){
          this.props.toggleModal();
          this.props.loadUser({ ...this.props.user, ...data });
        }
       
      })
      .catch(console.log());
  };
  render() {
    const { user, toggleModal } = this.props;

    const { name, age, pet } = this.state;

    return (
      <div className="profile-modal">
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
          <main className="pa4 black-80 w-80">
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="h3 w3 dib"
              alt="avatar"
            />
            <h1>{name}</h1>
            <h4>{`Image submit by:${user.entries}`}</h4>
            <p>{`Member since: ${new Date(
              user.joined
            ).toLocaleDateString()}`}</p>
            <label className="mt2 fw6" htmlFor="user-name">
              Name:
            </label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder={user.name}
              type="text"
              name="user-name"
              id="name"
            />
            <label className="mt2 fw6" htmlFor="user-age">
              Age:
            </label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder={age}
              type="text"
              name="user-name"
              id="name"
            />
            <label className="mt2 fw6" htmlFor="user-pet">
              Pet:
            </label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder={pet}
              type="text"
              name="user-name"
              id="name"
            />
            <div
              className="mt-4"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <button
                onClick={() => this.onProfileChange({ name, age, pet })}
                className="
            b pa2 
            grow pointer 
            hover-white 
            w-40 
            bg-light-blue
            b--black-20"
              >
                Save
              </button>
              <button
                onClick={toggleModal}
                className="b pa2 
            grow pointer 
            hover-white 
            w-40 
            bg-light-red
            b--black-20"
              >
                Cancel
              </button>
            </div>
          </main>
          <div className="modal-close" onClick={toggleModal}>
            &times;
          </div>
        </article>
      </div>
    );
  }
}

export default Profile;
