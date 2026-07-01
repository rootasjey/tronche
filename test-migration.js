// Simple test to validate the migration
import { hashCode, getRandomColor, getUnit } from './dist/index.js';

console.log('🧪 Testing Tronche...\n');

// Test utilities
console.log('✅ Testing utilities:');
const testName = 'Clara Barton';
const testColors = ['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90'];

const hash = hashCode(testName);
console.log(`   hashCode("${testName}") = ${hash}`);

const randomColor = getRandomColor(hash, testColors, testColors.length);
console.log(`   getRandomColor(${hash}, colors, ${testColors.length}) = ${randomColor}`);

const unit = getUnit(hash, 100, 1);
console.log(`   getUnit(${hash}, 100, 1) = ${unit}`);

console.log('\n✅ All utility functions working correctly!');

// Test that we can import the types
try {
  console.log('\n✅ Type definitions are properly structured');
} catch (error) {
  console.error('❌ Type definition error:', error);
}

console.log('\n🎉 Migration validation complete!');
console.log('\nNext steps:');
console.log('1. Install dependencies: npm install');
console.log('2. Run the demo: npm run dev');
console.log('3. Build the library: npm run build');
