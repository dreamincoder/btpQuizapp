contract Quiz {
    event Deposit(address from, uint value);
    bytes32[] public allStudents;

    struct response {
        bool answered;
        string answer;
    }
    mapping(bytes32 => response) public answers;

    function() {
        if (msg.value > 0)
            Deposit(msg.sender, msg.value);
    }

    function addStudent (bytes32 name) {
        answers[name].answered = false;
        allStudents.push(name);
    }

    function checkIfAnswered(bytes32 name) constant returns (bool) {
        return answers[name].answered;
    }

    function storeAnswer(bytes32 name, string ans) {
        answers[name].answer = ans;
        answers[name].answered = true;
    }

    function getAnswer(bytes32 name) constant returns(string) {
        return answers[name].answer;
    }

    function getStudents() constant returns (bytes32 []) {
        return allStudents;
    }
}
