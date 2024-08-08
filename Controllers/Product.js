const Crud = require("../Model/Product");

// Add review to a product
const add_review = async (req, res) => {
  const { id } = req.params;
  const { user, comment, rating } = req.body;

  if (!user || !comment || !rating) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find the product by ID
    const product = await Crud.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Add the new review to the product
    product.reviews.push({
      user,
      comment,
      rating,
    });

    // Save the updated product
    await product.save();
    res.status(200).json({ message: "Review added successfully", product });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Display all products
const crud_index = async (req, res) => {
  try {
    const products = await Crud.find(); // Fetch all documents
    res.json(products); // Send the result as JSON
  } catch (err) {
    console.error('Error fetching data:', err); // Log error to the console
    res.status(500).json({ message: 'Internal Server Error' }); // Send error response
  }
};

// Create new product
const crud_create = async (req, res) => {
  try {
    const product = new Crud(req.body);
    const savedProduct = await product.save(); // Save the new document
    res.status(201).json(savedProduct); // Send the result as JSON
  } catch (err) {
    console.error('Error creating product:', err); // Log error to the console
    res.status(422).json({ message: 'Product creation failed' }); // Send error response
  }
};

// Show a particular product detail by ID
const crud_details = async (req, res) => {
  try {
    const product = await Crud.findById(req.params.id); // Find the document by ID
    if (!product) {
      return res.status(404).json({ message: 'No result found' }); // Document not found
    }
    res.json(product); // Send the result as JSON
  } catch (err) {
    console.error('Error fetching product by ID:', err); // Log error to the console
    res.status(500).json({ message: 'Internal Server Error' }); // Send error response
  }
};

// Update product detail by ID
const crud_update = async (req, res) => {
  try {
    const updatedProduct = await Crud.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update the document
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' }); // Document not found
    }
    res.json(updatedProduct); // Send the updated document as JSON
  } catch (err) {
    console.error('Error updating product:', err); // Log error to the console
    res.status(422).json({ message: 'Product update failed' }); // Send error response
  }
};

// Delete product detail by ID
const crud_delete = async (req, res) => {
  try {
    const product = await Crud.findById(req.params.id); // Find the document by ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' }); // Document not found
    }
    await Crud.findByIdAndRemove(req.params.id); // Remove the document
    res.status(200).json({ message: 'Product deleted' }); // Send success response
  } catch (err) {
    console.error('Error deleting product:', err); // Log error to the console
    res.status(400).json({ message: 'Product delete failed' }); // Send error response
  }
};

module.exports = {
  crud_index,
  crud_details,
  crud_create,
  crud_update,
  crud_delete,
  add_review,
};
