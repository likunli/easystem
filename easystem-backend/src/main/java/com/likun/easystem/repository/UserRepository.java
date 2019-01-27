package com.likun.easystem.repository;

import com.likun.easystem.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    List<User> findAll();

    User findByUsername(String username);


    @Transactional
    @Modifying
    @Query(value = "update User set balance = :balance, credit = :credit where id = :studentId")
    void updateBalanceAndCredit(@Param(value = "balance") double balance,
                                @Param(value = "credit") double credit,
                                @Param(value = "studentId") Long studentId);


    @Query("select o from User o where o.role = 'teacher' ")
    List<User> getTeachers();

    @Query("select a from User a " +
            "left join ScholarshipAssignment b " +
            "on a.id = b.studentId " +
            "where a.gpa >= ?1 and a.role = 'student' and not exists " +
            "(select b from b where b.studentId = a.id and b.scholarshipId = ?2)")
    List<User> findQualifiedStudentByGpa(double gpa, Long scholarshipId);

    @Query("select a from User a " +
            "left join ScholarshipAssignment b " +
            "on a.id = b.studentId " +
            "where a.country = ?1 and a.role = 'student' and not exists " +
            "(select b from b where b.studentId = a.id and b.scholarshipId = ?2)")
    List<User> findQualifiedStudentByCountry(String country, Long scholarshipId);

    @Query("select a from User a " +
            "left join ScholarshipAssignment b " +
            "on a.id = b.studentId " +
            "where a.major = ?1 and a.role = 'student' and not exists " +
            "(select b from b where b.studentId = a.id and b.scholarshipId = ?2)")
    List<User> findQualifiedStudentByMajor(String major, Long scholarshipId);


    @Query("select a from User a " +
            "left join CourseSelection b " +
            "on a.id = b.studentId " +
            "where b.courseId = ?1 and a.role = 'student' ")
    List<User> findRegisteredStudents(Long courseId);
}
