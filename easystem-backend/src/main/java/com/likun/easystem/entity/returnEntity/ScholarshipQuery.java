package com.likun.easystem.entity.returnEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScholarshipQuery {
    private Long scholarshipId;
    private Long scholarAssignmentId;
    private String studentName;
    private String number;
    private String name;
    private double amount;

    public ScholarshipQuery(Long scholarshipId, Long scholarAssignmentId, String studentName, String number, String name, double amount) {
        this.scholarshipId = scholarshipId;
        this.scholarAssignmentId = scholarAssignmentId;
        this.studentName = studentName;
        this.number = number;
        this.name = name;
        this.amount = amount;
    }

    public ScholarshipQuery(String number, String name, double amount) {
        this.number = number;
        this.name = name;
        this.amount = amount;
    }
}
