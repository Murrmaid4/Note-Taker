let db = require("../db/db.json")
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

module.exports = (app) => {

    app.get("/api/notes", (req, res) => {
         res.json(db)
    })
    app.post("/api/notes", (req, res) =>{
        req.body.id = uuidv4()
        db.push(req.body)
        fs.writeFileSync("./db/db.json", JSON.stringify(db))

        res.json(db)
    })

    app.delete("/api/notes/:id", (req, res) => {

       db = db.filter(note=>note.id != req.params.id)
       fs.writeFileSync("./db/db.json", JSON.stringify(db))


       res.json(db)
    })
}
