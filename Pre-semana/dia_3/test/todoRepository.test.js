const { describe, it, before, afterEach } = require("mocha");
const { expect } = require("chai");
const TodoRepository = require("../src/todoRepository");
const { createSandbox } = require("sinon");

describe("todoRepository", ()=>{

    let todoRepository;
    before(()=>{
        todoRepository = new TodoRepository()
        sandbox = createSandbox();
    })

    afterEach(()=>{
        sandbox.restore();
    })

    describe("Methods signature", ()=>{
        it('should call find from loksjs', ()=>{

            const  mockDatabase = [
                {
                  name: 'Xuxa da silva',
                  age: 32,
                  meta: { revision: 0, created: 1611250406658, version: 0 },
                  '$loki': 1
                }
              ]


              const functionName = "find";
              const expectedReturn = mockDatabase;
              sandbox.stub(
                  todoRepository.schedule,
                  functionName
              ).returns(expectedReturn);

              const result = todoRepository.list()
              expect(result).to.be.equal(expectedReturn);
              expect(todoRepository.schedule[functionName].calledOnce).to.be.ok


        })

        it('should call insertOne from loksjs', ()=>{
            const functionName = "insertOne";
            const expectedReturn = true;

            sandbox.stub(
                todoRepository.schedule,
                functionName
                ).returns(expectedReturn);
                
                const data = { name: "Luan"}

            const result = todoRepository.create(data);
            expect(result).to.be.equal(expectedReturn);
            expect(todoRepository.schedule[functionName].calledOnceWithExactly(data)).to.be.ok
        })
    })
})

