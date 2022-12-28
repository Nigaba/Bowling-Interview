package me.nigaba.bowlingapp.model;

import java.util.List;

import me.nigaba.bowlingapp.util.HelperFunctions;

public class ScoreChart {
    private int id;
    // private String name;
	// This is a zeroed Array [0,0,...,0]

	private ScoreChart() {  }

    public int getId() {
        return this.id;
    }

	public static ScoreRequest validate(ScoreRequest scores) {
		// Convert frames to list of shots
		// if (this.getCurrentRoll() == 21) {
		// 	throw Error("Your game is over");
		// } 
		ScoreRequest revertedScore = new ScoreRequest(scores.getCurrentRoll(), new int[21]);
		List<Integer>[] frames = scores.convertToFrames();
		if (scores.getCurrentRoll() < 19 && scores.getCurrentRoll() > 2) {
			return revertedScore;
		} else if (scores.getCurrentRoll() > 19) {
			if (scores.getCurrentRoll() > 21 && frames[9].get(0) == 10 && (frames[9].get(1) + frames[9].get(2)) > 10) {
				return revertedScore;
			} else if ((frames[9].get(0) + frames[9].get(1)) > 11 || frames[9].get(2) != 0) {
				return revertedScore;
			}
		}
		return new ScoreRequest(scores.getCurrentRoll() + 1, scores.getScores());
	}

	private static char[] getFrameTypes(List<Integer>[] scores) {
		char[] types = new char[12];
		for (int i = 0; i < types.length; i++) {
			if (i < 9) {
				// Frame Type for non-last frames
				types[i] = (HelperFunctions.sum(scores[i]) == 10) ? (HelperFunctions.matchAny(0, scores[i]) ? 'X' : '/') : '-';
			} else {
				// Frame Type for last frames (with extra rolls)
				types[i] = (scores[9].get(i) == 10 ? 'X' : (i < 11 && HelperFunctions.sum(scores[9].subList(i, i+1)) == 10 ? '/' : '-'));
			}
		}
		return types;
	}

	public static int getFinalScore(ScoreRequest scores) {
		List<Integer>[] frames = scores.convertToFrames();
		char[] frameTypes = getFrameTypes(frames);
		// Type:
		/**
		Type:
		* - : frame[i]
		* / : 10 + frame[i+1][0]
		* X : 10 + sum(frame[i+1:i+2]) if frame[i+1] == X else frame[i+1]
		 */
		int[] subtotals = new int[12];
		for (int i = 0; i < frameTypes.length; i++) {
			switch (frameTypes[i]) {
				case '-':
					subtotals[i] = HelperFunctions.sum(frames[(i > 9 ? 9 : i)]);
				break;
				case '/':
					subtotals[i] = 10 + frames[(i+1 > 9 ? 9 : i+1)].get(0);
				break;
				case 'X':
					subtotals[i] = 10;
				break;
				default:
					subtotals[i] = 0;
				break;
			}
		}

		return HelperFunctions.sum(subtotals);
	}
}