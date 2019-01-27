package com.likun.easystem.controller;


import com.likun.easystem.service.AssignmentService;
import com.likun.easystem.entity.Assignment;
import com.likun.easystem.entity.AssignmentSubmission;
import com.likun.easystem.utils.Msg;
import com.likun.easystem.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class AssignmentController {

    @Autowired
    AssignmentService assignmentService;

    /**
     * /api/assignments
     * (student teacher) return all assignments related to user
     *
     * @param userId   userId
     * @param role     role
     * @param courseId courseId
     * @return List<Assignment>
     */
    @GetMapping("/assignments")
    public Msg getAssignments(@RequestParam Long userId,
                              @RequestParam String role,
                              @RequestParam Long courseId) {
        List<Assignment> res = assignmentService.getAssignments(userId, role, courseId);
        return ResultUtil.success(res);
    }

    /**
     * /api/assignment
     * (student teacher) get specific assignment by id
     *
     * @param id assignment id
     * @return Assignment
     */
    @GetMapping("/assignment")
    public Msg getAssignment(@RequestParam Long id) {
        Assignment res = assignmentService.getAssignment(id);
        return ResultUtil.success(res);
    }

    /**
     * /api/assignment/submissions
     * (student teacher) return all assignment submission related to user
     *
     * @param assignmentId assignmentId
     * @param userId       userId
     * @param role         role
     * @return List<AssignmentSubmission>
     */
    @GetMapping("/assignment/submissions")
    public Msg getAssignmentSubmissions(@RequestParam Long assignmentId,
                                        @RequestParam Long userId,
                                        @RequestParam String role) {
        List<AssignmentSubmission> res = assignmentService.getAssignmentSubmissions(assignmentId, userId, role);
        return ResultUtil.success(res);
    }


    /**
     * /api/assignment/submission
     * (student teacher) get specific assignment submission by its id
     *
     * @param id
     * @return Assignment Submission
     */
    @GetMapping("/assignment/submission")
    public Msg getAssignmentSubmission(@RequestParam Long id) {
        AssignmentSubmission res = assignmentService.getAssignmentSubmissionById(id);
        return ResultUtil.success(res);
    }

    /**
     * /api/assignment/submission/delete
     * (student) delete an existing assignment submission by its id
     *
     * @param id
     * @return Msg
     */
    @GetMapping("/assignment/submission/delete")
    public Msg deleteAssignmentSubmission(@RequestParam Long id) {
        assignmentService.deleteAssignmentSubmission(id);
        return ResultUtil.success();
    }

    /**
     * /api/assignment/submission/update
     * (studnet) update an existing assignment submission
     *
     * @param id
     * @param content
     * @param comment
     * @return
     */
    @GetMapping("/assignment/submission/update")
    public Msg updateAssignmentSubmission(@RequestParam Long id,
                                          @RequestParam String content,
                                          @RequestParam String comment) {
        assignmentService.updateAssignmentSubmission(id, content, comment);
        return ResultUtil.success();
    }

    /**
     * /api/assignment/submission/create
     * (student) create a new assignment submission
     *
     * @param assignmentSubmission
     * @return
     */
    @PostMapping("/assignment/submission/create")
    public Msg createAssignmentSubmission(@RequestBody AssignmentSubmission assignmentSubmission) {
        AssignmentSubmission res = assignmentService.createAssignmentSubmission(assignmentSubmission);
        return ResultUtil.success(res);
    }

    /**
     * /api/assignment/submission/update
     * (teacher) update assignment
     *
     * @param assignmentSubmission
     * @return
     */
    @PostMapping("/assignment/submission/update")
    public Msg updateAssignmentSubmission(@RequestBody AssignmentSubmission assignmentSubmission) {
        assignmentService.updateAssignmentSubmissionEntity(assignmentSubmission);
        return ResultUtil.success();
    }


    /**
     * /api/assignment/teacher/submissions
     * (teacher) get a graded or ungraded assignment submission
     *
     * @param assignmentId
     * @param userId
     * @param role
     * @param option
     * @return
     */
    @GetMapping("/assignment/teacher/submissions")
    public Msg getAssignmentSubmissionsWithOption(@RequestParam Long assignmentId,
                                                  @RequestParam Long userId,
                                                  @RequestParam String role,
                                                  @RequestParam String option) {
        List<AssignmentSubmission> res = assignmentService.getAssignmentSubmissionsWithOption(assignmentId, userId, role, option);
        return ResultUtil.success(res);
    }

    /**
     * /api/assignment/createOrUpdate
     * (teacher) create or update an assignment
     * @param assignment
     * @return
     */
    @PostMapping("/assignment/createOrUpdate")
    public Msg createOrUpdate(@RequestBody Assignment assignment) {
        assignmentService.save(assignment);
        return ResultUtil.success();
    }
}
