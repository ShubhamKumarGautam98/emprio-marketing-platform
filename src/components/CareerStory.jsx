import React from "react";
import "./CareerPage.css";
import career4 from "../assets/career4.webp";
import career2 from "../assets/career2.webp";
import career1 from "../assets/career1.webp";

export default function CareerStory() {
  return (
    <section className="story">
      {/* TITLE */}
      <h1 className="storyTitle">CAREERS</h1>

      {/* SUBTITLE - Shows on mobile only */}
      <p className="mobileSubtitle">
        Emprio was founded in 2015 by two friends with a shared belief: that ideas, when crafted with intent, can move businesses forward.
      </p>

      {/* THREE COLUMN GRID - Mobile only */}
      <div className="mobileThreeCol">
        <div className="mobileColBlock">
          <p>
           Emprio was founded in 2015 by two friends with a shared belief: that
          ideas, when crafted with intent, can move businesses forward. One was
          obsessed with words—how the right copy could persuade, inspire, and
          build trust.The other saw the world through form, color, and composition—believing
          design wasn't decoration, but communication
          </p>
        </div>
        <div className="mobileColBlock">
          <p>
            What began as a partnership quickly became a purpose Emprio didn't start in boardrooms or corner offices. It started in
          college corridors. Classrooms doubled as conference rooms. Desks became
          pitch tables. There was no playbook—only conviction, curiosity, and the
          courage to show up From two people juggling classes and clients.
          </p>
        </div>
        <div className="mobileColBlock">
          <p>
            As the world of business
          transformed, so did we. New platforms emerged. Attention spans
          shortened. Brands were forced to evolve faster than ever before.
          Emprio evolved with them.Today, Emprio is a growing creative and strategy partner with
          operations across five cities in India, serving businesses across five
          global time zones.
          </p>
        </div>
      </div>

      {/* TEXT + IMAGE SECTION - Mobile layout */}
      <div className="mobileTextImageRow">
        <div className="mobileTextBlock">
          <p>
            We still believe in the power of strong ideas.
            We still value craft over shortcuts.
            And we still care deeply about our people, and about the brands that
          trust us with their stories.
          Because growth means nothing if you lose what made you begin in the
          first place.
          </p>
        </div>
        <div className="mobileCenterImage">
          <img
            src={career4}
            alt="Life at Emprio"
            className="bwImage"
          />
        </div>
      </div>

      {/* TWO IMAGES ROW - Mobile */}
      <div className="mobileTwoImages">
        <div className="mobileImageWrap">
          <img
            src={career2}
            alt="Emprio team"
            className="bwImage"
          />
        </div>
        <div className="mobileImageWrap">
          <img
            src={career1}
            alt="Emprio workspace"
            className="bwImage"
          />
        </div>
      </div>

      {/* ========== DESKTOP CONTENT (hidden on mobile) ========== */}
      
      {/* INTRO */}
      <div className="block desktopOnly">
        <p>
          Emprio was founded in 2015 by two friends with a shared belief: that
          ideas, when crafted with intent, can move businesses forward. One was
          obsessed with words—how the right copy could persuade, inspire, and
          build trust.
        </p>

        <p>
          The other saw the world through form, color, and composition—believing
          design wasn't decoration, but communication.
        </p>

        <p>What began as a partnership quickly became a purpose.</p>
      </div>

      {/* BODY */}
      <div className="block desktopOnly">
        <p>
          Emprio didn't start in boardrooms or corner offices. It started in
          college corridors. Classrooms doubled as conference rooms. Desks became
          pitch tables. There was no playbook—only conviction, curiosity, and the
          courage to show up.
        </p>

        <p>
          From two people juggling classes and clients, Emprio grew project by
          project, relationship by relationship. As the world of business
          transformed, so did we. New platforms emerged. Attention spans
          shortened. Brands were forced to evolve faster than ever before.
        </p>

        <p>Emprio evolved with them.</p>

        <p>
          Today, Emprio is a growing creative and strategy partner with
          operations across five cities in India, serving businesses across five
          global time zones. What started as a friendship has become a team of
          many strategists, designers, storytellers, and builders working
          together to help brands stay relevant in a constantly shifting world.
        </p>

        <p>Yet, at its core, Emprio remains unchanged.</p>
      </div>

      {/* OUTRO */}
      <div className="block desktopOnly">
        <p>
          We still believe in the power of strong ideas.
          <br />
          We still value craft over shortcuts.
          <br />
          And we still care deeply about our people, and about the brands that
          trust us with their stories.
        </p>

        <p>
          Because growth means nothing if you lose what made you begin in the
          first place.
        </p>

        <p>
          That belief is our legacy.
          <br />
          That belief is Emprio.
        </p>
      </div>

      <div className="storySplit desktopOnly">
        {/* LEFT TEXT */}
        <div className="storySplitText">
          <p>
            At Emprio, people are at the heart of everything we build. We're a creative
            and strategy-led agency driven by curiosity, collaboration, and care. The
            best ideas don't come from titles or hierarchies—they come from people who
            feel seen, trusted, and free to express themselves.
          </p>

          <p>
            We believe strong teams are built with intention. That means creating a
            workplace where talent from all backgrounds, cultures, abilities,
            identities, and perspectives has the space to grow. At Emprio, diversity
            isn't a checkbox—it's how better thinking happens. We invest in our people
            through mentorship, shared ownership, and opportunities that help them
            shape both their careers and the work they create.
          </p>

          <p>
            Our mission goes beyond campaigns and deliverables. We aim to create work
            that matters—work that helps businesses grow responsibly and contributes
            positively to the communities we serve across geographies and time zones.
          </p>

          <p>
            We're building Emprio as a place where creativity feels human, growth feels
            earned, and work feels meaningful.
          </p>

          <p>
            If you believe in ideas with intent, collaboration with respect, and
            creativity without borders—you'll feel at home here.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="imageHoverWrap">
          <img
            src={career4}
            alt="Life at Emprio"
            className="bwImage"
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "grayscale(0%)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "grayscale(100%)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        </div>
      </div>

      {/* TWO IMAGE CONTAINER - Desktop */}
      <div className="storyImagesRow desktopOnly">
        <div className="imageHoverWrap">
          <img
            src={career2}
            alt="Emprio team"
            className="bwImage"
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "grayscale(0%)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "grayscale(100%)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        </div>

        <div className="imageHoverWrap">
          <img
            src={career1}
            alt="Emprio workspace"
            className="bwImage"
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "grayscale(0%)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "grayscale(100%)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        </div>
      </div>
    </section>
  );
}
