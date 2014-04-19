var mongoose = require('mongoose');

module.exports = function() {
	
	var candidateSchema = mongoose.Schema({
		str:String,
    player:{type: mongoose.Types.ObjectId,ref:'Players'}
	});

	var roundSchema = mongoose.Schema({
		candidates:[candidateSchema],
    winner:{type:mongoose.Types.ObjectId,get:function(winnerId) {
      return this.candidates.id(winnerId);
    }},
    //hash of playerId -> candidateId
		votes:{},
    //hash of playerId -> sum(votes for that player)
		voteCounts:{}
	});

  roundSchema.virtual('active').get(function() {
    return this.candidates.length < 10;
  });
	
	//this method computes voteCounts, which is a hash containing the candidateIds with the number of votes
	roundSchema.methods.tally = function(cb) {
    if(this.active) return cb(new Error("Round is still open. can't tally while the round is open"));
		if(!this.hasOwnMember('voteCounts')) {
			this.voteCounts = {};
		}
		for(var playerId in this.votes) {
			var candidate = this.votes[playerId];
			if(!voteCounts.hasOwnMember(candidate)){
				this.voteCounts[candidate] = 1;
			} else {
				this.voteCounts[candidate]++;
			}
		}
		this.markModified('voteCounts');
		this.save(cb);
	};

	var gameSchema = mongoose.Schema({
		rounds:[roundSchema],
		players:[{type: mongoose.Types.ObjectId,ref:"Players"}]
	});

	mongoose.model('Games',gameSchema);
};
