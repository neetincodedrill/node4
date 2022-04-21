var MongoClient = require( 'mongodb' ).MongoClient;
var _db;
const url  = process.env.Db
module.exports = {
  connectToServer: function( callback ) {
    MongoClient.connect( "mongodb+srv://neetinnegi:neetinnegi@cluster0.tyxfy.mongodb.net/", function( err, client ) {
      _db = client.db("user");
      console.log('Mongodb database running and connected')
      return callback( err );
    } );
  },
  getDb: function() {
    return _db;
  }
};
