const fs = jest.genMockFromModule('fs');
fs.writeFileSync = jest.fn();
fs.readFileSync = jest.fn(() => Buffer.from(''));
fs.unlinkSync = jest.fn();
module.exports = fs;