// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage {
    uint256 public favouriteNumber;

    struct Student {
        string name;
        uint rollNo;
    }

    Student[] studentList;
    mapping(string => uint) public studentNameToRollNo;

    function retrieve() public view returns (uint256) {
        return favouriteNumber;
    }

    function store(uint256 _favouriteNumber) public {
        favouriteNumber = _favouriteNumber;
    }

    function addStudent(string memory _name, uint _rollNo) public {
        studentList.push(Student(_name, _rollNo));
        studentNameToRollNo[_name] = _rollNo;
    }

    function getStudent(uint _rollNo) public view returns (Student memory) {
        for (uint i = 0; i < studentList.length; i++) {
            if (studentList[i].rollNo == _rollNo) {
                return studentList[i];
            }
        }
        return Student("", 0);
    }
}
