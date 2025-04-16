// Simple test script to verify API functionality
import fetch from 'node-fetch';

const API_URL = 'http://localhost:4174';

async function testApi() {
  console.log('Testing password generator API...');
  
  try {
    // Test default parameters
    console.log('\n1. Testing default parameters:');
    const defaultResponse = await fetch(`${API_URL}/api/generate`);
    
    if (!defaultResponse.ok) {
      throw new Error(`Error: ${defaultResponse.status} ${defaultResponse.statusText}`);
    }
    
    const defaultData = await defaultResponse.json();
    console.log('Status:', defaultResponse.status);
    console.log('Response:', JSON.stringify(defaultData, null, 2));
    
    // Test with custom length
    console.log('\n2. Testing with length=20:');
    const lengthResponse = await fetch(`${API_URL}/api/generate?length=20`);
    const lengthData = await lengthResponse.json();
    console.log('Status:', lengthResponse.status);
    console.log('Password length:', lengthData.password.length);
    console.log('Response:', JSON.stringify(lengthData, null, 2));
    
    // Test with easyToSay mode
    console.log('\n3. Testing with easyToSay mode:');
    const easyToSayResponse = await fetch(`${API_URL}/api/generate?characterMode=easyToSay`);
    const easyToSayData = await easyToSayResponse.json();
    console.log('Status:', easyToSayResponse.status);
    console.log('Options:', JSON.stringify(easyToSayData.options, null, 2));
    console.log('Password:', easyToSayData.password);
    
    // Test with custom character options
    console.log('\n4. Testing with only lowercase and numbers:');
    const customResponse = await fetch(`${API_URL}/api/generate?uppercase=false&symbols=false`);
    const customData = await customResponse.json();
    console.log('Status:', customResponse.status);
    console.log('Options:', JSON.stringify(customData.options, null, 2));
    console.log('Password:', customData.password);
    
    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testApi(); 