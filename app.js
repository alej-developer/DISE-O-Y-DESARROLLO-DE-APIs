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
        components: {
            schemas: {
                Book: {
                    type: 'object',
                    required: ['title', 'author', 'publisher'],
                    properties: {
                        id: { type: 'integer', description: 'ID autogenerado' },
                        title: { type: 'string', description: 'Título del libro' },
                        author: { type: 'string', description: 'Autor del libro' },
                        publisher: { type: 'string', description: 'Editorial del libro' }
                    }
                }
            }
        },
        paths: {
            '/books': {
                get: {
                    summary: 'Devuelve la lista de todos los libros',
                    responses: { '200': { description: 'Lista obtenida con éxito' } }
                },
                post: {
                    summary: 'Crea un nuevo libro',
                    requestBody: {
                        required: true,
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/Book' } } }
                    },
                    responses: { 
                        '201': { description: 'Libro creado con éxito' },
                        '400': { description: 'Error de validación, faltan campos' }
                    }
                }
            },
            '/books/{id}': {
                put: {
                    summary: 'Actualiza un libro existente',
                    parameters: [{ in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: 'ID del libro' }],
                    requestBody: {
                        required: true,
                        content: { 'application/json': { schema: { $ref: '#/components/schemas/Book' } } }
                    },
                    responses: { 
                        '200': { description: 'Libro actualizado correctamente' },
                        '404': { description: 'Libro no encontrado' }
                    }
                },
                delete: {
                    summary: 'Elimina un libro por su ID',
                    parameters: [{ in: 'path', name: 'id', schema: { type: 'integer' }, required: true, description: 'ID del libro' }],
                    responses: { 
                        '200': { description: 'Libro eliminado' },
                        '404': { description: 'Libro no encontrado' }
                    }
                }
            }
        }
    },
    apis: [], // Lo dejamos vacío porque ya no dependemos de leer los comentarios problemáticos
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Uso de rutas
app.use('/books', booksRouter);

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
});