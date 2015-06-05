print ". venv/bin/activate"
from flask import Flask, jsonify
import os
import io
import sys



# import jsonify
app = Flask(__name__, static_url_path='/')

@app.route('/')
def index():
	return app.send_static_file('index.html')

# path to all js files
@app.route('/js/<path:path>')
def static_proxy(path):
	return app.send_static_file(os.path.join('js', path))


# path to all images
@app.route('/images/<path:path>')
def image_proxy(path):
	print path
	file = os.path.join('images', path)
	# print file.read()
	# return app.send_file(io.BytesIO(file.read()),
	# 		attachment_filename=file,
	# 		mimetype='image/png')
	return app.send_static_file(os.path.join('images', path))

@app.route('/leveldata/<level_id>')
def get_level_data(level_id):
	#
	tiles = myextract.get_tile_data()
	blocks = myextract.get_blocks(level_id)
	headers = myextract.get_headers(level_id)
	collision_data = myextract.get_collision_data(level_id)
	t = headers['tileset']

	print "------"
	tile_images = myextract.get_tile_images(int(t, 16))

	# jsonify will do for us all the work, returning the
	# previous data structure in JSON
	jaso = {
		'tiles' : tiles,
		'blocks' : blocks,
		'headers' : headers,
		'collisions' : collision_data,
		'tile_images' : tile_images
	}

	return jsonify(jaso)

if __name__ == '__main__':
    sys.path.append('/pokefiles')
    import pokefiles.myextract as myextract


    app.run()
