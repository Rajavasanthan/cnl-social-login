var express = require('express');
var router = express.Router();
const passport = require('passport');
const Story = require('./model/story');
router.get('/all', (req, res) => {
    Story.find()
    .then((story)=>{
        if(story) {
            res.status(200).json(story)
        }else {
            res.status(200).json('not found')
        }
    }).catch(e=>{
     res.status(500).send('something is not right!')
    })
 });

 
router.get('/',passport.authenticate(['jwt'], { session: false }), (req, res) => {
   Story.find({ownerId:req.user._id})
   .then((story)=>{
       if(story) {
           res.status(200).json(story)
       }else {
           res.status(200).json('not found')
       }
   }).catch(e=>{
    res.status(500).send('something is not right!')
   })
});

router.get('/id/:id',passport.authenticate(['jwt'], { session: false }), (req, res) => {
    console.log('params',req.params.id);
    
    Story.findById(req.params.id)
    .then((story)=>{
        if(story) {
            res.status(200).json(story)
        }else {
            res.status(200).json('not found')
        }
    }).catch(e=>{
     res.status(404).send('invalid id')
    })
 });
 

 
router.post('/',passport.authenticate(['jwt'], { session: false }), (req, res) => {
    console.log(req.user);
    Story.create({
        title:req.body.title,
        content:req.body.content,
        ownerId:req.user._id
    })
    .then(story=>{
        res.status(200).json(story)
    }).catch(e=>{
        res.status(500).send('something is not right!')
       })
 });


module.exports = router;