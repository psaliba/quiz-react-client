import VariablesAndConstants from "./variables/VariablesAndConstants";
import VariableTypes from "./variables/VariableTypes";
import BooleanVaribles from "./variables/BooleanVariables";
import IfElse from "./conditionals/IfElse";
import TernaryOperator from "./conditionals/TernaryOperator";
import WorkingWithFunctions from "./functions/WorkingWithFunctions";
import WorkingWithArrays from "./arrays/WorkingWithArrays";
import WorkingWithJson from "./json/WorkingWithJson";
import TemplateLiterals from "./string/TemplateLiterals";

function JavaScript() {
    console.log("Hello World!");
    return(
       <div>
          <h1>JavaScript</h1>
          <VariablesAndConstants/>
          <VariableTypes/>
          <BooleanVaribles/>
          <IfElse/>
          <TernaryOperator/>
          <WorkingWithFunctions/>
          <WorkingWithArrays/>
          <WorkingWithJson/>
          <TemplateLiterals/>
       </div>
    );
 }
 export default JavaScript

 var functionScoped = 2;
let blockScoped = 5;
const constant1 = functionScoped - blockScoped;
let numberArray1 = [1, 2, 3, 4, 5];
let stringArray1 = ['string1', 'string2'];

let variableArray1 = [
   functionScoped,   blockScoped,
   constant1,        numberArray1,   stringArray1
];
console.log("Working with Arrays");
console.log(`numberArray1 = ${numberArray1}`);
console.log(`stringArray1 = ${stringArray1}`);
console.log(`variableArray1 = ${variableArray1}`);