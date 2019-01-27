package com.likun.easystem.controller;


import com.likun.easystem.service.ScholarshipService;
import com.likun.easystem.entity.Scholarship;
import com.likun.easystem.entity.returnEntity.ScholarshipQuery;
import com.likun.easystem.utils.Msg;
import com.likun.easystem.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ScholarshipController {

    @Autowired
    ScholarshipService scholarshipService;

    /**
     * /api/scholarships/student
     * (student) get all scholarships assignment by specific student id
     *
     * @param userId
     * @return List<ScholarshipQuery>
     */
    @GetMapping("/scholarships/student")
    public Msg getScholarships(@RequestParam Long userId) {
        List<ScholarshipQuery> res = scholarshipService.getScholarships(userId);
        return ResultUtil.success(res);
    }


    /**
     * /api/scholarships/manager
     * (finance manager) get scholarship list
     *
     * @param userId
     * @return
     */
    @GetMapping("/scholarships/manager")
    public Msg getScholarshipsByManager(@RequestParam Long userId) {
        List<Scholarship> res = scholarshipService.getScholarshipsByManager(userId);
        return ResultUtil.success(res);
    }

    /**
     * /api/scholarships/search
     * (finance manager) search scholarship
     *
     * @param userId
     * @param role
     * @param exp
     * @return
     */
    @GetMapping("/scholarships/search")
    public Msg searchScholarships(@RequestParam Long userId,
                                  @RequestParam String role,
                                  @RequestParam String exp) {
        List<Scholarship> res;
        if (exp.equals("")) {
            res = scholarshipService.getScholarshipsByManager(userId);
        } else {
            res = scholarshipService.searchScholarship(userId, role, exp);
        }
        return ResultUtil.success(res);
    }

    /**
     * /api/scholarship/create
     * (finance manager) create new scholarship
     *
     * @param scholarship
     * @return
     */
    @PostMapping("/scholarship/create")
    public Msg createScholarship(@RequestBody Scholarship scholarship) {
        scholarshipService.save(scholarship);
        return ResultUtil.success();
    }

    /**
     * /api/scholarship/delete
     * (finance manager) delete scholarship by its id
     *
     * @param id
     * @return
     */
    @GetMapping("/scholarship/delete")
    public Msg deleteScholarship(@RequestParam Long id) {
        scholarshipService.delete(id);
        return ResultUtil.success();
    }

    /**
     * /api/scholarship/attach
     * (finance manager) attach scholarship to all qualified students who have not been attached with same scholarship before
     *
     * @param id
     * @return
     */
    @GetMapping("/scholarship/attach")
    public Msg attachScholarship(@RequestParam Long id) {
        scholarshipService.attach(id);
        return ResultUtil.success();
    }

    /**
     * /api/scholarship/assignment/delete
     * (finance manager) delete an existing scholarship assignment by its id
     * @param id
     * @return
     */
    @GetMapping("/scholarship/assignment/delete")
    public Msg deleteScholarshipAssignment(@RequestParam Long id) {
        scholarshipService.deleteScholarshipAssignment(id);
        return ResultUtil.success();
    }

    /**
     * /api/scholarship/assignment/search
     * (finance manager) search scholarship assignment by student name
     *
     * @param exp
     * @param managerId
     * @return
     */
    @GetMapping("/scholarship/assignment/search")
    public Msg searchScholarshipAssignment(@RequestParam String exp,
                                           @RequestParam Long managerId) {
        List<ScholarshipQuery> res = new ArrayList<>();
        if (exp.equals("")) {
            res = scholarshipService.searchScholarshipAssignment(exp, managerId);
        } else {
            res = scholarshipService.getScholarshipAssignments(managerId);
        }
        return ResultUtil.success(res);
    }

    /**
     * /api/scholarship/assignments
     * (finance manager) get all scholarship assignments belong to corresponding finance manager
     * @param managerId
     * @return
     */
    @GetMapping("/scholarship/assignments")
    public Msg getScholarshipAssignments(@RequestParam Long managerId) {
        List<ScholarshipQuery> res = scholarshipService.getScholarshipAssignments(managerId);
        return ResultUtil.success(res);
    }


    /**
     * /api/course/credit
     * (finance manager) get current course rate
     * @return
     */
    @GetMapping("/course/credit")
    public Msg getCourseCredit() {
        Double res = scholarshipService.getCourseCredit();
        return ResultUtil.success(res);
    }

    /**
     * /api/course/credit/set
     * (finance manager) update course rate
     * @param credit
     * @return
     */
    @GetMapping("/course/credit/set")
    public Msg setCourseCredit(@RequestParam Double credit) {
        scholarshipService.setCourseCredit(credit);
        return ResultUtil.success();
    }
}
