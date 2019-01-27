package com.likun.easystem.repository;

import com.likun.easystem.entity.Assignment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends CrudRepository<Assignment, Long> {

    List<Assignment> findByCourseIdEquals(Long courseId);


    @Query("select distinct a from Assignment a " +
            "left join CourseSelection b " +
            "on a.courseId = b.courseId " +
            "where b.courseId in (select b.courseId from b where b.studentId = ?1)")
    List<Assignment> findAssignmentsByStudentId(Long studentId);


    @Query("select distinct a from Assignment a " +
            "left join Course b " +
            "on a.courseId = b.id " +
            "where b.teacherId = ?1")
    List<Assignment> findAssignmentByTeacherId(Long teacherId);

    @Query("select sum(a.point) from Assignment a where a.courseId = ?1")
    double getCourseTotalGrade(Long id);
}
