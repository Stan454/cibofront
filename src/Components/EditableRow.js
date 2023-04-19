import React from 'react'

const EditableRow = ({editData, handleEditFormChange, handleCancelClick}) => {
  return (
    <tr>
        <td><input
            type="text"
            name="name"
            autoCapitalize="words"
            required="required"
            placeholder="Enter a name..."
            value={editData.name}
            onChange={handleEditFormChange}
        /></td>
        <td><input
            type="text"
            name="description"
            autoCapitalize="words"
            required="required"
            placeholder="Describe the dish..."
            value={editData.description}
            onChange={handleEditFormChange}
        /></td>
        <td><input
            type="number"
            step="0.01"
            min="0"
            name="price"
            required="required"
            placeholder="Enter a price..."
            value={editData.price}
            onChange={handleEditFormChange}
        /></td>
        <td>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancelClick}>Cancel</button>
        </td>
    </tr>
  )
}

export default EditableRow