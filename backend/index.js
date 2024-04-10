// Add an express server
import express from 'express'
import bodyParser from 'body-parser'
import knex from 'knex'

const app = express()
const port = 3000

app.use(bodyParser.json())

// GET all changelogs that are not hidden
app.get('/changelogs', async (req, res) => {
  const changelogs = await knex('changelogs').where('is_hidden', false)
  res.json(changelogs)
})

// GET changelog by id
app.get('/changelogs/:id', async (req, res) => {
  const { id } = req.params
  const changelog = await knex('changelogs').where({ id }).first()
  if (changelog) {
    res.json(changelog)
  } else {
    res.status(404).send('Changelog not found')
  }
})

// PUT to modify a changelog
app.put('/changelogs/:id', async (req, res) => {
  const { id } = req.params
  const updateData = req.body
  await knex('changelogs').where({ id }).update(updateData)
  res.send('Changelog updated')
})

// Soft DELETE a changelog (set its state to hidden)
app.delete('/changelogs/:id', async (req, res) => {
  const { id } = req.params
  await knex('changelogs').where({ id }).update({ is_hidden: true })
  res.send('Changelog hidden')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
