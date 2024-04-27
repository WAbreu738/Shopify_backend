const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: Product,
    })
    res.json(tags)
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server error. Please try again.'
    })
  }
});

// find a single tag by its `id` be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const tags = await Tag.findByPk(id, {
      include: Product
    })

    if (!tags) {
      return res.json({
        message: 'No Tag found with that ID.'
      })
    }
    res.json(tags)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Server error. Please try again.'
    })
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const tags = await Tag.create(req.body)

    res.json(tags)
  } catch (err) {

    const errors = err.errors.map(eObj => {
      return {
        message: eObj.message
      }
    })

    res.json({
      message: 'Your request failed.',
      errors: errors
    })
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
    const id = req.params.id
    // get the object given by user
    const newData = req.body
  
    try {
      const tags = await Category.findByPk(id)
  
      if (!tags) {
        return res.json({ message: 'Category Not found' })
      }
      await tags.update(newData)
      res.json(tags)
    } catch (err) {
      console.error(err)
      res.json({ message: 'Error' })
    }

});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    await Tag.destroy({
      where: {
        tag_id: id
      }
    })
    res.json({
      message: 'Tag deleted successfully'
    })
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server error. Please try again.'
    })
  }
});

module.exports = router;
