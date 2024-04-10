// Add an express server
const express = require('express')
const bodyParser = require('body-parser')
const knexConfig = require('./knexfile')
const knex = require('knex')(knexConfig.development)

const app = express()
const port = 3000

app.use(bodyParser.json())

// GET all changelogs that are either hidden or not
app.get('/changelogs', async (req, res) => {
  let query = knex('changelogs')

  if (req.query.is_hidden) {
    const isHidden = req.query.is_hidden === 'true'
    query = query.where('is_hidden', isHidden)
  } else {
    // If no query parameter provided, default to fetching non-hidden changelogs.
    query = query.where('is_hidden', false)
  }

  try {
    const changelogs = await query
    res.json(changelogs)
  } catch (error) {
    res.status(500).send('Error retrieving changelogs')
  }
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

// POST to create a changelog
app.post('/changelogs', async (req, res) => {
  const { title, content, category, date, is_hidden } = req.body
  try {
    const newChangelog = await knex('changelogs').insert({
      title,
      content,
      category,
      date,
      is_hidden
    })
    res.status(201).json({ sucess: true, message: 'Changelog created', data: newChangelog })
  } catch (error) {
    res
      .status(500)
      .json({ sucess: false, message: 'Error creating changelog', error: error.message })
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
