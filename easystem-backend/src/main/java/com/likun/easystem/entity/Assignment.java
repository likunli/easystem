package com.likun.easystem.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "assignment")
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double point;

    private String name;

    private String description;

    private Long courseId;

    private Long teacherId;

    private String assignmentType;

    public Assignment() {

    }
}
