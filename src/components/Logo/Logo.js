import React from 'react';
import './Logo.css';
import brain from './brain.svg';
import Tilt from 'react-tilt';

const Logo = () => {
	return(
		<div className="ma4 mt0">
			<Tilt className="Tilt br2 shadow-2 flex items-center justify-center" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
				<div className="Tilt-inner">
					<img src={brain} alt="logo" className=""/>
				</div>
			</Tilt>
		</div>
	)
}

export default Logo;