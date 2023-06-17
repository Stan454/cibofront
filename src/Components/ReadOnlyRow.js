import React from "react";
import { Edit } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';


const ReadOnlyRow = ({ dish , handleEditClick, handleDeleteClick}) => {
    
    return (
        <tr>
            <td>{dish.name}</td>
            <td>{dish.description}</td>
            <td>{dish.dishCategory}</td>
            <td>{dish.price}</td>
            <td>
                <button type = "button" onClick={(event)=> handleEditClick(event, dish)}><Edit /></button>
                <button type = "button" onClick={()=> handleDeleteClick(dish.id, dish.name)}><DeleteIcon /></button>
            </td>
        </tr>
    );
};

export default ReadOnlyRow