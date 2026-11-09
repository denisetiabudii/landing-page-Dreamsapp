import LandingPage from "./components/pages/LandingPage";
import DemoPage from "./components/pages/DemoPage";

function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";

  if (currentPath === "/demo") {
    return <DemoPage />;
  }

  return <LandingPage />;
}

export default App;
