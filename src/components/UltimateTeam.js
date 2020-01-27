import React, { Component } from 'react';
import Players from './Players';
import Bench from './Bench';
import Lineup from './Lineup'
export class UltimateTeam extends Component {
    constructor(){
        super()
        this.state = {
            bench:[],
            lineup:[],
            void:[],
            search:[]
        }
        this.add = this.add.bind(this)
        this.del = this.del.bind(this)
        this.search = this.search.bind(this)
    }
    componentDidMount(){
        Players.sort(function(a, b) {
            var textA = a.rol.toUpperCase();
            var textB = b.rol.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })
        this.setState({
            bench:Players.filter(player => !player.lineup),
            lineup:Players.filter(player => player.lineup),
        })
    }

    search(e){
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

    add(id){
        let newplayer,currentplayer,new_lineup, new_bench, new_void, void_card
        void_card = "void"
        this.state.bench.filter(player => player.id === id).map(player => newplayer = player)
        this.state.lineup.filter(player => player.rol === newplayer.rol).map(player => currentplayer = player)
        if(currentplayer.nombre===void_card){
            newplayer.lineup=true
            new_void = this.state.void
            new_lineup = this.state.lineup.filter(player => player.rol!==newplayer.rol)
            new_lineup.push(newplayer)
            new_void.push(currentplayer)
            new_bench = this.state.bench.filter(player => player.id!==id)
            this.setState({
                bench:new_bench,
                lineup:new_lineup,
                void:new_void,
                search:[]
            })
        }
    }

    del(rol){
        let currentplayer, new_lineup, new_bench, void_player, new_void
        this.state.lineup.filter(player => player.rol === rol).map(player => currentplayer = player)
        currentplayer.lineup=false
        new_lineup = this.state.lineup.filter(player => player.rol!==rol) 
        this.state.void.filter(player => player.rol===rol).map(player=> void_player = player)
        new_void = this.state.void.filter(player => player.rol!==rol)
        new_bench = this.state.bench
        new_bench.push(currentplayer)
        new_bench.sort(function(a, b) {
            var textA = a.rol.toUpperCase();
            var textB = b.rol.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })
        new_lineup.push(void_player)
        this.setState({
            bench:new_bench,
            lineup:new_lineup,
            void: new_void
        })
    }

    render() {
        return (          
            <div className="row">
                <Bench bench={this.state.bench} add={this.add}/>
                <Lineup lineup={this.state.lineup} add={this.add} del={this.del} search={this.search} searched={this.state.search}/>
            </div>
        )
    }
}

export default UltimateTeam
