import React, { Component } from 'react';
import Player from './Player'

export class Bench extends Component {

    showPlayer = (props) => {
        return (
            this.props.bench
                .filter(player => player.posicion === props.position)
                .map(player => <Player key={player.id} addPlayer={this.props.addPlayer}  players={player} />)
        )
    }

    createRows = () => {
        const positions = ["forward", "midfielder", "defense", "goalkeeper"];

        var rows = positions.map(position => {
            return(
                <div className="contain" key={position}>
                    <this.showPlayer position={position} />
                </div>
                )
        });

        return rows
    }

    render() {
        return (
            <div className="col-md-5">
                <div className="select">
                    <this.createRows/>
                </div>
            </div>
        )
    }
}

export default Bench
