package com.likun.easystem.service;

import com.likun.easystem.entity.Course;
import com.likun.easystem.entity.returnEntity.CourseGrade;

import java.util.List;


public interface CourseService {
    List<Course> findCourses(Long id, String role);

    List<Course> searchCourses(String semester, String major);

    List<Course> searchCoursesByCourseManager(String semester, String major, Long courseManagerId);

    boolean registerCourse(Long studentId, Long courseId);

    boolean dropOffCourse(Long studentId, Long courseId);

    List<CourseGrade> getCourseGrade(String semester, Long userId);

    void save(Course course);

    void delete(Long id);

    void update(Course course);

    void gradeCourseFinally(Long id, Long teacherId);
}
