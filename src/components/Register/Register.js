import React, { Component } from 'react';

class Register extends Component{
	constructor(props){
		super(props);
		this.state = {
			registerName: '',
			registerEmail: '',
			registerPassword: ''
		};
	}

	onEmailChange = (event) => {
		this.setState({registerEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({registerPassword: event.target.value});
	}

	onNameChange = (event) => {
		this.setState({registerName: event.target.value});
	}

	onSubmitRegister = (event) => {
		fetch("http://localhost:3000/register", {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: this.state.registerName,
				email: this.state.registerEmail,
				password: this.state.registerPassword
			})
		})
			.then(response => response.json())
			.then(newUser => {
				if(newUser.id){
					this.props.loadUser(newUser);
					this.props.onRouteChange('home');
				} else {
					throw Error("Could not add user");
				}
			})
			.catch(err => {
				console.log("Something went wrong", err);
			});
	}

	render(){
		const { onRouteChange } = this.props;
		return (
			<div className="br3 ba b--black-10 mv4 w-100 w-60-m w-30-l mw8 shadow-5 center ">
				<main className="pa4 black-80">
					<div className="measure center">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f2 fw6 ph0 mh0">Register</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
								<input onChange = {this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
							</div>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
								<input onChange = {this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
								<input onChange = {this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
							</div>
						</fieldset>
						<div className="">
							<input type="submit" onClick = {this.onSubmitRegister}
							/*{() => onRouteChange('home')}*/ className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" value="Register"/>
						</div>
						<div className="lh-copy mt3">
							<p onClick = {() => onRouteChange('signin')} className="f6 link dim black db pointer">Sign In</p>
						</div>
					</div>
				</main>
			</div>
		);
	}
}

export default Register;
