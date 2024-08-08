const Crud = require("../Model/Searchbar");

// Display all CRUD data
const crud_index = async (req, res) => {
  try {
    const cruds = await Crud.find(); // Fetch all documents
    res.json(cruds); // Send the result as JSON
  } catch (err) {
    console.error('Error fetching data:', err); // Log error to the console
    res.status(500).json({ message: 'Internal Server Error' }); // Send error response
  }
};

// Create new CRUD
const crud_create = async (req, res) => {
  try {
    const crud = new Crud(req.body);
    const savedCrud = await crud.save(); // Save the new document
    res.status(201).json(savedCrud); // Send the result as JSON
  } catch (err) {
    console.error('Error creating data:', err); // Log error to the console
    res.status(422).json({ message: 'Crud add failed' }); // Send error response
  }
};

// Show a particular CRUD detail by ID
const crud_details = async (req, res) => {
  try {
    const crud = await Crud.findById(req.params.id); // Find the document by ID
    if (!crud) {
      return res.status(404).json({ message: 'No result found' }); // Document not found
    }
    res.json(crud); // Send the result as JSON
  } catch (err) {
    console.error('Error fetching data by ID:', err); // Log error to the console
    res.status(500).json({ message: 'Internal Server Error' }); // Send error response
  }
};

// Update CRUD detail by ID
const crud_update = async (req, res) => {
  try {
    const updatedCrud = await Crud.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update the document
    if (!updatedCrud) {
      return res.status(404).json({ message: 'Crud not found' }); // Document not found
    }
    res.json(updatedCrud); // Send the updated document as JSON
  } catch (err) {
    console.error('Error updating data:', err); // Log error to the console
    res.status(422).json({ message: 'Crud update failed' }); // Send error response
  }
};

// Delete CRUD detail by ID
const crud_delete = async (req, res) => {
  try {
    const crud = await Crud.findById(req.params.id); // Find the document by ID
    if (!crud) {
      return res.status(404).json({ message: 'Crud not found' }); // Document not found
    }
    await Crud.findByIdAndRemove(req.params.id); // Remove the document
    res.status(200).json({ message: 'Crud deleted' }); // Send success response
  } catch (err) {
    console.error('Error deleting data:', err); // Log error to the console
    res.status(400).json({ message: 'Crud delete failed' }); // Send error response
  }
};

module.exports = {
  crud_index,
  crud_details,
  crud_create,
  crud_update,
  crud_delete,
};
