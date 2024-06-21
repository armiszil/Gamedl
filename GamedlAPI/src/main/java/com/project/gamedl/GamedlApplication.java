package com.project.gamedl;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.w3c.dom.ls.LSOutput;

@SpringBootApplication
public class GamedlApplication {

	public static void main(String[] args) {
		SpringApplication.run(GamedlApplication.class, args);
	}


}
