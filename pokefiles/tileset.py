
class tileset:

	def __init__(self):
		self.tiles = []
		self.tiles_length = 4


	def add(self, data):
		print "data"
		print len(data)
		# print data
		for line  in data:
			tile = []
			for d in line:
				tile.append(ord(d))
			self.tiles.append(tile)

			
	def get_tile(self, tileset_id, x, y):
		tileset = self.tiles[tileset_id]
		index = y * self.tiles_length + x
		return tileset[index]

	def get_all_tiles(self):
		return self.tiles


	def print_tiles(self, tileset_id):
		line = []
		start = tileset_id * 16
		end = tileset_id * 16 + 16
		for y in range(0, 4):
			xline = []
			for x in range(0, 4):
				index = (y * 4) + x			
				xline.append(self.tiles[tileset_id][index])			
			line.append(xline)
		for l in line:
			print l





