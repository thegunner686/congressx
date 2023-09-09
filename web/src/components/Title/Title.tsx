export interface TitleProps {
  size: "sm" | "md" | "lg";
  className?: string;
}

const Title: React.FC<TitleProps> = ({ size = "lg", className }) => {
  const titleClassName =
    size == "lg"
      ? "text-4xl md:text-7xl"
      : size == "md"
      ? "text-4xl md:text-7xl"
      : "text-2xl md:text-2xl";

  const iconClassName =
    size == "lg"
      ? "md:text-7xl text-5xl"
      : size == "md"
      ? "md:text-7xl text-5xl"
      : "md:text-3xl text-3xl";
  return (
    <div
      className={`flex-row font-extrabold uppercase text-white shadow-silver text-shadow-sm flex items-center justify-center font-archivo text-center ${titleClassName} ${className}`}
    >
      CongressX
    </div>
  );
};

export default Title;
