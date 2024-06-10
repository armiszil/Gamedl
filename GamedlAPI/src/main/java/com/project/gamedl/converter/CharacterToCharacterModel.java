package com.project.gamedl.converter;

import com.project.gamedl.domain.Character;
import com.project.gamedl.model.CharacterModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class CharacterToCharacterModel implements Converter<Character, CharacterModel> {
    @Autowired
    private GameToGameModel gameConverter;
    @Override
    public CharacterModel convert(Character source) {
        CharacterModel characterModel = new CharacterModel();

        characterModel.setName(source.getName());
        characterModel.setAge(source.getAge());
        characterModel.setGame(gameConverter.convert(source.getGame()));
        characterModel.setGender(source.getGender());
        characterModel.setRole(source.getRole());

        return characterModel;
    }
}
