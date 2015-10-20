from map_data import get_map_data

#map header pointers start at 0x1AE
start_map_header_pointers = 0x1AE

#bank bytes for each map header start at 0xC23D
start_map_header_pointer_banks = 0xC23D

#number of maps in this list
map_count = 0xF8 #including the 0th the total is is 248 or 0xF8

bad_maps = [0x0b, 0x45, 0x4b, 0x4e, 0x69, 0x6a, 0x6b, 0x6d, 0x6e, 0x6f, 0x70, 0x72, 0x73, 0x74, 0x75, 0xad, 0xcc, 0xcd, 0xce, 0xe7, 0xed, 0xee, 0xf1, 0xf2, 0xf3, 0xf4]



class map_extractor:
	
	def __init__(self, rompath):
		self.rom_path = "./baserom.gbc" if rompath is None else rompath
		self.rom = None
		self.map_pointers = {}



	def do_stuff(self):
		return "I did stuff"

	def get_rom(self):
		return self.rom

	def load_rom(self):
	    try:
	        self.rom = open(self.rom_path, "rb").read()
	        return True
	    except Exception as exception:
	        print(exception)
	        print("error loading rom")
	        return False

	def load_map_pointers(self):
		maps = get_map_data()['maps']
		for map in maps.keys():
			pointer = self.get_nth_map_header_pointer(map)
			#print maps[map] + "\t\t\t" + hex(pointer)

			entry = {
			        "name": maps[map],
			        "address": hex(pointer),
			        "bank": hex(self.get_nth_map_header_pointer_bank_byte(map))
			        }
			self.map_pointers[map] = entry

		
	def get_nth_map_header_pointer(self, map_id):
		"returns the full pointer to the map header struct for this map"
		# assert_rom()

		#figure out where the bytes for this pointer are located
		byte1_address = start_map_header_pointers + (map_id * 2)
		byte2_address = start_map_header_pointers + (map_id * 2) + 1

		#grab the two bytes making up the partial pointer
		byte1 = ord(self.rom[byte1_address])
		byte2 = ord(self.rom[byte2_address])

		#swap the bytes (16-bit pointers for z80 are little endian)
		temp = byte1
		byte1 = byte2
		byte2 = temp
		del temp

		#combine these into a single pointer (0x byte1 byte2)
		partial_pointer = (byte2 + (byte1 << 8))
		#print hex(partial_pointer)

		#get the bank id
		bank = self.get_nth_map_header_pointer_bank_byte(map_id)

		#calculate the full pointer
		pointer = self.calculate_pointer(partial_pointer, bank)

		#return it as an integer
		return pointer

	def assert_rom(self):
   		assert self.rom, "rom must be loaded, see load_rom()"

	def calculate_pointer(self, short_pointer, bank):
		short_pointer = int(short_pointer)
		bank = int(bank)

		pointer = short_pointer - 0x4000 + (bank * 0x4000)

		#result will be an integer
		return pointer

	def get_nth_map_header_pointer_bank_byte_address(self, map_id):
		"returns the address to the bank byte associated with this map pointer"
		address = start_map_header_pointer_banks + map_id
		return address

	def get_nth_map_header_pointer_bank_byte(self, map_id):
		"returns the bank number for this map header"
		self.assert_rom()

		address = self.get_nth_map_header_pointer_bank_byte_address(map_id)
		bank_byte = ord(self.rom[address])
		return bank_byte

	

