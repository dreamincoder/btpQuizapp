contract QuizApp {

    address instructorManager;
    address studentManager;
    
    bytes32[] students;
    bytes32[] instructors;
    
    
    mapping(uint=>bytes32) quizInstructor;
    mapping(uint=>bool) isQuizActive; 
    mapping(uint=>uint[]) actualAnswers;
    mapping(uint=>mapping(bytes32=>uint[])) studentAnswers;
    mapping(uint=>mapping(bytes32=>bool)) studentAttempted;
    
    uint[] quizzes;
    uint quizCount;

    event studentAnswered(uint quizId, bytes32 studentId, uint[] answers);
    event quizCreated(uint quizId, bytes32 instructorId, uint[] actualAnswers);

    // Constructor 
    function QuizApp(address instrManager, address stdntManager) {
        instructorManager = instrManager;
        studentManager = stdntManager;
        quizCount = 0;
    }

    function studentAlreadyExists(bytes32 studentId) constant returns (bool) {
        for (uint i = 0; i < students.length; i++) {
            if (studentId == students[i]) return true;
        }
        return false;
    }
    
    function instructorAlreadyExists(bytes32 instructorId) constant returns (bool) {
        for (uint i = 0; i < instructors.length; i++) {
            if (instructorId == instructors[i]) return true;
        }
        return false;
    }
    
    function addStudent (bytes32 studentId) returns (int) {
        if (msg.sender != studentManager) {
            return -1;
        } else if (studentAlreadyExists(studentId)) {
            return -2;
        } else {
            students.push(studentId);
            return 1;
        }
    }
    
    function addInstructor (bytes32 instructorId) returns (int) {
        if (msg.sender != instructorManager) {
            return -1;
        } else if (instructorAlreadyExists(instructorId)) {
            return -2;
        } else {
            instructors.push(instructorId);
            return 1;
        }
    }

    function checkIfInstructor (bytes32 id) constant returns (bool) {
        for (uint i = 0; i < instructors.length; i++) {
            if (id == instructors[i]) {
                return true;
            }
        }
        return false;
    }
    
    function checkIfStudent (bytes32 id) constant returns (bool) {
        for (uint i = 0; i < students.length; i++) {
            if (id == students[i]) {
                return true;
            }
        }
        return false;
    }
    
    function validQuizId(uint id) constant returns (bool) {
        for (uint i = 0; i < quizzes.length; i++) {
            if (id == quizzes[i]) {
                return true;
            }
        }
        return false;
    }
    
    function createQuiz (uint quizId, bytes32 instructorId, uint[] actualAns) returns (int) {
        if (msg.sender != instructorManager) {
            return -1;
        } else if (checkIfInstructor(instructorId) == false) {
            return -2;
        } else {
            quizInstructor[quizId] = instructorId;
            isQuizActive[quizId] = true;
            actualAnswers[quizId] = actualAns;
            quizzes.push(quizId);
            quizCount = quizCount + 1;
            quizCreated(quizId, instructorId, actualAns);
            return 1;
        }
    }
    
    function alreadyAttempted(bytes32 studentId, uint quizId) constant returns (bool) {
        return studentAttempted[quizId][studentId];
    }
    
    function submitAnswers(bytes32 studentId, uint[] answers, uint quizId) returns (int) {
        // if (msg.sender != instructorManager) {
        //     return -1;
        // } else if (checkIfStudent(studentId) == false) {
        //     return -3;
        // } else if (validQuizId(quizId) == false) {
        //     return -4;
        // } else if (alreadyAttempted(studentId, quizId) == true) {
        //     return -5;
        // } else if (isQuizActive[quizId] == false) {
        //     return -6;
        // } else {
        //     studentAnswers[quizId][studentId] = answers;
        //     studentAnswered(quizId, studentId, answers);
        //     return 1;
        // }
        if (alreadyAttempted(studentId, quizId) == true) {
            return -5;
        } else {
            studentAnswers[quizId][studentId] = answers;
            studentAnswered(quizId, studentId, answers);
            return 1;
        }
    }
    
    function endQuiz(bytes32 instructorId, uint quizId) returns (int) {
        if (msg.sender != instructorManager) {
            return -1;
        } else if (validQuizId(quizId) == false) {
            return -2;
        } else if (instructorId != quizInstructor[quizId]) {
            return -3; // wrong instructor
        } else {
            isQuizActive[quizId] = false;
        }
    }
    
    function getStudents() constant returns (bytes32[]) {
        return students;
    }
    
    function getInstructors() constant returns (bytes32[]) {
        return instructors;
    }
    
    function getStudentAnswers(bytes32 studentId, uint quizId) constant returns (uint[]) {
        uint[] empty;
        if (validQuizId(quizId) == false || isQuizActive[quizId] == true) {
            return empty;
        } else {
            return studentAnswers[quizId][studentId];
        }
    }

    function getNumQuizzes() constant returns (uint) {
        return quizCount;
    }
    
    function getActualAnswers(uint quizId) constant returns (uint[]) {
        uint[] empty;
        if (validQuizId(quizId) == false || isQuizActive[quizId] == true) {
            return empty;
        } else {
            return actualAnswers[quizId];
        }
    }
}
