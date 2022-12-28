package me.nigaba.bowlingapp.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import me.nigaba.bowlingapp.model.ScoreChart;
import me.nigaba.bowlingapp.model.ScoreRequest;


@RestController
@RequestMapping("api")
public class GameController {
	private static final String template = "[%d] : Hello, %s!";
	private static int counter = 0;
	
    @GetMapping
    public String showDefault() {
        GameController.counter += 1;
        return String.format(template, counter, "World");
    }

    @GetMapping("/name/{name}")
    public String showHome(@PathVariable String name) {
        GameController.counter += 1;
        return String.format(template, counter, name);
    }

    @GetMapping("reset")
    public ScoreRequest reset() {
        return new ScoreRequest();
    }

    @PostMapping("score")
    public int getFinalScore(@RequestBody ScoreRequest scores) {
        return ScoreChart.getFinalScore(scores);
    }

    @PostMapping("roll")
    public ScoreRequest attemptRoll(@RequestBody ScoreRequest scores) {
        return ScoreChart.validate(scores);
    }
}