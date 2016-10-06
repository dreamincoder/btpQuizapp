// Check if somebody answered
QuizInstance.storeAnswer({}).watch(function(e, log) {
    if(!e) {
        console.log('A new answer was added on block #'+ log.blockNumber);
        alert('A new answer was added on block #'+ log.blockNumber);
    }
});


