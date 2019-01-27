package com.likun.easystem.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name = "assignment_submission")
public class AssignmentSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long assignmentId;

    private Long courseId;

    private Long studentId;

    private String content;

    private String comment;

    private Long gradeTeacherId;

    private String studentName;

    private Double score;

    private boolean isgrade;

    public AssignmentSubmission() {

    }
}
