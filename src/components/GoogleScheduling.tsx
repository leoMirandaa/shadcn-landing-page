interface GoogleSchedulingProps {
  showScheduling: boolean;
}

export const GoogleScheduling = (props: GoogleSchedulingProps) => {
  const { showScheduling } = props;
  return (
    <>
      {showScheduling && (
        <section id="GoogleScheduling" className="bg-muted/50">
          <div className="container lg:grid lg:grid-cols-2 place-items-center py-16">
            <div className="lg:col-start-1">
              <h2 className="text-3xl md:text-4xl font-bold ">
                Schedule an appointment
              </h2>
              <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
                While the product is in free beta, we welcome users to sign up
                for an appointment slot so we can ensure a smooth onboarding
                experience. We welcome your feedback and suggestions.
              </p>
            </div>
          </div>
          <div className="w-full bg-white p-4 dark:bg-gray-200">
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2A7e0SK5U8w3jUZvfhU2frUiUTSJWyPl1OXP5_CVbVVc7Q0b6lLbueQRUNho7RwQS74vDLyPkG?gv=true"
              className="w-full min-h-[725px] "
            ></iframe>
          </div>
        </section>
      )}
    </>
  );
};
