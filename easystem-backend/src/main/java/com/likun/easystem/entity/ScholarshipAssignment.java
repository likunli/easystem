package com.likun.easystem.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name = "scholarship_assignment")
public class ScholarshipAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;

    private Long scholarshipId;

    private Long financeManagerId;

    private double amount;

    public ScholarshipAssignment() {

    }

    public ScholarshipAssignment(Long studentId, Long scholarshipId, Long financeManagerId, double amount) {
        this.studentId = studentId;
        this.scholarshipId = scholarshipId;
        this.financeManagerId = financeManagerId;
        this.amount = amount;
    }
}
