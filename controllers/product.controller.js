const { Product, Variant } = require('../models/db');
const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    variants: Joi.array().items(
        Joi.object({
            variantName: Joi.string().required(),
            options: Joi.array().items(Joi.string()).required(),
            priceModifier: Joi.number().default(0)
        })
    ).optional()
});

const createProduct = async (req, res) => {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).json(error?.details[0]?.message);

    const { name, description, price, variants } = req.body;
    try {
        const product = await Product.create({ name, description, price }, {
            include: [{ model: Variant, as: 'variants' }]
        });

        if (variants && variants.length > 0) {
            const productVariants = variants.map(v => ({
                ...v, productId: product?.id
            }));
            await Variant.bulkCreate(productVariants);
        }

        const newProduct = await Product.findOne({ where: { id: product?.id }, include: ['variants'] });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

const findAllProductList = async (req, res) => {
    const { page, size } = req.query;
    const currentPage = parseInt(page) || 1;
    const limit = parseInt(size) || 50;
    const offset = (currentPage - 1) * limit;

    try {
        const products = await Product.findAndCountAll({
            include: ['variants'],
            distinct: true,
            limit,
            offset
        });

        res.status(200).json({
            totalItems: products?.count || 0,
            totalPages: Math.ceil(products?.count / limit) || 0,
            currentPage: currentPage,
            products: products?.rows || []
        });
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

const findOneProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ where: { id: req.params.id }, include: ['variants'] });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

const updateProduct = async (req, res) => {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).json(error?.details[0]?.message);

    try {
        const product = await Product.findOne({ where: { id: req.params.id } });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await product.update(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ where: { id: req.params.id } });
        const variant = await Variant.findAll({ where: { productId: req.params.id } });

        if (!variant || !product) return res.status(404).json({ message: 'Not found' });

        for (let i = 0; i < variant.length; i++) {
            await variant[i].destroy();
        }

        await product.destroy();

        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
}

module.exports = {
    createProduct, updateProduct, deleteProduct, findOneProduct, findAllProductList
}