import React from 'react'
import Player from './Player'

export default function Bench(props) {
    
    return (
        <div className="col-md-5">
            <div className="select">
                <div className="contain">
                    {
                        props.bench.filter(player => player.posicion === "fw").map(player =>
                        <Player key={player.id} addPlayer={props.addPlayer}  players={player} />)
                    }
                </div>
                <div className="contain">    
                    {
                        props.bench.filter(player => player.posicion === "md").map(player =>
                        <Player key={player.id} addPlayer={props.addPlayer}  players={player} />)
                    }
                </div>
                <div className="contain">  
                    {
                        props.bench.filter(player => player.posicion === "df").map(player =>
                        <Player key={player.id} addPlayer={props.addPlayer}  players={player} />)
                    }
                </div>
                <div className="contain">
                    {
                        props.bench.filter(player => player.posicion === "gk").map(player =>
                        <Player key={player.id} addPlayer={props.addPlayer}  players={player} />)
                    }
                </div>
            </div>
        </div>
    )
}


