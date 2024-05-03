const fetchData = require('./fetchData'); 

describe('fetchData', () => {
  it('should return parsed data from localStorage', () => {
    // Mock localStorage.getItem
    const mockLocalStorage = {
      getItem: jest.fn().mockReturnValue('{"name": "James Bond"}'), 
    };
    global.localStorage = mockLocalStorage;

    // Call the function with a key
    const key = 'user';
    const result = fetchData(key);

    // Expectations
    expect(result).toEqual({ name: 'James Bond' });
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith(key);
  });

  // Add more test cases if needed
});