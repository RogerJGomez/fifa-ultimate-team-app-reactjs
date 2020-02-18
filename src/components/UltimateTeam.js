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
    }

    componentDidMount(){

        Players.sort((playerA,playerB) => (playerA.rol<playerB.rol ? -1 : (playerA.rol > playerB.rol) ? 1 : 0))
        let bench = [...Players]
        bench = bench.filter(bench => !bench.lineup)
        let lineup = [...Players]
        lineup = lineup.filter(player => player.lineup)

        this.setState({
            bench,
            lineup
        })

    }

    searchPlayer = (e) =>{

        let search = e.target.value
        const trimmedName = search && search.trim().toLowerCase();

        if (search.length>2){  

            let searched = [...this.state.bench]
            searched  = searched.filter(player => {

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

    addPlayer = (id) =>{

        localStorage.clear()

        let bench = [...this.state.bench]
        let  benchPlayer = bench.find(player => player.id === id)

        let lineup = [...this.state.lineup]
        let lineupPlayer = lineup.find(player => player.rol === benchPlayer.rol)

        if(lineupPlayer.nombre==='void'){

            lineupPlayer.lineup = false
            benchPlayer.lineup = true

            lineup  = lineup.filter(player => player.rol !== benchPlayer.rol)
            lineup.push(benchPlayer)

            bench = bench.filter(player => player.id !== id)
            bench.push(lineupPlayer)

            this.setState({
                bench,
                lineup,
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

    deletePlayer = (rol) =>{

        let bench = [...this.state.bench]
        let voidPlayer = bench.find(player => player.rol === rol && player.nombre==="void")
 
        let lineup = [...this.state.lineup]
        let lineupPlayer = lineup.find(player => player.rol === rol)

        lineupPlayer.lineup = false
        voidPlayer.lineup = true

        bench = bench.filter(player => player.id !== voidPlayer.id) 
        bench.push(lineupPlayer)
        bench.sort((playerA,playerB) => (playerA.rol<playerB.rol ? -1 : (playerA.rol > playerB.rol) ? 1 : 0))
        
        lineup = lineup.filter(player => player.rol !== rol) 
        lineup.push(voidPlayer)

        this.setState({
            bench,
            lineup
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
