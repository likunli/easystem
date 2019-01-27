package com.likun.easystem.repository;


import com.likun.easystem.entity.Course;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface CourseRepository extends CrudRepository<Course, Long> {

    @Query("select a from Course a " +
            "where a.teacherId = ?1")
    List<Course> findByTeacherId(Long id);

    @Query("select distinct a from Course a " +
            "left join CourseSelection b " +
            "on a.id = b.courseId " +
            "where b.courseId in (select c.courseId from CourseSelection c where c.studentId = ?1)")
    List<Course> findCoursesByStudentId(Long studentId);

    List<Course> findCoursesBySemesterEqualsAndMajorEquals(String semester, String major);

    List<Course> findCoursesBySemesterEquals(String semester);

    List<Course> findCoursesByMajorEquals(String major);


    @Query("select c from Course c where c.semester = ?1 and c.major = ?2 and c.courseManagerId = ?3")
    List<Course> findCoursesBySemesterAndMajorAndCourseManagerId(String semester, String major, Long userId);

    @Query("select c from Course c where c.semester = ?1 and c.courseManagerId = ?2")
    List<Course> findCoursesBySemesterAndCourseManagerId(String semester, Long userId);

    @Query("select c from Course c where c.major = ?1 and c.courseManagerId = ?2")
    List<Course> findCoursesByMajorAndCourseManagerId(String major, Long userId);

    List<Course> findByCourseManagerIdEquals(Long id);

    @Query(value = "select c from Course c")
    List<Course> findAll();

    @Transactional
    @Modifying
    @Query(value = "update Course set capacity = :capacity where id = :id")
    void updateCapacity(@Param(value = "capacity") int capacity, @Param(value = "id") Long id);


}
