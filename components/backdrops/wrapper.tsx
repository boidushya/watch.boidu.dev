import { useEffect, useMemo, useState } from "react";
import { getBackdropComponent } from "@/utils/config";
import { useBackdropStore } from "@/utils/stores";

function BackdropWrapper() {
  const { backdrop, previewBackdrop } = useBackdropStore();
  const activeBackdrop = previewBackdrop || backdrop;
  const [currentBackdrop, setCurrentBackdrop] = useState(activeBackdrop);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const BackdropComponent = useMemo(() => getBackdropComponent(currentBackdrop), [currentBackdrop]);

  useEffect(() => {
    if (activeBackdrop !== currentBackdrop) {
      setIsTransitioning(true);

      const timer = setTimeout(() => {
        setCurrentBackdrop(activeBackdrop);
        setIsTransitioning(false);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [activeBackdrop, currentBackdrop]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-10 transition-opacity duration-200 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      <BackdropComponent />
    </div>
  );
}

export default BackdropWrapper;
