
const Product = require('../models/product');

exports.getAllProduct = (req, res, next) => {
    Product.findAll()
    .then((product)=>{
        console.log(product)
        res.status(200).json(product);
    })
    .catch((err)=>{
        console.log("err in getAllApoointment method");
    });
  };
  
  exports.postAddProduct= async(req, res) => {
    const { productName, description, price, quantity } = req.body;
    console.log(quantity, "quantity printed");

    try {
        
       
        const product = await Product.create({
            productName,
            description,
            price,
            quantity,
        });
        res.status(200).json({ message: 'product added ' });
    } catch (err) {
        console.error("Error in POST /add-product:", err);
        res.status(500).json({ error: 'error occurred while submitting the product.' });
    }
};

  exports.deleteProduct = (req,res,next)=>{
    const id = req.params.id;
    Product.destroy({
        where : {
            id:id
        }
    })
    .then((result)=>{
        console.log(result,"product deleted");
        res.status(200);
    })
    .catch((err)=>{
        console.log(err ,"error while deleting product by id");
    })
  };

  exports.editProduct = (req,res,next)=>{
    const id = req.params.id;
    const updatedProduct = req.body;

    Product.update(updatedProduct, {
        where: {
            id: id
        }
    })
    .then(([updatedCount]) => {
        if (updatedCount === 0) {
            return res.json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'product updated successfully' });
    })
    .catch((err)=>{
        console.log(err ,"error while edititng product by id");
    });
  };

  exports.updateProductQuantity = async (req, res, next) => {
    const id = req.params.id;
    const { change } = req.body;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const newQuantity = product.quantity + change; 
        if (newQuantity < 0) {
            return res.status(400).json({ message: 'Quantity cannot be negative' });
        }

        product.quantity = newQuantity;
        await product.save();

        res.status(200).json({ message: 'quantity updated', product });
    } catch (err) {
        
        res.status(500).json({ error: 'error occurred while updating the quantity.' });
    }
};
