const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const knexConfig = require('./knexfile')
const knex = require('knex')(knexConfig.development)

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

// GET all changelogs that are either hidden or not
app.get('/changelogs', async (req, res) => {
  let query = knex('changelogs').where('is_hidden', false)

  query = query.orderBy('id', 'desc')
  if (req.query.lastId) {
    const lastId = parseInt(req.query.lastId, 10)
    // Since we're fetching in descending order, we should fetch IDs less than the last fetched ID
    query = query.andWhere('id', '<', lastId)
  }

  // Limit to 10 resultats per scroll
  query = query.limit(10)

  try {
    const changelogs = await query
    res.json(changelogs)
  } catch (error) {
    console.error('Error retrieving changelogs:', error)
    res.status(500).send('Error retrieving changelogs')
  }
})

// GET changelog by id
app.get(`/changelogs/:id`, async (req, res) => {
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
  const { title, content, app_name, type, date, is_hidden } = req.body
  try {
    const [newChangelogId] = await knex('changelogs').insert({
      title,
      content,
      app_name,
      type,
      date,
      is_hidden
    })
    const newChangelog = await knex('changelogs').where({ id: newChangelogId }).first()
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
