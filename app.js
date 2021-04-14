const express = require('express');
const exphbs = require('express-handlebars');



const movieList = require('./movies.json').results;
const app = express();


app.use(express.static('public'));

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/movies/:movieId', (req, res) =>{
  const id = req.params.movieId;
  let movie = movieList.find( item => item.id === +id);

  res.render('show', {movie: movie} )

});
app.get('/search', (req, res) =>{
  const keyword = req.query.keyword.toLowerCase();
  const filterList = movieList.filter( movie => movie.title.toLowerCase().includes(keyword));
  res.render('index', {movies: filterList})
});

app.use('/', (req, res) => {
  
 res.render('index' ,{ movies :movieList})

});


app.listen(3000);