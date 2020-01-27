import React, { Component } from 'react';
import Player from './Player';
import Modal from 'react-modal';
const customStyles = {
    content : {
      top:'50%',
      left:'50%',
      right:'auto',
      border:'3px solid #fff',
      textAlign:'center',
      bottom: 'auto',
      marginRight:'-50%',
      transform:'translate(-50%, -50%)',
      backgroundImage:'url("/players/Field/search.png")',
      backgroundSize:'150%',
      backgroundRepeat:'no-repeat',
      color:'#fff'
    },
    overlay:{
        background: 'radial-gradient(circle, rgba(113,113,113,0.7847514005602241) 0%, rgba(0,0,0,0.7511379551820728) 0%)'
    }
  };
Modal.setAppElement('#root')
export class Lineup extends Component {
    constructor(){
        super()
        this.state = {
            modalOpen:false,
            rol:""
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showPlayers = this.showPlayers.bind(this);
    }

    openModal(rol) {
        this.setState({
            modalOpen: true,
            rol:rol
        });
      }
     
     
    closeModal() {
        this.setState({modalOpen: false});
      }

    showPlayers(props){
        if(props.pos==="fw"){
            let forwards = [
                this.props.lineup.filter(player => player.rol === "lw").map(player =>
                <Player key={player.id} search={this.openModal} del={this.props.del}  players={player} />),
                this.props.lineup.filter(player => player.rol === "st").map(player =>
                <Player key={player.id} search={this.openModal} del={this.props.del}  players={player} />),
                this.props.lineup.filter(player => player.rol === "rw").map(player =>
                <Player key={player.id} search={this.openModal} del={this.props.del}  players={player} />)
            ] 
            return (
                forwards
            )
        }
        else if(props.pos==="md"){
            let midfielders = [
                this.props.lineup.filter(player => player.rol === "lcm").map(player =>
                    <Player key={player.id} search ={this.openModal} del={this.props.del}  players={player} />),                                
                    this.props.lineup.filter(player => player.rol === "cm").map(player =>
                    <Player key={player.id} search ={this.openModal} del={this.props.del}  players={player} />),    
                    this.props.lineup.filter(player => player.rol === "rcm").map(player =>
                    <Player key={player.id} search ={this.openModal} del={this.props.del}  players={player} />)   
            ] 
            return (
                midfielders
            )
        }
        else if(props.pos==="df"){
            let defense = [         
                this.props.lineup.filter(player => player.rol === "lb").map(player =>
                <Player key={player.id} search ={this.openModal} del={this.props.del}  players={player} />),                                  
                this.props.lineup.filter(player => player.rol === "lcb").map(player =>
                <Player key={player.id} search ={this.openModal} del={this.props.del}  players={player} />),    
                this.props.lineup.filter(player => player.rol === "rcb").map(player =>
                <Player key={player.id} search ={this.openModal} del={this.props.del}  players={player} />),                  
                this.props.lineup.filter(player => player.rol === "rb").map(player =>
                <Player key={player.id} search ={this.openModal} del={this.props.del}  players={player} />)             
            ]
            return (
                defense
            ) 
        }
        else{
            let goalkeeper = this.props.lineup.filter(player => player.rol === "gk").map(player =>
                <Player key={player.id} search ={this.openModal} del={this.props.del}  players={player} />)
            
            return (
                goalkeeper
            ) 
        }
    }


    render() {
        return (
            <div className="col-md-7">
                <div className="field">
                    <Modal
                        isOpen={this.state.modalOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Search a player"
                    >
                    <div className="container">     
                        <h2 ref={subtitle => this.subtitle = subtitle}>Select a player ({this.state.rol})</h2>
                        <input type="text" className="form-control" placeholder='search by name'onChange={this.props.search}/>
                        <div className="contain search-box">    
                            {
                                this.props.searched.filter(player => player.rol === this.state.rol && this.state.modalOpen).map(player =>
                                <Player key={player.id} add={this.props.add} modal={this.state.modalOpen} closeModal={this.closeModal} players={player} />)
                            }
                        </div>
                        <button className="btn btn-dark" onClick={this.closeModal}>Close</button>
                    </div>
                    </Modal>

                    <div className="fw">
                        <this.showPlayers pos={"fw"} />
                    </div>
                    <div className="md">
                        <this.showPlayers pos={"md"} />
                    </div>
                    <div className="df">
                        <this.showPlayers pos={"df"} />
                    </div>
                    <div className="gk">
                        <this.showPlayers pos={"gk"} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Lineup
