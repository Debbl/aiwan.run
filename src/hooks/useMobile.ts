import { useEffect, useState } from "react";

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(
      !!navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i,
      ),
    );
  }, []);

  return { isMobile };
};
