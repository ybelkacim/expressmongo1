const { application } = require('express')
const express = require('express')
const subscribers = require('../modules/subscribers')
const router = express.Router()
const subscriber = require('../modules/subscribers')

router.get('/', async(req, res ) =>{
    try{
        const subscribers = await subscriber.find()
        res.json(subscribers)
    }catch(err) {
        res.status(500).json({message:err.message})
    }
})

router.get('/:id', getSubscriber, (req, res ) =>{
  res.send(res.params.name)
})

router.post('/', async(req, res ) =>{
    const subscribers= new subscriber({
        name:req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try{
        const newSubscriber = await subscribers.save()
        res.status(201).json(newSubscriber)
    }catch(err) {
        res.status(400).json({message:err.message})
    }
})

router.patch('/:id', getSubscriber,async(req, res ) =>{
    if (req.body.name != null) {
        res.subscriber.name= req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel= req.body.subscribedToChannel
    }
    try{ 
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)

    }catch(err) {
    res.status(400).json({message: err.message})
    }
})

router.delete('/:id', getSubscriber, async(req, res ) =>{
    try{ 
        await res.subscriber.remove()
        res.json({message: 'deleted subscriber'})

    }catch(err) {
    res.status(500).json({message: err.message})
    }
})


async function getSubscriber(req, res, next) {
    let subscriber
    try{
        subscriber= await subscribers.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({message: 'cannot find subscriber'})
        }

    }catch (err) {
    return res.status(500).json({message:err.message})
    }
    any 
    res.subscriber=subscriber
    next()
}

module.exports = router