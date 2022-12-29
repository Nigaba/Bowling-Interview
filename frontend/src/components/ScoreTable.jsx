import React, { useEffect, useState } from "react";
import Frame from './Frame';

/**
 * Update Input: int[21]
 * - if 10 : X
 * - if frame = 10 : # /
 * - else : # # ...
 */

//interface ScoreTableProps {
//	rolls: number[];
//}

class ScoreTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = { rolls: [] };
	}

	static getDerivedStateFromProps(props, state) {
		return ({ rolls: props.rolls });
	}

	render() {
		console.log(this.state.rolls);
		return (<table>
			<thead>
			<tr>{Array.from({ length: 10 },	(_, i) => i + 1)
				.map(v => (<th colSpan={2 + Number(v > 9)}>{v}</th>))}</tr>
			</thead>
			<tbody>
			<tr>{Array.from({ length: 10 },	(_, i) => i + 1)
				.map(v => (<Frame rolls={this.state.rolls.slice(v*2, v*2+1+Number(v === 10))} isLastFrame={v === 10} />))}</tr>
			</tbody>
		</table>);
	}
}

export default ScoreTable;