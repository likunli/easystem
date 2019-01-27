package com.likun.easystem;

import com.likun.easystem.entity.Global;
import com.likun.easystem.repository.GlobalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/**
 * this class execute after spring container initialized (EasystemApplication.java)
 * the annotation @Order is redundant here,
 * and annotations like @Order(1), @Order(2)... used to set priority for multiple initial threads
 *
 * InitializeCourseRate.java update the MySQL table global first line if it does not exist
 * when application first launched
 * @author Likun Li
 * @version 2018.12
 * @since 1.8
 */
@Component
@Order
public class InitializeCourseRate implements CommandLineRunner {

    @Autowired
    GlobalRepository globalRepository;

    @Override
    public void run(String[] args) {
        if (globalRepository.getCredit() == null) {
            globalRepository.save(new Global(1000.0));
            System.out.println("has set course rate first time.");
        } else {
            System.out.println("course rate has existed, nothing changed.");
        }
    }
}