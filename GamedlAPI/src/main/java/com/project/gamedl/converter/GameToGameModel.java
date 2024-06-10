package com.project.gamedl.converter;

import com.project.gamedl.domain.Game;
import com.project.gamedl.model.GameModel;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class GameToGameModel implements Converter<Game, GameModel> {
    @Override
    public GameModel convert(Game source) {
        GameModel gameModel = new GameModel();

        gameModel.setName(source.getName());
        gameModel.setGenre(source.getGenre());
        gameModel.setFranchiseName(source.getFranchiseName());
        gameModel.setReleaseDate(source.getReleaseDate());

        return gameModel;
    }
}
