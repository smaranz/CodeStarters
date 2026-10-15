const ROWS = [
  { when: "Nov 8 · 6:00 PM PST", title: "Opening + workshops", body: "Check in, hear the rules, then we start." },
  { when: "Nov 8", title: "Team formation", body: "Show up solo or with friends. Teams are 1–4." },
  { when: "Nov 8", title: "Hacking begins", body: "The freeze starts. Build anything you want." },
  { when: "Nov 9–14", title: "Build week", body: "Workshops, mentors, and late-night hacking." },
  { when: "Nov 15", title: "Submissions", body: "Last push, then everything gets locked." },
  { when: "Nov 15", title: "Demos + awards", body: "Show it off, then we close the ice." },
] as const;

export function Schedule() {
  return (
    <section id="schedule" className="py-20">
      <div className="wrap">
        <p className="kick">The week</p>
        <h2 className="sec-h">
          Eight <em>days</em>.
        </h2>
        <div className="sched stagger mt-10">
          {ROWS.map((row) => (
            <div key={row.title} className="sched-row">
              <time>{row.when}</time>
              <div>
                <h4>{row.title}</h4>
                <p>{row.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
