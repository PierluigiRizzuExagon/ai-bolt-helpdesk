import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
  onClose?: () => void;
}

export const Header = ({ onClose }: HeaderProps) => {
  return (
    <header className="w-full h-[72px] flex items-center bg-[#2848e6] px-4 shadow-md">
      <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
        <MenuIcon className="h-4 w-4 text-white" />
      </Button>

      <h1 className="ml-2 font-normal text-white text-xl tracking-[0] leading-7 whitespace-nowrap">
        Help Center
      </h1>

      <Button
        variant="ghost"
        size="icon"
        className="h-auto w-auto p-0 ml-auto hover:bg-white/10 transition-colors"
        onClick={onClose}
      >
        <XIcon className="h-6 w-6 text-white" />
      </Button>
    </header>
  );
};
