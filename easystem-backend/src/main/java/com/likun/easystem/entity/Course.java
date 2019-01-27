package com.likun.easystem.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "course")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long teacherId;

    private Long courseManagerId;

    private String semester;

    private String major;

    private String number;

    private String name;

    private String location;

    private int capacity;

    private int currentSize;

    private double credit;

    private String courseType;

    private String evaluationType;


    public Course() {

    }
}
