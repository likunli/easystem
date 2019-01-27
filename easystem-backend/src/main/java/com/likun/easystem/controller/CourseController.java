package com.likun.easystem.controller;


import com.likun.easystem.service.CourseService;
import com.likun.easystem.entity.Course;
import com.likun.easystem.entity.returnEntity.CourseGrade;
import com.likun.easystem.utils.Msg;
import com.likun.easystem.utils.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class CourseController {
    @Autowired
    CourseService courseService;

    /**
     * /api/courses
     * (student teacher) list the courses
     *
     * @param id
     * @param role
     * @return code : Integer
     * msg  : String
     * data : List<Course>
     */
    @RequestMapping("/courses")
    public Msg getCourses(@RequestParam Long id,
                          @RequestParam String role) {
        List<Course> res = courseService.findCourses(id, role);
        return ResultUtil.success(res);
    }


    /**
     * /api/courses/search
     * (student teacher) search course by semester and major
     *
     * @param semester
     * @param major
     * @return code : Integer
     * msg  : String
     * data : List<Course>
     */
    @RequestMapping("/courses/search")
    public Msg searchCourses(@RequestParam String semester,
                             @RequestParam String major,
                             @RequestParam Long userId,
                             @RequestParam String role) {
        if (role.equals("courseManager")) {
            List<Course> res = courseService.searchCoursesByCourseManager(semester, major, userId);
            return ResultUtil.success(res);
        } else {
            List<Course> res = courseService.searchCourses(semester, major);
            return ResultUtil.success(res);
        }
    }


    /**
     * /api/course/register
     * (student) register the course
     *
     * @param studentId
     * @param courseId
     * @return code : Integer
     * msg  : String
     */
    @RequestMapping("/course/register")
    public Msg registerCourse(@RequestParam Long studentId,
                              @RequestParam Long courseId) {
        return courseService.registerCourse(studentId, courseId) ?
                ResultUtil.success() : ResultUtil.error(501, "fail to register");
    }

    /**
     * /api/course/drop
     * (student) drop off the course
     *
     * @param studentId
     * @param courseId
     * @return code : Integer
     * msg  : String
     */
    @RequestMapping("/course/drop")
    public Msg dropCourse(@RequestParam Long studentId,
                          @RequestParam Long courseId) {
        boolean isSuccess = courseService.dropOffCourse(studentId, courseId);
        return isSuccess ? ResultUtil.success() : ResultUtil.error(501, "fail to drop off");
    }


    /**
     * /api/course/grade
     * (student) get transcript by semester
     *
     * @param semester
     * @param userId
     * @return List<CourseGrade>
     */
    @GetMapping("/course/grade")
    public Msg getCourseGrade(@RequestParam String semester,
                              @RequestParam Long userId) {
        List<CourseGrade> res = courseService.getCourseGrade(semester, userId);
        return ResultUtil.success(res);
    }

    /**
     * /api/course/create
     * (course manager) create a course
     *
     * @param course
     * @return Msg
     */
    @PostMapping("/course/create")
    public Msg createCourse(@RequestBody Course course) {
        courseService.save(course);
        return ResultUtil.success();
    }

    /**
     * /api/course/delete
     * (course manager) delete a course
     *
     * @param id
     * @return Msg
     */
    @GetMapping("/course/detele")
    public Msg deleteCourse(@RequestParam Long id) {
        courseService.delete(id);
        return ResultUtil.success();
    }

    /**
     * /api/course/update
     * (course manager) update a course
     *
     * @param course
     * @return Msg
     */
    @PostMapping("/course/update")
    public Msg updateCourse(@RequestBody Course course) {
        courseService.update(course);
        return ResultUtil.success();
    }


    /**
     * /api/course/teacher/grade
     * (teacher) grade specific student on courseId, and calculate gpa in total
     *
     * @param id
     * @param teacherId
     * @return Msg
     */
    @GetMapping("/course/teacher/grade")
    public Msg grade(@RequestParam Long id,
                     @RequestParam Long teacherId) {
        courseService.gradeCourseFinally(id, teacherId);
        return ResultUtil.success();
    }
}
