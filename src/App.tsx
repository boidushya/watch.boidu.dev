import CommandMenu from "@/components/cmdk";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Main from "@/components/main";
import { getBackdropComponent } from "@/utils/config";
import { useBackdropStore } from "@/utils/stores";

function App() {
  const { backdrop } = useBackdropStore();

  const BackdropComponent = getBackdropComponent(backdrop);

  return (
    <div className="h-screen bg-gradient-to-b dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 dark:text-zinc-100 transition-colors text-zinc-900 from-zinc-200 via-zinc-100 to-zinc-200">
      <Header />
      <Main />
      <Footer />
      <BackdropComponent />
      <CommandMenu />
    </div>
  );
}

export default App;
