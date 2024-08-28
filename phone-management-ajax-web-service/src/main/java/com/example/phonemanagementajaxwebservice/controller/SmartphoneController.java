package com.example.phonemanagementajaxwebservice.controller;

import com.example.phonemanagementajaxwebservice.model.Smartphone;
import com.example.phonemanagementajaxwebservice.repository.ISmartphoneRepository;
import com.example.phonemanagementajaxwebservice.service.ISmartphoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/smartphones")
public class SmartphoneController {

    @Autowired
    private ISmartphoneService iSmartphoneService;

    @PostMapping
    public ResponseEntity<Smartphone> createSmartphone(@RequestBody Smartphone smartphone) {
        return new ResponseEntity<>(iSmartphoneService.save(smartphone), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Iterable<Smartphone>> listSmartphones() {
        return new ResponseEntity<>(iSmartphoneService.findAll(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Smartphone> deleteSmartphone(@PathVariable Long id) {
        Optional<Smartphone> smartphoneOptional = iSmartphoneService.findById(id);
        if (!smartphoneOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        iSmartphoneService.remove(id);
        return new ResponseEntity<>(smartphoneOptional.get(), HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<Smartphone> updateSmartphone(@PathVariable Long id, @RequestBody Smartphone smartphone) {
        Optional<Smartphone> smartphoneOptional = iSmartphoneService.findById(id);
        if (!smartphoneOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        // Update the existing smartphone details
        Smartphone existingSmartphone = smartphoneOptional.get();
        existingSmartphone.setProducer(smartphone.getProducer());
        existingSmartphone.setModel(smartphone.getModel());
        existingSmartphone.setPrice(smartphone.getPrice());

        // Save the updated smartphone
        return new ResponseEntity<>(iSmartphoneService.save(existingSmartphone), HttpStatus.OK);
    }

    // Additional methods for advanced features, such as filtering, sorting, and pagination

    @GetMapping("/producer/{producer}")
    public ResponseEntity<Iterable<Smartphone>> searchSmartphoneByProducer(@PathVariable String producer) {
        return new ResponseEntity<>(iSmartphoneService.findAllByProducerContainingIgnoreCase(producer), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Smartphone> getSmartphoneById(@PathVariable Long id) {
        Optional<Smartphone> smartphoneOptional = iSmartphoneService.findById(id);
        if (!smartphoneOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(smartphoneOptional.get(), HttpStatus.OK);
    }


}