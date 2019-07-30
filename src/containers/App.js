import React, { Component } from 'react';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
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
			box: {},
			route: 'signin',
			isSignedIn: false
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
		//console.log(box);
		this.setState({box: box});
	}

	onButtonSubmit = (event) => {
		//console.log("click");
		this.setState({imageUrl: this.state.input});

		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then((response) => this.displayFaceBoxes(this.calculateFaceLocation(response.outputs[0].data.regions)))
			.catch((err) => {
				console.log("Something went wrong", err);
			}); 
	}

	onRouteChange = (route) => {
		if(route === 'signout'){
			this.setState({isSignedIn: false});
		} else if(route === 'home'){
			this.setState({isSignedIn: true});
		}
		this.setState({route: route});
	}

	render() {
		const { isSignedIn, box, route, imageUrl} = this.state;
		if(route === 'home'){
			return (
				<div className="App">
					<Navigation onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn}/>
					<Logo />
					<Rank />
					<ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit} />
					<FaceRecognition imageUrl={imageUrl} box={box} />
				</div>
			  );
		} else if (this.state.route === 'register'){
			return (
				<div className="App">
					<Navigation onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn}/>
					<Register onRouteChange = {this.onRouteChange} />
				</div>
			  );
		} else {
			return (
				<div className="App">
					<Navigation onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn}/>
					<Signin onRouteChange = {this.onRouteChange} />
				</div>
			  );
		}
		
	}
}

export default App;
