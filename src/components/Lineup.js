import React, { Component } from "react";
import Player from "./Player";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    border: "3px solid #fff",
    textAlign: "center",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundImage: 'url("/players/Field/search.png")',
    backgroundSize: "150%",
    backgroundRepeat: "no-repeat",
    color: "#fff",
  },
  overlay: {
    background:
      "radial-gradient(circle, rgba(113,113,113,0.7847514005602241) 0%, rgba(0,0,0,0.7511379551820728) 0%)",
  },
};

Modal.setAppElement("#root");

export class Lineup extends Component {
  state = {
    modalIsOpen: false,
    rol: "",
  };

  openModal = (rol) => {
    this.setState({
      modalIsOpen: true,
      rol: rol,
    });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  showPlayers = ({ rol }) => {
    return this.props.lineup
      .filter((player) => player.rol === rol)
      .map((player) => (
        <Player
          key={player.id}
          searchPlayer={this.openModal}
          deletePlayer={this.props.deletePlayer}
          players={player}
        />
      ));
  };

  render() {
    return (
      <div className="col-md-7">
        <div className="field">
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Search a player"
          >
            <div className="container">
              <h2 ref={(subtitle) => (this.subtitle = subtitle)}>
                Select a player ({this.state.rol})
              </h2>
              <input
                type="text"
                className="form-control"
                placeholder="search by name"
                onChange={this.props.searchPlayer}
              />
              <div className="contain search-box">
                {this.props.searched
                  .filter(
                    (player) =>
                      player.rol === this.state.rol && this.state.modalIsOpen
                  )
                  .map((player) => (
                    <Player
                      key={player.id}
                      addPlayer={this.props.addPlayer}
                      modalIsOpen={this.state.modalIsOpen}
                      closeModal={this.closeModal}
                      players={player}
                    />
                  ))}
              </div>
              <button className="btn btn-dark" onClick={this.closeModal}>
                Close
              </button>
            </div>
          </Modal>
          <div className="fw">
            <this.showPlayers rol={"lw"} />
            <this.showPlayers rol={"st"} />
            <this.showPlayers rol={"rw"} />
          </div>
          <div className="md">
            <this.showPlayers rol={"lcm"} />
            <this.showPlayers rol={"cm"} />
            <this.showPlayers rol={"rcm"} />
          </div>
          <div className="df">
            <this.showPlayers rol={"lb"} />
            <this.showPlayers rol={"lcb"} />
            <this.showPlayers rol={"rcb"} />
            <this.showPlayers rol={"rb"} />
          </div>
          <div className="gk">
            <this.showPlayers rol={"gk"} />
          </div>
        </div>
      </div>
    );
  }
}

export default Lineup;
