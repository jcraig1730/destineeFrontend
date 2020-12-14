import { faDivide } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const FavoriteInfo = ({ favorites }) => {
  return (
    <div>
      {favorites?.map &&
        favorites.map((favorite) => <div>{favorite.title}</div>)}
    </div>
  );
};

export default FavoriteInfo;
