import React from 'react';

const Rank = ( { user }) => {
	return(
		<div className="white center">
			<div className="f3">
				{`${user.name}, your current entry count is ....`}
			</div>
			<div className="f2 pa2">
				{ user.entries }
			</div>
		</div>
	)
}

export default Rank;