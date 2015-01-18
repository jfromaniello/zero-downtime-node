var cluster = require('cluster');

console.log('started master with ' + process.pid);

//fork the first process
cluster.fork();

process.on('SIGHUP', function () {
  console.log('reloading...');
  var new_worker = cluster.fork();
  new_worker.on('listening', function () {

    //stop all other workers
    for(var id in cluster.workers) {
      if (id === new_worker.id.toString()) continue;
      cluster.workers[id].process.kill('SIGTERM');
    }
  });
});