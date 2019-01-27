package com.likun.easystem.service.impl;

import com.likun.easystem.service.CourseService;
import com.likun.easystem.entity.Course;
import com.likun.easystem.entity.CourseSelection;
import com.likun.easystem.entity.User;
import com.likun.easystem.entity.returnEntity.CourseGrade;
import com.likun.easystem.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    CourseSelectionRepository courseSelectionRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    GlobalRepository globalRepository;

    @Autowired
    AssignmentSubmissionRepository assignmentSubmissionRepository;

    @Autowired
    AssignmentRepository assignmentRepository;

    private final Lock lock = new ReentrantLock();

    @Override
    public List<Course> findCourses(Long id, String role) {
        switch (role) {
            case "student":
                return courseRepository.findCoursesByStudentId(id);
            case "teacher":
                return courseRepository.findByTeacherId(id);
            default:
                return null;
        }
    }

    @Override
    public List<Course> searchCourses(String semester, String major) {
        if (!semester.equals("*") && !major.equals("*")) {
            return courseRepository.findCoursesBySemesterEqualsAndMajorEquals(semester, major);
        } else if (!semester.equals("*")) {
            return courseRepository.findCoursesBySemesterEquals(semester);
        } else if (!major.equals("*")) {
            return courseRepository.findCoursesByMajorEquals(major);
        } else {
            return courseRepository.findAll();
        }
    }

    @Override
    public List<Course> searchCoursesByCourseManager(String semester, String major, Long courseManagerId) {
        if (!semester.equals("*") && !major.equals("*")) {
            return courseRepository.findCoursesBySemesterAndMajorAndCourseManagerId(semester, major, courseManagerId);
        } else if (!semester.equals("*")) {
            return courseRepository.findCoursesBySemesterAndCourseManagerId(semester, courseManagerId);
        } else if (!major.equals("*")) {
            return courseRepository.findCoursesByMajorAndCourseManagerId(major, courseManagerId);
        } else {
            return courseRepository.findByCourseManagerIdEquals(courseManagerId);
        }
    }

    @Override
    @Transactional
    public boolean registerCourse(Long studentId, Long courseId) {
        try {
            Consumer consumer = new Consumer(studentId, courseId);
            consumer.start();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    @Transactional
    public boolean dropOffCourse(Long studentId, Long courseId) {
        try {
            Producer producer = new Producer(studentId, courseId);
            producer.start();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    class Consumer implements Runnable {
        private Thread t;
        private Long studentId;
        private Long courseId;

        private Consumer(Long studentId, Long courseId) {
            this.studentId = studentId;
            this.courseId = courseId;
        }

        @Override
        public void run() {
            lock.lock();
            try {
                User user = userRepository.findById(studentId).orElseThrow(ExceptionInInitializerError::new);
                Course course = courseRepository.findById(courseId).orElseThrow(ExceptionInInitializerError::new);

                if (user.getCredit() + course.getCredit() > 20) {
                    throw new Exception("Only 20 credits per semester is allowed");
                }
                if (course.getCapacity() == 0) {
                    throw new Exception("not enough seats");
                }
                if (courseSelectionRepository.existsByStudentIdEqualsAndCourseIdEquals(studentId, courseId)) {
                    throw new Exception("already register this course!");
                }
                CourseSelection courseSelection = new CourseSelection(studentId,
                        course.getTeacherId(),
                        courseId,
                        course.getSemester(),
                        0,
                        0,
                        course.getCredit());
                courseSelectionRepository.save(courseSelection);
                double credit = user.getCredit() + course.getCredit();
                double balance = user.getBalance();
                double rate = globalRepository.getCredit();
                balance += rate * course.getCredit();
                userRepository.updateBalanceAndCredit(balance, credit, studentId);
                courseRepository.updateCapacity(course.getCapacity() - 1, courseId);
                System.out.println("sign up successfully");
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                lock.unlock();
            }
        }

        private void start() {
            if (t == null) {
                t = new Thread(this);
                t.start();
            }
        }
    }


    class Producer implements Runnable {
        private Thread t;
        private Long studentId;
        private Long courseId;

        private Producer(Long studentId, Long courseId) {
            this.studentId = studentId;
            this.courseId = courseId;
        }

        @Override
        public void run() {
            lock.lock();
            try {
                System.out.println("on the process of dropping course......");
                User user = userRepository.findById(studentId).orElseThrow(ExceptionInInitializerError::new);
                Course course = courseRepository.findById(courseId).orElseThrow(ExceptionInInitializerError::new);
                if (!courseSelectionRepository.existsByStudentIdEqualsAndCourseIdEquals(studentId, courseId)) {
                    throw new Exception("no selection record found");
                }
                Long courseSelectionId = courseSelectionRepository
                        .findDistinctFirstByStudentIdEqualsAndCourseIdEquals(studentId, courseId).getId();
                courseSelectionRepository.deleteById(courseSelectionId);
                double credit = user.getCredit() - course.getCredit();
                double balance = user.getBalance();
                double rate = globalRepository.getCredit();
                user.setBalance(balance - rate * course.getCredit());
                userRepository.updateBalanceAndCredit(balance, credit, user.getId());
                int preCapacity = course.getCapacity();
                courseRepository.updateCapacity(preCapacity + 1, course.getId());
                System.out.println("drop successfully");
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                lock.unlock();
            }
        }

        private void start() {
            if (t == null) {
                t = new Thread(this);
                t.start();
            }
        }
    }

    @Override
    public List<CourseGrade> getCourseGrade(String semester, Long userId) {
        if (semester.equals("*")) {
            return courseSelectionRepository.getGrades(userId);
        } else {
            return courseSelectionRepository.getGradesBySemester(semester, userId);
        }
    }

    @Override
    public void save(Course course) {
        courseRepository.save(course);
    }

    @Override
    public void delete(Long id) {
        courseRepository.deleteById(id);
    }


    @Override
    public void update(Course course) {
        courseRepository.save(course);
    }


    @Override
    @Transactional
    public void gradeCourseFinally(Long id, Long teacherId) {
        Course course = courseRepository.findById(id).orElse(null);
        if (course == null) {
            return;
        }
        List<User> studentList = userRepository.findRegisteredStudents(id);
        double total = assignmentRepository.getCourseTotalGrade(id);
        for (User student : studentList) {
            double score = assignmentSubmissionRepository.getCourseTotalGrade(id, student.getId());
            score = score / total * 100;
            courseSelectionRepository.gradeByAssignmentPointSum(id, student.getId(), score);

            //update Gpa
            List<CourseSelection> selections = courseSelectionRepository.getByStudentId(student.getId());
            double creditSum = 0;
            double scoreSum = 0;
            for (CourseSelection c : selections) {
                scoreSum += c.getScore() * c.getCredit();
                creditSum += c.getCredit();
            }
            System.out.println(student.getId());
            System.out.println(score);
            System.out.println(scoreSum);
            System.out.println(creditSum);
            double gpa = scoreSum / (creditSum * 25);
            System.out.println(gpa);
            student.setGpa(gpa);
        }
        userRepository.saveAll(studentList);

    }
}



