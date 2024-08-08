const Crud = require("../Model/Testimonial");

// Display all testimonials
const crud_index = async (req, res) => {
  try {
    const testimonials = await Crud.find(); // Fetch all documents
    res.json(testimonials); // Send the result as JSON
  } catch (err) {
    console.error('Error fetching data:', err); // Log error to the console
    res.status(500).json({ message: 'Internal Server Error' }); // Send error response
  }
};

// Create new testimonial
const crud_create = async (req, res) => {
  try {
    const testimonial = new Crud(req.body);
    const savedTestimonial = await testimonial.save(); // Save the new document
    res.status(201).json(savedTestimonial); // Send the result as JSON
  } catch (err) {
    console.error('Error creating testimonial:', err); // Log error to the console
    res.status(422).json({ message: 'Testimonial add failed' }); // Send error response
  }
};

// Show a particular testimonial detail by ID
const crud_details = async (req, res) => {
  try {
    const testimonial = await Crud.findById(req.params.id); // Find the document by ID
    if (!testimonial) {
      return res.status(404).json({ message: 'No result found' }); // Document not found
    }
    res.json(testimonial); // Send the result as JSON
  } catch (err) {
    console.error('Error fetching testimonial by ID:', err); // Log error to the console
    res.status(500).json({ message: 'Internal Server Error' }); // Send error response
  }
};

// Update testimonial detail by ID
const crud_update = async (req, res) => {
  try {
    const updatedTestimonial = await Crud.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update the document
    if (!updatedTestimonial) {
      return res.status(404).json({ message: 'Testimonial not found' }); // Document not found
    }
    res.json(updatedTestimonial); // Send the updated document as JSON
  } catch (err) {
    console.error('Error updating testimonial:', err); // Log error to the console
    res.status(422).json({ message: 'Testimonial update failed' }); // Send error response
  }
};

// Delete testimonial detail by ID
const crud_delete = async (req, res) => {
  try {
    const testimonial = await Crud.findById(req.params.id); // Find the document by ID
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' }); // Document not found
    }
    await Crud.findByIdAndRemove(req.params.id); // Remove the document
    res.status(200).json({ message: 'Testimonial deleted' }); // Send success response
  } catch (err) {
    console.error('Error deleting testimonial:', err); // Log error to the console
    res.status(400).json({ message: 'Testimonial delete failed' }); // Send error response
  }
};

module.exports = {
  crud_index,
  crud_details,
  crud_create,
  crud_update,
  crud_delete,
};
