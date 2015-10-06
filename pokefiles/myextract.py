import extract_maps as ex
import tileset
# import extract_tileblocks

ex.load_rom()

ex.load_map_pointers()


# header attributes
###################
# connections
# address
# referenced_texts
# object_data
# bank
# id
# number_of_referenced_texts
# texts_pointer
# script_pointer
# tileset
# name
# num_connections
# object_data_pointer
# y
# x
# connection_byte
# map_pointer
################
# warp_tos
# warps
# things
# number_of_warps
# number_of_signs
# signs
# number_of_things
# maps_border_tile

map_pointers = {
    #0x00: {
    #       "name": "Pallet Town",
    #       "address": 0x182a1
    #      },
               }

# map_headers = {
    #0x00: {
    #       "name": "Pallet Town",
    #       "address": 0x182a1,
    #       "tileset"
    #       "y"
    #       "x"
    #       "map_pointer"
    #       "texts_pointer"
    #       "script_pointer"
    #       "connection_byte"
    #       "num_connections"
    #       "connections":
    #        { "0":
    #          { map_id, connected_map_tile_pointer, current_map_tile_pointer, bigness, width, y, x, window_pointer }
    #        },
    #       "object_data_pointer" : {
	#            warp_tos
	#            warps
	#            things
	#            number_of_warps
	#            number_of_signs
	#            signs
	#            number_of_things
	#            maps_border_tile
    #        }
    #      },
    #   }

tileblocks = {
"Tset00_Block": [0x645E0, 0x64DE0, ""],
"Tset01_Block": [0x65270, 0x653A0, ""],
"Tset02_Block": [0x693BF, 0x6960F, ""],
"Tset03_Block": [0x6A9FF, 0x6B1FF, ""],
"Tset05_Block": [0x6867F, 0x68DBF, ""],
"Tset08_Block": [0x65980, 0x65BB0, ""],
"Tset09_Block": [0x69BFF, 0x6A3FF, ""],
"Tset0B_Block": [0x6FEF0, 0x70000, ""],
"Tset0D_Block": [0x6E930, 0x6ED10, ""],
"Tset0E_Block": [0x66BF0, 0x66D60, ""],
"Tset0F_Block": [0x6C5C0, 0x6CCA0, ""],
"Tset10_Block": [0x67350, 0x676F0, ""],
"Tset13_Block": [0x66190, 0x66610, ""],
"Tset11_Block": [0x6D0C0, 0x6D8C0, ""],
"Tset12_Block": [0x6DEA0, 0x6E390, ""],
"Tset14_Block": [0x6F2D0, 0x6F670, ""],
"Tset15_Block": [0x6FB20, 0x6FD60, ""],
"Tset16_Block": [0x6B7FF, 0x6C000, ""],
"Tset17_Block": [0x67B50, 0x68000, ""],
}

locations = {
0: [0x64000, 0x645E0, "00"],
1: [0x64DE0, 0x65270, "01"],
8: [0x653A0, 0x65980, "08"],
# "Tset13_GFX": [0x65BB0, 0x66190, "13"],
# "Tset0E_GFX": [0x66610, 0x66BF0, "0e"],
16: [0x66D60, 0x67350, "10"],
23: [0x676F0, 0x67B50, "17"],
# "Tset05_GFX": [0x6807F, 0x6867F, "05"],
# "Tset02_GFX": [0x68DBF, 0x693BF, "02"],
# "Tset09_GFX": [0x6960F, 0x69BFF, "09"],
# "Tset03_GFX": [0x6A3FF, 0x6A9FF, "03"],
22: [0x6B1FF, 0x6B7FF, "16"],
# "Tset0F_GFX": [0x6C000, 0x6C5C0, "0f"],
# "Tset11_GFX": [0x6CCA0, 0x6D0C0, "11"],
# "Tset12_GFX": [0x6D8C0, 0x6DEA0, "12"],
# "Tset0D_GFX": [0x6E390, 0x6E930, "0d"],
# "Tset14_GFX": [0x6ED10, 0x6F2D0, "14"],
# "Tset15_GFX": [0x6F670, 0x6FB20, "15"],
# "Tset0B_GFX": [0x6FD60, 0x6FEF0, "0b"],
}

tbs = [ "Tset00_Block", "Tset01_Block"]


def do_tileblocks(tileblock_id):

	print "do_tileblocks"
	# for tileblock_id in tileblocks.keys():
	tileblock = tileblocks[tileblock_id]
	start_address = tileblock[0]
	end_address = tileblock[1]
	blockcount = (end_address - start_address) / 16
	main_data = ex.rom[start_address:end_address]
	# print start_address, end_address
	print 'block count {0}'.format(blockcount)

	blockset_id = int(tileblock_id[4:6], 16) # 00
	# print blockset_id
	data = []
	for block_id in range(0, blockcount):
		start_address2 = start_address + (16 * block_id)
		end_address2 = start_address + (16 * block_id) + 16
		data.append( ex.rom[start_address2:end_address2])
		# print " length =  {}".format(len(data))
	return data

# def get_tile(x, y):
# 	## 4x4 array of tiles
# 	index = y * 4 + x


def dumpShit():
	print "dumpShit"
	start_address = 0xc23d
	end_address = 0xc334
	blockcount = (end_address - start_address) / 16
	print blockcount


def read_blockdata(map_header):
	print("read_blockdata")
	map_pointer = int(map_header["map_pointer"], 16)
	## width of whole map in blocks
	width  = int(map_header["x"], 16)
	height = int(map_header["y"], 16)
	size   = width * height

	blockdata = ex.rom[map_pointer:map_pointer+size]

	return [ord(x) for x in blockdata]




def print_properties(map):
	for prop in map_properties:
		print ' {0} : {1}'.format(prop, map[prop])


# used
def create_array(width, height):
	l = []
	for x in xrange(height):
		l.append([0] * width)
	return l

def print_map(map_array):
	width = len(map_array[0])
	height = len(map_array)
	for y in xrange(height):
		line = []
		for x in xrange(width):
			c = str(map_array[y][x])
			line.append(c.ljust(4))
		l2 = ''.join(line)
		print l2



def get_map(mapindex):
	map = headers[mapindex]

	# print_properties(map)
	width = int(map["x"], 16)
	height = int(map["y"], 16)

	tileset_id = int(map["tileset"], 16)
	blockdata = read_blockdata(map)

	# print blockdata
	blocks2d = create_array(width, height)
	print ' tileset_id = {0}'.format(tileset_id)

	for blocknum in xrange(len(blockdata)):
		line = ""

		block_x = blocknum % width
		block_y = blocknum / width

		index = block_y * width + block_x

		block = blockdata[index]
		blocks2d[block_y][block_x] = block

	return blocks2d


def get_collision_data(map_id):
	start_index = 0x1735
	data = []
	block = ord(ex.rom[start_index])
	while block != 0xff:
		data.append(block)
		start_index+=1
		block = ord(ex.rom[start_index])
	return data

def get_tile_images(x):
	tileset_id = int(x)
	tileset = locations[tileset_id]

	rawdata = ex.rom[tileset[0]:tileset[1]]
	data = []
	for b in rawdata:
		data.append(ord(b))

	return data
## MAIN ##

headers = ex.read_all_map_headers()

map_properties = [
"name",
"tileset",
"map_pointer",
"x",
"y",
"num_connections"
]

# turns data in tile blocks
data = do_tileblocks("Tset00_Block");

# load tileset
list_of_tiles = tileset.tileset()
list_of_tiles.add(data)

def get_tile_data():
	return list_of_tiles.get_all_tiles()

def get_blocks(x):
	map_no = int(x)
	# have to cast to int for some reason
	return get_map(map_no)

def get_map_header(x):
	level_id = int(x)
	return headers[level_id]

def get_size_of_all_maps():
	for mapname in headers:
		mapdata = headers[mapname]
		if int(mapdata["tileset"], 16) == 0:
			print "{0} : {1} , {2} x {3}".format(mapname,mapdata["name"], int(mapdata["x"], 16), int(mapdata["y"], 16))


# The points that a player enters into a map are stored in the maps adjacent to it
# this method iterates over those adjacent maps and finds the points
def get_connection_data(map_id):
	header = get_map_header(map_id)

	points = []

	for connection_id in header["connections"]:
		
		connection_map_id = header["connections"][connection_id]["map_id"]

		print "======\n"
		# get the other map
		other_connection = get_map_header(connection_map_id)
		
		values = other_connection['connections'].values()
		print map_id == '5'
		print filter(lambda x : x['map_id'] == int(map_id) , values)

		thismap = filter(lambda x : x['map_id'] == int(map_id) , values)

		
		for connection in thismap:
			map_points = {}
			print connection['x']
			map_points['x'] = connection['x']
			map_points['y'] = connection['y']
			map_points['direction'] = connection['direction']
			points.append(map_points)

		# points.append(map_points)
	return points
	# return 

