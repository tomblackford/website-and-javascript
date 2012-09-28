ExampleTestCase = TestCase("ExampleTestCase");
  
ExampleTestCase.prototype.testTestObj = function(){
  var testObj1 = new TestObj("name1");
  
  assertEquals("Incorrect name returned.", "name1", testObj1.name);
};
  
