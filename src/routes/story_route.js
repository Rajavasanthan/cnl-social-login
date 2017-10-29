var express = require('express');
var router = express.Router();
const passport = require('passport');
const Story = require('../model/story');
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

router.get('/:id',passport.authenticate(['jwt'], { session: false }), (req, res) => {
    console.log('params',req.params.id);
    
    Story.findById(req.params.id).populate('react.UserId')
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
 
 router.patch('/:id',passport.authenticate(['jwt'], { session: false }), (req, res) => {
    console.log('body',req.body);
    let react= req.body.react || 0;
    let name= req.body.name || 0;
if(react) {
    Story.findById(req.params.id).then(story=>{
let count= story.react.filter((e)=>{
    console.log(req.user._id,'suck')
    if(req.user._id!==e.UserId) {
        Story.findByIdAndUpdate(req.params.id, {
            $pop: { react:{UserId:req.user._id,status:req.body.react} }
          }, { 'new': true}).then((story)=>{
            if(story) {
                res.status(201).json(story)
            }else {
                res.status(200).json('not found')
            }
        }).catch(e=>{
         res.status(404).send('invalid id')
        })
    } else {
        res.status(404).send('not liked')
    }
})
console.log(count.length,'counter')
    })


}
else if (req.body){
Story.findByIdAndUpdate(req.params.id, 
        { 
        title:req.body.title
        }, { 'new': true}).then((story)=>{
            if(story) {
                res.status(201).json(story)
            }else {
                res.status(200).json('not found')
            }
        }).catch(e=>{
         res.status(404).send('invalid id')
        })
}
 else {
    res.status(200).json('nothing to update')
 }
    
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