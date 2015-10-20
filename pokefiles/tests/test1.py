import unittest
import sys
sys.path.append('../')
import extract_maps
from map_extractor import map_extractor

rom_path = "../../baserom.gbc"


class TestExtractMaps(unittest.TestCase):

	def test_it_loads(self):
		self.assertIsNotNone(extract_maps)

	def test_can_load_rom(self):
		extract_maps.load_rom()
		rom = extract_maps.rom
		self.assertIsNotNone(rom)		


# test map extractor
class TestMapExtractorTheBasics(unittest.TestCase):

	def test_it_loads(self):
		self.assertIsNotNone(map_extractor)

	def test_can_create_class(self):
		extractor = map_extractor(rom_path)
		result = extractor.do_stuff()
		self.assertEqual('I did stuff', result)

	def test_can_load_rom(self):
		extractor = map_extractor(rom_path)

		extractor.load_rom()
		rom = extractor.get_rom()
		self.assertIsNotNone(rom)

	def test_two_instances_can_load_separate_roms(self):
		instance1 = map_extractor('./dummyrom1.gbc')
		instance2 = map_extractor('./dummyrom2.gbc')

		instance1.load_rom()
		instance2.load_rom()

		rom1 = instance1.get_rom()
		rom2 = instance2.get_rom()
		self.assertNotEqual(rom1, rom2)

	def test_can_load_map_pointers(self):
		extractor = map_extractor(rom_path)
		extractor.load_rom()
		extractor.load_map_pointers()
		self.assertIsNotNone(extractor.map_pointers)

class TestBoth(unittest.TestCase):

	def test_can_load_map_pointers(self):
		extractor = map_extractor(rom_path)
		extractor.load_rom()
		extractor.load_map_pointers()

		extract_maps.load_rom()
		extract_maps.load_map_pointers()


		self.assertEqual(extract_maps.map_pointers, extractor.map_pointers)

if __name__ == '__main__':
	unittest.main()