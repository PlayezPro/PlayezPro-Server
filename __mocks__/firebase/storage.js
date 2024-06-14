// __mocks__/firebase/storage.js
export const getStorage = jest.fn();
export const ref = jest.fn();
export const uploadBytes = jest.fn(() => Promise.resolve());
export const getDownloadURL = jest.fn(() => Promise.resolve('https://mockurl.com/file.mp4'));
