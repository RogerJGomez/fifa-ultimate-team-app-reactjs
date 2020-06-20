import React from "react";
import Player from "./Player";

const Bench = ({ bench, addPlayer }) => {
  const ShowPlayer = (props) => {
    return bench
      .filter((player) => player.posicion === props.position)
      .map((player) => (
        <Player key={player.id} addPlayer={addPlayer} players={player} />
      ));
  };

  const CreateRows = () => {
    const positions = ["forward", "midfielder", "defense", "goalkeeper"];
    let rows = positions.map((position) => {
      return (
        <div className="contain" key={position}>
          <ShowPlayer position={position} />
        </div>
      );
    });
    return rows;
  };
  return (
    <div className="col-md-5">
      <div className="select">
        <CreateRows />
      </div>
    </div>
  );
};

export default Bench;
