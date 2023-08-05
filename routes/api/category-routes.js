const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoryData)
  }catch (err){
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const idCategoryData = await Category.findByPk(req.params.id, { include: [{ model: Product }] });
    res.status(200).json(idCategoryData)
  } catch (err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
try {
  const updateCategory = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json(updateCategory)
} catch (err) {
  res.status(500).json(err);

}
});

router.delete('/:id', async (req, res) => {
  try {
    const destroyCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!destroyCategory) {
      res.status(404).json({ message: 'Category found with that id!' });
      return;
    }

    res.status(200).json(destroyCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
