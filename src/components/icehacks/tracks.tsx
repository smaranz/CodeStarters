const TRACKS = [
  { n: "01", tilt: "-1.6deg", title: "Best Overall", body: "The project that makes the whole room quiet down." },
  { n: "02", tilt: "1.8deg", title: "Best First Hack", body: "Only open to people at their first hackathon. Ever." },
  { n: "03", tilt: "-0.8deg", title: "AI & Machine Learning", body: "Models, agents, and things that think a little." },
  { n: "04", tilt: "1.2deg", title: "Social Impact", body: "Something your own community would actually use." },
  { n: "05", tilt: "-1.4deg", title: "Design & Craft", body: "The one that looks and feels unreasonably good." },
] as const;

export function Tracks() {
  return (
    <section id="tracks" className="py-20">
      <div className="wrap">
        <p className="kick">Project tracks</p>
        <h2 className="sec-h">
          Five categories,
          <br />
          five sets of <em>prizes</em>.
        </h2>
        <p className="lede">Build whatever you want. These are just the buckets we hand trophies out of.</p>
        <div className="track-board stagger">
          {TRACKS.map((track) => (
            <article
              key={track.n}
              className="felt hang track-tile"
              style={{ ["--tilt" as string]: track.tilt }}
            >
              <b>{track.n}</b>
              <h3>{track.title}</h3>
              <p>{track.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
