package com.likun.easystem.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "scholarship")
public class Scholarship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String number;

    private String name;

    private Long financeManagerId;

    private String scholarshipType;

    private String rateType;

    private double value;

    private String country;

    private double gpa;

    private String major;

    public Scholarship() {

    }
}
