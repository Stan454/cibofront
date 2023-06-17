import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import ReadOnlyRow from '../Components/ReadOnlyRow';
import EditableRow from '../Components/EditableRow';
import Info from '@mui/icons-material/Info';

const Dishes = () => {

    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:8080/v1/restaurants/dishes/1/dishes')
          .then(response => {
            setDishes(response.data);
            setLoading(false);
          })
          .catch(error => {
            console.log(error)
            setLoading(false);
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
                setErrorMessage('');
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage('Invalid input, please check info box for instructions');
            });
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

      const handleDeleteClick = (dishId, dishName) => {
        const shouldDelete = window.confirm(`Do you want to delete the dish: "${dishName}?`);
      
            if (shouldDelete) {
            axios
                .delete(`http://localhost:8080/v1/restaurants/dishes/${dishId}`)
                .then(() => {
                const newDishes = dishes.filter((dish) => dish.id !== dishId);
                setDishes(newDishes);
                })
                .catch((error) => {
                console.log(error);
                });
            }
        };
    
    return (
        
        <div className="container">
            <div className="information-section">
                <h1><Info /> Information </h1>               
                <p>On this page you can manage your restaurant's menu by adding, deleting and editing dishes in the "Current Dishes" section.</p>
                <p>To add a new dish go to the "Add a new dish section"</p>
            </div>
            {loading ? (
                <div className="loading-icon">
                <div className="loader"></div>
              </div>
            ) : (
            <div>
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
            </div>
            )}
            <div className="information-section">
                <h3>Add a new dish</h3>               
                <p>To add a new dish to your menu fill in the following fields</p><br/>
                <p>Field 1 Name: Fill in the name of your new dish in max 10 words and only letters.</p>
                <p>Field 2 Description: Describe the dish in max 30 words and only letters</p>
                <p>Field 3 Category: Choose the type of dish from the dropdownbox</p>
                <p>Field 4 Price: Choose a price for the dish</p>
                <p>When all the fields are filled, press the "Add dish" button to save your input</p>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <form id="formS" onSubmit={handleFormSubmit}>
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
                required
                onChange={handleFormChange}>
                <option value="" disabled selected hidden>Select dish type</option>
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
        </div>

    );
}

export default Dishes;