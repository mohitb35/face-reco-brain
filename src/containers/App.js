import React, { Component } from 'react';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
	apiKey: '1ffe59eb0c104fae9d3b9d98e9ed0927'
   });


class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {}
		}
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	calculateFaceLocation = (regions) => {
		console.log(regions[0]);
		const faceBox = regions[0].region_info.bounding_box;
		const inputImage = document.getElementById("input-image");
		const width = Number(inputImage.width);
		const height = Number(inputImage.height);
		return {
			leftCol: faceBox.left_col * width,
			rightCol: width - (faceBox.right_col * width),
			topRow: faceBox.top_row * height,
			bottomRow: height - (faceBox.bottom_row * height)
		}
	}

	displayFaceBoxes = (box) => {
		console.log(box);
		this.setState({box: box});
	}

	onButtonSubmit = (event) => {
		console.log("click");
		this.setState({imageUrl: this.state.input});

		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then((response) => this.displayFaceBoxes(this.calculateFaceLocation(response.outputs[0].data.regions)))
			.catch((err) => {
				console.log("Something went wrong", err);
			}); 
	}

	render(){
		return (
			<div className="App">
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit} />
				<FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
			</div>
		  );
	}
}

export default App;
