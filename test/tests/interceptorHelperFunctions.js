define([`chai`], chai => {
  const expect = chai.expect;

  /* global describe */
  describe(`Interceptor Helper Functions`, () => {
    /* global it */
    it(`can recursively merge objects`, () => {
      const object1 = {
        a: 1,
        b: 2
      };
      const object2 = {
        c: 3,
        b: 4
      };
      /* global mergeObjRecursive */
      expect(mergeObjRecursive(object1, object2)).to.deep.equal({
        a: 1,
        b: 6,
        c: 3
      });
    });
    // TODO: Delete as this Array methos is not used
    /*
                    it(`checks if arrays are equal`, () => {
                      expect([1, 2, 3].equals(1)).to.equal(false); // Not an array
                      expect([1, 2, 3].equals([1, 2])).to.equal(false); // Different length
                      expect([
                        [1, 2],
                        [4, 5]
                      ].equals([
                        [1, 2],
                        [4, 5]
                      ])).to.equal(true); // Works on nested arrays
                      expect([1, 2].equals([1, 2])).to.equal(true); // Works on 1D arrays
                    })
                    */
  })
})