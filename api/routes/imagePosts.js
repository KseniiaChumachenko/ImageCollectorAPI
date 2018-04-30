const express = require('express');
const mongoose = require('mongoose'); 
const router = express.Router();
const multer = require('multer');

const Category = require('../models/category');
const ImagePost = require('../models/imagePost');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
}
}

const upload = multer({
    storage:storage, 
    limits: {
        fileSize:  1024 * 1024 
},
    fileFilter : fileFilter
});

router.get('/', (req, res, next) => {
    ImagePost.find()
    .select('_id image category')
    .populate('category')
    .exec()
    .then(docs => { 
        console.log(docs); 

            const response = {
                count: docs.length,
                imagePosts: docs.map( doc => {
                    return {
                        _id: doc._id,
                        image: doc.image,
                        category: doc.category._id
                    }
                })
            };
    //     if(docs.length >= 0){
            res.status(200).json(response); 
    //     } else {
    //         res.status(404).json( {
    //             message: 'No eneries found'
    //         }); 
    //     }
     })
    .catch(err => {
        console.log(err); 
        res.status(500).json({
            error: err
        });
    }); 
});

router.post('/', upload.single('image'), (req, res, next) => {
    Category.findById(req.body.category)
    .then(category => {
        if(!category){
            return res.status(404).json({message: 'Category not found'});
        }
    console.log(req.file);
    const imagePost = new ImagePost({
        _id: new mongoose.Types.ObjectId(),
        image: req.file.path,
        category: req.body.category
    });
    return imagePost.save() ; 
})
.then(result => {
    console.log(result);
    res.status(201).json({
        message: 'ImagePost stored',
        createdPost: {
            category: result.category,
            image: result.image,
            _id: result._id,
        }
    });
})
.catch(err => {
    console.log(err); 
    res.status(500).json({
        message: 'Not found',
        error: err
    });
});
});

router.get('/:postId', (req, res, next) => {
    ImagePost.findById(req.params.postId)
    .select('_id image category')
    .populate('category')
    .exec()
    .then(post => {
        if (!post){
            return res.status(404).json({
                message: 'ImagePost not found'
            });
        }
        res.status(200).json({
            _id: post._id,
            image: post.image,
            category: post.category._id
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:postId', (req, res, next) => {
    ImagePost.remove({_id: req.params.postId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'ImagePost  deleted'
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