package me.nigaba.bowlingapp.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
// import javax.persistence.Table;

@Entity
// @Table(name = "GREETINGS")
public class ScoreChart {

    @Id private int id;
    // private String name;
	private int currentRoll;
	// This is a zeroed Array [0,0,...,0]
	private int[21] scores;
	private boolean isDone;

    public ScoreChart(/*String name,*/int[] scores, int currentRoll) {
        // this.name = name;
		this.setCurrentRoll(currentRoll);
        this.setScores(scores);
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

	public int getFrame() {
		return currentRoll < 19 ? (currentRoll+1) / 2 : 10;
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

	public void setScore(int[] scores) throws Error {
		// Convert frames to list of shots
		// if (this.getCurrentRoll() == 21) {
		// 	throw Error("Your game is over");
		// }
		if (this.getCurrentRoll < 19 && this.currentRoll > 2) {
			// TODO: Replace Errors
			if (scores[this.currentRoll] + scores[this.currentRoll-1] > 10) {
				throw Error("Invalid pins hit");
			}
		} else if (this.currentRoll > 19) {
			if (this.currentRoll > 21 && scores[18] == 10 && (scores[19] + scores[20]) > 10){
				throw Error("Invalid pins hit");
			} else if ((scores[18] + scores[19]) > 11 || scores[20] != 0){
				throw Error("Invalid pins hit");
			}
		}
		this.setCurrentRoll(this.currentRoll + 1);
		this.scores = scores;
	}

	public int getScore() {
	// 	function scoreFrame(frame, nextFrames) {
	// // Convert frames to list of shots
	// let nextShots = nextFrames.flatMap(f => f.shots);

	// if (frame.getType() === 'strike') {
	// 	return 10 + nextShots[0] + nextShots[1];
	// } else if (frame.getType() === 'spare') {
	// 	return 10 + nextShots[0];
	// } else {
	// 	return sum(frame.shots);
	// }
}
	}
    // @Override
    // public boolean equals(Object o) {
    //     if (this == o) return true;
    //     if (o == null || getClass() != o.getClass()) return false;

    //     Greeting greeting = (Greeting) o;

    //     return name.equals(greeting.name);
    // }

    // @Override
    // public int hashCode() {
    //     return name.hashCode();
    // }
}