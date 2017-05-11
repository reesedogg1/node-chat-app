const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = "Maurice";
    var text = "Hello!";
    
    var res = generateMessage(from,text);
    
    expect(res.from).toBe(from);
    expect(res.text).toBe(text);
    expect(res.createdAt).toBeA("number");
    
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Me';
    var lat = 10;
    var long = 20;
    
    var res = generateLocationMessage(from,lat,long);
    
    expect(res.createdAt).toBeA("number");
    expect(res.from).toBe(from);
    expect(res.url).toBe("https://www.google.com/maps?q=10,20");   
  });
});