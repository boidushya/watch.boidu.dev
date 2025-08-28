import Clock from "./clock";

function Main() {
  return (
    <main className="flex items-center justify-center h-full">
      <div className="grid place-items-center h-[24rem] lg:h-[48rem] overflow-hidden isolation-auto relative [mask-image:linear-gradient(to_bottom,transparent,rgba(0,0,0,0.5),rgba(0,0,0,1),rgba(0,0,0,0.5),transparent)] z-50">
        <Clock />
      </div>
    </main>
  );
}

export default Main;
