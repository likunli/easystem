package com.likun.easystem.repository;

import com.likun.easystem.entity.Scholarship;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ScholarshipRepository extends CrudRepository<Scholarship, Long> {
    @Query("select c from Scholarship c where c.financeManagerId = ?1")
    List<Scholarship> getScholarshipsByManager(Long financeManagerId);


    @Query("select c from Scholarship c where c.financeManagerId = ?1 and c.name like %?2%")
    List<Scholarship> search(Long financeManagerId, String exp);
}
