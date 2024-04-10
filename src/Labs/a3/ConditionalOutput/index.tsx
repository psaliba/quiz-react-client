import ConditionalOutputInline from "./ConditionalOutputInline";
import ConditionalOutputIfElse
  from "./ConditionalOutputIfElse";


const ConditionalOutput = () => {
 return(
   <>
     <ConditionalOutputIfElse/>
     <ConditionalOutputInline/>
   </>
 );
};
export default ConditionalOutput;