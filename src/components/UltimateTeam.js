import React, { Component } from 'react';
import Players from '../PlayersData';
import Bench from './Bench';
import Lineup from './Lineup'
export class UltimateTeam extends Component {
    constructor(){
        super()
        this.state = {
            bench:[],
            lineup:[],
            search:[]
        }
        this.addPlayer = this.addPlayer.bind(this)
        this.deletePlayer = this.deletePlayer.bind(this)
        this.searchPlayer = this.searchPlayer.bind(this)
    }
    componentDidMount(){
       Players.sort((playerA,playerB) => (playerA.rol<playerB.rol ? -1 : (playerA.rol > playerB.rol) ? 1 : 0))
        this.setState({
            bench:Players.filter(bench => !bench.lineup),
            lineup:Players.filter(player => player.lineup),
        })
    }

    searchPlayer(e){
        let search = e.target.value
        const sanitizedName = search && search.trim().toLowerCase();
        if (search.length>2){     
            let searched = this.state.bench.filter(player => {
                if (player.nombre.toLowerCase().includes(sanitizedName)) return true;
                return false;
            })
            this.setState({
                search:searched
            })
        }else{
            this.setState({
                search:[]
            })
        }
    }

    addPlayer(id){
        let newplayer,currentplayer,new_lineupArray, new_benchArray
        this.state.bench.filter(player => player.id === id).map(player => newplayer = player)
        this.state.lineup.filter(player => player.rol === newplayer.rol).map(player => currentplayer = player)
        if(currentplayer.nombre==="void"){
            newplayer.lineup=true
            new_lineupArray = this.state.lineup.filter(player => player.rol!==newplayer.rol)
            new_lineupArray.push(newplayer)
            new_benchArray = this.state.bench.filter(player => player.id!==id)
            this.setState({
                bench:new_benchArray,
                lineup:new_lineupArray,
                search:[]
            })
        }
    }

    deletePlayer(rol){
        let currentplayer, new_lineupArray, new_benchArray, new_voidPlayer
        this.state.lineup.filter(player => player.rol === rol).map(player => currentplayer = player)
        currentplayer.lineup=false
        new_lineupArray = this.state.lineup.filter(player => player.rol!==rol) 
        new_voidPlayer = {
            nombre:'void',
            id:'_' + Math.random().toString(36).substr(2, 9),
            posicion:rol,
            rol:rol,
            foto:'/players/Field/card.png',
            lineup:true
        }
        new_benchArray = this.state.bench
        new_benchArray.push(currentplayer)
        new_benchArray.sort((playerA,playerB) => (playerA.rol<playerB.rol ? -1 : (playerA.rol > playerB.rol) ? 1 : 0))
        new_lineupArray.push(new_voidPlayer)
        this.setState({
            bench:new_benchArray,
            lineup:new_lineupArray
        })
    }

    render() {
        return (          
            <div className="row">
                <Bench bench={this.state.bench} addPlayer={this.addPlayer}/>
                <Lineup lineup={this.state.lineup} addPlayer={this.addPlayer} deletePlayer={this.deletePlayer} searchPlayer={this.searchPlayer} searched={this.state.search}/>
            </div>
        )
    }
}

export default UltimateTeam
