package com.project.gamedl.configuration;

import com.project.gamedl.converter.CharacterToCharacterModel;
import com.project.gamedl.converter.GameToGameModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Autowired
    private CharacterToCharacterModel characterConverter;

    @Autowired
    private GameToGameModel gameConverter;

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(characterConverter);
        registry.addConverter(gameConverter);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")  // Replace with your React app's URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}



