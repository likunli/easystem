package com.likun.easystem.service;


import com.likun.easystem.entity.Assignment;
import com.likun.easystem.entity.AssignmentSubmission;

import java.util.List;

public interface AssignmentService {

    List<Assignment> getAssignments(Long userId, String role, Long courseId);

    Assignment getAssignment(Long id);

    List<AssignmentSubmission> getAssignmentSubmissions(Long assignmentId, Long userId, String role);

    AssignmentSubmission getAssignmentSubmissionById(Long id);

    void deleteAssignmentSubmission(Long id);

    void updateAssignmentSubmission(Long id, String content, String comment);

    AssignmentSubmission createAssignmentSubmission(AssignmentSubmission assignmentSubmission);

    void updateAssignmentSubmissionEntity(AssignmentSubmission assignmentSubmission);

    List<AssignmentSubmission> getAssignmentSubmissionsWithOption(Long assignmentId,
                                                                  Long userId, String role, String option);

    void save(Assignment assignment);
}
