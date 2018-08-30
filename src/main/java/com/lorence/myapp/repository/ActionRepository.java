package com.lorence.myapp.repository;
import java.util.List;

import java.util.Optional;

import com.lorence.myapp.domain.Action;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;


/**
 * Spring Data  repository for the Action entity.
 */
@Repository
public interface ActionRepository extends JpaRepository<Action, Long> {

    @Query("SELECT action FROM Action action WHERE action.separationApplication.id = ?1")
    public List<Action> findAllBySeparationApplication(@PathVariable Long saID);
    
    @Query("SELECT action FROM Action action WHERE action.functionReps.employee.department.id = ?1")
    public List<Action> findAllActionsByDepartment(@PathVariable Long deptID);
}
