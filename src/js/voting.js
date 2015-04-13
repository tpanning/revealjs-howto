var voting = function(){
    var self = {};

    var eventHandlers = [];

    var votes = {};

    var multiplex = Reveal.getConfig().multiplex;
    var socketId = multiplex.id;

	socket.on('votes', function(officialVotes) {
        console.log(officialVotes);
        votes = officialVotes;
        notifyHandlers();
	});

    var notifyHandlers = function() {
        for (var i in eventHandlers) {
            eventHandlers[i]();
        }
    };

    self.voteFor = function(voteId) {
        var voteObj = { socketId: socketId };
        voteObj[voteId] = 1;
        socket.emit('vote', voteObj);
        return self;
    };

    self.getVotesFor = function(voteId) {
        if (votes.hasOwnProperty(voteId)) {
            return votes[voteId];
        } else {
            return 0;
        }
    };

    self.on = function(eventId, eventHandler) {
        if (eventId === 'votesChanged') {
            eventHandlers.push(eventHandler);
        }
        return self;
    }

    return self;
}();
