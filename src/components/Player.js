import React, { Component } from "react";

export class Player extends Component {
  state = {
    player: {},
  };

  componentDidMount() {
    this.setState({
      player: this.props.players,
    });
  }

  hover = () => {
    this.setState((prevState) => {
      const player = prevState.player;
      player.foto = "/players/Field/search-card.png";
      return {
        player: player,
      };
    });
  };

  noHover = () => {
    this.setState((prevState) => {
      const player = prevState.player;
      player.foto = "/players/Field/card.png";
      return {
        player: player,
      };
    });
  };

  render() {
    if (this.state.player.lineup) {
      if (this.state.player.nombre !== "void") {
        return (
          <div className="players">
            <img
              draggable="false"
              src={this.state.player.foto}
              alt={this.state.player.nombre}
            />
            <h5>{this.state.player.rol}</h5>
            <button
              onClick={() => {
                this.props.deletePlayer(this.state.player.rol);
              }}
              className="btn btn-sm btn-danger"
            >
              <i className="fa fa-minus fa-lg"></i>
            </button>
          </div>
        );
      }
      return (
        <div className="players">
          <div
            className="card-player"
            onMouseLeave={this.noHover}
            onMouseEnter={this.hover}
            onClick={() => {
              this.props.searchPlayer(this.state.player.rol);
            }}
          >
            <img
              draggable="false"
              src={this.state.player.foto}
              alt={this.state.player.nombre}
            />
          </div>
          <h5>{this.state.player.rol}</h5>
          <button className="btn btn-sm btn-secondary">
            <i className="fa fa-plus fa-lg"></i>
          </button>
        </div>
      );
    }
    if (this.props.modalIsOpen) {
      return (
        <div className="players">
          <div
            draggable="false"
            className="modal-card"
            onClick={() => {
              this.props.addPlayer(this.state.player.id);
              this.props.closeModal();
            }}
          >
            <img src={this.state.player.foto} alt={this.state.player.nombre} />
          </div>
        </div>
      );
    }

    if (this.state.player.nombre !== "void") {
      return (
        <div className="players">
          <img
            draggable="false"
            src={this.state.player.foto}
            alt={this.state.player.nombre}
          />
          <button
            onClick={() => {
              this.props.addPlayer(this.state.player.id);
            }}
            className="btn btn-sm btn-success"
          >
            <i className="fa fa-plus fa-lg"></i>
          </button>
        </div>
      );
    }
    return null;
  }
}

export default Player;
