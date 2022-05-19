const logger = require('./loggerMiddleware');

let notes = [
    {
        "id": 1,
        "content": "Me tengo que subscribir a youtube",
        "date": "2022-05-20",
        "important": true
    },
    {
        "id": 2,
        "content": "Tengo que aprobar el bootcamp e irme",
        "date": "2022-05-20",
        "important": true
    },
    {
        "id": 3,
        "content": "Debería dormir más",
        "date": "2022-05-20",
        "important": false
    },
]

const express = require('express');
const cors = require('cors');

const router = express();

router.use(express.json());



router.use(logger)

router.use(cors());

router.get("/", (req, res) => {
    res.status(200).send("Hola muchachos como les va este es un servidor hecho con 'EXPRESS'")
})

router.get("/api/notes", (req, res) => {
    res.json(notes)
})



router.get("/api/notes/:id", (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    if(note){
        res.json(note)
    }else{
         res.status(404).end()
    }
})

router.delete("/api/notes/:id", (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)

    res.status(204).end()

})

router.post("/api/notes", (req, res) => {
    const note = req.body

    if(!note || !note.content){
        return res.status(400).json({
            error: 'note.content is missing'
        })
    }
    
    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)
    const newNote = {
        id: maxId +1,
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }

    notes = [...notes, newNote]

    res.status(201).json(newNote) 

})

router.use((req, res) => {
    res.status(404).json({
        error: "Not found"
    })
})

const PORT = 3001

process.env.PORT

router.listen(PORT, () => {
    console.log(`Server Express is running in port ${PORT}`)
})