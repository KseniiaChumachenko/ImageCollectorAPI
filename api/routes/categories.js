const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    Category.find()
    .select('name  _id')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            categories: docs.map( doc => {
                return {
                    name: doc.name,
                    _id: doc._id
                }
            })
        });
    })
        .catch(err => {
            console.log(err); 
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });
    category.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Create category seccessfully',
            createdCategory: {
                name: result.name,
                _id: result._id
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:categoryId', (req, res, next) => {
    Category.findById(req.params.categoryId)
    .select('name _id')
    .exec()
    .then(category => {
        if (!category){
            return res.status(404).json({
                message: 'Category not found'
            });
        }
        res.status(200).json({
            category: category
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:categoryName', (req, res, next) => {
    Category.remove({_id: req.params.categoryName})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Category deleted'
        });
    }) 
    .catch(err => {
        console.log(err); 
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;