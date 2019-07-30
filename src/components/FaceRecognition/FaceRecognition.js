import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
	return (
		<div className="ma reco-container">
			<div className="mt2 img-container">
				<img id="input-image" className="input-image" src={imageUrl} alt="scanned"/>
				<div className="bounding-box" 
					style={{top: box.topRow, 
							bottom: box.bottomRow, 
							right: box.rightCol, 
							left: box.leftCol}}>
				</div>
			</div>
		</div>
	);
}


export default FaceRecognition;
