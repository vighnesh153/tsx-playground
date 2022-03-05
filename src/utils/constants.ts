/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

export const defaultHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Iframe html</title>
</head>
<body>
    <div id="root"></div>
    <script type="application/javascript">
        function handleError(error) {
          console.log(error.message);
          const errorMessage = error.message;
          document.body.innerHTML = \`
            <div style="color: red; padding: 1rem">
              \${errorMessage}
            </div>
          \`;
        }
    
        window.addEventListener("message", (e) => {
          try {
            eval(e.data);            
          } catch (e) {
            console.error(e);
            handleError(e);
          }
        })
    </script>
</body>
</html>
`;

export const defaultEditorCode = `import React from "react";
import ReactDOM from "react-dom";

// Learn more about my library here:
// https://js-utils.vercel.app/modules.html
import { isPrime } from "@vighnesh153/utils";

const App = () => {
  const Strong = (text: any): React.ReactNode => {
    return <strong>{text.toString()}</strong>
  };

  return (
    <div>
      <h1>Hi world from my React application.</h1>
      <p>Is 42 Prime: {Strong(isPrime(42))}</p>
      <p>Is 43 Prime: {Strong(isPrime(43))}</p>
    </div>
  );
};

const appRoot = document.getElementById("root");
ReactDOM.render(<App />, appRoot);
`;

export const namespaces = {
  root: 'tsx.vighnesh153.com',
};
