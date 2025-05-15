// We are using two hooks for this project
import { useState, useCallback, useEffect } from "react";

function App() {
  // State to set the length of the password. Default is 6.
  const [length, setLength] = useState(6);

  // State to track if numbers are allowed in the password.
  const [numberAllowed, setNumberAllowed] = useState(false);

  // State to track if special characters are allowed in the password.
  const [characterAllowed, setCharacterAllowed] = useState(false);

 // State to store the generated password. It starts as an empty string.
 const [Password, setPassword] = useState("");

 // Function to generate the password
 const PasswordGenerator = useCallback(() => {
   // Initialize an empty string for the password
   let pass = ""; //it will generate password

  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  //condition: if number or character is allowed add += in string

// If the user allows numbers, add numbers to the string
if (numberAllowed) str += "0123456789";

// If the user allows special characters, add them to the string
if (characterAllowed) str += "!@#$%^&*`~()_+";

for (let i = 1; i <= length; i++) {

  let char = Math.floor(Math.random() * str.length);

  //random char multiplied by string lenght + 1 so we do not get 0th value


      // Get the character at the random index and add it to the password
      pass += str.charAt(char);
    }

    // Update the password state with the newly generated password
    setPassword(pass);

  }, [length, numberAllowed, characterAllowed, setPassword]);

//setPassword is also dependcies we will do changes basis on that 
  

//--------------------------USEeffect
useEffect(() => {
  PasswordGenerator()
}, [length , numberAllowed, characterAllowed, PasswordGenerator])


 return (
    <>
      {/* Container for the password generator */}
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">

        {/* Header text */}
        <h1 className="text-white text-center my-3">Password Generator</h1>

        {/* Input box to display the generated password ---------------------------------------------------------------------*/}
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password} // Display the generated password
            className="outline-none w-full py-1 px-3"
            placeholder="password" // Placeholder text when no password is generated
            readOnly // Make the input box read-only so users cannot type in it
          />
          
          {/* Button to copy the password -------------------------------------*/}
          <button
            onClick={() => navigator.clipboard.writeText(Password)} // Copy the password to clipboard
            className="outline-none bg-blue-500 text-white px-3 py-2 shrink-0"
          >
            Copy
          </button>
        </div>

        {/* Options for customizing the password ----------------------------------------------------------------------*/}
        <div className="  flex-col text-sm gap-y-4">
          {/* Slider for password length */}
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6} // Minimum password length
              max={100} // Maximum password length
              value={length} // Current length of the password
              className="cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))} // Update password length when slider moves
            />
            <label>Length: {length}</label> {/* Show the selected length */}
          </div>




          {/* Checkbox to include numbers in the password---------------------------------------------------------*/}
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={numberAllowed} // Show the current state of number inclusion
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)} // Toggle the inclusion of numbers
            />
            <label htmlFor="numberInput">Include Numbers</label> {/* Label for checkbox */}
          </div>


          {/* Checkbox to include special characters in the password */}
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={characterAllowed} // Show the current state of special character inclusion
              id="charInput"
              onChange={() => setCharacterAllowed((prev) => !prev)} // Toggle the inclusion of special characters
            />
            <label htmlFor="charInput">Include Special Characters</label>
          </div>


        </div>

        {/* Button to generate the password */}
        <button
          onClick={PasswordGenerator} // Call the password generator function when clicked
          className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg"
        >
          Generate Password
        </button>
      </div>
    </>
  );
}

export default App;





/*
RULE:
first we need length = useState (8)
8 cuz starting value is 8

-numberAllowed =wherether we need number or not SO yes or NO so TRUE or FALSE same for CHARACTER




setPassword:
//setPassword is also dependcies we will do changes basis on that 


Math.random:
Math.random() returns a random number between 0 (inclusive) and 1 (exclusive).

math.floor:
math.floor() returns the largest integer less than or equal to the given number.

FORMULA to generate random number
 Math.floor (Math.random() * str.length + 1)

 
 charAt:
 
 charAt: This is a method (a built-in function) in JavaScript that tells you what character is at a specific position in the string.

 example:
 let str = "hello";
console.log(str.charAt(0)); // Output: "h" (character at position 0)
console.log(str.charAt(4)); // Output: "o" (character at position 4)
ADDITIONAL COMMENTS:
1. Password length slider:
   - Lets the user select how long the generated password should be.
   - Minimum is 6 for security reasons.
   - Maximum is 100 to allow flexibility.

2. Checkboxes:
   - Allow users to customize the password by choosing whether to include numbers or special characters.

3. `PasswordGenerator` function:
   - Combines alphabets, numbers, and special characters based on user choices.
   - Uses randomization (`Math.random`) to ensure a unique password is generated each time.

4. Copy button:
   - Uses the `navigator.clipboard` API to let users copy the generated password.

5. CSS classes:
   - Used Tailwind CSS for styling.
   - Classes like `w-full`, `max-w-md`, `rounded-lg`, etc., handle layout and appearance.
   - Adjust these classes for any layout or design changes.


   HOOKS:
WHY `useCallback`?
- Ensures the function is not recreated unnecessarily on every render, which optimizes performance.
- Dependencies like `length`, `numberAllowed`, `characterAllowed`, and `setPassword` make sure the function updates when needed.



useCallback : 

useCallback is a hook that allows you to memoize a function so that it is not recreated on every render. 

This can be useful when you have a function that is used in multiple places

Every time my component renders, useCallback returns a different function

- useCallback(fn, dependencies)
 -------------------------------
dependencies will pass in array form []




useEffects :
Use useEffect when you need to do something after rendering (like fetching data).

Think of useEffect as a way to say:
"Hey React, after you finish rendering this component, please run this extra code."

Why do we use useEffect?
In React, components re-render whenever the state or props change. But sometimes, we need to do extra things after the component renders—like:
✅ Fetching data from an API
✅ Updating the webpage title
✅ Subscribing to something (like a timer or event listener)
✅ Cleaning up when the component disappears

*/


