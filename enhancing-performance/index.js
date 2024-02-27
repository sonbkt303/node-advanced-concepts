const express = require('express');
process.env.UV_THREADPOOL_SIZE = 1;
const app = express();
const cluster = require('cluster');

console.log("UV_THREADPOOL_SIZE", process.env.UV_THREADPOOL_SIZE)
function doWork (duration) {
  const startTime = Date.now();

  while(Date.now() - startTime < duration) {

  }
}

if(cluster.isMaster) {
  cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
} else {
  app.get('/', (req, res) => {
    doWork(1000)
    res.send('Hi there 111')
  });
  
  app.get('/hi', (req, res) => {
    doWork(5000)
    res.send('Running fast')
  });
  
  
  app.listen(3000, () => {
    console.log('App listen on port 3000')
  })
}



