import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import ReadOnlyRow from '../Components/ReadOnlyRow';
import EditableRow from '../Components/EditableRow';

const Dishes = () => {

    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/v1/restaurants/dishes/1/dishes')
          .then(response => {
            setDishes(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

    const [addData, setaddData] = useState({
        name:"",
        description:"",
        dishCategory:0,
        price:""
    })

    const [editData, setEditData] = useState({
        name:"",
        description:"",
        dishCategory:0,
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
            name: addData.name,
            description: addData.description,
            dishCategory: addData.dishCategory,
            price: addData.price,
            restaurant: {
                id:1,
                name:"Test restaurant"
            }
        };
        
        axios
        .post('http://localhost:8080/v1/restaurants/dishes/1', newDish)
        .then((response) => {
          setDishes([...dishes, response.data]);
        })
        .catch((error) => {
          console.log(error);
        });

        window.location.reload();
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedDish = {
            id: editDishId,
            name: editData.name,
            description: editData.description,
            dishCategory: editData.dishCategory,
            price: editData.price
        }

        const newDishes = [...dishes];

        const index = dishes.findIndex((dish)=> dish.id === editDishId);

        newDishes[index] = editedDish;

        setDishes(newDishes);
        setEditDishId(null);
    }

    const handleEditClick = (event, dish) => {
        event.preventDefault();
        setEditDishId(dish.id);

        const formvalues = {
            name: dish.name,
            description: dish.description,
            dishCategory: dish.dishCategory,
            price: dish.price
        }

        setEditData(formvalues);
    }
      const handleCancelClick = () => {
        setEditDishId(null);
      }

      const handleDeleteClick = (dishId) => {
        const newDishes = [...dishes];
        const index = dishes.findIndex((dish)=> dish.id === dishId);
        newDishes.splice(index, 1); //removes 1 of the index 
        setDishes(newDishes);
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
                        <th>Category</th>
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
                        <td colSpan="5">
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
                <select
                name="dishCategory"
                onChange={handleFormChange}>
                <option value="0">Drinks</option>
                <option value="1">Appetizers</option>
                <option value="2">Main Courses</option>
                <option value="3">Desserts</option>
                </select>
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