import React, { Component } from 'react';
import Players from '../PlayersData';
import Bench from './Bench';
import Lineup from './Lineup';
import CustomAlert from 'sweetalert2'

const Toast = CustomAlert.mixin({
    toast: true,
    position: 'center-end',
    showConfirmButton: false,
    timer: 3000,
    background:'#171717',
    timerProgressBar: true

  })

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
            lineup:Players.filter(player => player.lineup)

        })
    }

    searchPlayer(e){

        let search = e.target.value
        const trimmedName = search && search.trim().toLowerCase();

        if (search.length>2){  

            let searched = this.state.bench.filter(player => {

                if (player.nombre.toLowerCase().includes(trimmedName)) return true;
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

        let benchPlayer = this.state.bench.filter(player => player.id === id)

        let lineupPlayer = this.state.lineup.filter(player => player.rol === benchPlayer[0].rol)

        if(lineupPlayer[0].nombre==="void"){

            lineupPlayer[0].lineup=false
            benchPlayer[0].lineup=true

            let new_lineupArray = this.state.lineup.filter(player => player.rol!==benchPlayer[0].rol)
            new_lineupArray.push(benchPlayer[0])

            let new_benchArray = this.state.bench.filter(player => player.id!==id)
            new_benchArray.push(lineupPlayer[0])

            this.setState({
                bench:new_benchArray,
                lineup:new_lineupArray,
                search:[]
            })

            Toast.fire({
                icon: 'success',
                title: 'Player Added'
              })
        }
        else{

            Toast.fire({
                icon: 'error',
                title: 'Occupied Position'
              })
        }
    }

    deletePlayer(rol){

        let lineupPlayer = this.state.lineup.filter(player => player.rol === rol)
        lineupPlayer[0].lineup=false

          
        let voidPlayer = this.state.bench.filter(player => player.rol===rol && player.nombre==="void")
        voidPlayer[0].lineup=true

        let new_benchArray = this.state.bench.filter(player => player.nombre!=="void") 
        new_benchArray.push(lineupPlayer[0])
        new_benchArray.sort((playerA,playerB) => (playerA.rol<playerB.rol ? -1 : (playerA.rol > playerB.rol) ? 1 : 0))
        
        let new_lineupArray = this.state.lineup.filter(player => player.rol!==rol) 
        new_lineupArray.push(voidPlayer[0])

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
