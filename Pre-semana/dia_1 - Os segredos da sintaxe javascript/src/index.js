const assert = require("assert");
const Employee = require("./Employee");
const Manager = require("./manager");
const Util = require("./Util");

const GENDER = {
    male: "male",
    female: "female"
}

{ //contextos
    const employee = new Employee({
        name: "Xuxa da Silva",
        gender: GENDER.female
    })

    assert.throws(() => employee.birthYear, { message: "you mmust define age fist !!" });
}

const CURRRENT_YEAR = 2021; 
Date.prototype.getFullYear = () => CURRRENT_YEAR;  //Força a data currenct para que o teste não falhe;

{  
    const employee = new Employee({
        name: "Joaozinho",
        age: 20,
        gender: GENDER.male
    })

    //Aplicando teste usdando assert
    assert.deepStrictEqual(employee.name, "Mr. Joaozinho");
    assert.deepStrictEqual(employee.age, undefined);
    assert.deepStrictEqual(employee.grossPay, Util.formatCurrency(5000.40));
    assert.deepStrictEqual(employee.netPay, Util.formatCurrency(4000.32));

    const expectedBirthYear = 2001;

    assert.deepStrictEqual(employee.birthYear, expectedBirthYear);
    console.log("-----employee-----");
    console.log("employee.name", employee.name);
    console.log("employee.age", employee.age);
    console.log("employee.grossPay", employee.grossPay);
    console.log("employee.netPay", employee.netPay);
}

{
    const manager = new Manager({
        name: "Mariazinha",
        age: 18,
        gender: GENDER.female
    })

    assert.deepStrictEqual(manager.name, "Ms Mariazinha");
    assert.deepStrictEqual(manager.age, undefined);
    assert.deepStrictEqual(manager.gender, undefined);
    assert.deepStrictEqual(manager.birthYear, 2003);
    assert.deepStrictEqual(manager.grossPay, Util.formatCurrency(5000.40));
    assert.deepStrictEqual(manager.bonuses, Util.formatCurrency(2000));
    assert.deepStrictEqual(manager.netPay, Util.formatCurrency(6000.32));

    console.log("\n-----manager-----");
    console.log("manager.name", manager.name);
    console.log("manager.age", manager.age);
    console.log("manager.grossPay", manager.grossPay);
    console.log("manager.netPay", manager.netPay);
    
}