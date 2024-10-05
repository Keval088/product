const express = require('express');
const productRoutes = require('./routes/product.routes');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Product API Documentation',
            version: '1.0.0',
            description: 'API documentation for product routes',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}/api/v1`,
            },
        ],
    },
    apis: ['./routes/product.routes.js']
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Use swagger-ui-express for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/v1', productRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = { app, server };
