const express = require('express')
const upload = require('./utils/multer')
const app = express()
require("dotenv").config();

const productModel = require('./utils/products')
const orderModel = require('./utils/order')
const adminModel = require('./utils/addmin')

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get('/', async (req, res) => {
    try {
        const products = await productModel.find()
        // console.log(products);

        res.render('index', { products })
    } catch (error) {

        console.log(error);
    }

})

app.get('/api/admin', (req, res) => {
    res.render('admin/dashboard')
})
app.get('/api/admin/create-admin', async(req, res) => {
    const email = process.env.EMAIL
    const password = process.env.PASSWORD

    exitUser = await adminModel.findOne({email})
    if(exitUser){
        res.send("This Email is alrady Admin")
    }else{
        await adminModel.create({
            email,
            password
        })
        res.send('Admin Create')
    }
})
app.get('/api/admin/orders', (req, res) => {
    res.render('admin/orders')
})
app.get('/api/admin/products', (req, res) => {
    res.render('admin/products')
})
app.get('/api/admin/products/add', (req, res) => {
    res.render('admin/addproduct')
})
app.post('/add-product', upload.single("productImage"), async (req, res) => {
    const { productName, description, price } = req.body
    const { filename } = req.file
    // console.log(req.file);

    try {
        const createProduct = await productModel.create({
            productName: productName,
            description: description,
            productIamge: `images\\${filename}`,
            price: price
        })

        res.redirect('/api/admin/product')
    } catch (error) {
        console.log(error);

    }
})

app.get('/product/:productName', async (req, res) => {
    try {

        const productName = req.params.productName
        console.log(productName);

        const product = await productModel.findOne({ productName })

        // console.log(product);

        res.render('product',{product})
    } catch (error) {
        console.log(error);

    }

})
app.get('/checkout', (req, res) => {
    res.render('checkout')
})
app.post('/order', async (req, res) => {
    const {bill_full_name,bill_address,bill_phone,bill_area,total_price,products,total_quantity} = req.body
    try {
        const order = await orderModel.create({
            productNames:products,
            quantity:total_quantity,
            totalPrice:total_price,
            fullName:bill_full_name,
            address:bill_address,
            phone:bill_phone,
            area:bill_area,
           
        })
        res.redirect('/')
    } catch (error) {
        console.log(error);
        
    }
})
app.listen(4000, () => {
    console.log('server is working');

})