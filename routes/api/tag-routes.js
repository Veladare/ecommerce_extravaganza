const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { findByPk } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(tagData)
  }catch (err){
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    
  res.status(200).json(tagData)
  }catch (err){
  res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }});
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const destroytag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!destroytag) {
      res.status(404).json({ message: 'Category found with that id!' });
      return;
    }

    res.status(200).json(destroytag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
