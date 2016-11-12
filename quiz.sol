contract QuizApp {
    // TODO:
    // add a boolean variable to limit quiz submissions
    // showing actual answers, student answers after the completion of quiz
    // adding money to the instructors
    // assertions
    struct Quiz {
        uint numberOfQuestions;
        bytes32[] actualAnswers;
        address instructor;
        mapping(address=>bytes32[]) studentAnswers;
        mapping(address=>bool) attempted;
    }
    
    address[] public instructors;
    address[] public students;
    
    Quiz[] quiz;

    function addStudent (address studentAddress) {
        students.push(studentAddress);
    }

    function addInstructor (address instructorAddress) {
        instructors.push(instructorAddress);
    }

    function checkIfInstructor (address sender) returns (bool) {
        for (uint i = 0; i < instructors.length; i++) {
            if (sender == instructors[i]) {
                return true;
            }
        }
        return false;
    }

    function createQuiz (uint numberOfQuestions, bytes32[] actualAnswers) returns (int) {
        if (checkIfInstructor(msg.sender)) {
            uint quizId = quiz.length;
            Quiz newQuiz;
            newQuiz.instructor = msg.sender;
            newQuiz.actualAnswers = actualAnswers;
            newQuiz.numberOfQuestions = numberOfQuestions;
            for (uint i = 0; i < students.length; i++) {
                quiz[quizId].attempted[students[i]] = false;
            }
            return int(quizId);
        }
        return -1;
    }
    
    function alreadyAttempted(address student, uint quizId) returns (bool) {
        return quiz[quizId].attempted[student];
    }
    
    function submitAnswers(address student, bytes32[] answers, uint quizId) returns (bool) {
        // have to check if valid student
        if (alreadyAttempted(student, quizId)) {
            return false;
        }
        quiz[quizId].attempted[student] = true;
        quiz[quizId].studentAnswers[student] = answers;
        return true;
    }
    
    function getStudents() constant returns (address[]) {
        return students;
    }
    
    function getInstructors() constant returns (address[]) {
        return instructors;
    }
    
    function getStudentAnswers(address student, uint quizId) constant returns (bytes32[]) {
        return quiz[quizId].studentAnswers[student];
    }
    
    function getActualAnswers(uint quizId) constant returns (bytes32[]) {
        return quiz[quizId].actualAnswers;
    }
}


