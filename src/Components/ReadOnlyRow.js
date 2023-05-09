import React from "react";

const ReadOnlyRow = ({ dish , handleEditClick, handleDeleteClick}) => {
    
    return (
        <tr>
            <td>{dish.name}</td>
            <td>{dish.description}</td>
            <td>{dish.dishCategory}</td>
            <td>{dish.price}</td>
            <td>
                <button type = "button" onClick={(event)=> handleEditClick(event, dish)}>Edit</button>
                <button type = "button" onClick={()=> handleDeleteClick(dish.id)}>Delete</button>
            </td>
        </tr>
    );
};

export default ReadOnlyRow