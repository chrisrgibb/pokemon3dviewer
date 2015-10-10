print ". venv/bin/activate"
from flask import Flask, jsonify, request
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

	#  TODO level_id is a string, could change it later
	tiles = myextract.get_tile_data()
	blocks = myextract.get_blocks(level_id)
	headers = myextract.get_map_header(level_id)
	collision_data = myextract.get_collision_data(level_id)
	t = headers['tileset']

	spawnpoints = myextract.get_connection_data(level_id)

	print "------"
	tile_images = myextract.get_tile_images(int(t, 16))

	# jsonify will do for us all the work, returning the
	# previous data structure in JSON
	data = {
		'tiles' : tiles,
		'blocks' : blocks,
		'headers' : headers,
		'collisions' : collision_data,
		'tile_images' : tile_images,
		'spawn_points' : spawnpoints
	}

	return jsonify(data)

@app.route('/upload', methods=['POST'])
def upload_file():
	# rom_filename = os.path.join(os.getcwd(), "baserom.gbc")
	# # rom = open(rom_filename, "rb").read()
	# # print rom
	try:
		if request.method == 'POST':
			file = request.files['myfile']
			print(file.stream)
			return 'success'
	except:
		return 'failure'

if __name__ == '__main__':
    sys.path.append('/pokefiles')
    import pokefiles.myextract as myextract

    app.run()
