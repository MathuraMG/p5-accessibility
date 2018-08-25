define([`chai`], chai => {
  const expect = chai.expect;

  /* global describe */
  describe(`textInterceptor Functions`, () => {
    let ti;
    /* global it */
    it(`can be created`, () => {
      /* global TextInterceptor */
      ti = new TextInterceptor();
      expect(ti.prevTotalCount).to.be.a(`number`).and.to.equal(0);
      expect(ti.totalCount).to.be.a(`number`).and.to.equal(0);
      expect(ti.canvasDetails).to.be.an(`object`).and.to.be.deep.equal({
        width: 0,
        height: 0
      });
    });

    it(`implements the baseInterceptor prototype`, () => {
      expect(TextInterceptor.prototype).to.be.an(`object`).and.to.have.property(`getColorName`)
    });

    it(`clears variables`, () => {
      ti.drawObject = ti.clearVariables(ti.drawObject);
      expect(ti.drawObject).to.be.an(`object`);
      expect(ti.drawObject.objectTypeCount).to.be.an(`object`).and.to.be.deep.equal({});
      expect(ti.drawObject.objectArray).to.be.an(`array`).and.have.lengthOf(0);
      expect(ti.drawObject.objectCount).to.be.a(`number`).and.to.equal(0);
      expect(ti.isCleared).to.be.ok;
    });
    // it('populates an object',()=>{
    //   ti.drawObject = ti.populateObject('ellipse',)
    // })
  })
})