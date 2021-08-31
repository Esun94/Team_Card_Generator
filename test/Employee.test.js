
const Employee = require("../Lib/Employee");

test("EmployeeTest for object", () => {
    const employee = new Employee();
    expect(typeof(employee)).toBe('object')
})

test("Set Name", () => {
    const testValue = "Eric";
    const employee = new Employee(testValue);
    expect(employee.name).toBe(testValue)
})
test("Set ID", () => {
    const testValue = "100";
    const employee = new Employee("Eric", testValue);
    expect(employee.id).toBe(testValue)
})
test("Set Email", () => {
    const testValue = "eric@gmail";
    const employee = new Employee("Eric", 100, testValue);
    expect(employee.email).toBe(testValue)
})
test("GetNameTest", () => {
    const testValue = "Eric";
    const employee = new Employee(testValue);
    expect(employee.getName()).toBe(testValue)
})
