package com.likun.easystem.repository;

import com.likun.easystem.entity.AssignmentSubmission;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface AssignmentSubmissionRepository extends CrudRepository<AssignmentSubmission, Long> {

    @Query("select o from AssignmentSubmission o " +
            "where o.assignmentId = ?1 and o.studentId = ?2")
    List<AssignmentSubmission> findByStudentIdAndAssignmentId(Long assignmentId, Long studentId);

    @Query("select a from AssignmentSubmission a " +
            "left join Course b " +
            "on a.courseId = b.id " +
            "left join Assignment c " +
            "on a.assignmentId = c.id " +
            "where c.id = ?1 and b.teacherId = ?2")
    List<AssignmentSubmission> findByTeacherIdAndAssignmentId(Long assignmentId, Long teacherId);

    @Modifying
    @Transactional
    @Query("update AssignmentSubmission set content = ?2 , comment = ?3 where id = ?1")
    void update(Long id, String content, String comment);

    @Query("select a from AssignmentSubmission a " +
            "left join Course b " +
            "on a.courseId = b.id " +
            "left join Assignment c " +
            "on a.assignmentId = c.id " +
            "where c.id = ?1 and b.teacherId = ?2 and a.isgrade = ?3")
    List<AssignmentSubmission> findWithOption(Long assignmentId, Long teacherId, boolean isGrade);

    @Query("select sum(a.score) from AssignmentSubmission a where a.courseId = ?1 and a.studentId = ?2")
    double getCourseTotalGrade(Long courseId, Long studentId);
}
