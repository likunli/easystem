package com.likun.easystem.entity.returnEntity;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseGrade {
    private double credit;
    private double score;
    private String number;
    private String name;

    public CourseGrade(double credit, double score, String number, String name) {
        this.credit = credit;
        this.score = score;
        this.number = number;
        this.name = name;
    }
}
