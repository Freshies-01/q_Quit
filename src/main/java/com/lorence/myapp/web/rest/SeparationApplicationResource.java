package com.lorence.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lorence.myapp.domain.SeparationApplication;
import com.lorence.myapp.domain.User;
import com.lorence.myapp.repository.SeparationApplicationRepository;
import com.lorence.myapp.security.SecurityUtils;
import com.lorence.myapp.web.rest.errors.BadRequestAlertException;
import com.lorence.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SeparationApplication.
 */
@RestController
@RequestMapping("/api")
public class SeparationApplicationResource {

    private final Logger log = LoggerFactory.getLogger(SeparationApplicationResource.class);

    private static final String ENTITY_NAME = "separationApplication";

    private final SeparationApplicationRepository separationApplicationRepository;

    //private String login = SecurityUtils.getCurrentUserLogin().get();

    public SeparationApplicationResource(SeparationApplicationRepository separationApplicationRepository) {
        this.separationApplicationRepository = separationApplicationRepository;
    }

    /**
     * POST  /separation-applications : Create a new separationApplication.
     *
     * @param separationApplication the separationApplication to create
     * @return the ResponseEntity with status 201 (Created) and with body the new separationApplication, or with status 400 (Bad Request) if the separationApplication has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/separation-applications")
    @Timed
    public ResponseEntity<SeparationApplication> createSeparationApplication(@Valid @RequestBody SeparationApplication separationApplication) throws URISyntaxException {
        log.debug("REST request to save SeparationApplication : {}", separationApplication);
        if (separationApplication.getId() != null) {
            throw new BadRequestAlertException("A new separationApplication cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SeparationApplication result = separationApplicationRepository.save(separationApplication);
        return ResponseEntity.created(new URI("/api/separation-applications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /separation-applications : Updates an existing separationApplication.
     *
     * @param separationApplication the separationApplication to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated separationApplication,
     * or with status 400 (Bad Request) if the separationApplication is not valid,
     * or with status 500 (Internal Server Error) if the separationApplication couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/separation-applications")
    @Timed
    public ResponseEntity<SeparationApplication> updateSeparationApplication(@Valid @RequestBody SeparationApplication separationApplication) throws URISyntaxException {
        log.debug("REST request to update SeparationApplication : {}", separationApplication);
        if (separationApplication.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SeparationApplication result = separationApplicationRepository.save(separationApplication);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, separationApplication.getId().toString()))
            .body(result);
    }

    /**
     * GET  /separation-applications : get all the separationApplications.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of separationApplications in body
     */
    @GetMapping("/separation-applications")
    @Timed
    public List<SeparationApplication> getAllSeparationApplications() {
        log.debug("REST request to get all SeparationApplications");
        return separationApplicationRepository.findAll();
    }

    @GetMapping("/pending-applications")
    @Timed
    public List<SeparationApplication> getAllPendingApplications() {
        log.debug("REST request to get all pending SeparationApplications");
        return separationApplicationRepository.findAllPendingApplications();
    }

    @GetMapping("/user-applications")
    @Timed
    public List<SeparationApplication> getAllApplicationsByCurrentUser() {
        log.debug("REST request to get all pending SeparationApplications");
        System.console().writer().print(SecurityUtils.getCurrentUserLogin().get());
        return separationApplicationRepository.findAllApplicationsByLogin();
    }

    @GetMapping("/closed-applications")
    @Timed
    public List<SeparationApplication> getAllClosedApplications() {
        log.debug("REST request to get all closed SeparationApplications");
        return separationApplicationRepository.findAllClosedApplications();
    }

    /**
     * GET  /separation-applications/:id : get the "id" separationApplication.
     *
     * @param id the id of the separationApplication to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the separationApplication, or with status 404 (Not Found)
     */
    @GetMapping("/separation-applications/{id}")
    @Timed
    public ResponseEntity<SeparationApplication> getSeparationApplication(@PathVariable Long id) {
        log.debug("REST request to get SeparationApplication : {}", id);
        Optional<SeparationApplication> separationApplication = separationApplicationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(separationApplication);
    }

    /**
     * DELETE  /separation-applications/:id : delete the "id" separationApplication.
     *
     * @param id the id of the separationApplication to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/separation-applications/{id}")
    @Timed
    public ResponseEntity<Void> deleteSeparationApplication(@PathVariable Long id) {
        log.debug("REST request to delete SeparationApplication : {}", id);

        separationApplicationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
