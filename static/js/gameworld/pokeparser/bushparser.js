
function parseTheBush(sections){
	var bushArray = [];
	if(sections.length > 0){
		for (var i = 0; i < sections.length; i++) {
			var rows = sections[i].rows
			var b1 = mapOneBush(rows[0], 2); // top 
			var b2 = mapOneBush(rows[1], 1); // bottom
			bushArray.push({
				x: b1[0].x,
				y: b1[0].y,
				height : 2,
				data : [b1, b2]
			});
		};
	}
	return bushArray;
}

function mapOneBush(bush, height){
	var cubeone = {
		x : bush.x,
		y : bush.y,
		height : height,
		texture : bush.data[0]
	};
	var two = {
		x : bush.x+1,
		y : bush.y,
		height : height,
		texture : bush.data[1]
	};

	return [cubeone, two];
}