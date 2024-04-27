const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


// find all categories be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Product,
    })
    res.json(categories)
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server error. Please try again.'
    })
  }
})

// find one category by its `id` value be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const categories = await Category.findByPk(id, {
      include: Product
    })

    if (!categories) {
      return res.json({
        message: 'No Category found with that ID.'
      })
    }
    res.json(categories)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Server error. Please try again.'
    })
  }
})

// create a new category
router.post('/', async (req, res) => {
  try {
    const categories = await Category.create(req.body)

    res.json(categories)
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
})

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  const id = req.params.id
  // get the object given by user
  const newData = req.body

  try {
    const categories = await Category.findByPk(id)

    if (!categories) {
      return res.json({ message: 'Category Not found' })
    }
    await categories.update(newData)
    res.json(categories)
  } catch (err) {
    console.error(err)
    res.json({ message: 'Error' })
  }
})


// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    await Category.destroy({
      where: {
        category_id: id
      }
    })
    res.json({
      message: 'Category deleted successfully'
    })
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Server error. Please try again.'
    })
  }
})



module.exports = router;
