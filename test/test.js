var assert = require("assert");

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/test');

var database = require('../routes/database');

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
})

var collection = db.get('dbtest');
var testitem = {"item":"test"}
db.insert(db, testitem);
assert.equal(testitem, db.find())