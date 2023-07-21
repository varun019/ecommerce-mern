const Product = require('../models/products');

module.exports.product_get = async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
      res.send(products);
    } else {
      res.send({
        result: "No products found"
      });
    }
  }
  module.exports.search = async (req, res) => {
    let result = await Product.find({
      $or: [{
          name: {
            $regex: req.params.key
          }
        },
        {
          price: {
            $regex: req.params.key
          }
        },
        {
          category: {
            $regex: req.params.key
          }
        },
      ],
    });
    res.send(result);
  }
  // pagination
  
  module.exports.pagination = async (req, res) => {
    const aggregateQuery = [{
      $sort: {
        name: -1
      }
    }];
    if (req.query.key) {
      aggregateQuery.push({
        $match: {
          $or: [{
              'name': {
                $regex: req.query.key
              }
            },
            {
              'price': {
                $regex: req.query.key
              }
            },
            {
              'category': {
                $regex: req.query.key
              }
            },
            {
              'company': {
                $regex: req.query.key
              }
            },
          ]
        }
      })
    }
  
    aggregateQuery.push({
      $project: {
        _id: 1,
        name: 1,
        price: 1,
        category: 1,
        company: 1,
        image: 1
      }
    });
    const categoryQuery = [...aggregateQuery];
    categoryQuery.push({
      $group: {
        _id: "$category"
      }
    })
    const categoryList = await Product.aggregate(categoryQuery);
  
    if (req.query.category) {
      aggregateQuery.push({
        $match: {
          'category': {
            $in: req.query.category.split(',')
          }
        }
      })
    }
    const productCount = await Product.aggregate(aggregateQuery);
  
    aggregateQuery.push({
      "$skip": req.query.skip ? parseInt(req.query.skip) : 0
    }, {
      "$limit": req.query.limit ? parseInt(req.query.limit) : 5
    })
    const aggregated = await Product.aggregate(aggregateQuery);
    res.send({
      data: aggregated,
      totalRecords: productCount.length,
      categoryList: categoryList
    });
  }
  module.exports.category = async (req, res) => {
    let result = await Category.find();
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({
        result: "No category found"
      });
    }
  }