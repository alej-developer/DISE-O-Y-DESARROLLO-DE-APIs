const express = require('express');
const router = express.Router();

let books = [
    { id: 1, title: 'Cien años de soledad', author: 'Gabriel García Márquez', publisher: 'Editorial Sudamericana' }
];

/**
 * @swagger
 * components:
 * schemas:
 * Book:
 * type: object
 * required:
 * - title
 * - author
 * - publisher
 * properties:
 * id:
 * type: integer
 * title:
 * type: string
 * author:
 * type: string
 * publisher:
 * type: string
 */

/**
 * @swagger
 * /books:
 * get:
 * summary: Lista de todos los libros
 * responses:
 * 200:
 * description: Lista obtenida
 */
router.get('/', (req, res) => {
    res.json(books);
});

/**
 * @swagger
 * /books:
 * post:
 * summary: Crea un nuevo libro
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Book'
 * responses:
 * 201:
 * description: Libro creado
 * 400:
 * description: Error de validación
 */
router.post('/', (req, res) => {
    const { title, author, publisher } = req.body;
    
    if (!title || !author || !publisher) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
        title,
        author,
        publisher
    };
    
    books.push(newBook);
    res.status(201).json(newBook);
});

/**
 * @swagger
 * /books/{id}:
 * put:
 * summary: Actualiza un libro existente
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: integer
 * required: true
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Book'
 * responses:
 * 200:
 * description: Libro actualizado
 * 404:
 * description: Libro no encontrado
 */
router.put('/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, author, publisher } = req.body;

    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Libro no encontrado' });
    }

    if (!title || !author || !publisher) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    books[bookIndex] = { id: bookId, title, author, publisher };
    res.json(books[bookIndex]);
});

/**
 * @swagger
 * /books/{id}:
 * delete:
 * summary: Elimina un libro por su ID
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: integer
 * required: true
 * responses:
 * 200:
 * description: Libro eliminado
 * 404:
 * description: Libro no encontrado
 */
router.delete('/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Libro no encontrado' });
    }

    const deletedBook = books.splice(bookIndex, 1);
    res.json({ message: 'Libro eliminado', book: deletedBook[0] });
});

module.exports = router;