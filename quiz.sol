contract Quiz {
    event Deposit(address from, uint value);
    uint8[] public allStudents;

    struct response {
        bool answered;
        string answer;
    }
    mapping(uint8 => response) public answers;

    function() {
        if (msg.value > 0)
            Deposit(msg.sender, msg.value);
    }

    function addStudent(uint8 name) {
        answers[name].answered = false;
        allStudents.push(name);
    }

    function checkIfAnswered(uint8 name) constant returns (bool) {
        return answers[name].answered;
    }

    function storeAnswer(uint8 name, string ans) {
        answers[name].answer = ans;
        answers[name].answered = true;
    }
}

