package com.likun.easystem.repository;

import com.likun.easystem.entity.ScholarshipAssignment;
import com.likun.easystem.entity.returnEntity.ScholarshipQuery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ScholarshipAssignmentRepository extends CrudRepository<ScholarshipAssignment, Long> {


    @Query("select new com.likun.easystem.entity.returnEntity.ScholarshipQuery(b.id, a.id, c.username, b.number, b.name, a.amount) " +
            "from ScholarshipAssignment a " +
            "left join Scholarship b " +
            "on a.scholarshipId = b.id " +
            "left join User c " +
            "on a.studentId = c.id " +
            "where a.studentId = ?1")
    List<ScholarshipQuery> getScholarships(Long studentId);

    @Query("select new com.likun.easystem.entity.returnEntity.ScholarshipQuery(b.id, a.id, c.username, b.number, b.name, a.amount) " +
            "from ScholarshipAssignment a " +
            "left join Scholarship b " +
            "on a.scholarshipId = b.id " +
            "left join User c " +
            "on a.studentId = c.id " +
            "where c.username like %?1% and a.financeManagerId = ?2")
    List<ScholarshipQuery> searchScholarshipQuery(String exp, Long financeManagerId);


    @Query("select new com.likun.easystem.entity.returnEntity.ScholarshipQuery(b.id, a.id, c.username, b.number, b.name, a.amount) " +
            "from ScholarshipAssignment a " +
            "left join Scholarship b " +
            "on a.scholarshipId = b.id " +
            "left join User c " +
            "on a.studentId = c.id " +
            "where a.financeManagerId = ?1")
    List<ScholarshipQuery> getScholarAssignmentByManager(Long managerId);
}
