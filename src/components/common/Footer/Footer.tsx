import React from "react";

const Footer: React.FC = () => (
  <footer className="p-4 text-center bg-gradient-to-t from-[#0B0D17]/80 to-transparent mt-10">
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs text-cyan-700 mt-2">
        &copy; {new Date().getFullYear()} Vishani Raveendran. All rights
        reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
