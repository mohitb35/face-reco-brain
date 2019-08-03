import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
	if(imageUrl.length){
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
	} else {
		return null;
	}
}


export default FaceRecognition;
