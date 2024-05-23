import React from "react";

const ListItem = ({item}) => {
    return (
        <li key={item}>
            {item}
        </li>
    )
}

export default ListItem;