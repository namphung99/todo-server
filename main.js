const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const queryString = require('query-string')

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// custom output for LIST with pagination
router.render = (req, res) => {
  // Check GET with pagination  
  // if yes , custom output
  
  const headers = res.getHeaders();
  const totalCountHeader = headers['x-total-count'];
  if(req.method === 'GET'&& totalCountHeader){
    const queryParams = queryString.parse(req._parsedUrl.query);
    console.log(queryParams)

    const result = {
      data: res.locals.data,
      pagination: {
        _page:Number.parseInt(queryParams._page) || 1,
        _limit:Number.parseInt(queryParams._limit) || 5,
        totalRows:Number.parseInt(totalCountHeader)
      }
    }

    return res.jsonp(result)
  }

  // Otherwise, keep default behavior
  res.jsonp( res.locals.data)
}

// Use default router

server.use('/api',router)

// start server
const server_port = process.env.YOUR_PORT || process.env.PORT || 80;
const server_host = process.env.YOUR_HOST || '0.0.0.0';
server.listen(server_port, server_host, () => {
  console.log(`namphung-todo-api is running on port ${ server_port }`)
})