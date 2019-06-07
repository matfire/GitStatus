import React from 'react'
import { Doughnut } from 'react-chartjs-2';

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
  }

  Object.filter = (obj, predicate) => 
  Object.keys(obj)
		.filter( key => predicate(obj[key]) )
		.reduce( (res, key) => (res[key] = obj[key], res), {} );

class LanguageChart extends React.Component {
	state = {
		data: {}
	}
	componentDidMount() {
		if (this.props.data) {
			let labels = []
			let frequency = {}
			let data = {}
			for (let i = 0; i < this.props.data.length; i++) {
				for (let y = 0; y < this.props.data[i]["languages"]["nodes"].length; y++) {
					console.log(this.props.data[i]["languages"]["nodes"][y].name)
					if (labels.indexOf(this.props.data[i]["languages"]["nodes"][y].name) < 0) {
						console.log("found something")
						labels.push(this.props.data[i]["languages"]["nodes"][y]["name"])
						frequency[this.props.data[i]["languages"]["nodes"][y]["name"]] = 0
					}
					frequency[this.props.data[i]["languages"]["nodes"][y]["name"]] += 1
				} 
			}
			frequency = Object.filter(frequency, data => data > 5)
			let values = Object.values(frequency);
			let bg_color = []
			for (let i = 0; i < labels.length; i++)
				bg_color.push(getRandomColor());
			data["labels"] = Object.keys(frequency)
			data["datasets"] = [
				{
					data: values,
					backgroundColor: bg_color
				}
			]
			this.setState({data:data})
		}
	}
	render() {
		return(
			<Doughnut data={this.state.data} options={{ responsive: true }}/>
		)
	}
}

export default LanguageChart