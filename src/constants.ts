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
