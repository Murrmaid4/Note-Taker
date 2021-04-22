let db = require("../db/db.json")
// ^^ have to link the data - its REQUIRED
const { v4: uuidv4 } = require('uuid');
//this npm gives the data each its own unique id which I use later for the delete function 
const fs = require("fs");
//this is needed if I want to save changes to the database file

module.exports = (app) => {

    app.get("/api/notes", (req, res) => {
         res.json(db)
         //this function grabs the database folder and reads it 
    })
    app.post("/api/notes", (req, res) =>{
        req.body.id = uuidv4()
        //this adds an id property to the body object which we will call in the delete function
        db.push(req.body)
        // this pushes any new txt additions from the body object to the database array
        fs.writeFileSync("./db/db.json", JSON.stringify(db))
        //this WRITES those changes in the file, the input has to be put into a string using the stringify method, 

        res.json(db)
        //then the response is the modified database with the new note
    })

    app.delete("/api/notes/:id", (req, res) => {
// ^^ the :id is grabbing the id PROPERTY 
       db = db.filter(note=>note.id != req.params.id)
       //the filter function returns everything not equal to that id that is being requested to be deleted. 

       fs.writeFileSync("./db/db.json", JSON.stringify(db))
        //this again writes the changes to the database json and turns it into a string

       res.json(db)
       //the updated file is then returned to the page 
    })
}
