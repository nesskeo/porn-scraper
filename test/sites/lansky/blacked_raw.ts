import { expect } from 'chai';
import 'mocha';
import * as lansky from "../../../src/scrapers/lansky/index";

(() => {
  describe("Blacked Raw", function () {

    it("Get frontpage", function (done) {
      this.timeout(15000);

      lansky.frontPage(lansky.Site.BLACKED_RAW)
        .then(result => {
          expect(result)
          .to.be.an("object")
          .to.have.property("newest")
          .that.is.an("object")
          .that.has.property("title");

          expect(result)
          .to.be.an("object")
          .to.have.property("popular")
          .that.is.an("array")
          .that.is.not.empty;

          expect(result)
          .to.be.an("object")
          .to.have.property("latest")
          .that.is.an("array")
          .that.is.not.empty;

          expect(result)
          .to.be.an("object")
          .to.have.property("stars")
          .that.is.an("array")
          .that.is.not.empty;

          done();
        })
    })

    it("Get stars page 1", function (done) {
      this.timeout(15000);

      lansky.stars(lansky.Site.BLACKED_RAW)
      .then(result => {
        expect(result.stars.length).to.equal(18);
        done();
      })
    })

    it("Get top rated videos page 10000", function (done) {
      this.timeout(15000);

      lansky.topRated(lansky.Site.BLACKED_RAW, 10000)
      .then(result => {
        expect(result.videos.length).to.equal(0);
        done();
      })
    })

    it("Get top rated videos page 1", function (done) {
      this.timeout(15000);

      lansky.topRated(lansky.Site.BLACKED_RAW)
      .then(result => {
        expect(result.videos.length).to.equal(12);
        done();
      })
    })

    it("Get latest videos page 1", function (done) {
      this.timeout(15000);

      lansky.latest(lansky.Site.BLACKED_RAW)
      .then(result => {
        expect(result.videos.length).to.equal(12);
        done();
      })
    })

    it("Get 'Jill Kassidy': Should contain Jill Kassidy and her video(s)", function (done) {
      this.timeout(15000);

      lansky.star({
        name: "Jill Kassidy",
        studio: lansky.Site.BLACKED_RAW
      })
        .then(result => {
          expect(result)
            .to.be.an("object")
            .to.have.property("videos")
            .that.is.an("array")
            .with.length.greaterThan(1);
          expect(result.videos.map(v => v.title)).to.include("Two Is Better Than One");
          expect(result)
            .to.have.nested.property("star")
            .that.has.nested.property("name")
            .that.equals("Jill Kassidy");

          done();
        })
    })

    it("Search 'kyler quinn': Should contain 1 star", function (done) {
      this.timeout(15000);

      lansky.search({
        query: "kyler quinn",
        studio: lansky.Site.BLACKED_RAW
      })
        .then(result => {
          expect(result)
            .to.be.an("object")
            .to.have.property("stars")
            .that.is.an("array")
            .with.length(1);

          expect(result)
            .to.have.nested.property("stars[0]")
            .that.has.nested.property("name")
            .that.equals("Kyler Quinn");

          done();
        })
    })

    it("Get scene 'its-us-tonight'", function (done) {
      this.timeout(15000);

      lansky.scene("its-us-tonight", lansky.Site.BLACKED_RAW)
      .then(result => {
        expect(result.video.title).to.equal("It's Us Tonight");
        expect(result.video.stars).to.be.an("array").that.includes("Kyler Quinn");

        done();
      })
    });

    it("Get null scene", function (done) {
      this.timeout(15000);

      lansky.scene("xyz", lansky.Site.BLACKED_RAW)
      .then(result => {
        expect(result.video).to.equal(null);

        done();
      })
    });
  });
})();