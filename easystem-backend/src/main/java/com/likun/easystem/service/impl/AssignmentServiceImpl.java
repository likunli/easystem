package com.likun.easystem.service.impl;

import com.likun.easystem.service.AssignmentService;
import com.likun.easystem.entity.Assignment;
import com.likun.easystem.entity.AssignmentSubmission;
import com.likun.easystem.repository.AssignmentRepository;
import com.likun.easystem.repository.AssignmentSubmissionRepository;
import com.likun.easystem.repository.CourseSelectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AssignmentServiceImpl implements AssignmentService {

    @Autowired
    AssignmentRepository assignmentRepository;

    @Autowired
    AssignmentSubmissionRepository assignmentSubmissionRepository;

    @Autowired
    CourseSelectionRepository courseSelectionRepository;

    @Override
    public List<Assignment> getAssignments(Long userId, String role, Long courseId) {
        switch (role) {
            case "student":
                if (courseId == -1) {
                    return assignmentRepository.findAssignmentsByStudentId(userId);
                } else {
                    return assignmentRepository.findByCourseIdEquals(courseId);
                }
            case "teacher":
                if (courseId == -1) {
                    return assignmentRepository.findAssignmentByTeacherId(userId);
                } else {
                    return assignmentRepository.findByCourseIdEquals(courseId);
                }

            default:
                return new ArrayList<>();
        }
    }

    @Override
    public Assignment getAssignment(Long id) {
        return assignmentRepository.findById(id).orElse(null);
    }

    @Override
    public AssignmentSubmission getAssignmentSubmissionById(Long id) {
        return assignmentSubmissionRepository.findById(id).orElse(null);
    }

    @Override
    public List<AssignmentSubmission> getAssignmentSubmissions(Long assignmentId, Long userId, String role) {
        switch (role) {
            case "student":
                return assignmentSubmissionRepository.findByStudentIdAndAssignmentId(assignmentId, userId);
            case "teacher":
                return assignmentSubmissionRepository.findByTeacherIdAndAssignmentId(assignmentId, userId);
            default:
                return new ArrayList<>();
        }
    }

    @Override
    public void deleteAssignmentSubmission(Long id) {
        assignmentSubmissionRepository.deleteById(id);
    }

    @Override
    public void updateAssignmentSubmission(Long id, String content, String comment) {
        assignmentSubmissionRepository.update(id, content, comment);
    }

    @Override
    public AssignmentSubmission createAssignmentSubmission(AssignmentSubmission assignmentSubmission) {
        assignmentSubmission.setIsgrade(false);
        return assignmentSubmissionRepository.save(assignmentSubmission);
    }

    @Override
    public void updateAssignmentSubmissionEntity(AssignmentSubmission assignmentSubmission) {
        assignmentSubmissionRepository.save(assignmentSubmission);
    }

    @Override
    public List<AssignmentSubmission> getAssignmentSubmissionsWithOption(Long assignmentId,
                                                                         Long userId,
                                                                         String role,
                                                                         String option) {
        switch (option) {
            case "all":
                return assignmentSubmissionRepository.findByTeacherIdAndAssignmentId(assignmentId, userId);
            case "graded":
                return assignmentSubmissionRepository.findWithOption(assignmentId, userId, true);
            case "ungraded":
                return assignmentSubmissionRepository.findWithOption(assignmentId, userId, false);
            default:
                return new ArrayList<>();
        }
    }

    @Override
    public void save(Assignment assignment) {
        assignmentRepository.save(assignment);
    }
}
