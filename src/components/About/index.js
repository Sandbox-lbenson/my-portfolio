import Image from 'next/image';

function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-text">
          <h2

            className="about-heading"
          >
            <span>About Me</span>
            <hr className="about-divider" />
          </h2>
          <p>
            I am passionate about creating responsive, user-friendly, and
            visually appealing web applications that solve real-world problems
            and meet the client&apos;s requirements. Whether it is building
            dynamic websites or developing complex web applications, I am
            committed to delivering the best possible solution.
          </p>
          <p>
            I have acquired my Advanced Software Development in Full-Stack
            JavaScript certificate from Code Fellows, which provided me with a
            solid foundation in web development. My experience working on
            various projects has taught me the importance of delivering quality
            software solutions on time and within budget. Additionally, my
            experience working with different web frameworks and libraries has
            enabled me to stay up-to-date with the latest trends in web
            development.
          </p>
        </div>

        <div className="about-image">
          <Image
            src="/lewis-headshot.jpg"
            alt="Lewis Benson"
            fill
          />
        </div>
      </div>
    </section>
  );
}

export default About;
