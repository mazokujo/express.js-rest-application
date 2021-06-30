const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')



let comments = [
    {
        id: uuidv4(),
        username: "Bane",
        comment: "Great content as usual"
    },
    {
        id: uuidv4(),
        username: "Alpha",
        comment: "You a simp though"
    },
    {
        id: uuidv4(),
        username: "koi45",
        comment: "Drama queen in the building"
    },
    {
        id: uuidv4(),
        username: "Prosciutto",
        comment: "One hell of a fight"
    }

]

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})


app.get('/comments', (req, res) => {
    console.log(comments);
    res.render('comments/index', { comments });
})
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuidv4() });
    console.log(comments)
    res.redirect('/comments')
})
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });

});

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params
    const CommentUpdate = req.body.comment;
    const Foundcomment = comments.find(c => c.id === id);
    Foundcomment.comment = CommentUpdate;
    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params
    //const Foundcomment = comments.find(c => c.id === id);
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})



app.listen('3000', () => {
    console.log('listening to port 3000');
})

// app.get('/tacos', (req, res) => {
//     res.send('Get/tacos response')
// })

// app.post('/tacos', (req, res) => {
//     console.log(req.body);
//     const { bossname, race } = req.body
//     res.send(`${bossname} is a ${race} in the bloodborne game`);
// })



// const { subreddit } = req.params;
// const data = redditdata[subreddit];
// if (data) {
//     res.render('subreddit', { ...data });
// } else {
//     res.render('notfound')
// }
