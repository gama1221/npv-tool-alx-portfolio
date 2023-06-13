package com.credit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class LoanApplication {
	public static void main(String[] args) throws IOException {
		SpringApplication.run(LoanApplication.class, args);
	}
}