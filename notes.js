const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter( (note) => note.title === title )

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.inverse.green.bold('New note added!'))
    } else {
        console.log(chalk.inverse.red.bold('Note title taken!'))
    }
}

const removeNote = (title) => {
    const previusNotes = loadNotes()
    const noteToBeRemoved = previusNotes.filter( (note) => note.title === title )

    if (noteToBeRemoved.length > 0) {
        saveNotes(previusNotes.filter((note) => note.title !== title ))

        console.log(chalk.inverse.green.bold('Note with title: "' + title + '" was removed!'))
    } else {
        console.log(chalk.inverse.red.bold('Note with title: "' + title + '" was not found!'))
    }

}

const listNotes = () => {
    console.log(chalk.inverse.bold.green('Your notes'))

    loadNotes().forEach(element => console.log(chalk.bold(element.title)))
}

const readNote = (title) => {
    const noteRequested = loadNotes().find((note) => note.title === title)   

    if (noteRequested == undefined) {
        console.log(chalk.red.bold.inverse('Note not found!'))
    } else {
        console.log(chalk.green.bold.inverse('Title: ' + noteRequested.title) + ' Note: ' + noteRequested.body)
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}