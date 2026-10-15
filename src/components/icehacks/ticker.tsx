const ITEMS = [
  "Online",
  "November 8–15, 2026",
  "High school hackathon",
  "100% free",
  "Opening 6:00 PM PST",
  "Software, hardware, anything",
];

export function Ticker() {
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
            <i>•</i>
          </span>
        ))}
      </div>
    </div>
  );
}
