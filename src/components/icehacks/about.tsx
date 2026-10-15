export function About() {
  return (
    <section id="about" className="py-20">
      <div className="wrap">
        <p className="kick">About the event</p>
        <h2 className="sec-h">
          Eight days on the ice,
          <br />
          and something that <em>runs</em>.
        </h2>
        <p className="lede">
          Ice Hacks is a free, online hackathon for high schoolers. You show up on November 8 with an
          idea, or with nothing at all, and you leave on November 15 with a working project and a demo.
        </p>
        <div className="mt-10 grid md:grid-cols-3 gap-4 stagger">
          <div className="felt hang p-6">
            <h3 className="text-xl font-bold text-white mb-2">Built for first-timers</h3>
            <p className="text-[#d5eefc] leading-relaxed">
              Workshops start from absolute zero, mentors stay around all week, and you do not need a
              single line of code to apply.
            </p>
          </div>
          <div className="felt hang p-6">
            <h3 className="text-xl font-bold text-white mb-2">Everything is covered</h3>
            <p className="text-[#d5eefc] leading-relaxed">
              Entry is free. Software, hardware, design, weird ideas — if it can freeze, it can ship.
            </p>
          </div>
          <div className="felt hang p-6">
            <h3 className="text-xl font-bold text-white mb-2">Judged by people who build</h3>
            <p className="text-[#d5eefc] leading-relaxed">
              Mentors and judges who actually make things. The feedback is the prize most people
              remember.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
