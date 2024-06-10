package com.project.gamedl.configuration;

import com.project.gamedl.converter.CharacterToCharacterModel;
import com.project.gamedl.converter.GameToGameModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
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
}
