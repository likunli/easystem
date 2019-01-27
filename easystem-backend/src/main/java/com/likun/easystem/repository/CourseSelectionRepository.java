package com.likun.easystem.repository;

import com.likun.easystem.entity.CourseSelection;
import com.likun.easystem.entity.returnEntity.CourseGrade;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface CourseSelectionRepository extends CrudRepository<CourseSelection, Long> {

    boolean existsByStudentIdEqualsAndCourseIdEquals(Long studentId, Long courseId);


    CourseSelection findDistinctFirstByStudentIdEqualsAndCourseIdEquals(Long studentId, Long courseId);

    boolean deleteByCourseId(Long id);


    @Query("select new com.likun.easystem.entity.returnEntity.CourseGrade(a.credit, a.score, b.number, b.name) " +
            "from CourseSelection a " +
            "left join Course b " +
            "on a.courseId = b.id " +
            "where a.studentId = ?2 and b.semester = ?1")
    List<CourseGrade> getGradesBySemester(String semester, Long id);


    @Query("select new com.likun.easystem.entity.returnEntity.CourseGrade(a.credit, a.score, b.number, b.name) " +
            "from CourseSelection a " +
            "left join Course b " +
            "on a.courseId = b.id " +
            "where a.studentId = ?1")
    List<CourseGrade> getGrades(Long id);


    @Transactional
    @Modifying
    @Query("update CourseSelection c " +
            "set c.isgrade = true, c.score = ?3 " +
            "where c.courseId = ?1 and c.studentId = ?2")
    void gradeByAssignmentPointSum(Long courseId, Long studentId, double score);


    @Query("select c from CourseSelection c where c.studentId = ?1")
    List<CourseSelection> getByStudentId(Long id);
}
