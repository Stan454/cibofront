import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import ReadOnlyRow from '../Components/ReadOnlyRow';
import EditableRow from '../Components/EditableRow';

const Dishes = () => {
    const [dishes, setdishes] = useState([
        { id: 1, name: 'Hamburger', description: 'Better with cheese', price: '12.99'},
        { id: 2, name: 'Spaghetti', description: 'European noodles', price: '10.50'},
        { id: 3, name: 'Chicken', description: 'chicken noises', price: '15.00'},
        { id: 4, name: 'Pizza', description: 'With ananas', price: '9.99'},
        { id: 5, name: 'Meatball', description: 'big one', price: '12.99'}
    ]);
    
    const [addData, setaddData] = useState({
        name:"",
        description:"",
        price:""
    })

    const [editData, setEditData] = useState({
        name:"",
        description:"",
        price:""
    })

    const [editDishId, setEditDishId] = useState(null);

    const handleFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...addData};
        newFormData[fieldName] = fieldValue;
        setaddData(newFormData);
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editData };
        newFormData[fieldName] = fieldValue;

        setEditData(newFormData);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const newDish = {
            id: nanoid(),
            name: addData.name,
            description: addData.description,
            price: addData.price
        };
        
        const newDishes = [...dishes, newDish];
        setdishes(newDishes);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedDish = {
            id: editDishId,
            name: editData.name,
            description: editData.description,
            price: editData.price
        }

        const newDishes = [...dishes];

        const index = dishes.findIndex((dish)=> dish.id === editDishId);

        newDishes[index] = editedDish;

        setdishes(newDishes);
        setEditDishId(null);
    }

    const handleEditClick = (event, dish) => {
        event.preventDefault();
        setEditDishId(dish.id);

        const formvalues = {
            name: dish.name,
            description: dish.description,
            price: dish.price
        }

        setEditData(formvalues);
    }
    /*const [dishes, setDishes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/dish/getAll')
          .then(response => {
            setDishes(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);*/

      const handleCancelClick = () => {
        setEditDishId(null);
      }

      const handleDeleteClick = (dishId) => {
        const newDishes = [...dishes];
        const index = dishes.findIndex((dish)=> dish.id === dishId);
        newDishes.splice(index, 1); //removes 1 of the index 
        setdishes(newDishes);
      }
    
    return (
        <div className="container">
            <h3 className="p-3 text-center">Current Dishes</h3>
            <form onSubmit={handleEditFormSubmit}>
            <table className="blueTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody> 
                    {dishes.map((dish) => (
                        <Fragment>
                            { editDishId === dish.id ? ( 
                                <EditableRow 
                                editData={editData} 
                                handleEditFormChange={handleEditFormChange}
                                handleCancelClick={handleCancelClick} 
                                /> 
                            ) : ( 
                            <ReadOnlyRow 
                                dish={(dish)} 
                                handleEditClick={handleEditClick}
                                handleDeleteClick={handleDeleteClick}
                                /> 
                            )}
                        </Fragment>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4">
                            <div className="links">
                                <a href="#">&laquo;</a> 
                                <a className="active" href="#">1</a> 
                                <a href="#">2</a> 
                                <a href="#">3</a> 
                                <a href="#">4</a> 
                                <a href="#">&raquo;</a>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
            </form>
            <h3>Add a new dish</h3>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    name="name"
                    autoCapitalize="words"
                    required="required"
                    placeholder="Enter a name..."
                    onChange={handleFormChange}
                />
                <input
                    type="text"
                    name="description"
                    autoCapitalize="words"
                    required="required"
                    placeholder="Describe the dish..."
                    onChange={handleFormChange}
                />
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="price"
                    required="required"
                    placeholder="Enter a price..."
                    onChange={handleFormChange}
                />
                <button type="submit">Add dish</button>
            </form>
        </div>

    );
}

export default Dishes;