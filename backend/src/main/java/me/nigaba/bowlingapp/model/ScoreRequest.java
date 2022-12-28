package me.nigaba.bowlingapp.model;

import java.util.List;
import java.util.stream.IntStream;
import java.util.ArrayList;

public class ScoreRequest {
	private int[] scores;
	private int currentRoll;

	public ScoreRequest() {
		this(0, new int[21]);
	}

	public ScoreRequest(int currentRoll, int[] scores) {
		this.setCurrentRoll(currentRoll);
		this.setScores(scores);
	}

	public List<Integer>[] convertToFrames() {
		List<Integer>[] frames = (ArrayList<Integer>[]) new ArrayList[10];
		for (int i = 0; i < frames.length; i++) {
			frames[i] = new ArrayList<Integer>();
		}
		IntStream.range(0, this.scores.length)
			.forEach((index) -> {
				frames[(index < 18 ? index / 2 : 9)].add(Integer.valueOf(this.scores[index]));
			});
		return frames;
	}

	public int getCurrentRoll() {
		return this.currentRoll;
	}
	public void setCurrentRoll(int currentRoll) {
		if (currentRoll > -1 && currentRoll < 21) {
			this.currentRoll = currentRoll;
		}
	}
	public int[] getScores() {
		return this.scores;
	}
	public void setScores(int[] scores) {
		this.scores = scores;
	}
}