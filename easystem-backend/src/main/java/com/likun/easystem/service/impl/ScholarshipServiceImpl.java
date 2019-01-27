package com.likun.easystem.service.impl;

import com.likun.easystem.service.ScholarshipService;
import com.likun.easystem.entity.Scholarship;
import com.likun.easystem.entity.ScholarshipAssignment;
import com.likun.easystem.entity.User;
import com.likun.easystem.entity.returnEntity.ScholarshipQuery;
import com.likun.easystem.repository.GlobalRepository;
import com.likun.easystem.repository.ScholarshipAssignmentRepository;
import com.likun.easystem.repository.ScholarshipRepository;
import com.likun.easystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ScholarshipServiceImpl implements ScholarshipService {

    @Autowired
    ScholarshipAssignmentRepository scholarshipAssignmentRepository;

    @Autowired
    ScholarshipRepository scholarshipRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    GlobalRepository globalRepository;

    @Override
    public List<ScholarshipQuery> getScholarships(Long studentId) {
        return scholarshipAssignmentRepository.getScholarships(studentId);
    }

    @Override
    public List<Scholarship> getScholarshipsByManager(Long financeManagerId) {
        return scholarshipRepository.getScholarshipsByManager(financeManagerId);
    }

    @Override
    public List<Scholarship> searchScholarship(Long financeManagerId, String role, String exp) {
        switch (role) {
            case "financeManager":
                return scholarshipRepository.search(financeManagerId, exp);
            case "student":
            default:
                return new ArrayList<>();
        }
    }

    @Override
    public void save(Scholarship scholarship) {
        scholarshipRepository.save(scholarship);
    }

    @Override
    public void delete(Long id) {
        scholarshipRepository.deleteById(id);
    }


    @Transactional
    public void attach(Long id) {
        Scholarship sc = scholarshipRepository.findById(id).orElse(null);
        if (sc == null) {
            return;
        }
        List<User> qualifedStudents = new ArrayList<>();
        List<ScholarshipAssignment> sa = new ArrayList<>();
        boolean isRate = false;
        switch (sc.getScholarshipType()) {
            case "Merit_Based_Gpa":
                qualifedStudents = userRepository.findQualifiedStudentByGpa(sc.getGpa(), sc.getId());
                break;
            case "Status_Based_Country":
                qualifedStudents = userRepository.findQualifiedStudentByCountry(sc.getCountry(), sc.getId());
                break;
            case "Status_Based_Major":
                qualifedStudents = userRepository.findQualifiedStudentByMajor(sc.getMajor(), sc.getId());
                break;
            default:
                break;
        }

        switch (sc.getRateType()) {
            case "amount":
                isRate = false;
                break;
            case "rate":
                isRate = true;
                break;
            default:
                break;
        }

        double curRate = globalRepository.getCredit();
        for (User u : qualifedStudents) {
            double balance = u.getBalance();
            double amount;
            if (!isRate) {
                amount = sc.getValue();
                balance -= amount;
            } else {
                amount = u.getCredit() * curRate * sc.getValue();
                balance -= amount;
            }
            u.setBalance(balance);
            sa.add(new ScholarshipAssignment(u.getId(), sc.getId(), sc.getFinanceManagerId(), amount));
        }
        System.out.println(Arrays.toString(qualifedStudents.toArray()));
        System.out.println(Arrays.toString(sa.toArray()));
        userRepository.saveAll(qualifedStudents);
        scholarshipAssignmentRepository.saveAll(sa);
    }

    @Override
    @Transactional
    public void deleteScholarshipAssignment(Long id) {
        ScholarshipAssignment sc = scholarshipAssignmentRepository.findById(id).orElse(null);
        if (sc == null) {
            return;
        }
        User student = userRepository.findById(sc.getStudentId()).orElse(null);
        if (student == null) {
            return;
        }
        double balance = student.getBalance();
        balance += sc.getAmount();
        student.setBalance(balance);
        userRepository.save(student);
        scholarshipAssignmentRepository.deleteById(id);
    }

    @Override
    public List<ScholarshipQuery> searchScholarshipAssignment(String exp, Long userId) {
        return scholarshipAssignmentRepository.searchScholarshipQuery(exp, userId);
    }

    @Override
    public List<ScholarshipQuery> getScholarshipAssignments(Long managerId) {
        return scholarshipAssignmentRepository.getScholarAssignmentByManager(managerId);
    }

    @Override
    public Double getCourseCredit() {
        return globalRepository.getCredit();
    }

    @Override
    public void setCourseCredit(Double credit) {
        globalRepository.setCredit(credit);
    }
}
