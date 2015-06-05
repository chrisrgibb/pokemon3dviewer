
function ImagePipeline(data){
	this.colors = ['#fff', '#aaaaaa','#555555','#000000' ];
	this.imagebuffer =  data ? data.tile_images : [];
	this.image = new Image();
	this.imageArray = null;

	this.canvas = document.createElement('canvas');
}

ImagePipeline.prototype = {


	/***
	* creates a new tile sheet image
	*/
	createTileSheet : function(pixelSize, url){
		 pixelSize = pixelSize || 1;

		var tilesheetWidth = 128 * pixelSize,
			tilesheetHeight = 48 * pixelSize,
			tilesize = 8 * pixelSize, // how many pixels
			numberoftiles = this.imagebuffer.length / 16; // sprite sheet is 16 images wide

		this.canvas.width = tilesheetWidth;
		this.canvas.height = tilesheetHeight;

		var ctx = this.canvas.getContext('2d');

		ctx.fillStyle = "#fff";
		ctx.fillRect(0, 0, tilesheetWidth , tilesheetHeight);


		ctx.save();
		for(var i = 0; i < numberoftiles; i++){
			var x = i % 16;
			var y = Math.floor(i / 16);
			this.drawTiles(ctx, i, x*tilesize, y*tilesize, pixelSize);
		}
		ctx.restore();

		this.image.src = url ? this.canvas.toDataURL(url) : this.canvas.toDataURL();
		return this.image.src;
	},

	/**
		get an array of images.
	*/

	getImageArray : function(pixelSize){
		if(this.imageArray){
			return this.imageArray;
		}

		pixelSize = pixelSize || 1;

		var tilesheetWidth = 128 * pixelSize,
			tilesheetHeight = 48 * pixelSize,
			imageArray = [],
			numberoftiles = this.imagebuffer.length / 16;


		for(var i = 0; i < numberoftiles; i++){
			var x = i % 16;
			var y = Math.floor(i / 16);
			var image = this.getImage(x, y, pixelSize);
			imageArray.push(image);
		}
		this.imageArray = imageArray;
		return imageArray;
	},

	getImage : function(x, y, pixelSize){
		var imageSize = 8,
			image = new Image(),
			canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d'),
			width = height = canvas.width = canvas.height = imageSize * pixelSize,
			imageIndex = y * 16 + x;

			// draw ontoCanvas

			ctx.fillStyle = "#fff";
			ctx.fillRect(0, 0, width , height);

			ctx.save();
			this.drawTiles(ctx, imageIndex, 0, 0, pixelSize);
			ctx.restore();

			image.src = canvas.toDataURL();

		return image;
	},

	/**
	* draws a tile onto the canvas using fillRect
	*
	*/
	drawTiles : function(ctx, imageno, destx, desty, pixelSize){

		var pic = this.computeImage(imageno);

		for(var b = 0; b < pic.length; b++){
			ctx.fillStyle = this.colors[pic[b]];
			var x = b % 8;
			var y = b / 8 | 0;

			ctx.fillRect(destx + x * pixelSize, desty + y * pixelSize, pixelSize , pixelSize);
		}
	},


	// gets one tile from the tile data
	// returns an array of pixels 8 * 8 long
	computeImage : function(offset){
		var start = offset * 16,
		end = start + 16,
		pictureArray = [];

		for(var i = start; i< end; i+=2){

			var line1 = this.imagebuffer[i];
			var line2 = this.imagebuffer[i+1];
			var colorOfLine = "";

			for(var j =7; j >= 0; --j){
				var bit1 = (line1 & (1 << j)) !== 0 ? 1 : 0;
				var bit2 = (line2 & (1 << j)) !== 0 ? 1 : 0;

				var color = (bit2 << 1 ) + bit1;
				// colorOfLine += color;
				pictureArray.push(color);
			}
		}
		return pictureArray;
	},

	mapTextures : function(){
		var images = this.getImageArray(4);

		return new Promise(function(fulfill, reject){

			function loadTexture(image){
				return new Promise(function(fulfill, reject){
					THREE.ImageUtils.loadTexture(image.src, null, function(texture){
						// happy path
						fulfill(texture);
					}, function(err){
						// not happy
						return reject(err);
					});
				});
			}

			function mapArrayToPromise(ar){
				return Promise.all(ar.map(loadTexture));
			}

			mapArrayToPromise(images).then(function(textureArray){
				// all files have loaded
				fulfill(textureArray);
			});

		});
	}
};
