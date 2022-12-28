package me.nigaba.bowlingapp.util;

import java.util.Arrays;
import java.util.List;

public class HelperFunctions {
	public static int sum(List<Integer> list) {
		return list.stream().reduce((val, sum) -> {return val + sum;}).get();
	}
	public static int sum(int[] list) {
		return Arrays.stream(list).sum();
	}
	public static boolean matchAny(int find, int[] list) {
		return Arrays.stream(list).anyMatch((val) -> { return val == find; });
	}
	public static boolean matchAny(int find, List<Integer> list) {
		return list.stream().anyMatch((val) -> { return val == find; });
	}
	public static boolean matchAll(int find, int[] list) {
		return Arrays.stream(list).allMatch((val) -> { return val == find; });
	}
	public static boolean matchAll(int find, List<Integer> list) {
		return list.stream().allMatch((val) -> { return val == find; });
	}
	
}