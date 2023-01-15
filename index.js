const express = require('express')
const app = express()
const port = 8080
const { Post } = require('./post')
const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const server = app.listen(port, () => {
    console.log(`${port} running`)
});

server.keepAliveTimeout = 61 * 1000;
server.headersTimeout = 65 * 1000;


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://minhwan:12345@cluster0.nrsed4p.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB Connected...'))
    .catch(() => console.log(err))


app.get('/', (req, res) => res.send('안녕하세요~~'))
app.get('/a', (req, res) => res.send('안녕하세요222'))

app.post('/api/users/post', (req, res) => {
    const posting = new Post(req.body)

    posting.save((err, postInfo) => {
        if (err) return res.json({success: false, err})
        return res.status(200).json({success : true})
    })
})

app.get('/api/users/hh', (req, res) => {
    console.log('?')
    
    Post.find((err, data) => {
        if (err) return res.json({success: false, err})
        return res.status(200).json(data)
    })
})

// app.listen(port, () => {
//     console.log(`${port} running`)
// })
