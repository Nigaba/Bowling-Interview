import React, { useEffect, useState } from "react";

interface FrameProps {
	rolls: number[];
	isLastFrame?: boolean;
}

const Frame = ({rolls, isLastFrame}: FrameProps): JSX.Element  => {
	const frameTotal = rolls.reduce((v, s) => (v+s), 0);

	return(<>
		<td>{rolls[0] == 10 ? 'X' : (rolls[0] == 0 ? '-' : rolls[0]) }</td>
		<td>{frameTotal == 10 ? '/' : (rolls[1] == 0 ? '-' : rolls[1]) }</td>
		{isLastFrame ? <td>{frameTotal == 10 ? '/' : (rolls[2] == 0 ? '-' : rolls[2]) }</td> : null}
	</>);
}

export default Frame;