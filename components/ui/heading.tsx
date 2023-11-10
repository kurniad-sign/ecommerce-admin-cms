interface HeadingProps {
  title: string;
  description: string;
}

export const Heading: React.FC<HeadingProps> = ({ description, title }) => {
  return (
    <header className="pb-6">
      <h2 className="text-3xl font-general-sans font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </header>
  );
};
