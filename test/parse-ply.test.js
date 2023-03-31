const createPLYParser = require('../parse-ply')
const fs = require('fs')
const {Readable} = require('stream')

test('can read ascii ply', done => {
    const stream = fs.createReadStream("./test/block_ascii.ply")

    function callback(error, data) {
        if (error) {
          done(error);
          return;
        }
        try {
          expect(data.vertex.x.length).toBe(8);
          expect(data.vertex.x).toEqual(new Uint8Array([0, 10, 10, 0, 10, 10, 0, 0]));

          expect(data.vertex.y.length).toBe(8);
          expect(data.vertex.y).toEqual(new Uint8Array([0, 0, 0, 0, 20, 20, 20, 20]));

          expect(data.vertex.z.length).toBe(8);
          expect(data.vertex.z).toEqual(new Uint8Array([0, 0, 30, 30, 0, 30, 0, 30]));

          const faces = data.face['vertex_indices'];
          expect(faces.length).toBe(12);

          expect(faces[0]).toEqual([0, 1, 2]);
          expect(faces[1]).toEqual([0, 2, 3]);
          expect(faces[2]).toEqual([1, 4, 5]);
          expect(faces[3]).toEqual([1, 5, 2]);
          expect(faces[4]).toEqual([4, 6, 7]);
          expect(faces[5]).toEqual([4, 7, 5]);
          expect(faces[6]).toEqual([6, 0, 3]);
          expect(faces[7]).toEqual([6, 3, 7]);
          expect(faces[8]).toEqual([1, 0, 6]);
          expect(faces[9]).toEqual([6, 4, 1]);
          expect(faces[10]).toEqual([2, 7, 3]);
          expect(faces[11]).toEqual([7, 2, 5]);
          done();
        } catch (error) {
          done(error);
        }
      }

      createPLYParser(stream, callback);
})

test('can read binary ply', done => {
    const stream = fs.createReadStream("./test/block_binary.ply")

    function callback(error, data) {
        if (error) {
          done(error);
          return;
        }
        try {
          expect(data.vertex.x.length).toBe(8);
          expect(data.vertex.x).toEqual(new Float32Array([0, 10, 10, 0, 10, 10, 0, 0]));

          expect(data.vertex.y.length).toBe(8);
          expect(data.vertex.y).toEqual(new Float32Array([0, 0, 0, 0, 20, 20, 20, 20]));

          expect(data.vertex.z.length).toBe(8);
          expect(data.vertex.z).toEqual(new Float32Array([0, 0, 30, 30, 0, 30, 0, 30]));

          const faces = data.face['vertex_indices'];
          expect(faces.length).toBe(12);

          expect(faces[0]).toEqual([0, 1, 2]);
          expect(faces[1]).toEqual([0, 2, 3]);
          expect(faces[2]).toEqual([1, 4, 5]);
          expect(faces[3]).toEqual([1, 5, 2]);
          expect(faces[4]).toEqual([4, 6, 7]);
          expect(faces[5]).toEqual([4, 7, 5]);
          expect(faces[6]).toEqual([6, 0, 3]);
          expect(faces[7]).toEqual([6, 3, 7]);
          expect(faces[8]).toEqual([1, 0, 6]);
          expect(faces[9]).toEqual([6, 4, 1]);
          expect(faces[10]).toEqual([2, 7, 3]);
          expect(faces[11]).toEqual([7, 2, 5]);
          done();
        } catch (error) {
          done(error);
        }
      }

      createPLYParser(stream, callback);
});
