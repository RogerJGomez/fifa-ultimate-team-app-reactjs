import React from 'react'

export default function Navbar() {

    const header ={
        display:"table",
        margin:"0 auto",
        fontSize:"35px"
    }
    return (
        <nav className="navbar navbar-dark bg-dark">
            <h3 className="navbar-brand" style={header} >Build your Ultimate Team</h3>
        </nav>
    )
}
