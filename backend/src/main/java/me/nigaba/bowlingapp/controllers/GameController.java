package me.nigaba.bowlingapp.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class GameController {

    @GetMapping("/")
    public String showHome(String name, Model model) {
        Greeting dockerGreeting = repository.findById(1).orElse(new Greeting("Not Found 😕"));
        model = model.addAttribute("name", dockerGreeting.getName());
        return "home";
    }

	@GetMapping("/roll")
	public String roll(@RequestBody ScoreChart score) {

	}
	@GetMapping("/reset")
	public String roll() {

	}
	@GetMapping("/score")
	public String roll(@RequestBody ScoreChart score) {

	}
}