const db = mongoose.connection.once('open', () => {
  console.log('Connected to mongodb with mongoose');
});

db.on('error', console.error.bind(console, 'connection error: '));



module.exports = db;
