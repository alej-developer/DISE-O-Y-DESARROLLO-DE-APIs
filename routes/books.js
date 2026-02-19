const express = require('express');
const router = express.Router();

let books = [
    { id: 1, title: 'Cien años de soledad', author: 'Gabriel García Márquez', publisher: 'Editorial Sudamericana' }
];

router.get('/', (req, res) => {
    res.json(books);
});

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