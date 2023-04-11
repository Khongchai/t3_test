export default function LoadingIndicator(props: {
  full: boolean;
  variant: "s" | "m";
}) {
  const size = props.variant === "m" ? "h-8 w-8" : "h-4 w-4";
  return (
    <div
      className={
        props.full
          ? "fixed left-0 top-0 grid h-screen w-screen place-items-center"
          : ""
      }
    >
      <div
        className={`inline-block ${size} animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}
