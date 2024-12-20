import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const readData = () => {
    try {
        const data = fs.readFileSync('./db.json');
        return (JSON.parse(data));
    } catch (error) {
        console.log(error);
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync('./db.json', JSON.stringify(data));
    } catch (error) {
        console.log(error);
    }
};


app.get('/', (req, res) => {
    res.send('Hola camilo esta es tu primera API de desarrollo');
});

app.get('/libros', (req, res) => {
    const data = readData();
    res.json(data.libros);
});

app.get('/libros/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const libro = data.libros.find((libro) => libro.id === id);
    res.json(libro);
});

app.post("/libros", (req, res) =>{
    const data = readData();
    const body = req.body;
    const nuevoLibro = {
        id: data.libros.length + 1,
        ...body,
    };
    data.libros.push(nuevoLibro);
    writeData(data);
    res.json(nuevoLibro);
});

app.put("/libros/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const libroIndex = data.libros.findIndex((libro) => libro.id === id);
    data.libros[libroIndex] = {
        ...data.libros[libroIndex],
        ...body,
    };
    writeData(data);
    res.json({ message: "Libro actualizado correctamente" });
});

app.delete("/libros/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const libroIndex = data.libros.findIndex((libro) => libro.id === id);
    data.libros.splice(libroIndex, 1);
    writeData(data);
    res.json({ message: "Libro eliminado correctamente" });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});