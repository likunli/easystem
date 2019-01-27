package com.likun.easystem.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "course_selection")
public class CourseSelection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;

    private Long teacherId;

    private Long courseId;

    private String semester;

    private double score;

    private int rank;

    private double credit;

    private boolean isgrade;

    public CourseSelection() {

    }

    public CourseSelection(Long studentId, Long teacherId, Long courseId, String semester, double score, int rank, double credit) {
        this.studentId = studentId;
        this.teacherId = teacherId;
        this.courseId = courseId;
        this.semester = semester;
        this.score = score;
        this.rank = rank;
        this.credit = credit;
    }
}
