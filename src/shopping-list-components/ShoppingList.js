import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewEatsApi from "../Api";
import ListItem from "./ListItem";

const ShoppingList = () => {
    const {userId} = useParams();
    const [shoppingList, setShoppingList] = useState([]);
    
    useEffect(() => {
        const fetchData = async() => {
            const shoppingList = await NewEatsApi.getShoppingList(userId);
            setShoppingList(shoppingList);
        }
        fetchData();
    }, [userId])

    return (
        <ul>
            {shoppingList && shoppingList.map(item => (
                <ListItem item={item}/>
            ))}
        </ul>
    )
}

export default ShoppingList;