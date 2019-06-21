import React from 'react';
require('../App.css')


const UnderConstruction = (props) => {
	console.log(props);
	return (
		<div>
			<div className='imageContainer'>
				<img className='image' src={require('../BudgetERLogo.png')} />
			</div>
			<div className='construction'>
				<div className='constructionCard'>
					<h1>Welcome to Budget<span className='namesake'>ER</span></h1>
			        <span>This is a personal project that I have been working on in my free time. I have always found it helpful to have a budget to easily manage my finances. I would normally use Excel to build my budgets, but not everyone is familiar with how to use Excel. That is where this site comes in. It is meant for anyone who isn't familiar with Excel but still want an oportunity to gain control of their finances.</span>
			        	<br/>
			        	<br/>
			        	<span>The app currently has partial CRUD functionality. For those who aren't familiar with that acronym, CRUD stands for Create, Read, Update, Delete. I have partial CRUD on most models, and the remaining functionality will be introduced over time.</span>
			        	<br/>
			        	<br/>
			        	<span>With all of that said, let's get to the site!</span>
			        	<br/>
			        	<br/>
			        	<button className='constructionButton' onClick={props.confirmed}>Let's Go!</button>
				</div>
			</div>
	     </div>
	)
}

export default UnderConstruction;