export const Statistics = () => {
  interface statsProps {
    quantity: string;
    description: string;
  }

  const stats: statsProps[] = [
    {
      quantity: "3+",
      description: "Countries with Reports",
    },
    {
      quantity: "1000+",
      description: "Total Reports",
    },
    {
      quantity: "1000+",
      description: "Active Users",
    },
    {
      quantity: "10+",
      description: "Armed Response Partners",
    },
  ];

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description }: statsProps) => (
          <div
            key={description}
            className="space-y-2 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold ">{quantity}</h2>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
