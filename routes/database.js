


/**
var getCollection = function(db, data){
	return coll
};
*/

getFlags = function(db){
	var collection = db.get("flags");
	var value;
	var ret = collection.find({},function(err, docs){

		value = docs;
		console.log("value:"+value);
		return value;
	});
	//var stream = collection.find({mykey:{$ne:2}}).stream();
	console.log("ret:"+ret);
}
/**
collection.find({}, {}, function(err, doc){
		if(err){
			console.log("Failed to get flags");
			//return null;
		}
		else{
			console.log("Successfully get flags");
			console.log("doc:"+doc);
			//return doc;
		}
	})
*/

/**
 * Insert into the database
 */
exports.insert = function(db){

return function(req, res){
	var flagColl = db.get("flags");
	var value;
		
	var ret = flagColl.find({},function(err, docs){

		var flags = docs;
		var data = req.body;
		
		var coll = data['db'];//get the collection that we want
		var content = data['comment'];	
		for(var i in flags){
			if(content.indexOf(flags[i]['flag']) >= 0){
				res.send(500, "An error occurred");
				console.log("Filered: "+ content);
				return;
			}
		}
	
		var collection = db.get(coll);
		collection.insert({
			"comment": content
		}, function(err, doc){
			if(err){
				res.send(500, "An error occurred");
				console.log("Error: "+err);
			}
			else{
				res.send(200);
				console.log("Success");
			}
		});
	});
	console.log("ret:"+ret);

}

};

/**
 * Delete from the database
 */
exports.find = function(db){
	return function(req, res){
		var data = req.body;
		var coll = data['db'];
		var collection = db.get(coll);

		collection.find({}, {}, function(err, doc){
			if(err){
				console.log("error");
				res.send("Error");
			}
			else{
				res.send(doc);
				console.log("Data sent successful");
			}
		});

	};
};