import React, { Component } from 'react';
import Player from './Player'


export class Bench extends Component {
    constructor(){
        super()
        this.showPlayers = this.showPlayers.bind(this);
    }


    showPlayers(props){
        return (
            this.props.bench.filter(player => player.posicion === props.position).map(player =>
                <Player key={player.id} addPlayer={this.props.addPlayer}  players={player} />)
        )
    }

    render(){
        return (
            <div className="col-md-5">
                <div className="select">
                    <div className="contain">
                        {
                            <this.showPlayers position={"forward"} />
                        }
                    </div>
                    <div className="contain">
                        {
                            <this.showPlayers position={"midfielder"} />
                        }
                    </div>
                    <div className="contain">
                        {
                            <this.showPlayers position={"defense"} />
                        }
                    </div>
                    <div className="contain">
                        {
                            <this.showPlayers position={"goalkeeper"} />
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default Bench
