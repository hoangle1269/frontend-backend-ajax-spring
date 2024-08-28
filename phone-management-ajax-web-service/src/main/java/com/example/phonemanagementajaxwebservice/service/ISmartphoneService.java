package com.example.phonemanagementajaxwebservice.service;

import com.example.phonemanagementajaxwebservice.model.Smartphone;

import java.util.Optional;

public interface ISmartphoneService extends IGeneralService<Smartphone> {
    Iterable<Smartphone> findAllByProducerContainingIgnoreCase(String producer);
}