const request = require('supertest');
const express = require('express');
const { app, server } = require('../app');

describe('Product API', () => {
    afterAll(async () => {
        server.close(); // Close the server after tests
    });

    it('should create a new product', async () => {
        const newProduct = {
            name: 'Test Product',
            description: 'This is a test product',
            price: 100.00,
            variants: [
                {
                    variantName: 'Size',
                    options: ['Small', 'Medium', 'Large'],
                    priceModifier: 10.00
                }
            ]
        };

        const response = await request(app)
            .post('/api/v1/products')
            .send(newProduct)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newProduct.name);
    });

    it('should retrieve a list of products', async () => {
        const response = await request(app)
            .get('/api/v1/products')
            .expect(200);

        expect(response.body).toHaveProperty('products');
        expect(Array.isArray(response.body.products)).toBe(true);
    });

    it('should retrieve a single product', async () => {
        const productId = 'some-valid-id'; // Replace with a valid product ID

        const response = await request(app)
            .get(`/api/v1/products/${productId}`)
            .expect(200);

        expect(response.body).toHaveProperty('id', productId);
    });

    it('should update a product', async () => {
        const productId = 'some-valid-id'; // Replace with a valid product ID
        const updatedProduct = {
            name: 'Updated Product',
            description: 'This is an updated test product',
            price: 150.00,
        };

        const response = await request(app)
            .put(`/api/v1/products/${productId}`)
            .send(updatedProduct)
            .expect(200);

        expect(response.body).toHaveProperty('name', updatedProduct.name);
    });

    it('should delete a product', async () => {
        const productId = 'some-valid-id'; // Replace with a valid product ID

        await request(app)
            .delete(`/api/v1/products/${productId}`)
            .expect(204);
    });
});
