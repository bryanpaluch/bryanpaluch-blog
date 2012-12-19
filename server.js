var
  express = require('express'),
  app     = express(),
  htmlcache = require('./lib/htmlcache'),
  poet    = require('poet')( app );

var cache = new htmlcache();

poet
  .createPostRoute()
  .createPageRoute()
  .createTagRoute()
  .createCategoryRoute()
  .init();

app.set( 'view engine', 'jade' );
app.set( 'views', __dirname + '/views' );
app.use( express.static( __dirname + '/public' ));
app.use( app.router );

//app.get( '/', checkCache, renderIndex);
app.get( '/',  renderIndex);

app.listen( 3001 );

//Temporary caching of main page
function renderIndex( req, res){
  res.render('index' , function(err, html){
    res.send(html);
    cache.save('index', html);
  });
}

function checkCache(req, res, next){
 if(cache.check('index'))
   res.send(cache.get('index'));
 else
   next();
}
