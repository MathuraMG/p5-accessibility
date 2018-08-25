define([`chai`], chai => {
  const expect = chai.expect;

  /* global describe */
  describe(`gridInterceptor Functions`, () => {
    let gi;
    /* global before after */
    before(() => {});
    after(() => {});
    /* global it */
    it(`can be created`, () => {
      /* global GridInterceptor */
      gi = new GridInterceptor();
      expect(gi.noRows).to.be.a(`number`).and.to.equal(10);
      expect(gi.noCols).to.be.a(`number`).and.to.equal(10);
      expect(gi.coordLoc).to.be.an(`object`).and.to.be.deep.equal({});
    });

    it(`implements the baseInterceptor prototype`, () => {
      expect(GridInterceptor.prototype).to.be.an(`object`).and.to.have.property(`getColorName`)
    });

    it(`clears variables`, () => {
      gi.drawObject = gi.clearVariables(gi.drawObject);
      expect(gi.drawObject).to.be.an(`object`);
      expect(gi.drawObject.objectTypeCount).to.be.an(`object`).and.to.be.deep.equal({});
      expect(gi.drawObject.objectArray).to.be.an(`array`).and.have.lengthOf(0);
      expect(gi.drawObject.objectCount).to.be.a(`number`).and.to.equal(0);
      expect(gi.isCleared).to.be.ok;
    });
    // it(`populates object`, () => {

    // })
  })
})