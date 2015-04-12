var voting = function(){
    var self = {};

    var eventHandlers = [];

    var votes = {};

    var notifyHandlers = function() {
        for (var i in eventHandlers) {
            eventHandlers[i]();
        }
    };

    self.voteFor = function(voteId) {
        if (!votes.hasOwnProperty(voteId)) {
            votes[voteId] = 0;
        }
        votes[voteId] = votes[voteId]+1;
        notifyHandlers();
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
