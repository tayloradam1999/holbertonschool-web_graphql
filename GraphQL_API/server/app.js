const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
// const { MongoClient } = require('mongodb');
const Mongoose = require('mongoose');
const uri = "mongodb+srv://tayloradam1999:papabless217489@cluster0.hptjf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
const cors = require('cors');
// allow cross-origin requests
app.use(cors());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
  });

// (async () => {
// 	try {
// 		await client.connect();
// 		console.log('connected to database');
// 	} catch (error) {
// 		console.error(error);
// 	}
// }
// )();

Mongoose.connect(uri);
Mongoose.connection.once('open', () => {
	console.log('connected to database');
});

app.listen(4000, () => 
	console.log(`now listening for request on port 4000`)
);

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));
