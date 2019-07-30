import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return(
		<div >
			<p className="f3 tc">
				{'This magic brain will detect faces in your pictures!'}
			</p>
			<div className="formbox center shadow-5 pa5">
				<input type="text" className="f4 pa2 w-70 center" name="" id="" onChange={onInputChange} />
				<button className="w-30 tc grow f4 link ph3 pv2 dib white bg-green b--white-05" onClick={onButtonSubmit} >Detect</button>
			</div>
		</div>
	)
}

export default ImageLinkForm;