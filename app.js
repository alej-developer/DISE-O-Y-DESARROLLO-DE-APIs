const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const booksRouter = require('./routes/books');

const app = express();
const PORT = 3000;

app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Libros',
            version: '1.0.0',
            description: 'Documentación de la API RESTFul de la entidad Libros',
        },
        servers: [{ url: `http://localhost:${PORT}` }],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/books', booksRouter);

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
    console.log(`Swagger en http://localhost:${PORT}/api-docs`);
});