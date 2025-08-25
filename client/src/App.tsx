import * as React from "react";
import Animation from "./components/animation";
import RegistrationForm from "./pages/home";

function App() {
  const [showAnimation, setShowAnimation] = React.useState<boolean>(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []); 

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {showAnimation && <Animation />}
      {!showAnimation && <RegistrationForm />}
    </main>
  );
}

export default App;