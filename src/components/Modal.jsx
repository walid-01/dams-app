"use client";
import { useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Modal({ children }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay]
  );

  const onCloseButtonClick = useCallback(
    (e) => {
      e.stopPropagation(); // Stop event propagation to prevent closing the modal
      onDismiss();
    },
    [onDismiss]
  );

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed z-40 left-0 right-0 top-0 bottom-0 mx-auto bg-black/30 w-screen"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-sky-500 px-16 pb-5 pt-10 bg-white w-3/5"
      >
        {children}
        <div className="w-full flex justify-end gap-4">
          <button
            onClick={refreshPage}
            className="z-50 bg-sky-500 text-white px-4 p-2 rounded-full"
          >
            View More Details
          </button>
          <button
            className="z-50 bg-red-500 text-white px-4 py-2 rounded-full"
            onClick={onCloseButtonClick}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
