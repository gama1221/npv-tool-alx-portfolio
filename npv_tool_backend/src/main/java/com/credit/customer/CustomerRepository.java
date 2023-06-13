package com.credit.customer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Boolean existsByPhoneNumber(String phoneNumber);
    List<Customer> findByFirstName(String firstName);
}
