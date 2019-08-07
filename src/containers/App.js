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

const initialState = {
	input: '',
	imageUrl: '',
	box: {},
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
};


class App extends Component {
	constructor() {
		super();
		// this.state = JSON.parse(JSON.stringify(initialState));
		this.state = initialState;
	}

	/* componentDidMount() {
		fetch('http://localhost:3000')
			.then(response => response)
			.then(console.log);
	}
 */
	onInputChange = (event) => {
		console.log("onInputChange");
		this.setState({input: event.target.value});
	}

	calculateFaceLocation = (regions) => {
		// console.log(regions[0]);
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
		console.log("displayFaceBoxes");
		this.setState({box: box});
	}

	onPictureSubmit = (event) => {
		//console.log("click");
		fetch(this.state.input)
			.then(response => {
				let contentType = response.headers.get('Content-Type');
				if(contentType.includes('image')){
					console.log("onPictureSubmit1");
					this.setState({imageUrl: this.state.input});
				} else {
					throw Error("invalid url");
				}
			})
			.then(() => {
				return app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			})
			.then((response) => {
				if(response){
					fetch("http://localhost:3000/image", {
						method: 'PUT',
						mode: 'cors',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							id: this.state.user.id
						})
					})
						.then(response => response.json())
						.then(count => {
							console.log("onPictureSubmit2");
							this.setState({user: Object.assign(this.state.user, { entries: count })});
						})
					this.displayFaceBoxes(this.calculateFaceLocation(response.outputs[0].data.regions));
				}
			})
			.catch((err) => {
				console.log("Something went wrong", err);
			}); 
		}

	onRouteChange = (route) => {
		if(route === 'signout'){
			/* this.setState({
				isSignedIn: false,
				input: '',
				box: {},
				imageUrl: '',
				user: {
					id: '',
					name: '',
					email: '',
					entries: 0,
					joined: ''
				}
			}); */
			console.log("onRouteChange");
			this.setState(initialState);
		} else if(route === 'home'){
			console.log("onRouteChange1");
			this.setState({isSignedIn: true});
		}
		console.log("onRouteChange2");
		this.setState({route: route});
	}

	loadUser = (newUser) => {
		return this.setState({user: {
			id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			entries: newUser.entries,
			joined: newUser.joined
		}})
	};

	render() {
		const { isSignedIn, box, route, imageUrl, user} = this.state;
		console.log("Render:Initial State", initialState);
		if(route === 'home'){
			return (
				<div className="App">
					<Navigation onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn}/>
					<Logo />
					<Rank user = { user }/>
					<ImageLinkForm onInputChange = {this.onInputChange} onPictureSubmit = {this.onPictureSubmit} />
					<FaceRecognition imageUrl={imageUrl} box={box} />
				</div>
			  );
		} else if (this.state.route === 'register'){
			return (
				<div className="App">
					<Navigation onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn}/>
					<Register onRouteChange = {this.onRouteChange} loadUser = {this.loadUser} />
				</div>
			  );
		} else {
			return (
				<div className="App">
					<Navigation onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn}/>
					<Signin onRouteChange = {this.onRouteChange} loadUser = {this.loadUser} />
				</div>
			  );
		}
		
	}
}

export default App;
