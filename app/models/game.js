var mongoose = require('mongoose');

module.exports = function() {
	
	var candidateSchema = mongoose.Schema({
		str:String
	});

	var roundSchema = mongoose.Schema({
		candidates:[candidateSchema],
		votes:{},
		voteCounts:{}
	});
	
	//this method computes voteCounts, which is a hash containing the candidateIds with the number of votes
	roundSchema.methods.tally = function(cb) {
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
