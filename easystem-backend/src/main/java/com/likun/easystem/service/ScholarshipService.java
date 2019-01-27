package com.likun.easystem.service;


import com.likun.easystem.entity.Scholarship;
import com.likun.easystem.entity.returnEntity.ScholarshipQuery;

import java.util.List;

public interface ScholarshipService {
    List<ScholarshipQuery> getScholarships(Long studentId);

    List<Scholarship> getScholarshipsByManager(Long financeManagerId);

    List<Scholarship> searchScholarship(Long financeManagerId, String role, String exp);

    void save(Scholarship scholarship);

    void delete(Long id);

    void attach(Long id);

    void deleteScholarshipAssignment(Long id);

    List<ScholarshipQuery> searchScholarshipAssignment(String exp, Long userId);

    List<ScholarshipQuery> getScholarshipAssignments(Long managerId);

    Double getCourseCredit();

    void setCourseCredit(Double credit);
}
